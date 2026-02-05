export function isEnoughReviews(items) {
  return items.length >= 5;
}

export function getAverage(ratings) {
  return ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
}

export function calculateRating(reviews, imdbRating) {
  if (isEnoughReviews(reviews)) {
    let ratings = reviews.map((obj) => obj.attributes.rating);
    return getAverage(ratings);
  } else {
    return imdbRating;
  }
}
