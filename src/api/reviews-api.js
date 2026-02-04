import express from "express";

const router = express.Router();

// Temporär "databas" i minnet
let reviews = [];

// POST: ta emot ny recension
router.post("/", express.json(), (req, res) => {
    const { name, rating, comment, movie } = req.body;

    if (!name || !rating || !comment || !movie) {
        return res.status(400).json({ success: false, error: "Alla fält krävs" });
    }

    const newReview = {
        id: reviews.length + 1,
        name,
        rating,
        comment,
        movie,
        createdAt: new Date()
    };

    reviews.push(newReview);

    res.json({ success: true, review: newReview });
});

export default router;
