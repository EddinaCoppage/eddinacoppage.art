/*
    Global JavaScript for Eddina Coppage's Portfolio Website
    This file will contain scripts that are used across the entire site,
    such as the mobile navigation toggle.
*/

// Wait for the DOM to be fully loaded before running scripts.
document.addEventListener('DOMContentLoaded', () => {

    // Get the hamburger menu icon and the navigation links.
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Add a click event listener to the hamburger menu.
    hamburger.addEventListener('click', () => {
        // Toggle the 'active' class on the navLinks element.
        // This will show or hide the navigation links on mobile.
        navLinks.classList.toggle('active');
    });

    // --- Homepage Hero Image Rotation ---
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const images = [
            'https://placehold.co/1920x1080/3b3b3b/ffffff?text=Image+1',
            'https://placehold.co/1920x1080/bbbbbb/000000?text=Image+2',
            'https://placehold.co/1920x1080/ffffff/000000?text=Image+3'
        ];
        let currentImageIndex = 0;

        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            heroImage.style.opacity = 0;
            setTimeout(() => {
                heroImage.style.backgroundImage = `url('${images[currentImageIndex]}')`;
                heroImage.style.opacity = 1;
            }, 1000); // This should match the transition duration in the CSS
        }, 5000); // Change image every 5 seconds
    }
});
