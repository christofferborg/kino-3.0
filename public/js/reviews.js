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
4