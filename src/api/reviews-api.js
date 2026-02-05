import express from "express";
const router = express.Router();

const API_BASE = "https://plankton-app-xhkom.ondigitalocean.app/api/reviews";

router.post("/", express.json(), async (req, res) => {
    const { name, rating, comment, movie } = req.body;

    if (!name || !comment || movie === undefined || rating === undefined) {
        return res.status(400).json({
            success: false,
            error: "Alla fält krävs (name, rating, comment, movie)"
        });
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
        return res.status(400).json({
            success: false,
            error: "Rating måste vara ett nummer mellan 1 och 5"
        });
    }

    try {
        const response = await fetch(API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data: {
                    author: name,
                    rating,
                    comment,
                    movie: movie // ✅ DETTA är nyckeln
                }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Plankton API fel:", data);
            return res.status(response.status).json({
                success: false,
                error: data.error?.message || "Fel vid extern API"
            });
        }

        res.json({ success: true, review: data.data });

    } catch (err) {
        console.error("Serverfel:", err);
        res.status(500).json({
            success: false,
            error: "Kunde inte skicka recensionen"
        });
    }
});

export default router;
