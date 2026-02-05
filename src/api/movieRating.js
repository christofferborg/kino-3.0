import { calculateRating } from "../logic/ratingCalculator.js";
import {
  getReviewsByMovieId,
  getImdbId,
  getImdbRating,
} from "../cms/cms.client.js";
import express from "express";

const router = express.Router();

router.get("/api/movies/:id/rating", async (req, res) => {
  try {
    const movieId = req.params.id;
    const movieData = await getReviewsByMovieId(movieId);
    const imdbId = await getImdbId(movieId);
    const rawImdbRating = await getImdbRating(imdbId);
    const imdbRating = parseFloat(rawImdbRating);

    const finalRating = calculateRating(movieData, imdbRating);
    const source = movieData.length >= 5 ? "local" : "imdb";
    res.json({ rating: finalRating, source: source });
  } catch (error) {
    console.error("Fel vid hämtning av betyg:", error.message);
    res.status(404).json({ rating: 0, error: "Betyg kunde inte beräknas" });
  }
});

export default router;
