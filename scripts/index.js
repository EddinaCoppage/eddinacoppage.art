/* index.js
 * JavaScript for sliding hero sections with scroll-triggered transitions
 * Each section slides up to replace the previous one on scroll
 */

document.addEventListener("DOMContentLoaded", () => {
  const heroSections = document.querySelectorAll('.hero-section');
  const heroContainer = document.querySelector('.hero-container');
  let currentSection = 0;
  let isScrolling = false;
  let touchStartY = 0;

  // Initialize - show first section
  updateSections();
  
  // Add parallax scroll effect for content elements
  let lastScrollTime = 0;
  function handleContentParallax() {
    const now = Date.now();
    if (now - lastScrollTime < 16) return; // Throttle to ~60fps
    lastScrollTime = now;

    const activeSection = heroSections[currentSection];
    if (!activeSection) return;

    // Apply subtle parallax to gallery and contact containers
    if (activeSection.querySelector('.gallery-showcase-container')) {
      const container = activeSection.querySelector('.gallery-showcase-container');
      const parallaxOffset = Math.sin(now * 0.0005) * 2; // Slower, subtle movement
      container.style.transform = `translateY(${parallaxOffset}px)`;
    }

    if (activeSection.querySelector('.contact-form-container')) {
      const container = activeSection.querySelector('.contact-form-container');
      const parallaxOffset = Math.sin(now * 0.0005) * 2; // Slower, subtle movement
      container.style.transform = `translateY(${parallaxOffset}px)`;
    }

    // Apply subtle parallax to main title
    if (currentSection === 0) {
      const title = activeSection.querySelector('h1');
      const parallaxOffset = Math.sin(now * 0.0003) * 3; // Even slower for title
      if (title) title.style.transform = `translateY(${parallaxOffset}px)`;
    }
  }

  // Start parallax animation loop
  function animateParallax() {
    handleContentParallax();
    requestAnimationFrame(animateParallax);
  }
  animateParallax();

  // Handle wheel events (desktop)
  document.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
    e.preventDefault();
    
    if (e.deltaY > 0) {
      // Scrolling down - next section
      nextSection();
    } else {
      // Scrolling up - previous section
      prevSection();
    }
  }, { passive: false });

  // Handle touch events (mobile)
  document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (isScrolling) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;
    
    // Minimum swipe distance
    if (Math.abs(deltaY) < 50) return;
    
    if (deltaY > 0) {
      // Swiping up - next section
      nextSection();
    } else {
      // Swiping down - previous section
      prevSection();
    }
  }, { passive: true });

  // Handle keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (isScrolling) return;
    
    if (e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      nextSection();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      prevSection();
    }
  });

  // Handle contact anchor navigation from other pages
  function handleContactAnchor() {
    if (window.location.hash === '#contact') {
      // Navigate to the contact section (last section)
      currentSection = heroSections.length - 1;
      updateSections();
    }
  }

  // Check for contact anchor on page load
  handleContactAnchor();

  // Handle hash changes (for navigation from other pages)
  window.addEventListener('hashchange', handleContactAnchor);

  function nextSection() {
    if (currentSection < heroSections.length - 1) {
      currentSection++;
      updateSections();
    }
  }

  function prevSection() {
    if (currentSection > 0) {
      currentSection--;
      updateSections();
    }
  }

  function updateSections() {
    isScrolling = true;
    
    // Reset all animations first and hide elements
    heroSections.forEach((section) => {
      const galleryContainer = section.querySelector('.gallery-showcase-container');
      const contactContainer = section.querySelector('.contact-form-container');
      const heroTitle = section.querySelector('h1');
      
      if (galleryContainer) {
        galleryContainer.classList.remove('animate');
        galleryContainer.style.animation = 'none';
        galleryContainer.style.transform = 'translateY(100%)';
        galleryContainer.style.opacity = '0';
        // Force reflow to reset animation
        galleryContainer.offsetHeight;
      }
      if (contactContainer) {
        contactContainer.classList.remove('animate');
        contactContainer.style.animation = 'none';
        contactContainer.style.transform = 'translateY(100%)';
        contactContainer.style.opacity = '0';
        // Force reflow to reset animation
        contactContainer.offsetHeight;
      }
      if (heroTitle) {
        heroTitle.style.animation = 'none';
        heroTitle.style.transform = 'translateY(100%)';
        heroTitle.style.opacity = '0';
        // Force reflow to reset animation
        heroTitle.offsetHeight;
      }
    });
    
    heroSections.forEach((section, index) => {
      section.classList.remove('active');
      
      if (index <= currentSection) {
        // Current and previous sections are in position (visible or covered)
        section.classList.add('active');
      } else {
        // Future sections stay below viewport
        section.classList.remove('active');
      }
    });

    // Trigger slide animations for current section immediately (no delay)
    const currentHeroSection = heroSections[currentSection];
    if (currentHeroSection) {
      const galleryContainer = currentHeroSection.querySelector('.gallery-showcase-container');
      const contactContainer = currentHeroSection.querySelector('.contact-form-container');
      const heroTitle = currentHeroSection.querySelector('h1');
      
      // Start animations immediately and simultaneously
      if (galleryContainer) {
        galleryContainer.style.animation = '';
        galleryContainer.classList.add('animate');
      }
      if (contactContainer) {
        contactContainer.style.animation = '';
        contactContainer.classList.add('animate');
      }
      if (heroTitle) {
        heroTitle.style.animation = '';
      }
    }

    // Reset scrolling flag after transition
    setTimeout(() => {
      isScrolling = false;
    }, 600);
  }

  // Apply static scale to rotating elements
  const rotatingElements = document.querySelectorAll('.rotating');
  rotatingElements.forEach((element) => {
    element.style.transform = 'scale(1.05)';
    element.style.transformOrigin = 'center center';
  });
});
