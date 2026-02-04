
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
    const cmsReviewsRaw = await getReviewsByMovieId(movieId);
    const cmsReviews = Array.isArray(cmsReviewsRaw) ? cmsReviewsRaw : [];

    // Only take the first review
    const firstReview = cmsReviews[0] || null;

    if (!firstReview) {
      return res.json({ review: null });
    }

    const simplifiedReview = {
      quote: firstReview.attributes.comment,
      rating: firstReview.attributes.rating,
      name: firstReview.attributes.author
    };

    res.json({ review: simplifiedReview });

  } catch (error) {
    console.error("Fel vid hämtning av recensioner:", error);
    res.status(500).json({ error: "500: Kunde inte hämta recensioner." });
  }
});

export default viewReviewsRouter;
