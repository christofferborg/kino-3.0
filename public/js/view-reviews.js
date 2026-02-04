 
 //button to go back to previous page (movie info)
const backBtn = document.querySelector(".backBtn");

if (backBtn) {
  backBtn.addEventListener("click", () => {
    history.back();
  });
}

const pathParts = window.location.pathname.split("/");
const movieId = pathParts[pathParts.length - 2];

const reviewsContainer = document.getElementById("reviews-container");

async function loadReviews() {
  try {
    const res = await fetch(`/richards-filmer/${movieId}/view-reviews/api`);
    if (!res.ok) throw new Error("Failed to fetch reviews");

    const data = await res.json();

    reviewsContainer.innerHTML = "";

    if (!data.reviews || data.reviews.length === 0) {
      reviewsContainer.innerHTML = "<p>Inga recensioner ännu</p>";
      return;
    }

    // Loop through reviews to create cards
    data.reviews.forEach(review => {
      
      const card = document.createElement("article");
      card.className = "review-card";

      const rating = document.createElement("p");
      rating.className = "review-card_rating";
      rating.innerHTML = `&#11088; ${review.rating}/10`;

      const quote = document.createElement("blockquote");
      quote.className = "review-card_quote";
      quote.textContent = review.quote;

      const name = document.createElement("h2");
      name.className = "review-card_name";
      name.textContent = review.name;

      card.append(rating, quote, name);
      reviewsContainer.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    reviewsContainer.innerHTML = "<p>Kunde inte ladda recensioner.</p>";
  }
}

// Load reviews when page is ready
window.addEventListener("DOMContentLoaded", loadReviews);
