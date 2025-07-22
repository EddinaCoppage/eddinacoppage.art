# Site Structure

This document outlines the file structure for the Eddina Coppage art portfolio website.

## Root Directory

*   `index.html`: The homepage of the website.
*   `bio.html`: The artist's biography page.
*   `cv.html`: The artist's curriculum vitae.
*   `contact.html`: The contact page with a form.
*   `404.html`: The 404 error page.
*   `.gitignore`: Specifies files to be ignored by Git.
*   `robots.txt`: Provides instructions for web crawlers.
*   `prompt-for-jules.md`: The master prompt for the website build.
*   `site-structure.md`: This file.

## Directories

*   `css/`: Contains all CSS files.
    *   `styles.css`: Global styles for the entire website.
    *   `(page-specific).css`: Styles for individual pages.
*   `scripts/`: Contains JavaScript files.
    *   `main.js`: Global JavaScript for the website.
*   `images/`: Contains site assets like logos and social sharing images.
*   `icons/`: Contains favicons and other icons.
*   `collections/`: Contains the gallery pages.
    *   `index.html`: The main gallery page.
    *   `<collection-name>/`: A directory for each collection.
        *   `index.html`: The landing page for the collection.
        *   `<work-name>/`: A directory for each individual work.
            *   `index.html`: The page for the individual work.
            *   `models/`: Contains 3D models for the work.
            *   `images/`: Contains images of the work.
