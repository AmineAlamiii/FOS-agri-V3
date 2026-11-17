# FOS-Agri V3 — Project Rules

## Homepage lock

The client-approved homepage is `pages/index.html` (React: `src/features/home`). It must remain visually unchanged.

Do not change:

- Hero section
- Video
- Image slider
- Agenda section
- Maps section
- Animations
- Homepage layout
- Homepage content
- Homepage visual design

Allowed homepage changes:

allow editing the existing “Chiffres clés / Une fondation dynamique et engagée et
- Safe header/menu link fixes only
- Safe submenu connection fixes only

## Technical rules

- The site is built with React + Vite (migration approved), as a static multi-page site.
- Keep GitHub Pages compatibility.
- Do not add a database.
- Do not add a backend.
- Do not add Hostinger backend dependency.
- Do not add Next.js, Laravel, PHP, WordPress, or new package dependencies without approval.
- The original CSS files in `src/styles/` are the visual reference: keep their load order
  (see `src/styles/pages/`).

## Commit rules

- Make small, focused commits.
- Do not make large rewrites.
- Do not remove existing working assets.
- Summarize exactly which files changed.

## Migration rule

The React migration keeps every page pixel-identical to the former static site
(checked with `scripts/migration/compare-legacy.mjs`). Any later migration (e.g. Next.js)
must also migrate the approved homepage carefully without redesigning it.
Exception: The existing “Chiffres clés / Une fondation dynamique et engagée / Témoignage” section may be edited. All other homepage content and design remain protected.