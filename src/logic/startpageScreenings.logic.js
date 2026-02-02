function dayKey(date) {
  // YYYY-MM-DD
  return date.toISOString().slice(0, 10);
}

export function getUpcomingStartpageScreenings(cmsJson, now = new Date()) {
  // 1) Mappa CMS → enkel struktur
  const all = (cmsJson.data ?? []).map((item) => {
    const a = item.attributes ?? {};
    const movieData = a.movie?.data;

    const movieAttrs = movieData?.attributes ?? null;

    return {
      id: item.id,
      startsAt: a.start_time,
      room: a.room ?? null,
      movie: movieData
        ? {
            id: movieData.id,
            title: movieAttrs?.title ?? "",
            poster: movieAttrs?.image?.url ?? "",
          }
        : null,
    };
  });

  // 2) Fönster: nu → 5 dagar
  const maxDate = new Date(now);
  maxDate.setDate(maxDate.getDate() + 5);

  // 3) Filtrera: bara kommande och inom 5 dagar
  const filtered = all
    .filter((s) => s.startsAt)
    .filter((s) => new Date(s.startsAt) >= now)
    .filter((s) => new Date(s.startsAt) < maxDate)
    .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));

  // 4) Gruppera per dag
  const grouped = new Map();
  for (const s of filtered) {
    const key = dayKey(new Date(s.startsAt));
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(s);
  }

  // 5) Max 10 totalt, dag-för-dag, kapa sista dagen om behövs
  const days = [];
  let total = 0;

  for (const [date, screenings] of grouped.entries()) {
    if (total >= 10) break;

    const remaining = 10 - total;

    if (screenings.length <= remaining) {
      days.push({ date, screenings });
      total += screenings.length;
    } else {
      days.push({ date, screenings: screenings.slice(0, remaining) });
      total += remaining;
      break;
    }
  }

  return { days, total };
}
