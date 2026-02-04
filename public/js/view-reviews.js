 //button to go back to previous page (movie info)
  const backBbtn = document.querySelector(".backBtn");

 if (backBtn) {
  backBtn.addEventListener("click", () => {
    history.back(); 
  });
}


