import "./login.js";

const passwordText = document.querySelector(".password");
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
  const isPassword = passwordText.getAttribute("type") === "password";

  passwordText.setAttribute("type", isPassword ? "text" : "password");

  eyeIcon.src = isPassword ? "./img/hide.png" : "./img/view.png";
});

const usernameInput = document.querySelector(".username");
const warningMessage = document.querySelector(".userNameWarning");

usernameInput.addEventListener("input", () => {
  const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");
  const isDuplicate = allUsers.some(
    (u) => u.username.toLowerCase() === usernameInput.value.toLowerCase(),
  );
  if (isDuplicate && usernameInput.value !== "") {
    usernameInput.setCustomValidity("Invalid");
  } else {
    usernameInput.setCustomValidity("");
  }
});

for (let i = 0; i < localStorage.length; i++) {
  console.log(localStorage.getItem("allUsers"));
}

const signupForm = document.querySelector("#signupForm");

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!signupForm.checkValidity()) {
    signupForm.reportValidity();
    return;
  }
  const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");
  const formData = new FormData(signupForm);
  const newUser = Object.fromEntries(formData.entries());
  allUsers.push(newUser);
  localStorage.setItem("allUsers", JSON.stringify(allUsers));
  console.log("Användare sparad!", newUser);
  window.location.href = "./login";
});