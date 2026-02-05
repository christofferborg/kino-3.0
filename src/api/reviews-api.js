import express from "express";
const router = express.Router();

const API_BASE = "https://plankton-app-xhkom.ondigitalocean.app/api/reviews";

// POST: Skicka recension till externa API
router.post("/", express.json(), async (req, res) => {
    const { name, rating, comment, movie } = req.body;

    // Kontrollera att alla fält finns
    if (!name || !rating || !comment || !movie) {
        console.error("POST /api/reviews: Saknar fält", req.body);
        return res.status(400).json({ success: false, error: "Alla fält krävs (name, rating, comment, movie)" });
    }

    try {
        // Skicka till plankton API
        const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        data: {
            author: name,   // ← mappas från frontend "name"
            rating,
            comment,
            movie
        }
    })
});

        // Läs svaret
        const data = await response.json();

        if (!response.ok) {
            // Om plankton API svarar med fel
            console.error("Plankton API fel:", data);
            return res.status(response.status).json({
                success: false,
                error: data.error || "Fel vid extern API"
            });
        }

        console.log("Recension skickad till plankton API:", data);
        res.json({ success: true, review: data.data });

    } catch (err) {
        console.error("POST /api/reviews: Serverfel", err);
        res.status(500).json({ success: false, error: "Kunde inte skicka recensionen" });
    }
});

export default router;
