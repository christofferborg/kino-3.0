import express from "express";
import { getReviewsByMovieId } from "../cms/cms.client.js";

const router = express.Router();
const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;

router.get("/popularMovies", async (req, res) => {
  try {
    // Hämta alla filmer
    const moviesRes = await fetch(
      "https://plankton-app-xhkom.ondigitalocean.app/api/movies"
    );
    const moviesJson = await moviesRes.json();
    const movies = moviesJson.data || [];

    if (!Array.isArray(movies) || movies.length === 0) {
      console.log("Inga filmer hämtades från CMS");
      return res.json([]);
    }

    // Mappa över filmer
    const moviesWithRatings = await Promise.all(
      movies.map(async (movie) => {
        if (!movie?.id) return null;

        // Hämta recensioner
        const reviewsRaw = await getReviewsByMovieId(movie.id);
        const reviews = Array.isArray(reviewsRaw.data) ? reviewsRaw.data : [];

        // Filtrera senaste 30 dagar
        const now = Date.now();
        const recentReviews = reviews.filter((r) => {
          const createdAt = r.attributes?.createdAt;
          if (!createdAt) return false;
          const created = new Date(createdAt).getTime();
          return now - created <= THIRTY_DAYS;
        });

        if (recentReviews.length === 0) {
          return null;
        }

        // Beräkna medelbetyg
        const averageRating =
          recentReviews.reduce((sum, r) => sum + r.attributes.rating, 0) /
          recentReviews.length;

        return {
          id: movie.id,
          title: movie.attributes.title,
          image: movie.attributes.image?.url || "",
          averageRating,
          reviewCount: recentReviews.length,
        };
      })
    );

    // Sortera och ta max 5 filmer
    const topFive = moviesWithRatings
      .filter(Boolean)
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 5);

    res.json(topFive);
  } catch (error) {
    console.error("Fel i /api/popularMovies:", error);
    res.status(500).json({ error: "Kunde inte hämta populära filmer" });
  }
});

export default router;
