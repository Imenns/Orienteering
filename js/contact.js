const form = document.querySelector(".contact-form");
const statusText = document.querySelector(".form-status");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  statusText.textContent = "Pesan sedang dikirim...";
  
  setTimeout(() => {
    statusText.textContent = "Pesan berhasil dikirim. Terima kasih!";
    form.reset();
  }, 1200);
});
