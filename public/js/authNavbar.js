window.addEventListener("DOMContentLoaded", () => {
  const desktopLink = document.getElementById("authLinkDesktop");
  const mobileLink = document.getElementById("authLinkMobile");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) return;

  if (desktopLink) {
    desktopLink.textContent = "Min profil";
    desktopLink.href = "/profile";
  }

  if (mobileLink) {
    mobileLink.href = "/profile";

    const textNode = Array.from(mobileLink.childNodes).find(
      (node) =>
        node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "",
    );

    if (textNode) {
      textNode.textContent = " Min profil";
    } else {
      mobileLink.append(" Min profil");
    }
  }
});
