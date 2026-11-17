# FOS-Agri V3 — Architecture

## Current architecture

React + Vite multi-page site (one HTML entry per URL, same URLs as the former static site).
See README.md for the folder layout.

```text
pages/            HTML entries (index.html, contact.html, services/…, la-fondation/…)
public/assets/    media (images, PDF, video) served as-is
src/features/     one folder per site area (home, fondation, adhesion, prestations, …)
src/components/   shared layout (header, menu, footer, search, floating button)
src/i18n/         current language + shared translations (FR / AR / ZGH)
src/styles/       original CSS, unchanged; src/styles/pages/ keeps the original load order
```

## Approved homepage

`src/features/home` is client-approved and must stay visually locked. It keeps its own
header/footer markup (the former index.html + home-nav-fix.js behaviour).

## Shared behaviour

- `src/components/layout/`: secondary-page header, menu, footer, search, floating social button
- `src/hooks/`: scroll header, scroll reveal, motion animations, anchor scroll on load
- `src/lib/jsx/`: project JSX runtime — isolates numbers in Arabic like the former site
- `scripts/migration/compare-legacy.mjs`: DOM + screenshot comparison with the former site

## Future Next.js migration plan

Next.js may be used after client approval for Phase 2. The approved homepage must be migrated carefully and visually preserved.

Potential future structure:

```text
/app
  /page.tsx
  /fondation/page.tsx
  /adhesion/page.tsx
  /prestations/page.tsx
  /actualites/page.tsx
  /agenda-solidaire/page.tsx
  /mediatheque/page.tsx
  /contact/page.tsx
/components
  Header.tsx
  Footer.tsx
  LanguageSwitcher.tsx
  ServiceCard.tsx
/data
  navigation.ts
  services.ts
  news.ts
  agenda.ts
  contact.ts
/styles
  globals.css
```

Do not start this migration until it is explicitly approved.