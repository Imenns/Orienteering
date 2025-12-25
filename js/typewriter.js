document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     KONFIGURASI TEKS
  =============================== */

  const words = [
    "ORIENTEERING",
    "NAVIGASI",
    "STRATEGI",
    "KETAHANAN"
  ];

  const typingSpeed = 120;       // kecepatan mengetik
  const deletingSpeed = 70;      // kecepatan menghapus
  const pauseAfterType = 1800;   // jeda setelah selesai mengetik
  const pauseAfterDelete = 800;  // jeda sebelum ganti kata


  /* ===============================
     STATE
  =============================== */

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;


  /* ===============================
     TARGET ELEMENT
  =============================== */

  const target = document.getElementById("typewriter");
  if (!target) return;


  /* ===============================
     AUDIO SETUP (SFX 1 DETIK)
  =============================== */

  const typeSound = new Audio("assets/sounds/type.mp3");
  typeSound.volume = 0.07;

  let audioEnabled = false;
  let isSoundPlaying = false;

  // Aktifkan audio setelah interaksi user
  const enableAudio = () => {
    audioEnabled = true;
    window.removeEventListener("click", enableAudio);
    window.removeEventListener("scroll", enableAudio);
  };

  window.addEventListener("click", enableAudio);
  window.addEventListener("scroll", enableAudio);

  // Mainkan hanya POTONGAN suara (±120ms)
  function playTypeSound() {
    if (!audioEnabled || isSoundPlaying) return;

    isSoundPlaying = true;
    typeSound.currentTime = 0;
    typeSound.play().catch(() => {});

    setTimeout(() => {
      typeSound.pause();
      isSoundPlaying = false;
    }, 120); // durasi suara yang terdengar
  }


  /* ===============================
     TYPEWRITER LOOP
  =============================== */

  function typeLoop() {
    if (isPaused) return;

    const currentWord = words[wordIndex];

    if (!isDeleting) {
      // MENGETIK
      target.textContent = currentWord.slice(0, charIndex++);
      
      // Bunyi tiap 2 huruf
      if (charIndex % 2 === 0) playTypeSound();

      if (charIndex > currentWord.length) {
        isPaused = true;
        setTimeout(() => {
          isDeleting = true;
          isPaused = false;
          typeLoop();
        }, pauseAfterType);
        return;
      }

    } else {
      // MENGHAPUS
      target.textContent = currentWord.slice(0, charIndex--);

      // Bunyi lebih jarang saat hapus
      if (charIndex % 3 === 0) playTypeSound();

      if (charIndex < 0) {
        isPaused = true;
        setTimeout(() => {
          isDeleting = false;
          charIndex = 0;
          wordIndex = (wordIndex + 1) % words.length;
          isPaused = false;
          typeLoop();
        }, pauseAfterDelete);
        return;
      }
    }

    setTimeout(
      typeLoop,
      isDeleting ? deletingSpeed : typingSpeed
    );
  }

  // Mulai animasi
  typeLoop();

});
