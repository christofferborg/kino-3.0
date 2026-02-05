function dayKey(date) {
  return date.toISOString().slice(0, 10);
}

export function getUpcomingStartpageScreenings(
  cmsJson,
  now = new Date(),
  days = 5,
  limit = 10,
) {
  const rangeStart = new Date(now);
  rangeStart.setUTCHours(0, 0, 0, 0);
  rangeStart.setUTCDate(rangeStart.getUTCDate() + 1);

  const rangeEnd = new Date(rangeStart);
  rangeEnd.setUTCDate(rangeEnd.getUTCDate() + days);

  const filteredSorted = (cmsJson.data ?? [])
    .map((item) => {
      const a = item.attributes ?? {};
      const movieData = a.movie?.data;
      const movieAttributes = movieData?.attributes ?? {};

      return {
        id: item.id,
        startsAt: a.start_time,
        startsAtDate: a.start_time ? new Date(a.start_time) : null,
        room: a.room ?? null,
        movie: movieData
          ? {
              id: movieData.id,
              title: movieAttributes.title ?? "",
              poster: movieAttributes.image?.url ?? "",
            }
          : null,
      };
    })
    .filter((screening) => screening.startsAtDate)
    .filter(
      (screening) =>
        screening.startsAtDate >= rangeStart &&
        screening.startsAtDate < rangeEnd,
    )
    .sort((a, b) => a.startsAtDate - b.startsAtDate);

  const groupedByDay = filteredSorted.reduce((acc, screening) => {
    const day = dayKey(screening.startsAtDate);
    (acc[day] ??= []).push({
      id: screening.id,
      startsAt: screening.startsAt,
      room: screening.room,
      movie: screening.movie,
    });
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedByDay).sort();

  const dayList = [];
  let total = 0;

  for (const date of sortedDates) {
    const dayScreenings = groupedByDay[date] ?? [];

    if (total + dayScreenings.length > limit) break;

    dayList.push({ date, screenings: dayScreenings });
    total += dayScreenings.length;

    if (total === limit) break;
  }

  return { days: dayList, total };
}
