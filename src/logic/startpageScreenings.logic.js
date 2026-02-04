function dayKey(date) {
  return date.toISOString().slice(0, 10);
}

export function getUpcomingStartpageScreenings(
  cmsJson,
  now = new Date(),
  days = 5,
  limit = 10,
) {
  const maxDate = new Date(now);
  maxDate.setDate(maxDate.getDate() + days);

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
        screening.startsAtDate >= now && screening.startsAtDate < maxDate,
    )
    .sort((a, b) => a.startsAtDate - b.startsAtDate);

  const nextTenScreenings = filteredSorted.slice(0, limit);

  const groupedByDay = nextTenScreenings.reduce((acc, screening) => {
    const day = dayKey(screening.startsAtDate);
    (acc[day] ??= []).push({
      id: screening.id,
      startsAt: screening.startsAt,
      room: screening.room,
      movie: screening.movie,
    });
    return acc;
  }, {});

  const dayList = Object.keys(groupedByDay)
    .sort()
    .map((date) => ({ date, screenings: groupedByDay[date] }));

  return { days: dayList, total: nextTenScreenings.length };
}
