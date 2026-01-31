import { calculateRating } from "../logic/ratingCalculator.js";
import  express  from "express";

const router = express.Router();

router.get("/api/movies/:id/rating", async (req, res) => {
  try {
    const movieId = req.params.id;
    const url = `https://plankton-app-xhkom.ondigitalocean.app/api/reviews?filters[movie]=${movieId}`;
    const response = await fetch(url);
    const result = await response.json();
    const movieData = result.data;
    console.log(movieData);

    const urlInfo = `https://plankton-app-xhkom.ondigitalocean.app/api/movies/${movieId}`;
    const responseInfo = await fetch(urlInfo);
    const resultInfo = await responseInfo.json();
    const imdbId = resultInfo.data.attributes.imdbId;

    const omdbKey = process.env.OMDB_API_KEY;
    const urlRating = `http://www.omdbapi.com/?apikey=${omdbKey}&i=${imdbId}`;
    const responseRating = await fetch(urlRating);
    const resultRating = await responseRating.json();
    const imdbRating = parseFloat(resultRating.imdbRating);
    const finalRating = calculateRating(movieData, imdbRating);
    res.json({ rating: finalRating });
    console.log(finalRating);
  } catch (error) {
    res.status(500).json({ error: "Kunde inte hämta betyg" });
    console.error("Fel vid hämtning av api", error);
  }
});

export default router;