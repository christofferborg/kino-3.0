 
 //button to go back to previous page (movie info)
const backBbtn = document.querySelector(".backBtn");

 if (backBtn) {
  backBtn.addEventListener("click", () => {
    history.back(); 
  });
}


//Creating cards for each review and pagination 
let currentPage = 1;
const movieId = window.location.pathname.split("/").pop();

async function loadReviews(page = 1) {
  
  const res = await fetch(`/richards-filmer/${movieId}/view-reviews`);
  const reviews = await res.json();

  const { reviews: paginatedReviews, pages } = paginateReviews(reviews, page, 5);
 

  //build review cards
  /* <article class="review-card">
<p class="review-card_rating">&#11088; 9.8/10</p>
     <blockquote class="review-card_quote">"This is the best movie I have ever seen"</blockquote>
     <h2 class="review-card_name">Namn Namnsson</h2>
</article> */

  const reviewsContainer = document.querySelector(".review-list");
  reviewsContainer.innerHTML = ""; //remove previous review cards

  paginatedReviews.forEach(review => {

    const reviewCard = document.createElement("article");
    reviewCard.className = "review-card";
    
    const rating = document.createElement("p");
    rating.className = "review-card_rating";
    rating.innerHTML = `&#11088; ${review.rating}/10`;
    reviewCard.appendChild(rating);
    
    const quote = document.createElement("blockquote");
    quote.className = "review-card_quote";
    quote.textContent = `&#11088; ${review.quote}`;
    reviewCard.appendChild(quote);
    

      const name = document.createElement("h2");
      name.className = "review-card_name";
      name.textContent = review.name;
      reviewCard.appendChild(name);
      

      //add to container
      reviewsContainer.appendChild(reviewCard);

      
  });

  updatePaginationButtons(pages, page);
}

//prev and next buttons

/*
<span class="arrow _left" id="previous-page"></span>
<p>1/2</p>
<span class="arrow _right" id="next-page"></span>

*/

function updatePaginationButtons(pages, currentPage) {
  const prevBtn = document.getElementById("previous-page");
  const nextBtn = document.getElementById("next-page");

  const pageIndicator = document.querySelector(".page-indicator");

  if (prevBtn) {
    prevBtn.style.display = currentPage > 1 ? "block" : "none";
  }

  if (nextBtn) {
    nextBtn.style.display = currentPage < pages ? "block" : "none";
  }

  if (pageIndicator) {
    pageIndicator.textContent = `${currentPage}/${pages}`;
  }
}
 

window.addEventListener("DOMContentLoaded", () => {
  loadReviews(currentPage);});

