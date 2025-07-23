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
});
