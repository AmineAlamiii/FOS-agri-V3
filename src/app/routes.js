/**
 * Toutes les pages du site, déclarées en JavaScript.
 *
 * Une entrée = une adresse :
 *   path        adresse de la page (sans .html)
 *   legacy      ancienne adresse .html, redirigée automatiquement vers `path`
 *   title       titre de l'onglet ; description : meta description
 *   bodyClass   classes du <body> (le CSS d'origine en dépend)
 *   bodyData    attributs data-* du <body>
 *   styles      feuille de style de la page (chargée seulement sur cette page)
 *   page        composant React de la page (chargé à la demande)
 *   props       paramètres passés au composant
 *
 * Ajouter une page : créer son composant dans src/features/ puis ajouter une entrée ici.
 */
export const ROUTES = [
  {
    path: '/',
    legacy: 'index.html',
    title: "FOS-Agri | Fondation pour la promotion des œuvres sociales",
    description: "FOS-Agri - Fondation pour la promotion des œuvres sociales du personnel du ministère de l'agriculture.",
    bodyClass: '',
    styles: () => import('@/styles/pages/home.css?inline'),
    page: () => import('@/features/home/HomePage')
  },
  {
    path: '/fondation',
    legacy: 'fondation.html',
    title: "FOS-Agri | La Fondation",
    description: "Découvrez la Fondation FOS-Agri, sa mission sociale, ses valeurs, son histoire et sa gouvernance.",
    bodyClass: 'secondary-page service-page fondation-page',
    bodyData: { page: 'fondation' },
    styles: () => import('@/styles/pages/fondation.css?inline'),
    page: () => import('@/features/fondation/FondationPage')
  },
  {
    path: '/la-fondation/mot-du-ministre',
    legacy: 'la-fondation/mot-du-ministre/index.html',
    title: "FOS-Agri | Mot du Ministre",
    description: "Mot du Ministre de l'Agriculture sur la mission sociale de la Fondation FOS-Agri.",
    bodyClass: 'secondary-page service-page',
    bodyData: { page: 'fondation' },
    styles: () => import('@/styles/pages/mot-ministre.css?inline'),
    page: () => import('@/features/fondation/messages/MotDuMinistrePage')
  },
  {
    path: '/la-fondation/mot-du-president',
    legacy: 'la-fondation/mot-du-president/index.html',
    title: "FOS-Agri | Mot du Président",
    description: "Mot du Président de la FOS-Agri sur la mission sociale de la Fondation.",
    bodyClass: 'secondary-page service-page',
    bodyData: { page: 'fondation' },
    styles: () => import('@/styles/pages/mot-president.css?inline'),
    page: () => import('@/features/fondation/messages/MotDuPresidentPage')
  },
  {
    path: '/histoire-mission-valeurs',
    legacy: 'histoire-mission-valeurs.html',
    title: "FOS-Agri | Histoire, mission et valeurs",
    description: "Histoire, mission et valeurs de la Fondation FOS-Agri : retour sur les étapes clés depuis 2015, mission institutionnelle et valeurs fondatrices.",
    bodyClass: 'secondary-page service-page',
    bodyData: { page: 'histoire-mission-valeurs' },
    styles: () => import('@/styles/pages/histoire-mission-valeurs.css?inline'),
    page: () => import('@/features/fondation/histoire/HistoirePage')
  },
  {
    path: '/nos-valeurs',
    legacy: 'nos-valeurs.html',
    title: "FOS-Agri | Nos valeurs",
    description: "Les valeurs de la Fondation FOS-Agri : proximité, équité, sens du service et inclusion.",
    bodyClass: 'secondary-page service-page values-page',
    bodyData: { page: 'nos-valeurs' },
    styles: () => import('@/styles/pages/secondary.css?inline'),
    page: () => import('@/features/fondation/valeurs/NosValeursPage')
  },
  {
    path: '/la-fondation/gouvernance',
    legacy: 'la-fondation/gouvernance/index.html',
    title: "FOS-Agri | Gouvernance",
    description: "Gouvernance de la Fondation FOS-Agri : Comité Directeur, Comité exécutif et Comité Audit, leurs compositions et leurs missions.",
    bodyClass: 'secondary-page service-page',
    bodyData: { page: 'fondation' },
    styles: () => import('@/styles/pages/gouvernance.css?inline'),
    page: () => import('@/features/fondation/gouvernance/GouvernancePage')
  },
  {
    path: '/adhesion',
    legacy: 'adhesion.html',
    title: "FOS-Agri | Adhésion",
    description: "Adhésion FOS-Agri : adhérents, bénéficiaires, procédure d'adhésion, documents à télécharger et cotisations mensuelles.",
    bodyClass: 'secondary-page adhesion-page',
    bodyData: { page: 'adhesion' },
    styles: () => import('@/styles/pages/adhesion.css?inline'),
    page: () => import('@/features/adhesion/AdhesionPage')
  },
  {
    path: '/adhesion/adherents-beneficiaires',
    legacy: 'adhesion/adherents-beneficiaires.html',
    title: "FOS-Agri | Nos adhérents & bénéficiaires",
    description: "Nos adhérents et bénéficiaires FOS-Agri : personnel en activité, organismes sous tutelle et retraités.",
    bodyClass: 'secondary-page adhesion-detail-page',
    bodyData: { page: 'adhesion', "adhesion-section": 'adherents-beneficiaires' },
    styles: () => import('@/styles/pages/adhesion.css?inline'),
    page: () => import('@/features/adhesion/AdhesionSectionPage'),
    props: { sectionId: 'adherents-beneficiaires' }
  },
  {
    path: '/adhesion/procedure-adhesion',
    legacy: 'adhesion/procedure-adhesion.html',
    title: "FOS-Agri | Procédure d'adhésion",
    description: "Procédure d'adhésion FOS-Agri : pièces à fournir, formulaires à télécharger et orientations selon la situation.",
    bodyClass: 'secondary-page adhesion-detail-page',
    bodyData: { page: 'adhesion', "adhesion-section": 'procedure-adhesion' },
    styles: () => import('@/styles/pages/adhesion.css?inline'),
    page: () => import('@/features/adhesion/AdhesionSectionPage'),
    props: { sectionId: 'procedure-adhesion' }
  },
  {
    path: '/adhesion/cotisations',
    legacy: 'adhesion/cotisations.html',
    title: "FOS-Agri | Cotisations",
    description: "Cotisations FOS-Agri : montants mensuels par catégorie, échelle et grade de l'adhérent.",
    bodyClass: 'secondary-page adhesion-detail-page',
    bodyData: { page: 'adhesion', "adhesion-section": 'cotisations' },
    styles: () => import('@/styles/pages/adhesion.css?inline'),
    page: () => import('@/features/adhesion/AdhesionSectionPage'),
    props: { sectionId: 'cotisations' }
  },
  {
    path: '/prestations',
    legacy: 'prestations.html',
    title: "FOS-Agri | Prestations",
    description: "Prestations sociales FOS-Agri : prévoyance médico-sociale, culture et voyages, scolarisation, logement et projets personnels.",
    bodyClass: 'secondary-page prestations-page',
    bodyData: { page: 'prestations' },
    styles: () => import('@/styles/pages/prestations.css?inline'),
    page: () => import('@/features/prestations/PrestationsPage')
  },
  {
    path: '/services/prevoyance',
    legacy: 'services/prevoyance.html',
    title: "FOS-Agri | Prévoyance médico-sociale",
    description: "Prévoyance médico-sociale FOS-Agri : AMC, AMTS, centre médico-social, aide handicap et conventions médicales.",
    bodyClass: 'secondary-page prestation-detail-page',
    bodyData: { page: 'prestations', service: 'prevoyance' },
    styles: () => import('@/styles/pages/prestations.css?inline'),
    page: () => import('@/features/prestations/PrestationDetailPage'),
    props: { serviceKey: 'prevoyance' }
  },
  {
    path: '/services/culture-loisirs-voyages',
    legacy: 'services/culture-loisirs-voyages.html',
    title: "FOS-Agri | Culture, loisirs et voyages",
    description: "Culture, loisirs et voyages FOS-Agri : loisirs, voyages, colonies, Omra, pèlerinage, cérémonies et conventions partenaires.",
    bodyClass: 'secondary-page prestation-detail-page',
    bodyData: { page: 'prestations', service: 'culture' },
    styles: () => import('@/styles/pages/prestations.css?inline'),
    page: () => import('@/features/prestations/PrestationDetailPage'),
    props: { serviceKey: 'culture' }
  },
  {
    path: '/services/formation-scolarisation',
    legacy: 'services/formation-scolarisation.html',
    title: "FOS-Agri | Appui à la scolarisation et formation",
    description: "Appui à la scolarisation et formation FOS-Agri : coaching, bourses, prix d’encouragement, primes de rentrée et conventions éducatives.",
    bodyClass: 'secondary-page prestation-detail-page',
    bodyData: { page: 'prestations', service: 'formation' },
    styles: () => import('@/styles/pages/prestations.css?inline'),
    page: () => import('@/features/prestations/PrestationDetailPage'),
    props: { serviceKey: 'formation' }
  },
  {
    path: '/services/acces-logement',
    legacy: 'services/acces-logement.html',
    title: "FOS-Agri | Accès au logement",
    description: "Accès au logement FOS-Agri : aide au logement, offres bancaires préférentielles, promoteurs immobiliers et projets logement.",
    bodyClass: 'secondary-page prestation-detail-page',
    bodyData: { page: 'prestations', service: 'logement' },
    styles: () => import('@/styles/pages/prestations.css?inline'),
    page: () => import('@/features/prestations/PrestationDetailPage'),
    props: { serviceKey: 'logement' }
  },
  {
    path: '/services/projets-personnels',
    legacy: 'services/projets-personnels.html',
    title: "FOS-Agri | Appui aux projets personnels",
    description: "Appui aux projets personnels FOS-Agri : organismes de financement, assurances auto, restauration, ameublement et transport à tarifs préférentiels.",
    bodyClass: 'secondary-page prestation-detail-page',
    bodyData: { page: 'prestations', service: 'projets' },
    styles: () => import('@/styles/pages/prestations.css?inline'),
    page: () => import('@/features/prestations/PrestationDetailPage'),
    props: { serviceKey: 'projets' }
  },
  {
    path: '/services/services-quotidien',
    legacy: 'services/services-quotidien.html',
    title: "FOS-Agri | Services du quotidien",
    description: "Services du quotidien FOS-Agri : restauration collective et transport du personnel.",
    bodyClass: 'secondary-page prestation-detail-page',
    bodyData: { page: 'prestations', service: 'quotidien' },
    styles: () => import('@/styles/pages/prestations.css?inline'),
    page: () => import('@/features/prestations/PrestationDetailPage'),
    props: { serviceKey: 'quotidien' }
  },
  {
    path: '/services/education-culture',
    legacy: 'services/education-culture.html',
    title: "FOS-Agri | Éducation et culture",
    bodyClass: 'service-page',
    bodyData: { page: 'service', service: 'education' },
    styles: () => import('@/styles/pages/home.css?inline'),
    page: () => import('@/features/prestations/education-culture/EducationCulturePage')
  },
  {
    path: '/actualites',
    legacy: 'actualites.html',
    title: "FOS-Agri | Actualités",
    description: "Consultez toutes les actualités officielles de FOS-Agri, avec images, documents et notes à télécharger.",
    bodyClass: 'secondary-page service-page',
    bodyData: { page: 'actualites' },
    styles: () => import('@/styles/pages/secondary.css?inline'),
    page: () => import('@/features/actualites/ActualitesPage')
  },
  {
    path: '/actualite',
    legacy: 'actualite.html',
    title: "FOS-Agri | Article",
    description: "Actualité officielle FOS-Agri 2026 et documents associés.",
    bodyClass: 'secondary-page service-page',
    bodyData: { page: 'actualites' },
    styles: () => import('@/styles/pages/secondary.css?inline'),
    page: () => import('@/features/actualites/ActualitePage')
  },
  {
    path: '/agenda-solidaire',
    legacy: 'agenda-solidaire.html',
    title: "FOS-Agri | Agenda solidaire",
    bodyClass: 'secondary-page service-page',
    bodyData: { page: 'agenda' },
    styles: () => import('@/styles/pages/secondary.css?inline'),
    page: () => import('@/features/agenda/AgendaPage')
  },
  {
    path: '/mediatheque',
    legacy: 'mediatheque.html',
    title: "FOS-Agri | Médiathèque",
    bodyClass: 'secondary-page service-page',
    bodyData: { page: 'mediatheque' },
    styles: () => import('@/styles/pages/secondary.css?inline'),
    page: () => import('@/features/mediatheque/MediathequePage')
  },
  {
    path: '/espace-documentaire',
    legacy: 'espace-documentaire.html',
    title: "FOS-Agri | Espace documentaire",
    description: "Espace documentaire de la FOS-Agri : documents et ressources utiles aux adhérents.",
    bodyClass: 'secondary-page service-page',
    bodyData: { page: 'espace-documentaire' },
    styles: () => import('@/styles/pages/secondary.css?inline'),
    page: () => import('@/features/espace-documentaire/EspaceDocumentairePage')
  },
  {
    path: '/contact',
    legacy: 'contact.html',
    title: "FOS-Agri | Contact",
    bodyClass: 'secondary-page service-page',
    bodyData: { page: 'contact' },
    styles: () => import('@/styles/pages/secondary.css?inline'),
    page: () => import('@/features/contact/ContactPage')
  },
  {
    path: '/search',
    legacy: 'search.html',
    title: "FOS-Agri | Recherche",
    description: "Recherche par mots-clés dans les pages du site FOS-Agri.",
    bodyClass: 'secondary-page service-page search-page',
    bodyData: { page: 'search' },
    styles: () => import('@/styles/pages/search.css?inline'),
    page: () => import('@/features/search/SearchPage')
  },
  {
    path: '/espace-adherent',
    legacy: 'espace-adherent.html',
    title: "FOS-Agri | Espace adhérent",
    description: "Espace adhérent FOS-Agri : connexion sécurisée, mot de passe oublié et accompagnement des adhérents.",
    bodyClass: 'secondary-page service-page espace-page page-espace-adherent',
    bodyData: { page: 'espace-adherent' },
    styles: () => import('@/styles/pages/espace-adherent.css?inline'),
    page: () => import('@/features/espace-adherent/EspaceAdherentPage')
  },
  {
    path: '/espace-adherent/mon-espace',
    legacy: 'espace-adherent/mon-espace.html',
    title: "FOS-Agri | Mon espace adhérent",
    description: "Démonstration de l'espace personnel de l'adhérent FOS-Agri : demandes, documents, cotisations, avantages, messagerie et rendez-vous.",
    bodyClass: 'member-space-page',
    bodyData: { page: 'espace-adherent' },
    styles: () => import('@/styles/pages/member-space.css?inline'),
    page: () => import('@/features/espace-adherent/member/MemberSpacePage')
  },
  {
    path: '/club-agri',
    legacy: 'club-agri.html',
    title: "FOS-Agri | Club Agri",
    bodyClass: 'service-page',
    bodyData: { page: 'special' },
    styles: () => import('@/styles/pages/home.css?inline'),
    page: () => import('@/features/club-agri/ClubAgriPage')
  },
  {
    // Démonstration d'un espace de gestion du contenu (non lié depuis le site).
    path: '/admin',
    legacy: 'admin.html',
    title: "FOS-Agri | Espace de gestion (démonstration)",
    bodyClass: 'cms-page',
    styles: () => import('@/styles/pages/admin.css?inline'),
    page: () => import('@/features/admin/AdminPage')
  }
];
