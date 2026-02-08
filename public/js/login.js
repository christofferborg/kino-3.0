window.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const loginPopup = document.getElementById("loginPopup");
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");
  const closeLogin = document.getElementById("closeLogin");

  if (!loginBtn || !loginPopup || !loginForm || !loginMessage || !closeLogin) return;

  // Öppna popup
  loginBtn.addEventListener("click", () => {
    loginPopup.style.display = "flex";
  });

  // Stäng popup
  closeLogin.addEventListener("click", () => {
    loginPopup.style.display = "none";
  });

  // Klick utanför popup stänger den
  window.addEventListener("click", (e) => {
    if (e.target === loginPopup) loginPopup.style.display = "none";
  });

  // Form submit
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginMessage.textContent = "Loggar in...";
    loginMessage.style.color = "black";

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        loginMessage.textContent = data.error || "Fel vid inloggning";
        loginMessage.style.color = "red";
        return;
      }

      localStorage.setItem("token", data.token);
      loginMessage.textContent = "Inloggad! 🎉";
      loginMessage.style.color = "green";

      setTimeout(() => {
        loginPopup.style.display = "none";
      }, 800);

    } catch (err) {
      loginMessage.textContent = "Serverfel";
      loginMessage.style.color = "red";
      console.error(err);
    }
  });
});

