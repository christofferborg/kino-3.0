import express from "express";
import { getScreenings } from "../cms/cms.client.js";

const router = express.Router();

router.get("/movies/:movieId/screenings", async (req, res, next) => {
  try {
    const movieId = Number(req.params.movieId);

    const cmsResult = await getScreenings();

    const screenings = cmsResult.data;

    const now = new Date();

    const upcoming = screenings
      .filter(s => s.attributes?.movie?.data?.id === movieId)
      .filter(s => new Date(s.attributes.start_time) > now)
      .map(s => ({
        id: s.id,
        start_time: s.attributes.start_time,
        room: s.attributes.room
      }));

    res.json(upcoming);
  } catch (err) {
    next(err);
  }
});

export default router;
