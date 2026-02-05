import express from "express";
import { getReviewsByMovieId } from "../cms/cms.client.js";

const router = express.Router();

const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;

router.get("/popularMovies", async (req, res) => {
  try {
    const moviesRes = await fetch(
      "https://plankton-app-xhkom.ondigitalocean.app/api/movies"
    );
    const moviesJson = await moviesRes.json();
    const movies = moviesJson.data;

    const now = Date.now();

    const moviesWithRatings = await Promise.all(
      movies.map(async (movie) => {
        const reviews = await getReviewsByMovieId(movie.id);

        const recentReviews = reviews.filter((r) => {
          const created = new Date(r.attributes.createdAt).getTime();
          return now - created <= THIRTY_DAYS;
        });

        if (recentReviews.length === 0) return null;

        const avg =
          recentReviews.reduce(
            (sum, r) => sum + r.attributes.rating,
            0
          ) / recentReviews.length;

        return {
          id: movie.id,
          title: movie.attributes.title,
          image: movie.attributes.image.url,
          averageRating: avg,
        };
      })
    );

    const topFive = moviesWithRatings
      .filter(Boolean)
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 5);

    res.json(topFive);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Kunde inte hämta populära filmer",
    });
  }
});

export default router;
