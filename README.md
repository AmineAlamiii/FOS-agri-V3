# FOS-Agri V3 — site public (React + Vite)

Site de la Fondation pour la Promotion des Œuvres Sociales (FOS-Agri), en trois langues
(français, arabe, amazighe). Version React de l'ancien site statique : **le rendu est
identique à l'ancien site** (vérifié page par page) — seule l'organisation du code change.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # site prêt à publier dans dist/
npm run preview    # tester dist/ en local
```

Pour GitHub Pages (site servi depuis `/<nom-du-dépôt>/`) :

```bash
BASE_PATH=/FOS-agri-V3/ npm run build
```

Le workflow `.github/workflows/deploy.yml` fait ce build et publie `dist/` automatiquement.

## Organisation des dossiers

```text
index.html                  Point de démarrage de React (aucun contenu de page)
public/                     Fichiers servis tels quels : images, PDF, vidéo, robots.txt, sitemap.xml
  assets/                   Médias (mêmes chemins qu'avant : assets/images/…, assets/banques/…)
src/
  main.jsx                  Démarrage de l'application (routeur + langue)
  app/routes.js             Liste des pages : adresse → composant, titre, styles
  app/                      Routeur, préparation de chaque page, navigation sans rechargement
  components/layout/        En-tête, menu, pied de page, recherche, bouton flottant
  components/ui/            Petits composants réutilisables (bandeau de page…)
  config/                   Menu principal, réseaux sociaux, coordonnées
  data/                     Données du site (actualités, partenaires médicaux, banques…)
  features/<espace>/        Un dossier par espace du site :
    home/                   Accueil (sections, en-tête et pied de page d'origine)
    fondation/              La Fondation, mots du Ministre / Président, histoire, valeurs, gouvernance
    adhesion/               Adhésion et ses rubriques
    prestations/            Catalogue + pages de prestation (data/, components/, lib/)
    actualites/ agenda/ mediatheque/ contact/ search/ espace-adherent/ club-agri/ …
  hooks/                    Comportements partagés (défilement, animations, en-tête…)
  i18n/                     Langue courante (FR/AR/ZGH) et traductions partagées
  lib/                      Outils : chemins, texte, isolation des nombres en arabe
  styles/                   Feuilles de style d'origine, inchangées
    pages/                  Une feuille par type de page (ordre de chargement d'origine)
scripts/migration/          Outil de comparaison ancien site / version React
docs/                       Règles et documentation du projet
archive/                    Anciens fichiers non utilisés (conservés pour mémoire)
```

Chaque espace contient ses pages et composants (`*.jsx`), ses textes traduits
(`*.i18n.js`) et ses données (`*.data.js`). Il n'y a aucun fichier HTML de page :
chaque page est un composant React déclaré dans `src/app/routes.js`.

Adresses : `/`, `/prestations`, `/services/prevoyance`, `/la-fondation/gouvernance`…
Les anciennes adresses en `.html` redirigent automatiquement vers les nouvelles.

## Ajouter ou modifier du contenu

- **Textes d'une page** : fichier `*.i18n.js` de l'espace (mêmes clés en `fr`, `ar`, `zgh`).
- **Menu / pied de page** : `src/config/navigation.js` et `src/i18n/secondaryStrings.js`.
- **Actualités** : `src/data/news.js`.
- **Nouvelle page** : créer son composant dans `src/features/<espace>/` (copier par exemple
  `features/contact/ContactPage.jsx`) puis ajouter une entrée dans `src/app/routes.js`.
- **Backend** : chaque page est un composant ; les appels à l'API se font depuis la page
  ou depuis `src/data/` (remplacer les données statiques par des requêtes).

## Langues

La langue choisie est mémorisée (`localStorage`, clé `fosagri-lang`). En arabe, la page
passe en RTL et les nombres sont isolés automatiquement (`src/lib/arabicNumbers.js`),
exactement comme sur l'ancien site.

## Vérifier qu'aucun rendu n'a changé

`scripts/migration/compare-legacy.mjs` ouvre chaque page dans l'ancien site et dans la
version React (Chrome sans interface), puis compare le HTML et les captures d'écran,
en FR / AR / ZGH, sur ordinateur et mobile. Voir l'en-tête du script pour l'utilisation.

## Règles

Lire `AGENTS.md` et `docs/PROJECT_RULES.md` avant toute modification.
La page d'accueil est validée par le client : son rendu ne doit pas changer.
