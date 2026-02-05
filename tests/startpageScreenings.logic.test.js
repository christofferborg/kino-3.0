import { getUpcomingStartpageScreenings } from "../src/logic/startpageScreenings.logic.js";

function cmsScreening({
  id,
  start_time,
  room = "Salong A",
  movieId = 1,
  title = "Film",
  poster = "/poster.jpg",
} = {}) {
  return {
    id,
    attributes: {
      start_time,
      room,
      movie: {
        data: {
          id: movieId,
          attributes: {
            title,
            image: { url: poster },
          },
        },
      },
    },
  };
}

function flattenDays(result) {
  return (result.days ?? []).flatMap((d) => d.screenings ?? []);
}

describe("getUpcomingStartpageScreenings", () => {
  test("KRAV: endast visningar inom nästkommande 5 kalenderdagar (exkl idag) inkluderas (>= imorgon 00:00 och < dag6 00:00)", () => {
    const now = new Date("2026-02-05T10:00:00.000Z");

    const cmsJson = {
      data: [
        // Idag (ska bort)
        cmsScreening({ id: 1, start_time: "2026-02-05T23:59:59.000Z" }),

        // Precis vid start (ska med)
        cmsScreening({ id: 2, start_time: "2026-02-06T00:00:00.000Z" }),

        // Sista sekunden på sista dagen (2026-02-10) (ska med)
        cmsScreening({ id: 3, start_time: "2026-02-10T23:59:59.000Z" }),

        // Exakt på rangeEnd (ska bort)
        cmsScreening({ id: 4, start_time: "2026-02-11T00:00:00.000Z" }),

        // Efter rangeEnd (ska bort)
        cmsScreening({ id: 5, start_time: "2026-02-11T00:00:01.000Z" }),
      ],
    };

    const result = getUpcomingStartpageScreenings(cmsJson, now, 5, 10);
    const ids = flattenDays(result).map((s) => s.id);

    expect(ids).toEqual([2, 3]);
    expect(result.total).toBe(2);
  });

  test("KRAV: kapa inte mitt i en dag (hela dagar-regeln)", () => {
    const now = new Date("2026-02-05T10:00:00.000Z");

    const cmsJson = {
      data: [
        // Dag 1 (4 screenings)2026-02-06
        cmsScreening({ id: 1, start_time: "2026-02-06T01:00:00.000Z" }),
        cmsScreening({ id: 2, start_time: "2026-02-06T02:00:00.000Z" }),
        cmsScreening({ id: 3, start_time: "2026-02-06T03:00:00.000Z" }),
        cmsScreening({ id: 4, start_time: "2026-02-06T04:00:00.000Z" }),

        // Dag 2 (4 screenings) 2026-02-07
        cmsScreening({ id: 5, start_time: "2026-02-07T01:00:00.000Z" }),
        cmsScreening({ id: 6, start_time: "2026-02-07T02:00:00.000Z" }),
        cmsScreening({ id: 7, start_time: "2026-02-07T03:00:00.000Z" }),
        cmsScreening({ id: 8, start_time: "2026-02-07T04:00:00.000Z" }),

        // Dag 3 (8 screenings) 2026-02-08 (ska INTE få plats som hel dag)
        cmsScreening({ id: 9, start_time: "2026-02-08T00:00:00.000Z" }),
        cmsScreening({ id: 10, start_time: "2026-02-08T01:00:00.000Z" }),
        cmsScreening({ id: 11, start_time: "2026-02-08T02:00:00.000Z" }),
        cmsScreening({ id: 12, start_time: "2026-02-08T03:00:00.000Z" }),
        cmsScreening({ id: 13, start_time: "2026-02-08T04:00:00.000Z" }),
        cmsScreening({ id: 14, start_time: "2026-02-08T05:00:00.000Z" }),
        cmsScreening({ id: 15, start_time: "2026-02-08T06:00:00.000Z" }),
        cmsScreening({ id: 16, start_time: "2026-02-08T07:00:00.000Z" }),
      ],
    };

    const result = getUpcomingStartpageScreenings(cmsJson, now, 5, 10);

    expect(result.total).toBe(8);
    expect(result.days).toHaveLength(2);
    expect(result.days[0].date).toBe("2026-02-06");
    expect(result.days[1].date).toBe("2026-02-07");
  });

  test("KRAV: sorterar visningar stigande på starttid", () => {
    const now = new Date("2026-02-05T10:00:00.000Z");

    const cmsJson = {
      data: [
        cmsScreening({ id: 1, start_time: "2026-02-06T12:00:00.000Z" }),
        cmsScreening({ id: 2, start_time: "2026-02-06T11:00:00.000Z" }),
        cmsScreening({ id: 3, start_time: "2026-02-06T10:30:00.000Z" }),
      ],
    };

    const result = getUpcomingStartpageScreenings(cmsJson, now, 5, 10);
    const ids = flattenDays(result).map((s) => s.id);

    expect(ids).toEqual([3, 2, 1]);
  });

  test("KRAV: grupperar per dag (YYYY-MM-DD) och behåller ordning inom dagen", () => {
    const now = new Date("2026-02-05T10:00:00.000Z");

    const cmsJson = {
      data: [
        cmsScreening({ id: 1, start_time: "2026-02-06T12:00:00.000Z" }),
        cmsScreening({ id: 2, start_time: "2026-02-06T11:00:00.000Z" }),
        cmsScreening({ id: 3, start_time: "2026-02-07T09:00:00.000Z" }),
      ],
    };

    const result = getUpcomingStartpageScreenings(cmsJson, now, 5, 10);

    expect(result.days).toHaveLength(2);
    expect(result.days[0].date).toBe("2026-02-06");
    expect(result.days[1].date).toBe("2026-02-07");

    const day1Ids = result.days[0].screenings.map((s) => s.id);
    expect(day1Ids).toEqual([2, 1]);
  });
});
