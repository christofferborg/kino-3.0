export function calculatePopularMovies(movies) {
  const now = new Date();
  const cutoff = new Date();
  cutoff.setDate(now.getDate() - 30);

  return movies
    .map(movie => {
      const recentReviews = movie.reviews.filter(review => {
        const createdAt = new Date(review.attributes.createdAt);
        return createdAt >= cutoff;
      });

      if (recentReviews.length === 0) {
        return null;
      }

      const averageRating =
        recentReviews.reduce(
          (sum, review) => sum + review.attributes.rating,
          0
        ) / recentReviews.length;

      return {
        movieId: movie.id,
        title: movie.title,
        averageRating,
        reviewCount: recentReviews.length,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 5);
}
