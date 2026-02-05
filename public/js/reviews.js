// Total reviews button
const totalReviewsEl = document.getElementById("viewReviewsBtn");
if (!totalReviewsEl) throw new Error("Button element not found");

// Get movie ID from data attribute
const movieId = totalReviewsEl.dataset.id;
  console.log("Movie ID:", movieId);

export async function loadTotalReviews() {
  try {
    const res = await fetch(`/richards-filmer/${movieId}/reviews/total`);
    if (!res.ok) throw new Error("Failed to fetch total reviews");

    const data = await res.json();
    console.log("API data:", data);

    totalReviewsEl.innerHTML = `Recensioner (${data.totalReviews}) <span class="arrow _right"></span>`;
  } catch (error) {
    console.error("Fel vid hämtning av totalt antal recensioner:", error);
    totalReviewsEl.innerHTML = `Recensioner (0) <span class="arrow _right"></span>`;
  }
}

// Automatically load total reviews on DOMContentLoaded
window.addEventListener("DOMContentLoaded", loadTotalReviews);

 //button to access the view reviews page
 const viewBtn = document.querySelector(".reviewBtn._view");

  viewBtn.addEventListener("click", () => {
    const id = viewBtn.dataset.id;
    window.location.href = `/richards-filmer/${id}/view-reviews`;
     });

    
//popup for viewing reviews
// Global variabel för aktuell film
let currentMovieId = null;

const reviewBtn = document.getElementById("reviewBtn");
const reviewPopup = document.getElementById("reviewPopup");
const popupWriteInnerContent = document.getElementById("popupWriteInnerContent");


let closeX = document.createElement("span");
closeX.classList.add("closeX");
closeX.innerHTML = "&times;";
closeX.addEventListener("click", () => {
    reviewPopup.style.display = "none";
    if (closeX.parentNode) closeX.remove();
});

reviewBtn.addEventListener("click", () => {
    // Hämta filmens ID från data-attribut
    currentMovieId = Number(reviewBtn.dataset.id);
console.log("Aktuell film-ID:", currentMovieId);

    // Skapa formulär
    const formHtml = `
        <div class="review-form-container">
            <h3>Lämna en recension</h3>
            <form id="reviewForm">
                <label for="name">Namn:</label>
                <input type="text" id="name" name="name" required />

                <label for="rating">Betyg (1-5):</label>
                <select id="rating" name="rating" required>
                    <option value="">Välj</option>
                </select>

                <label for="comment">Kommentar:</label>
                <textarea id="comment" name="comment" rows="4" required></textarea>

                <button type="submit">Skicka recension</button>
            </form>
            <div id="reviewMessage"></div>
            <div id="reviewList"></div>
        </div>
    `;
    popupWriteInnerContent.innerHTML = formHtml;

    // Lägg till kryss
    const existingX = reviewPopup.querySelector(".closeX");
    if (existingX) existingX.remove();
    reviewPopup.querySelector(".popupWrite-content").prepend(closeX);

    // Dynamiskt generera betyg 1–5
    const ratingSelect = document.getElementById("rating");
    for (let i = 1; i <= 5; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        ratingSelect.appendChild(option);
    }

    
    reviewPopup.style.display = "flex";

    // Hantera formuläret
    const reviewForm = document.getElementById("reviewForm");
    reviewForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = {
            name: reviewForm.name.value,
            rating: parseInt(reviewForm.rating.value),
            comment: reviewForm.comment.value,
            movie: currentMovieId
        };

        const messageDiv = document.getElementById("reviewMessage");
        messageDiv.textContent = "Skickar recension...";
        messageDiv.style.color = "black";

        try {
            const response = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                messageDiv.textContent = "Recension skickad!";
                messageDiv.style.color = "green";
                reviewForm.reset();

            } else {
                messageDiv.textContent = "Fel: " + (data.error || "Okänt fel");
                messageDiv.style.color = "red";
            }
        } catch (err) {
            messageDiv.textContent = "Kunde inte skicka recensionen.";
            messageDiv.style.color = "red";
            console.error(err);
        }
    }, { once: true });
});


window.addEventListener("click", e => {
    if (e.target === reviewPopup) {
        reviewPopup.style.display = "none";
        if (closeX.parentNode) closeX.remove();
    }
});
