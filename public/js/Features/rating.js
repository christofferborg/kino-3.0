export const getRatingFromBackend = async () => {
  const path = window.location.pathname;
  const parts = path.split("/");
  const movieId = parts.pop();
  const response = await fetch(`/api/movies/${movieId}/rating`);
  const result = await response.json();
  const ratingWithDecimal = result.rating.toFixed(1);
  const ratingArea = document.querySelector('.rating');
  if (ratingArea) {
    ratingArea.innerHTML = ratingWithDecimal;
  }
};