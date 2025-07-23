window.addEventListener("scroll", () => {
  const windowHeight = window.innerHeight;

  document.querySelectorAll(".hero-section").forEach((section, index) => {
    const bg = section.querySelector(".parallax-bg");
    if (!bg) return;

    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height;

    // Only apply parallax if section is in viewport
    if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
      const scrollPercent = (windowHeight - sectionTop) / (windowHeight + sectionHeight);
      const shift = (scrollPercent - 0.5) * 60; // adjust intensity (try 30–100)

      bg.style.transform = `translateY(${shift}px)`;
    }
  });
});
