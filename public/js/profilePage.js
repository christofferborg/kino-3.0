const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (window.location.pathname === "/profile" && !currentUser) {
  window.location.href = "/login";
}

window.addEventListener("DOMContentLoaded", () => {
  const profileName = document.getElementById("profileName");
  const logoutBtn = document.getElementById("logoutBtn");
  const profileSection = document.getElementById("profileSection");
  const detailsLink = document.getElementById("detailsLink");

  if (!currentUser) return;

  if (profileName) {
    profileName.textContent =
      `${currentUser.fname || ""} ${currentUser.lname || ""}`.trim() ||
      currentUser.username ||
      "Min profil";
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "/login";
    });
  }

  if (detailsLink && profileSection) {
    detailsLink.addEventListener("click", (e) => {
      e.preventDefault();

      profileSection.innerHTML = `
        <div class="card shadow-lg border-0 rounded-4 overflow-hidden">
          <div class="card-body p-4 p-md-5 bg-dark text-light">
            <div class="text-center mb-4">
              <div
                class="mx-auto d-flex align-items-center justify-content-center rounded-circle bg-light"
                style="width: 120px; height: 120px;"
              >
                <i class="fa-regular fa-user fs-2 text-dark"></i>
              </div>
            </div>

            <div class="text-center mb-4">
              <h2 class="h2 fw-bold mb-1">Mina uppgifter</h2>
              <p class="text-secondary mb-0">
                Här ser du informationen som är sparad på ditt konto.
              </p>
            </div>

            <div class="list-group mb-4">
              <div class="list-group-item bg-black text-white border-secondary rounded-3 mb-2">
                <div class="small text-secondary mb-1">Förnamn</div>
                <div class="fw-semibold">${currentUser.fname || "Ej angivet"}</div>
              </div>

              <div class="list-group-item bg-black text-white border-secondary rounded-3 mb-2">
                <div class="small text-secondary mb-1">Efternamn</div>
                <div class="fw-semibold">${currentUser.lname || "Ej angivet"}</div>
              </div>

              <div class="list-group-item bg-black text-white border-secondary rounded-3 mb-2">
                <div class="small text-secondary mb-1">E-post</div>
                <div class="fw-semibold">${currentUser.email || "Ej angiven"}</div>
              </div>

              <div class="list-group-item bg-black text-white border-secondary rounded-3">
                <div class="small text-secondary mb-1">Användarnamn</div>
                <div class="fw-semibold">${currentUser.username || "Ej angivet"}</div>
              </div>
            </div>

            <div class="d-grid">
              <button id="backToProfileBtn" class="btn btn-outline-light">
                Tillbaka till profil
              </button>
            </div>
          </div>
        </div>
      `;

      const backToProfileBtn = document.getElementById("backToProfileBtn");

      if (backToProfileBtn) {
        backToProfileBtn.addEventListener("click", () => {
          window.location.reload();
        });
      }
    });
  }
});
