// Debug and test parallax effect
function updateParallax() {
  const scrollY = window.pageYOffset;

  const parallaxElements = document.querySelectorAll(".parallax-bg");

  parallaxElements.forEach((bg, index) => {
    // Parallax calculation: background moves slower than scroll
    const parallaxSpeed = -0.3; // Negative for reverse scroll effect
    const yPos = scrollY * parallaxSpeed;
    
    bg.style.transform = `translateY(${yPos}px)`;
    
    // Debug logging for first element only
    if (index === 0 && scrollY % 50 === 0) { // Log every 50px of scroll to reduce spam
      console.log(`Scroll: ${scrollY}, Transform: ${yPos}px`);
    }
  });
}

// Throttled scroll event for better performance
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
});

// Initial setup
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded - Parallax backgrounds found:", document.querySelectorAll(".parallax-bg").length);
  
  // Add a red tint to first element to confirm we can modify it
  const testElement = document.querySelector(".parallax-bg");
  if (testElement) {
    testElement.style.backgroundColor = "rgba(255, 0, 0, 0.1)"; // Very light red overlay
  }
  
  updateParallax();
});
