# Migration vers React + Vite

Objectif : passer le site statique (HTML + JavaScript qui génère le contenu) à React,
**sans aucun changement visible**. Les mêmes URL, les mêmes feuilles de style et les
mêmes textes sont conservés.

## Choix techniques

| Sujet | Choix | Pourquoi |
| --- | --- | --- |
| Outil | Vite + React 18 | Léger, rapide, sortie 100 % statique (GitHub Pages). |
| Structure | Site multi-pages (`pages/*.html`) | Mêmes adresses qu'avant, chaque page ne charge que son CSS (comme avant). |
| Styles | CSS d'origine inchangés (`src/styles/`) | Garantit le rendu identique. `src/styles/pages/` reprend l'ordre de chargement d'origine. |
| Langues | `LanguageProvider` + dictionnaires par espace | Même clé `localStorage` (`fosagri-lang`), même bascule RTL. |
| Nombres en arabe | Runtime JSX du projet (`src/lib/jsx`) | L'ancien site entourait chaque nombre d'un `<span class="ar-number-ltr">` après coup ; c'est maintenant fait au rendu. |
| Animations | Hooks (`useScrollReveal`, `useMotion`, `useRevealOnScroll`) | Mêmes classes et attributs que les anciens scripts. |
| Cartes SVG | Injectées telles quelles, préparées dans un effet | Fichiers SVG d'origine, interactions identiques. |

## Correspondance ancien → nouveau

| Ancien fichier | Nouveau |
| --- | --- |
| `assets/app.js` + `index.html` + `assets/home-nav-fix.js` | `src/features/home/` |
| `assets/secondary-pages.js` | `src/components/layout/`, `src/i18n/secondaryStrings.js`, `src/features/actualites/` |
| `assets/prestations.js` | `src/features/prestations/` (`data/`, `components/`, `lib/`) |
| `assets/adhesion.js` | `src/features/adhesion/` |
| `assets/gouvernance.js` + `assets/notre-organisation.js` | `src/features/fondation/gouvernance/` |
| `assets/histoire-mission-valeurs.js`, `nos-valeurs.js` | `src/features/fondation/histoire/`, `valeurs/` |
| `assets/mot-ministre.js`, `mot-president.js` | `src/features/fondation/messages/` |
| `assets/espace-adherent.js` | `src/features/espace-adherent/` |
| `assets/search-page.js` | `src/features/search/` |
| `assets/motion-site.js` | `src/hooks/useMotion.js` (bibliothèque `motion` installée en local) |
| `assets/data.js`, `news-2026.js`, `medical-*.js`, `banques-logement-data.js` | `src/data/` |
| `assets/*.css` | `src/styles/` (inchangés, chemins d'images en `/assets/…`) |
| `assets/images`, PDF, vidéo… | `public/assets/` (mêmes chemins) |

## Vérification

`scripts/migration/compare-legacy.mjs` compare l'ancien site et la version React
(HTML normalisé + captures d'écran) pour chaque page, en FR / AR / ZGH, sur ordinateur
(1440 px) et mobile (390 px), y compris après des interactions (onglets, filtres,
formulaires, changement de langue en direct).

Écarts connus, sans effet visible :

- le moment exact où une animation d'apparition se déclenche peut varier de quelques
  millisecondes (cela dépend déjà du chargement des polices sur l'ancien site) ;
- carrousels automatiques : le minuteur démarre au montage de la page React ;
- en arabe, sur l'accueil, l'ancien site n'isolait plus les nombres d'un contenu
  redessiné après un clic (calendrier) ; la version React les isole toujours ;
- l'ancienne page Club Agri ne traduisait pas son contenu lors d'un changement de
  langue en direct (seulement au rechargement) ; la version React le traduit.
