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
  let scrollCooldown = false;
  let lastScrollTime = 0;
  const SCROLL_COOLDOWN_TIME = 1200; // Increased cooldown to 1.2 seconds between section changes
  const SCROLL_THRESHOLD = 75; // Increased threshold to 75px to reduce sensitivity
  const TOUCH_THRESHOLD = 120; // Separate, higher threshold for touch gestures

  // Initialize - show first section
  updateSections();
  
  // Add parallax scroll effect for content elements
  let parallaxLastScrollTime = 0;
  function handleContentParallax() {
    const now = Date.now();
    if (now - parallaxLastScrollTime < 16) return; // Throttle to ~60fps
    parallaxLastScrollTime = now;

    const activeSection = heroSections[currentSection];
    if (!activeSection) return;

    // Apply subtle parallax to gallery and contact containers
    if (activeSection.querySelector('.gallery-showcase-container')) {
      const container = activeSection.querySelector('.gallery-showcase-container');
      const parallaxOffset = Math.sin(now * 0.0005) * 2; // Slower, subtle movement
      container.style.transform = `translateY(${parallaxOffset}px)`;
    }

    if (activeSection.querySelector('.contact-form-container')) {
      const container = activeSection.querySelector('.contact-form-container.desktop-contact');
      if (container) {
        const parallaxOffset = Math.sin(now * 0.0005) * 2; // Slower, subtle movement
        container.style.transform = `translateY(${parallaxOffset}px)`;
      }
      // Mobile contact form gets same parallax but only if visible
      const mobileContainer = activeSection.querySelector('.contact-form-container.mobile-contact');
      if (mobileContainer && window.innerWidth <= 768) {
        const parallaxOffset = Math.sin(now * 0.0005) * 2; // Same parallax as desktop
        mobileContainer.style.transform = `translateY(${parallaxOffset}px)`;
      }
    }

    if (activeSection.querySelector('.cv-showcase-container')) {
      const container = activeSection.querySelector('.cv-showcase-container');
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

  // Handle wheel events (desktop) with improved sensitivity control
  let wheelDelta = 0;
  let wheelCooldownActive = false;
  
  // Add debounced wheel reset to prevent accumulation during cooldown
  let wheelResetTimeout;
  
  document.addEventListener('wheel', (e) => {
    // Check if wheel event is happening within a form element
    const target = e.target;
    if (target.closest('form') || target.closest('.contact-form-container')) {
      return; // Allow normal scrolling within forms
    }
    
    if (isScrolling || scrollCooldown || wheelCooldownActive) {
      e.preventDefault();
      return;
    }
    
    e.preventDefault();
    
    // Clear any existing reset timeout
    clearTimeout(wheelResetTimeout);
    
    // Accumulate wheel delta to reduce sensitivity
    wheelDelta += e.deltaY;
    
    // Reset wheel delta after a brief period of no scrolling
    wheelResetTimeout = setTimeout(() => {
      wheelDelta = 0;
    }, 150);
    
    // Only trigger section change when threshold is reached
    if (Math.abs(wheelDelta) >= SCROLL_THRESHOLD) {
      const now = Date.now();
      
      // Check if enough time has passed since last scroll
      if (now - lastScrollTime < SCROLL_COOLDOWN_TIME) {
        wheelDelta = 0; // Reset delta but don't scroll
        return;
      }
      
      lastScrollTime = now;
      scrollCooldown = true;
      wheelCooldownActive = true;
      
      if (wheelDelta > 0) {
        // Scrolling down - next section
        nextSection();
      } else {
        // Scrolling up - previous section
        prevSection();
      }
      
      wheelDelta = 0; // Reset delta after triggering
      clearTimeout(wheelResetTimeout);
      
      // Reset cooldown after animation completes
      setTimeout(() => {
        scrollCooldown = false;
      }, SCROLL_COOLDOWN_TIME);
      
      // Additional wheel-specific cooldown
      setTimeout(() => {
        wheelCooldownActive = false;
      }, 300); // Shorter cooldown specifically for wheel accumulation
    }
  }, { passive: false });

  // Handle touch events (mobile) with improved sensitivity control
  let touchStartTime = 0;
  
  document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (isScrolling || scrollCooldown) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;
    const touchDuration = Date.now() - touchStartTime;
    const now = Date.now();
    
    // Check if touch was within mobile contact form - if so, don't trigger section change
    const mobileContactForm = document.querySelector('.contact-form-container.mobile-contact');
    if (mobileContactForm && window.innerWidth <= 768) {
      const rect = mobileContactForm.getBoundingClientRect();
      const touchX = e.changedTouches[0].clientX;
      const touchY = e.changedTouches[0].clientY;
      
      if (touchX >= rect.left && touchX <= rect.right && 
          touchY >= rect.top && touchY <= rect.bottom) {
        return; // Don't trigger section change if touch is within mobile contact form
      }
    }
    
    // Use higher threshold for touch gestures and check duration
    if (Math.abs(deltaY) < TOUCH_THRESHOLD || touchDuration > 500) return; // Max 500ms for swipe
    
    // Check if enough time has passed since last scroll
    if (now - lastScrollTime < SCROLL_COOLDOWN_TIME) return;
    
    lastScrollTime = now;
    scrollCooldown = true;
    
    if (deltaY > 0) {
      // Swiping up - next section
      nextSection();
    } else {
      // Swiping down - previous section
      prevSection();
    }
    // Reset cooldown after animation completes
    setTimeout(() => {
      scrollCooldown = false;
    }, SCROLL_COOLDOWN_TIME);
  }, { passive: true });

  // Handle keyboard navigation with cooldown
  document.addEventListener('keydown', (e) => {
    if (isScrolling || scrollCooldown) return;
    
    const now = Date.now();
    
    // Check if enough time has passed since last scroll
    if (now - lastScrollTime < SCROLL_COOLDOWN_TIME) return;
    
    if (e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      lastScrollTime = now;
      scrollCooldown = true;
      nextSection();
      setTimeout(() => {
        scrollCooldown = false;
      }, SCROLL_COOLDOWN_TIME);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      lastScrollTime = now;
      scrollCooldown = true;
      prevSection();
      setTimeout(() => {
        scrollCooldown = false;
      }, SCROLL_COOLDOWN_TIME);
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
      const contactContainerDesktop = section.querySelector('.contact-form-container.desktop-contact');
      const contactContainerMobile = section.querySelector('.contact-form-container.mobile-contact');
      const aboutContainer = section.querySelector('.about-bio-container');
      const cvContainer = section.querySelector('.cv-showcase-container');
      const heroTitle = section.querySelector('h1');
      const letters = section.querySelectorAll('.letter');
      
      if (galleryContainer) {
        galleryContainer.classList.remove('animate');
        galleryContainer.style.animation = 'none';
        galleryContainer.style.transform = 'translateY(100%)';
        galleryContainer.style.opacity = '0';
        // Force reflow to reset animation
        galleryContainer.offsetHeight;
      }
      if (contactContainerDesktop) {
        contactContainerDesktop.classList.remove('animate');
        contactContainerDesktop.style.animation = 'none';
        contactContainerDesktop.style.transform = 'translateX(-100%)';
        contactContainerDesktop.style.opacity = '0';
        // Force reflow to reset animation
        contactContainerDesktop.offsetHeight;
      }
      // Mobile contact form doesn't need animation reset as it's always visible when shown
      if (aboutContainer) {
        aboutContainer.classList.remove('animate');
        aboutContainer.style.animation = 'none';
        aboutContainer.style.transform = 'translateX(-100%)';
        aboutContainer.style.opacity = '0';
        // Force reflow to reset animation
        aboutContainer.offsetHeight;
      }
      if (cvContainer) {
        cvContainer.classList.remove('animate');
        cvContainer.style.animation = 'none';
        cvContainer.style.transform = 'translateY(100%)';
        cvContainer.style.opacity = '0';
        // Force reflow to reset animation
        cvContainer.offsetHeight;
      }
      if (heroTitle && letters.length === 0) {
        heroTitle.style.animation = 'none';
        heroTitle.style.transform = 'translateY(100%)';
        heroTitle.style.opacity = '0';
        // Force reflow to reset animation
        heroTitle.offsetHeight;
      }
      // Reset letter animations
      letters.forEach((letter) => {
        letter.style.animation = 'none';
        letter.style.transform = 'translateY(100px)';
        letter.style.opacity = '0';
        // Force reflow to reset animation
        letter.offsetHeight;
      });
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
      const contactContainerDesktop = currentHeroSection.querySelector('.contact-form-container.desktop-contact');
      const contactContainerMobile = currentHeroSection.querySelector('.contact-form-container.mobile-contact');
      const aboutContainer = currentHeroSection.querySelector('.about-bio-container');
      const cvContainer = currentHeroSection.querySelector('.cv-showcase-container');
      const heroTitle = currentHeroSection.querySelector('h1');
      const letters = currentHeroSection.querySelectorAll('.letter');
      
      // Start animations immediately and simultaneously
      if (galleryContainer) {
        galleryContainer.style.animation = '';
        galleryContainer.classList.add('animate');
      }
      if (contactContainerDesktop) {
        contactContainerDesktop.style.animation = '';
        contactContainerDesktop.classList.add('animate');
      }
      // Mobile contact form doesn't need animation trigger as it's styled to be always visible when shown
      if (aboutContainer) {
        aboutContainer.style.animation = '';
        aboutContainer.classList.add('animate');
      }
      if (cvContainer) {
        cvContainer.style.animation = '';
        cvContainer.classList.add('animate');
      }
      if (heroTitle && letters.length === 0) {
        heroTitle.style.animation = '';
      }
      // Start letter animations - let CSS handle the delays
      letters.forEach((letter) => {
        letter.style.animation = '';
        // Let CSS handle the animation and delays
      });
    }

    // Reset scrolling flag after transition (longer to match transition duration)
    setTimeout(() => {
      isScrolling = false;
    }, 900);
  }

  // Apply static scale to rotating elements
  const rotatingElements = document.querySelectorAll('.rotating');
  rotatingElements.forEach((element) => {
    element.style.transform = 'scale(1.05)';
    element.style.transformOrigin = 'center center';
  });
});
