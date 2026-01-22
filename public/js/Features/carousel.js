let slideIndex = 1;

// Autoplay
let autoplayTimer = null;
const AUTOPLAY_DELAY = 3000;

export function initCarousel() {
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      plusSlides(-1);
      restartAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      plusSlides(1);
      restartAutoplay();
    });
  }

  showSlides(slideIndex);
  startAutoplay();
}

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides"); 

  if (slides.length === 0) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
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

