export function getUpcomingMovieScreenings(cmsJson, now = new Date()) {
  if (!cmsJson || !Array.isArray(cmsJson.data)) {
    return [];
  }

  return cmsJson.data
    .map(item => {
      const attrs = item.attributes || {};
      const date = attrs.start_time ? new Date(attrs.start_time) : null;

      return {
        id: item.id,
        startTime: attrs.start_time,
        room: attrs.room || null,
        date,
      };
    })
    .filter(screening => screening.date && screening.date > now)
    .sort((a, b) => a.date - b.date);
}
