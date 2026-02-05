function dayKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getUpcomingStartpageScreenings(
  cmsJson,
  now = new Date(),
  days = 5,
  limit = 10,
) {
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const rangeEnd = new Date(todayStart);
  rangeEnd.setDate(rangeEnd.getDate() + days);

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
    .filter((screening) => screening.startsAtDate >= now)
    .filter((screening) => screening.startsAtDate < rangeEnd)

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
    if (total === 0 && dayScreenings.length > limit) {
      dayList.push({ date, screenings: dayScreenings.slice(0, limit) });
      total = limit;
      break;
    }
    if (total + dayScreenings.length > limit) break;

    dayList.push({ date, screenings: dayScreenings });
    total += dayScreenings.length;

    if (total === limit) break;
  }

  return { days: dayList, total };
}
