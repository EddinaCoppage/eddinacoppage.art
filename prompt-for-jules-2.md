Project Modification Brief

**Objective:** Modify the existing website to implement a parallax effect on the homepage with 5 featured artworks and make the navigation bar sticky on all pages.

**Homepage Changes:**
* **Remove:** The current single hero image with automatic rotation.
* **Implement:** Five distinct, full-screen sections, each featuring one of the specified images (`images/featured-1.jpg` to `images/featured-5.jpg`).
* **Parallax Effect:** Each of these five sections should have a background image that creates a parallax scrolling effect (background scrolls slower than the foreground content).
* **Content Overlay:** On each of these five parallax sections, a subtle overlay should display "Eddina Coppage". The `<h1>` tag for "Eddina Coppage" should only appear on the first parallax section.
* **Image Files:** The images `featured-1.jpg`, `featured-2.jpg`, `featured-3.jpg`, `featured-4.jpg`, and `featured-5.jpg` are located in the `images/` folder.

**Navigation Bar Changes:**
* **Sticky Navigation:** The main navigation bar (header element) should be "sticky" on *every* HTML page. This means it should remain fixed at the top of the viewport as the user scrolls down the page. Ensure it has a solid background color so content does not scroll underneath it transparently.

---

BEGIN TECHNICAL DIRECTIVES FOR JULES PROMPT
1. Execution Protocol:

Acknowledge and Plan: First, acknowledge these instructions. Then, create a detailed, step-by-step execution plan for building the entire website based on this prompt.

One-Time Approval: Present this plan to the user for a single, one-time "go/no-go" approval.

Autonomous Execution: Once you receive approval, you MUST execute the entire plan from start to finish without any further questions, check-ins, or requests for code review. Your final action should be committing the completed project. Do not stop partway through the plan to ask for feedback.

2. Prompt Archiving:

As the very first step in your execution plan, you must create the file prompt-for-jules.md in the project root.

You will then save this entire prompt (the complete text you are receiving now, including the Project Brief and all Technical Directives) into that prompt-for-jules.md file. This creates a permanent record of the instructions used for the build.

3. File Structure and Pathing:

Build the project using this exact file structure.

All internal links (href, src) MUST use relative paths (e.g., css/styles.css, not /css/styles.css) to ensure functionality on platforms like GitHub Pages.

project-root/
├─ css/
│ ├─ styles.css
│ └─ (page-specific css files, e.g., contact.css)
├─ scripts/main.js
├─ images/ (for site assets like logos)
├─ icons/
├─ collections/
│ ├─ index.html
│ └─ <collection-name>/
│ ├─ index.html
│ └─ <work-name>/
│ ├─ index.html
│ ├─ models/
│ └─ images/
├─ 404.html
├─ index.html
├─ .gitignore
├─ robots.txt
├─ site-structure.md
└─ prompt-for-jules.md <-- You will create this file.

4. CSS Generation Rules:

ABSOLUTE PROHIBITION: You are forbidden from using inline style attributes or internal <style> tags in any HTML file.

Global Stylesheet: All global styles (for body, fonts, colors, navigation, footer) MUST go into css/styles.css.

Page-Specific Stylesheets: For every HTML page you create (e.g., bio.html), you MUST also create a corresponding CSS file (e.g., css/bio.css) for its unique styles.

Linking Order: Every HTML page must link to css/styles.css FIRST, and then to its own page-specific stylesheet second.

5. Code Commenting Mandate:

You must provide exhaustive, line-by-line pedagogical comments in all generated files. Explain the "why" behind each choice.

Example of Required Detail:

/* This rule targets the main site navigation (<nav> element). */
nav {
/* Turns the nav into a flex container to easily align its children. */
display: flex;
/* Pushes the logo and links to opposite ends of the container. */
justify-content: space-between;
/* Vertically centers the items within the navigation bar. */
align-items: center;
}

6. General Standards:

HTML: Use semantic tags (<header>, <nav>, <main>, <footer>) and a logical heading order. All <img> tags must have meaningful alt attributes.

Meta Tags: In the <head> of every page, include: <title>, meta description, keywords, author, Open Graph tags, Twitter Card tags, and favicon links.

Accessibility & Performance: Ensure high color contrast, keyboard navigability, lazy-loading for images, and deferred JavaScript.

Placeholders: Use descriptive placeholder text and and correctly-sized placeholder images (placehold.co) where final content is not yet available.

END TECHNICAL DIRECTIVES FOR JULES PROMPT
