//pagination logic for reviews on movie info page
function paginateReviews(reviews, page, pageSize) {
  const totalItems = reviews.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    data: reviews.slice(start, end),
    totalPages,
    totalItems,
    page
  };
}


export { paginateReviews };