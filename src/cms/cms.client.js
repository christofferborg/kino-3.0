import "dotenv/config";

console.log(
  "Kollar nyckeln:",
  process.env.OMDB_API_KEY ? "Hittad! ✅" : "Saknas! ❌",
);

export async function getReviewsByMovieId(movieId) {
  const url = `https://plankton-app-xhkom.ondigitalocean.app/api/reviews?filters[movie]=${movieId}`;
  const response = await fetch(url);
  const result = await response.json();
  return result.data;
}

export async function getImdbId(movieId) {
  const url = `https://plankton-app-xhkom.ondigitalocean.app/api/movies/${movieId}`;
  const response = await fetch(url);
  const result = await response.json();
  return result.data.attributes.imdbId;
}

export async function getImdbRating(imdbId) {
  const omdbKey = process.env.OMDB_API_KEY;
  const url = `http://www.omdbapi.com/?apikey=${omdbKey}&i=${imdbId}`;
  const response = await fetch(url);
  const result = await response.json();
  return result.imdbRating;
}

export async function getScreenings(movieId) {
  const url = `https://plankton-app-xhkom.ondigitalocean.app/api/screenings`;
  const response = await fetch(url);
  const result = await response.json();
  return result.data;
}
