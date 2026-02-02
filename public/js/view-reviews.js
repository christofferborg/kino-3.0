 const btn = document.querySelector(".reviewBtn._view");

  btn.addEventListener("click", () => {
    const id = btn.dataset.id;
    window.location.href = `/richards-filmer/${id}/view-reviews`;
     });