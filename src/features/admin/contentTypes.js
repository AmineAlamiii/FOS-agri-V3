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

const HOME_NOTICE = 'Accueil validé par le client : toute modification de cette section doit être approuvée avant publication.';
const DISPLAY_MODES = { video: 'Vidéo uniquement', images: 'Images uniquement', both: 'Vidéo et images' };
const isSlideShown = (slide) => {
  const mode = siteData.heroMedia?.displayMode || 'video';
  return mode === 'both' || (mode === 'images' ? slide.type === 'image' : slide.type === 'video');
};

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
    id: 'hero',
    group: 'Accueil',
    label: 'Bannière d’accueil',
    icon: 'fa-heading',
    singular: 'une bannière',
    description: 'Textes affichés sur la vidéo / les images en haut de l’accueil.',
    notice: HOME_NOTICE,
    items: () => [{
      id: 'home-hero',
      name: 'Bannière principale',
      displayMode: DISPLAY_MODES[siteData.heroMedia?.displayMode] || DISPLAY_MODES.video,
      ...Object.fromEntries(['eyebrow', 'title', 'description', 'ctaServices', 'ctaContact'].flatMap((key) => (
        LANGS.map(({ code }) => [`${key}_${code}`, siteData.translations?.[code]?.hero?.[key] || ''])
      )))
    }],
    title: (draft) => draft.name,
    columns: [
      { label: 'Bannière', value: (d) => d.name, wide: true },
      { label: 'Titre', value: (d) => d.title_fr },
      { label: 'Affichage', value: (d) => d.displayMode }
    ],
    fields: [
      t('eyebrow', 'Petit titre (au-dessus)'),
      t('title', 'Titre principal', { multiline: true, rows: 2, required: true }),
      t('description', 'Description', { multiline: true, rows: 3 }),
      t('ctaServices', 'Bouton 1 — vers les prestations'),
      t('ctaContact', 'Bouton 2 — vers le contact'),
      f('displayMode', 'Fond de la bannière', { options: Object.values(DISPLAY_MODES) })
    ]
  },
  {
    id: 'heroSlides',
    group: 'Accueil',
    label: 'Diaporama de l’accueil',
    icon: 'fa-photo-film',
    singular: 'une slide',
    description: 'Vidéo et images qui défilent derrière la bannière (selon le mode d’affichage choisi).',
    notice: HOME_NOTICE,
    items: () => (siteData.heroMedia?.slides || []).map((slide, index) => ({
      id: slide.id,
      order: String(index + 1),
      type: slide.type === 'video' ? 'Vidéo' : 'Image',
      src: slide.src,
      visible: isSlideShown(slide) ? 'Oui' : 'Non'
    })),
    title: (draft) => `Slide ${draft.order || ''} — ${draft.type || ''}`,
    columns: [
      { label: 'Ordre', value: (d) => d.order },
      { label: 'Fichier', value: (d) => d.src?.split('/').pop()?.split('?')[0], wide: true },
      { label: 'Type', value: (d) => d.type },
      { label: 'Affichée', value: (d) => d.visible }
    ],
    fields: [
      f('type', 'Type', { options: ['Vidéo', 'Image'], required: true }),
      f('src', 'Fichier (vidéo MP4 ou image)', { media: true }),
      f('order', 'Ordre d’affichage'),
      f('visible', 'Affichée sur le site', { options: ['Oui', 'Non'] })
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

/** Toutes les rubriques sont désormais disponibles dans la démonstration. */
export const PLANNED_SECTIONS = [];

/** Bibliothèque des fichiers utilisés par le site (images, PDF, vidéo). */
const fileKind = (path) => (/\.pdf$/i.test(path) ? 'PDF' : /\.(mp4|webm)$/i.test(path) ? 'Vidéo' : /\.(xlsx?|docx?)$/i.test(path) ? 'Document' : 'Image');
function collectFiles() {
  const files = new Map();
  // usedIn : rubrique ; source : contenu précis (titre de l'article, banque…) ; preview : miniature.
  const add = (path, usedIn, source, preview) => {
    if (!path || /^https?:/.test(path)) return;
    const clean = path.replace(/^\.\//, '').split('?')[0];
    const entry = files.get(clean) || { usedIn: new Set(), sources: new Set(), preview: null };
    entry.usedIn.add(usedIn);
    if (source) entry.sources.add(source);
    entry.preview = entry.preview || preview || (fileKind(clean) === 'Image' ? clean : null);
    files.set(clean, entry);
  };
  siteData.news.forEach((item) => {
    const title = item.fr?.title || item.slug;
    add(item.image, 'Actualités', title);
    (item.attachments || []).forEach((attachment) => add(attachment.path, 'Actualités', title, attachment.preview));
  });
  (siteData.heroMedia?.slides || []).forEach((slide, index) => add(slide.src, 'Accueil', `Diaporama de l’accueil — diapositive ${index + 1}`));
  siteData.partners.forEach((partner) => add(partner.logo, 'Accueil', `Logo partenaire — ${partner.name}`));
  [
    ...banquesLogementImmobilier.map((bank) => [bank, 'crédit immobilier']),
    ...banquesLogementConsommation.map((bank) => [bank, 'crédit à la consommation'])
  ].forEach(([bank, offer]) => {
    add(bank.pdf, 'Offres bancaires', `${bank.name} — ${offer}`);
    add(`assets/images/banks/${bank.logo}`, 'Offres bancaires', `Logo — ${bank.name}`);
  });
  medicalPartnersData.forEach((entry) => {
    const name = [entry.organisme || entry.medecin, entry.ville].filter(Boolean).join(' — ');
    add(entry.pdf, 'Conventions médicales', name);
    add(entry.pdfContact, 'Conventions médicales', name);
  });
  return [...files.entries()].map(([path, entry], index) => ({
    id: `file-${index}`,
    name: decodeURIComponent(path.split('/').pop()),
    path,
    kind: fileKind(path),
    thumb: entry.preview || '',
    source: [...entry.sources].join(' · '),
    usedIn: [...entry.usedIn].join(', ')
  }));
}

CONTENT_TYPES.push({
  id: 'files',
  group: 'Réglages',
  label: 'Fichiers',
  icon: 'fa-folder-open',
  singular: 'un fichier',
  description: 'Images, PDF et vidéo utilisés par le site, réutilisables dans toutes les rubriques.',
  items: collectFiles,
  title: (draft) => draft.name,
  columns: [
    { label: 'Fichier', value: (d) => d.name, wide: true, file: true },
    { label: 'Type', value: (d) => d.kind },
    { label: 'Utilisé dans', value: (d) => d.usedIn }
  ],
  // Filtres affichés au-dessus du tableau (valeurs calculées à partir des fichiers).
  filters: [
    { key: 'kind', label: 'Tous les types' },
    { key: 'usedIn', label: 'Toutes les rubriques' }
  ],
  fields: [
    f('name', 'Nom du fichier', { required: true }),
    f('source', 'Contenu lié (article, banque, convention…)'),
    f('path', 'Fichier', { media: true }),
    f('kind', 'Type', { options: ['Image', 'PDF', 'Vidéo', 'Document'] }),
    f('usedIn', 'Utilisé dans')
  ]
});
