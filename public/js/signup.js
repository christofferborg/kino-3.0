const passwordText = document.querySelector(".password");
const userName = document.querySelector("#username");
const lengthWarning = document.querySelector(".lengthWarning");
const nrWarning = document.querySelector(".nrWarning");
const specialWarning = document.querySelector(".specialWarning");
passwordText.addEventListener("input", () => {
  lengthWarning.classList.toggle("isValid", passwordText.value.length >= 8);
  nrWarning.classList.toggle("isValid", /\d/.test(passwordText.value));
  specialWarning.classList.toggle(
    "isValid",
    /[!@#$%^&*]/.test(passwordText.value),
  );

  let currentScore = document.querySelectorAll(".isValid").length;
  const meter = document.querySelector(".strength-meter");
  meter.dataset.score = currentScore;
  passwordText.dataset.score = currentScore;
});

const togglePassword = document.querySelector("#togglePassword");
const eyeIcon = document.querySelector("#eyeIcon");

togglePassword.addEventListener("click", () => {
  // 1. Kolla nuvarande typ
  const isPassword = passwordText.getAttribute("type") === "password";

  // 2. Toggla typen
  passwordText.setAttribute("type", isPassword ? "text" : "password");

  // 3. Byt bildkälla
  eyeIcon.src = isPassword ? "./img/hide.png" : "./img/view.png";
});

 const signupForm = document.querySelector("form");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailWarning = document.querySelector(".emailWarning");
  const usernameWarning = document.querySelector(".userNameWarning");
  const emailInput = document.querySelector("#email");

  emailWarning.classList.add("hidden");
  usernameWarning.classList.add("hidden");
  emailInput.classList.remove("border-[#FA453E]");

  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const newUser = {
    fname,
    lname,
    email,
    username,
    password,
  };

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const usernameTaken = users.some(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );

  const emailTaken = users.some(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (usernameTaken) {
    usernameWarning.textContent = "Användarnamnet är upptaget.";
    usernameWarning.classList.remove("hidden");
    return;
  }

  if (emailTaken) {
    emailWarning.textContent = "E-postadressen används redan.";
    emailWarning.classList.remove("hidden");
    emailInput.classList.add("border-[#FA453E]");
    return;
  }

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

    window.location.href = "/login"
  });