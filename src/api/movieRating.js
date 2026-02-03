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
    res.json({ rating: finalRating });
  } catch (error) {
    res.status(500).json({ error: "Kunde inte hämta betyg" });
    console.error("Fel vid hämtning av api", error);
  }
});

export default router;
