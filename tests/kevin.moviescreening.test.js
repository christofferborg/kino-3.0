import { getUpcomingMovieScreenings } from "../src/logic/kevinmoviescreening.logic.js";

describe("Kevin – upcoming movie screenings (details page)", () => {
  test("returnerar endast kommande visningar", () => {
    const now = new Date("2025-03-18T12:00:00Z");

    const mockCmsData = {
      data: [
        {
          id: 1,
          attributes: {
            start_time: "2025-03-17T12:00:00Z",
            room: "Stora salongen",
          },
        },
        {
          id: 2,
          attributes: {
            start_time: "2025-03-19T18:00:00Z",
            room: "Lilla salongen",
          },
        },
      ],
    };

    const result = getUpcomingMovieScreenings(mockCmsData, now);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
    expect(result[0].room).toBe("Lilla salongen");
  });
});
