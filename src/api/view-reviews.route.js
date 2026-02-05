
import { Router } from "express";
import { getReviewsByMovieId } from "../cms/cms.client.js";
import { paginateReviews} from "../logic/view-reviews.logic.js";

const viewReviewsRouter = Router();

//render view-reviews.ejs (instead of in app.js)
viewReviewsRouter.get("/richards-filmer/:id/view-reviews", (req, res) => {
  res.render("view-reviews", { movieId: req.params.id });
});

//api route
viewReviewsRouter.get("/richards-filmer/:id/view-reviews/api", async (req, res) => {
  try {
    const movieId = req.params.id;
    const cmsResponse = await getReviewsByMovieId(movieId); // full API JSON

    const page = Number(req.query.page) || 1;
    const pageSize = 5;

    const simplifiedReviews = cmsResponse.map(review => ({
      quote: review.attributes.comment,
      rating: review.attributes.rating,
      name: review.attributes.author
    }));

    const result = paginateReviews(simplifiedReviews, page, pageSize);

    res.json({
    reviews: result.data,       // only the current page
    totalPages: result.totalPages,
    totalItems: result.totalItems,
    page: result.page
});

  } catch (error) {
    console.error("Fel vid hämtning av recensioner:", error);
    res.status(500).json({ error: "500: Kunde inte hämta recensioner." });
  }
});

viewReviewsRouter.get("/richards-filmer/:id/reviews/total", async (req, res) => {
  try {
    const movieId = req.params.id;
    const cmsData = await getReviewsByMovieId(movieId); // now full object

     res.json({
        totalReviews: cmsData.length
      });
  } catch (error) {
    console.error("Fel vid hämtning av totalt antal recensioner:", error);
    res.status(500).json({ error: "500: Kunde inte hämta totalt antal recensioner." });
  }
});

export default viewReviewsRouter;
