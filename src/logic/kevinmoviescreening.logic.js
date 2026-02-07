export function getUpcomingMovieScreenings(cmsJson, now = new Date()) {
  if (!cmsJson?.data) return [];

  return cmsJson.data
    .map(item => {
      const a = item.attributes;
      return {
        id: item.id,
        start_time: a.start_time,
        room: a.room
      };
    })
    .filter(s => new Date(s.start_time) > now)
    .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
}
