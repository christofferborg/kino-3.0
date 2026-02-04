//pagination logic for reviews on movie info page
function paginateReviews(reviews, page = 1, max = 5) {
  const startIndex = (page - 1) * max;
  const endIndex = startIndex + max;

  return {
    reviews: reviews.slice(startIndex, endIndex), 
    pages: Math.ceil(reviews.length / max)};
}

export { paginateReviews };