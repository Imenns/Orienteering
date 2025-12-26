// Seleksi semua timeline item & horizontal reveal
const timelineItems = document.querySelectorAll(".timeline-item, .reveal-left, .reveal-right");

function revealTimeline() {
  const windowHeight = window.innerHeight;
  const revealPoint = 150; // jarak sebelum muncul

  timelineItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < windowHeight - revealPoint) {
      item.classList.add("active");
    }
  });
}

// Jalankan saat scroll dan saat halaman load
window.addEventListener("scroll", revealTimeline);
window.addEventListener("load", revealTimeline);
