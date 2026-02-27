import { Router } from "express";
import { getScreenings } from "../cms/cms.client.js";
import { getUpcomingStartpageScreenings } from "../logic/startpageScreenings.logic.js";

const router = Router();

router.get("/screenings", async (req, res) => {
  try {
    const days = Math.min(Number(req.query.days) || 5, 5);
    const limit = Math.min(Number(req.query.limit) || 10, 10);

    const cmsJson = await getScreenings();
    const result = getUpcomingStartpageScreenings(
      cmsJson,
      //Den riktiga koden är bara new Date(), men hårkodade
      // datum för att kunna visa något då det inte finns visningar för dagens datum och framåt
      new Date("2025-03-16T00:00:00"),
      days,
      limit,
    );

    res.json(result);
    console.log(result);
  } catch (error) {
    res.status(500).json({ error: "Could not load screenings" });
  }
});

export default router;
