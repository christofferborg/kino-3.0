import { OMDB_API_KEY } from "./apiKey";

export const moviesData = [];

export const fetchMovie = async (imdbId) => {
  const url = `https://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  moviesData.push(data);
}

export const loadMovies = async (ids) => {
  moviesData.length = 0;

  const promises = ids.map(id => fetchMovie(id));
  await Promise.all(promises);
};