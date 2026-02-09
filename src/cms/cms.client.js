import "dotenv/config";
const BASE = "https://plankton-app-xhkom.ondigitalocean.app/api";

console.log(
  "Kollar nyckeln:",
  process.env.OMDB_API_KEY ? "Hittad! ✅" : "Saknas! ❌",
);

export async function getReviewsByMovieId(movieId) {
  const url = `https://plankton-app-xhkom.ondigitalocean.app/api/reviews?filters[movie]=${movieId}&pagination[pageSize]=100`;
  const response = await fetch(url);
  const result = await response.json();
  return result.data.filter((review) => review.attributes.verified === true);
}

export async function getImdbId(movieId) {
  const url = `https://plankton-app-xhkom.ondigitalocean.app/api/movies/${movieId}`;
  const response = await fetch(url);
  const result = await response.json();
  if (!result || !result.data) {
    throw new Error(`Ingen film hittades i CMS för ID: ${movieId}`);
  }

  return result.data.attributes.imdbId;
}

export async function getImdbRating(imdbId, provider = "omdb") {
  if (provider === "imdbapi") {
    const apiKey = process.env.IMDB_API_KEY;
    const url = `https://imdbapi.net/api/title/${apiKey}/${imdbId}`;
    const response = await fetch(url);
    const result = await response.json();
    return parseFloat(result.imDbRating) || 0;
  }

  const omdbKey = process.env.OMDB_API_KEY;
  const url = `http://www.omdbapi.com/?apikey=${omdbKey}&i=${imdbId}`;
  const response = await fetch(url);
  const result = await response.json();
  return parseFloat(result.imdbRating) || 0;
}

export async function getScreenings() {
  const url = `${BASE}/screenings?populate=movie&pagination[pageSize]=200`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`CMS error: ${res.status}`);
  }

  return res.json();
}
