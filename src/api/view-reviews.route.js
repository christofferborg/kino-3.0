
import { Router } from "express";
import { getReviewsByMovieId } from "../cms/cms.client.js";
//import { paginateReviews} from "../logic/view-reviews.logic.js";

const viewReviewsRouter = Router();

//render view-reviews.ejs (instead of in app.js)
viewReviewsRouter.get("/richards-filmer/:id/view-reviews", (req, res) => {
  res.render("view-reviews", { movieId: req.params.id });
});

//api example
/*
 {
      "id": 1618,
      "attributes": {
        "comment": "Väldigt bra",
        "rating": 4,
        "author": "Joel",
        "verified": null,
        "createdAt": "2025-07-15T05:50:18.849Z",
        "updatedAt": "2025-07-15T05:50:18.849Z"
      }
    },
*/

//api route
viewReviewsRouter.get("/richards-filmer/:id/view-reviews/api", async (req, res) => {
  try {
    const movieId = req.params.id;
    const cmsReviews = await getReviewsByMovieId(movieId);

    if (!cmsReviews || cmsReviews.length === 0) {
      return res.json({ reviews: [] });
    }
      
     const simplifiedReviews = cmsReviews.map(review => ({
      quote: review.attributes.comment,
      rating: review.attributes.rating,
      name: review.attributes.author
    }));

   
    res.json({ reviews: simplifiedReviews });

  } catch (error) {
    console.error("Fel vid hämtning av recensioner:", error);
    res.status(500).json({ error: "500: Kunde inte hämta recensioner." });
  }
});

export default viewReviewsRouter;
