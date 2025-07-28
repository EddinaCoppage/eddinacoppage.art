/*
    Global JavaScript for Eddina Coppage's Portfolio Website
    This file will contain scripts that are used across the entire site,
    such as the mobile navigation toggle and the new parallax effect.
*/

// Wait for the DOM to be fully loaded before running scripts.
document.addEventListener('DOMContentLoaded', () => {

    // Get the hamburger menu icon and the navigation links.
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    // Add a click event listener to the hamburger menu.
    hamburger.addEventListener('click', () => {
        // Toggle the 'active' class on the navLinks element.
        // This will show or hide the navigation links on mobile.
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Scroll effects for header
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class when scrolled down
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    }

    // Throttled scroll listener for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial scroll check
    handleScroll();
});