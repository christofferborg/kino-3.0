import { initCarousel } from "./Features/carousel.js";
import { getRatingFromBackend } from "./Features/rating.js";
import { initStartpageScreenings } from "./Features/startpageScreenings.js";

getRatingFromBackend();
initCarousel();
initStartpageScreenings();

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");
const mobileIcons = document.querySelectorAll(".mobile-nav_item");

// Klick på hamburgare
menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");

  if (!navMenu.classList.contains("active")) {
    mobileIcons.forEach((icon) => icon.classList.remove("active"));
  }
});

// Klick på ikon → markera active
mobileIcons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.stopPropagation();

    // Toggle 'active' på den klickade ikonen
    if (icon.classList.contains("active")) {
      icon.classList.remove("active");
    } else {
      // Ta bort 'active' från alla andra
      mobileIcons.forEach((i) => i.classList.remove("active"));
      icon.classList.add("active");
    }
  });
});

// Klick utanför stänger menyn och resetar active
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");
    mobileIcons.forEach((icon) => icon.classList.remove("active"));
  }
});

// Desktop
const desktopDropdown = document.querySelector(".nav_item_dropdown");
const desktopLink = desktopDropdown.querySelector(".nav_link");

// Klick på "Mer ▾"
desktopLink.addEventListener("click", (e) => {
  e.preventDefault();
  desktopDropdown.classList.toggle("active");
});

// Klick utanför stänger dropdown
document.addEventListener("click", (e) => {
  if (!desktopDropdown.contains(e.target)) {
    desktopDropdown.classList.remove("active");
  }
});


