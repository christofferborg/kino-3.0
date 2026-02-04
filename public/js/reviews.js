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

const reviewBtn = document.getElementById("reviewBtn");
const reviewPopup = document.getElementById("reviewPopup");
const popupWriteInnerContent = document.getElementById("popupWriteInnerContent");

// Skapa kryss-elementet en gång
let closeX = document.createElement("span");
closeX.classList.add("closeX");
closeX.innerHTML = "&times;";
closeX.addEventListener("click", () => {
    reviewPopup.style.display = "none";
    if (closeX.parentNode) closeX.remove();
});

reviewBtn.addEventListener("click", () => {
    fetch("/reviews")
        .then(res => res.text())
        .then(html => {
            popupWriteInnerContent.innerHTML = html;

            // Ta bort gammalt kryss om det finns
            const existingX = reviewPopup.querySelector(".closeX");
            if (existingX) existingX.remove();

            // Lägg till kryss
            reviewPopup.querySelector(".popupWrite-content").prepend(closeX);

            // Visa popup
            reviewPopup.style.display = "flex";
        })
        .catch(err => {
            popupWriteInnerContent.innerHTML = "<p>Kunde inte ladda recensioner.</p>";
            const existingX = reviewPopup.querySelector(".closeX");
            if (existingX) existingX.remove();
            reviewPopup.querySelector(".popupWrite-content").prepend(closeX);
            reviewPopup.style.display = "flex";
            console.error(err);
        });
});

// Klick utanför popup stänger popup
window.addEventListener("click", e => {
    if (e.target === reviewPopup) {
        reviewPopup.style.display = "none";
        if (closeX.parentNode) closeX.remove();
    }
});
