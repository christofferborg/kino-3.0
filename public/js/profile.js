window.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    window.location.href = "/login";
    return;
  }

  document.getElementById("profileFname").textContent = currentUser.fname;
  document.getElementById("profileLname").textContent = currentUser.lname;
  document.getElementById("profileEmail").textContent = currentUser.email;
  document.getElementById("profileUsername").textContent = currentUser.username;
});