let slideIndex = 1;

// Autoplay
let autoplayTimer = null;
const AUTOPLAY_DELAY = 3000;

export async function initCarousel() {
  const container = document.querySelector(".slideshow-container");
  if (!container) return;

  try {
    const res = await fetch("/api/popularMovies");
    const movies = await res.json();
console.log("Filmer från backend:", movies);
    if (!Array.isArray(movies) || movies.length === 0) return;

    const slidesHtml = movies
      .map(
        (movie) => `
        <div class="mySlides fade">
          <img class="slide-img" src="${movie.image}" alt="${movie.title}" />
          <h2 class="slide-title">${movie.title}</h2>
        </div>
      `
      )
      .join("");

    container.insertAdjacentHTML("afterbegin", slidesHtml);

    const prevBtn = container.querySelector(".prev");
    const nextBtn = container.querySelector(".next");

    prevBtn?.addEventListener("click", () => {
      plusSlides(-1);
      restartAutoplay();
    });

    nextBtn?.addEventListener("click", () => {
      plusSlides(1);
      restartAutoplay();
    });

    showSlides(slideIndex);
    startAutoplay();
  } catch (err) {
    console.error("Kunde inte ladda carousel:", err);
  }
}

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides");
  if (slides.length === 0) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let slide of slides) {
    slide.style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}

function startAutoplay() {
  stopAutoplay();
  autoplayTimer = setInterval(() => {
    plusSlides(1);
  }, AUTOPLAY_DELAY);
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
}

function restartAutoplay() {
  startAutoplay();
}

