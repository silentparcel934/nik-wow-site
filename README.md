# Nik Single-Page Site

Minimal, modern, single-page site for a Linktree-style hub. Dark by default, responsive, and accessible.

## Edit links

Open `index.html` and replace the placeholder `href` values:

- Primary links live in the `#links` section (`.link-card` entries).
- Social links live in the hero card (`.hero-social` entries).

Update the visible text (`Portfolio`, `Writing`, etc.) to match each destination.

## Replace project images

Project tiles are in the `#projects` section and reference SVG placeholders in `assets/`:

- Replace `assets/project-01.svg` through `assets/project-06.svg` with your own images.
- Keep filenames the same to avoid editing HTML, or update the `img src` paths in `index.html`.
- Recommended size: 4:3 aspect ratio (e.g., 1200×900) for consistent tiles.

## Customize copy and meta

- Change the hero text and bio placeholders directly in `index.html`.
- Update the Open Graph image by replacing `assets/og-placeholder.svg`.
- Replace `assets/favicon.svg` if you want a custom favicon.

## Local preview

Open `index.html` in a browser or use any static server.
