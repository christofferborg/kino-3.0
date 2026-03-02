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
