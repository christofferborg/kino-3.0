window.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");

  if (
    !loginForm ||
    !loginMessage ||
    !usernameInput ||
    !passwordInput ||
    !usernameError ||
    !passwordError
  ) return;

  const togglePassword = document.getElementById("togglePassword");
  const eyeIcon = document.getElementById("eyeIcon");

  togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.getAttribute("type") === "password";

  passwordInput.setAttribute("type", isPassword ? "text" : "password");

  eyeIcon.src = isPassword ? "./img/hide.png" : "./img/view.png";
});

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    usernameError.classList.add("hidden");
    passwordError.classList.add("hidden");

    usernameInput.classList.remove("border-[#FA453E]");
    passwordInput.classList.remove("border-[#FA453E]");

    loginMessage.textContent = "";

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    let hasError = false;

    if (username === "") {
      usernameError.classList.remove("hidden");
      usernameInput.classList.add("border-[#FA453E]");
      hasError = true;
    }

    if (password === "") {
      passwordError.classList.remove("hidden");
      passwordInput.classList.add("border-[#FA453E]");
      hasError = true;
    }

    if (hasError) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];

        const matchedUser = users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (!matchedUser) {
      usernameError.textContent = "Användarnamnet finns ej.";
      usernameError.classList.remove("hidden");
      usernameInput.classList.add("border-[#FA453E]");
      return;
    }

    if (matchedUser.password !== password) {
      passwordError.textContent = "Lösenordet stämmer ej.";
      passwordError.classList.remove("hidden");
      passwordInput.classList.add("border-[#FA453E]");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(matchedUser));

    setTimeout(() => {
      window.location.href = "/profile";
    }, 800);
    });
});