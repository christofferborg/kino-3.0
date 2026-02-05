export const getRatingFromBackend = async () => {
  const path = window.location.pathname;
  const parts = path.split("/").filter((part) => part !== "");
  const movieId = parts.pop();

  if (isNaN(movieId)) return;

  try {
    const response = await fetch(`/api/movies/${movieId}/rating`);
    const result = await response.json();

    const ratingArea = document.querySelector(".rating");
    if (!ratingArea) return;
    ratingArea.textContent = "";

    const ratingValue = result.rating.toFixed(1);

    if (result.source === "local") {
      ratingArea.textContent = `⭐ ${ratingValue}`;
    } else if (result.source === "imdb") {
      const imdbLogo = document.createElement("img");
      imdbLogo.src = "/img/imdbLogo.png";
      imdbLogo.alt = "IMDb";
      imdbLogo.style.width = "40px";
      imdbLogo.style.verticalAlign = "middle";
      ratingArea.append(imdbLogo, ` ${ratingValue}`);
    }
  } catch (err) {
    console.error("Kunde inte ladda betyg:", err);
  }
};
