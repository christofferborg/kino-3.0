
import { Router } from "express";
import { getReviewsByMovieId } from "../cms/cms.client.js";
import { paginateReviews } from "../logic/view-reviews.logic.js";

const viewReviewsRouter = Router();

//Kanske döper om movieId till movie.id senare

//Kanske döper om movieId till movie.id senare
viewReviewsRouter.get("/richards-filmer/:id/view-reviews", (req, res) => {
  res.render("view-reviews", { movieId: req.params.id });
  res.render("movie-info", { movie });
});

export default viewReviewsRouter;



