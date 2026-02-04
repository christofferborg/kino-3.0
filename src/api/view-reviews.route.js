
import { Router } from "express";
import { getReviewsByMovieId } from "../cms/cms.client.js";
import { fetchReviewsToViewFromCMS } from "../logic/view-reviews.logic.js";

const viewReviewsRouter = Router();

viewReviewsRouter.get("/richards-filmer/:id/view-reviews", async (req, res) => {
  try {
    const movieId = req.params.id;
    const reviews = await getReviewsByMovieId(movieId);
    res.json(reviews);
  }
  catch (e) {
    res.status(500).json({ error: "Could not load reviews" });
        
    }
});

export default viewReviewsRouter;

