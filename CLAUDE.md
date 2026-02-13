# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for **Titan Cleaning Service**, a cleaning business in Victoria, Vancouver Island, BC. Owner: **Joanne Michaels**. Hosted on GitHub Pages at **titancleaningservice.ca**. Converted from a WordPress site (Astra theme) into a clean, maintainable static site.

## Tech Stack

- Plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step, no CMS
- Mobile-first responsive design
- GitHub Pages hosting with custom domain (CNAME file)

## Target Project Structure

```
/index.html              # Home page
/css/styles.css          # All styles
/js/main.js              # All scripts
/images/                 # Optimized site assets
/pages/                  # Additional pages (about, services, contact, etc.)
/CNAME                   # Custom domain: titancleaningservice.ca
```

## Development

No build tools. To preview locally, serve the root directory with any static server:

```powershell
# Python
python -m http.server 8000

# Node (npx)
npx serve .

# VS Code Live Server extension also works
```

Then open `http://localhost:8000`.

## WordPress Reference Material

The `wp-content/` directory contains the original WordPress export (Astra theme, plugins, uploaded images). The `__qs/` directory contains Simply Static query-string page variants. These are **reference only** — not part of the final static site.

- **Images to reuse**: `wp-content/uploads/` — contains all original photos (before/after cleaning shots, hero images, logos, icons). Use the base-resolution files, not the WordPress-generated thumbnails (`*-150x150.*`, `*-768x512.*`, etc.).
- **Theme reference**: `wp-content/themes/astra/` — original theme for design reference
- The root `index.html` is a WP Staging login page from the export, not the actual site content.

## Key Conventions

- **SEO**: Every page needs proper `<title>`, `<meta description>`, Open Graph tags, and semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- **Performance**: Lazy-load images below the fold (`loading="lazy"`), use modern image formats (WebP) where available, minimize HTTP requests
- **Maintainability**: Content (business name, phone number, address, service descriptions) should be easy to find and edit directly in the HTML — no templating abstractions
- **Responsive**: Mobile-first CSS with `min-width` breakpoints. Must work well on phones, tablets, and desktop
- **Accessibility**: Use alt text on all images, ensure sufficient color contrast, keyboard-navigable interactive elements
