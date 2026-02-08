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
    if (isNaN(movieId)) {
      return res.status(400).json({ error: "Ogiltigt Movie-ID" });
    }

    const movieData = await getReviewsByMovieId(movieId);
    const imdbId = await getImdbId(movieId);
    const provider = req.query.source || "omdb";
    const imdbRating = await getImdbRating(imdbId, provider);

    const finalRating = calculateRating(movieData, imdbRating);
    const source = movieData.length >= 5 ? "local" : "imdb";
    if (source === "imdb") {
      console.log(
        `[Rating Service] INFO: Visar IMDb-betyg för film ID ${movieId} (Hittade bara ${movieData.length} recensioner)`,
      );
    } else {
      console.log(
        `[Rating Service] INFO: Beräknar lokalt betyg för film ID ${movieId} (Hittade ${movieData.length} recensioner)`,
      );
    }

    res.json({
      rating: finalRating,
      source: source === "imdb" ? source: "local",
    });
  } catch (error) {
    console.error("Fel vid hämtning av betyg:", error.message);
    res.status(500).json({ rating: 0, error: "Betyg kunde inte beräknas" });
  }
});

export default router;
