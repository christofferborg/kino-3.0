import express from "express";
import { getScreenings } from "../cms/cms.client.js";

const router = express.Router();


router.get("/movies/:movieId/screenings", async (req, res, next) => {
  try {
    const { movieId } = req.params;

    
    const screenings = await getScreenings(movieId);

    const now = new Date();

    
    const upcomingScreenings = screenings.filter(screening => {
      return new Date(screening.start_time) > now;
    });

    res.json(upcomingScreenings);
  } catch (error) {
    next(error);
  }
});

export default router;
