/**
 * Types de contenu de l'espace d'administration (démonstration).
 *
 * Chaque type lit les VRAIES données actuelles du site et les transforme en
 * « fiches » à plat (toDraft) : une clé par champ, suffixée _fr / _ar / _zgh
 * pour les textes traduits. Plus tard, toDraft / les listes seront remplacés
 * par des appels à l'API du backend.
 */
import { banquesLogementConsommation, banquesLogementImmobilier } from '@/data/banquesLogement';
import { medicalPartnersData } from '@/data/medicalPartners';
import { siteData } from '@/data/siteData';

export const LANGS = [
  { code: 'fr', label: 'Français', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'zgh', label: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', dir: 'ltr' }
];

/** Champ traduit : une valeur par langue. */
const t = (key, label, options = {}) => ({ key, label, localized: true, ...options });
const f = (key, label, options = {}) => ({ key, label, ...options });

/** Copie les textes { fr: {...}, ar: {...}, zgh: {...} } d'une entrée vers la fiche. */
const fromLocalized = (item, keys) => Object.fromEntries(
  keys.flatMap((key) => LANGS.map(({ code }) => [`${key}_${code}`, item?.[code]?.[key] || '']))
);

const NEWS_CATEGORIES = ['Institutionnel', 'Santé', 'Éducation', 'Loisirs et voyages', 'Logement', 'Offres financières', 'Action sociale', 'Partenariats', 'Information adhérents'];
const MEDICAL_CATEGORIES = [...new Set(medicalPartnersData.map((entry) => entry.categorie).filter(Boolean))].sort();
const REGIONS = [...new Set(medicalPartnersData.map((entry) => entry.region).filter(Boolean))].sort();

export const CONTENT_TYPES = [
  {
    id: 'news',
    group: 'Contenu',
    label: 'Actualités',
    icon: 'fa-newspaper',
    singular: 'une actualité',
    description: 'Articles publiés dans « Actualités », sur l’accueil et dans la recherche.',
    items: () => siteData.news.map((item) => ({
      id: item.slug,
      status: 'Publié',
      date: item.date,
      category_fr: item.fr?.category || '',
      image: item.image,
      attachments: (item.attachments || []).map((attachment) => attachment.path.split('/').pop()).join(', '),
      ...fromLocalized(item, ['title', 'excerpt', 'detail'])
    })),
    title: (draft) => draft.title_fr,
    columns: [
      { label: 'Titre', value: (d) => d.title_fr, wide: true },
      { label: 'Catégorie', value: (d) => d.category_fr },
      { label: 'Date', value: (d) => d.date }
    ],
    fields: [
      t('title', 'Titre', { required: true }),
      t('excerpt', 'Résumé', { multiline: true, rows: 3 }),
      t('detail', 'Texte complet', { multiline: true, rows: 6 }),
      f('date', 'Date de publication'),
      f('category_fr', 'Catégorie', { options: NEWS_CATEGORIES }),
      f('image', 'Image de couverture', { image: true }),
      f('attachments', 'Pièces jointes (PDF, images)', { file: true }),
      f('status', 'Statut', { options: ['Brouillon', 'Publié', 'Archivé'] })
    ]
  },
  {
    id: 'events',
    group: 'Contenu',
    label: 'Agenda solidaire',
    icon: 'fa-calendar-days',
    singular: 'un événement',
    description: 'Événements du calendrier de l’accueil (à venir / historique).',
    items: () => (siteData.events || []).map((event, index) => ({
      id: `event-${index}`,
      date: event.date,
      time_fr: event.time || '', time_ar: event.timeAr || event.time || '', time_zgh: event.timeZgh || event.time || '',
      location_fr: event.location || '', location_ar: event.locationAr || '', location_zgh: event.locationZgh || '',
      type_fr: event.type || '', type_ar: event.typeAr || '', type_zgh: event.typeZgh || '',
      important: Boolean(event.important),
      icon: event.icon || '',
      ...fromLocalized(event, ['title', 'excerpt'])
    })),
    title: (draft) => draft.title_fr,
    columns: [
      { label: 'Événement', value: (d) => d.title_fr, wide: true },
      { label: 'Lieu', value: (d) => d.location_fr },
      { label: 'Date', value: (d) => d.date }
    ],
    fields: [
      t('title', 'Titre', { required: true }),
      t('excerpt', 'Description', { multiline: true, rows: 3 }),
      t('location', 'Lieu'),
      t('time', 'Horaire'),
      t('type', 'Type (badge)'),
      f('date', 'Date (JJ/MM/AAAA)'),
      f('icon', 'Icône (Font Awesome)'),
      f('important', 'Événement important', { checkbox: true })
    ]
  },
  {
    id: 'medical',
    group: 'Prestations',
    label: 'Conventions médicales',
    icon: 'fa-file-contract',
    singular: 'une convention',
    description: 'Partenaires médicaux affichés sur la carte de la prévoyance.',
    items: () => medicalPartnersData.map((entry, index) => ({ id: `medical-${index}`, ...entry })),
    title: (draft) => draft.organisme || draft.medecin,
    columns: [
      { label: 'Organisme', value: (d) => d.organisme || d.medecin, wide: true },
      { label: 'Ville', value: (d) => d.ville },
      { label: 'Catégorie', value: (d) => d.categorie }
    ],
    fields: [
      f('organisme', 'Organisme', { required: true }),
      f('medecin', 'Médecin'),
      f('categorie', 'Catégorie', { options: MEDICAL_CATEGORIES }),
      f('region', 'Région', { options: REGIONS }),
      f('ville', 'Ville'),
      f('adresse', 'Adresse', { multiline: true, rows: 2 }),
      f('telephone', 'Téléphone'),
      f('statut', 'Statut', { options: ['Confirmé', 'Confirmé – avis manquant', 'Résilier'] }),
      f('pdf', 'Avis de convention (PDF)', { file: true })
    ]
  },
  {
    id: 'banks',
    group: 'Prestations',
    label: 'Offres bancaires',
    icon: 'fa-building-columns',
    singular: 'une offre',
    description: 'Fiches des banques partenaires (logement / consommation).',
    items: () => [
      ...banquesLogementImmobilier.map((bank) => ({ id: `immo-${bank.slug}`, type: 'Crédit immobilier', ...bank })),
      ...banquesLogementConsommation.map((bank) => ({ id: `conso-${bank.slug}`, type: 'Crédit à la consommation', ...bank }))
    ],
    title: (draft) => draft.name,
    columns: [
      { label: 'Banque', value: (d) => d.name, wide: true },
      { label: 'Type', value: (d) => d.type },
      { label: 'Âge limite', value: (d) => d.ageLimit }
    ],
    fields: [
      f('name', 'Banque', { required: true }),
      f('type', 'Type d’offre', { options: ['Crédit immobilier', 'Crédit à la consommation'] }),
      f('ageLimit', 'Âge limite de crédit'),
      f('logo', 'Logo', { image: true, prefix: 'assets/images/banks/' }),
      f('pdf', 'Fiche de l’offre (PDF)', { file: true })
    ]
  },
  {
    id: 'testimonials',
    group: 'Accueil',
    label: 'Témoignages',
    icon: 'fa-comment-dots',
    singular: 'un témoignage',
    description: 'Carrousel « Témoignages » de l’accueil (section modifiable).',
    items: () => siteData.testimonials.map((item, index) => ({ id: item.id || `testimonial-${index}`, ...fromLocalized(item, ['category', 'quote', 'author', 'role']) })),
    title: (draft) => draft.author_fr,
    columns: [
      { label: 'Auteur', value: (d) => d.author_fr, wide: true },
      { label: 'Thème', value: (d) => d.category_fr }
    ],
    fields: [
      t('quote', 'Témoignage', { multiline: true, rows: 4, required: true }),
      t('author', 'Auteur'),
      t('role', 'Fonction / service'),
      t('category', 'Thème')
    ]
  },
  {
    id: 'stats',
    group: 'Accueil',
    label: 'Chiffres clés',
    icon: 'fa-chart-simple',
    singular: 'un chiffre',
    description: 'Compteurs de la section « Chiffres clés » de l’accueil.',
    items: () => siteData.stats.map((item, index) => ({ id: `stat-${index}`, value: item.value, icon: item.icon || '', label_fr: item.fr || '', label_ar: item.ar || '', label_zgh: item.zgh || '' })),
    title: (draft) => `${draft.value} ${draft.label_fr}`,
    columns: [
      { label: 'Chiffre', value: (d) => d.value },
      { label: 'Libellé', value: (d) => d.label_fr, wide: true }
    ],
    fields: [
      f('value', 'Valeur', { required: true }),
      t('label', 'Libellé'),
      f('icon', 'Icône (Font Awesome)')
    ]
  },
  {
    id: 'regions',
    group: 'Réglages',
    label: 'Délégations régionales',
    icon: 'fa-map-location-dot',
    singular: 'une délégation',
    description: 'Textes affichés sur la carte « Présence nationale » de l’accueil.',
    items: () => siteData.regions.map((region) => ({ id: region.key, ...fromLocalized(region, ['name', 'delegate', 'details']) })),
    title: (draft) => draft.name_fr,
    columns: [
      { label: 'Région', value: (d) => d.name_fr, wide: true },
      { label: 'Délégué', value: (d) => d.delegate_fr }
    ],
    fields: [
      t('name', 'Région', { required: true }),
      t('delegate', 'Délégué / siège'),
      t('details', 'Description', { multiline: true, rows: 3 })
    ]
  }
];

/** Rubriques prévues, présentées sans formulaire dans cette démonstration. */
export const PLANNED_SECTIONS = [
  { id: 'prestations', group: 'Prestations', label: 'Prestations (textes)', icon: 'fa-layer-group', items: ['6 rubriques et leurs sous-rubriques', 'Accordéons, bénéficiaires, pièces à fournir', 'Détails AMC et AMTS', 'Partenaires : promoteurs, culture, assurances, transport'] },
  { id: 'adhesion', group: 'Contenu', label: 'Adhésion', icon: 'fa-id-card', items: ['Situations d’adhésion', 'Pièces à fournir par situation', 'Tableau des cotisations'] },
  { id: 'fondation', group: 'Contenu', label: 'La Fondation', icon: 'fa-landmark', items: ['Mot du Ministre et du Président (texte, photo)', 'Frise « Histoire » et valeurs', 'Comités de gouvernance', 'Organigramme (noms, fonctions)'] },
  { id: 'media', group: 'Contenu', label: 'Médiathèque', icon: 'fa-images', items: ['Galeries par année', 'Photos et vidéos'] },
  { id: 'files', group: 'Réglages', label: 'Fichiers', icon: 'fa-folder-open', items: ['Bibliothèque de PDF et d’images', 'Réutilisables dans toutes les rubriques'] },
  { id: 'settings', group: 'Réglages', label: 'Menu, pied de page, SEO', icon: 'fa-sliders', items: ['Menu principal et sous-menus', 'Coordonnées et réseaux sociaux', 'Vidéo / images du haut de l’accueil', 'Titres et descriptions des pages (Google)'] }
];
