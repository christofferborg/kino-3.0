 
 //button to access the view reviews page
 const viewBtn = document.querySelector(".reviewBtn._view");

  viewBtn.addEventListener("click", () => {
    const id = viewBtn.dataset.id;
    window.location.href = `/richards-filmer/${id}/view-reviews`;
     });


 //button to go back to previous page (movie info)
  const backBbtn = document.querySelector(".backBtn");

 if (backBtn) {
  backBtn.addEventListener("click", () => {
    history.back(); 
  });
}
    