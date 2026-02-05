import {
  getImdbId,
  getImdbRating,
  getReviewsByMovieId,
  getScreenings,
} from "./src/cms/cms.client.js";

async function runTest() {
  console.log("--- Testar API-kedjan ---");

  const testId = 12;
  const imdbId = await getImdbId(testId);
  console.log("IMDb ID: ", imdbId);

  const rating = await getImdbRating(imdbId);
  console.log("Betyg: ", rating);

  const reviews = await getReviewsByMovieId(testId);
  console.log("Reviews: ", reviews);

  const screenings = await getScreenings();
  console.log("Screenings: ", screenings);
}

runTest();
