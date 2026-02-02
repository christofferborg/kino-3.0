import { Router } from "express";
import { fetchScreeningsFromCMS } from "../cms/cms.client.js";
import { getUpcomingStartpageScreenings } from "../logic/startpageScreenings.logic.js";

const router = Router();

router.get("/screenings/upcoming", async (req, res) => {
  try {
    const cmsJson = await fetchScreeningsFromCMS();
    const result = getUpcomingStartpageScreenings(
      cmsJson,
      new Date("2025-03-16T00:00:00.000Z"),
    );

    res.json(result);
  } catch (e) {
    res.status(500).json({ error: "Could not load screenings" });
  }
});

// router.get("/screenings/upcoming", async (req, res) => {
//   try {
//     const cmsJson = await fetchScreeningsFromCMS();
//     const result = getUpcomingStartpageScreenings(cmsJson, new Date());
//     res.json(result);
//   } catch (e) {
//     res.status(500).json({ error: "Could not load screenings" });
//   }
// });

export default router;
