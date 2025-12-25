// nav.js
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = document.body.dataset.page;
  const navLinks = document.querySelectorAll(".main-nav a");

  navLinks.forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    }
  });
});
