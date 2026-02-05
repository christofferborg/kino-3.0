 
 //button to go back to previous page (movie info)
const backBtn = document.querySelector(".backBtn");

if (backBtn) { backBtn.addEventListener("click", () => {
    history.back();
  });
}

let currentPage = 1;
let totalPages = 1; //updates with fetch

const pathParts = window.location.pathname.split("/");
const movieId = pathParts[pathParts.length - 2];

const reviewsContainer = document.getElementById("reviews-container");
const prevBtn = document.getElementById("previous-page");
const nextBtn = document.getElementById("next-page");

async function loadReviews() {
  try {
    const res = await fetch(`/richards-filmer/${movieId}/view-reviews/api?page=${currentPage}`);
    if (!res.ok) throw new Error("Failed to fetch reviews");

    const data = await res.json();
    reviewsContainer.innerHTML = "";

    if (!data.reviews || data.reviews.length === 0) {
      reviewsContainer.innerHTML = "<p>Inga recensioner ännu</p>";
      return;
    }

    data.reviews.forEach(review => {
      const card = document.createElement("article");
      card.className = "review-card";

      const rating = document.createElement("p");
      rating.className = "review-card_rating";
      rating.innerHTML = `&#11088; ${review.rating}/5`;

      const quote = document.createElement("blockquote");
      quote.className = "review-card_quote";
      quote.textContent = review.quote;

      const name = document.createElement("h2");
      name.className = "review-card_name";
      name.textContent = review.name;

      card.append(rating, quote, name);
      reviewsContainer.appendChild(card);
    });

    // --- Update pagination buttons ---
    const pageIndicator = document.querySelector(".page-indicator");

    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === data.totalPages;
    if (pageIndicator) pageIndicator.textContent = `${currentPage} / ${data.totalPages}`;
  

  } catch (error) {
    console.error(error);
    reviewsContainer.innerHTML = "<p>Kunde inte ladda recensioner.</p>";
  }
}


  // Update pagination buttons event listeners
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadReviews(currentPage);
  }
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  loadReviews(currentPage);
});

window.addEventListener("DOMContentLoaded", () => {
  loadReviews(currentPage);
});
