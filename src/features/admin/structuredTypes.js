/**
 * Contenus « structurés » de l'espace de gestion (démonstration) : fiches à
 * plusieurs niveaux (blocs, listes dans des listes). Chaque fiche est lue depuis
 * les VRAIES données du site.
 *
 * Forme des fiches : objets imbriqués ; un texte traduit est { fr, ar, zgh }.
 * Forme des schémas :
 *   { key, label, kind: 'text' | 'textarea' | 'image' | 'file' | 'readonly', localized? }
 *   { key, label, kind: 'group', fields: [...] }
 *   { key, label, kind: 'list', item: 'libellé d'un élément', fields: [...] }
 */
import { adhesionI18n } from '@/features/adhesion/adhesion.i18n';
import { ADHESION_SECTIONS } from '@/features/adhesion/adhesion.data';
import { COMMITTEES } from '@/features/fondation/gouvernance/committees.data';
import { governanceI18n } from '@/features/fondation/gouvernance/gouvernance.i18n';
import { ORGANISATION } from '@/features/fondation/gouvernance/organisation.data';
import { TIMELINE, VALUES } from '@/features/fondation/histoire/histoire.data';
import { histoireI18n } from '@/features/fondation/histoire/histoire.i18n';
import { ministerI18n } from '@/features/fondation/messages/minister.i18n';
import { presidentI18n } from '@/features/fondation/messages/president.i18n';
import { image as serviceImages, services, serviceText } from '@/features/prestations/data/prestations.content';
import { CONTACT, MAIN_NAV, SOCIAL_LINKS } from '@/config/navigation';
import { ROUTES } from '@/app/routes';
import { translateShared } from '@/i18n/useSecondaryT';

const CODES = ['fr', 'ar', 'zgh'];
/** Texte traduit construit langue par langue. */
const L = (read) => Object.fromEntries(CODES.map((code) => [code, read(code) ?? '']));
const join = (value) => [].concat(value || []).filter(Boolean).join('\n\n');
const lines = (value) => [].concat(value || []).filter(Boolean).join('\n');

/* ------------------------------------------------------------------ */
/* Champs réutilisables                                                */
/* ------------------------------------------------------------------ */
const text = (key, label, localized = true) => ({ key, label, kind: 'text', localized });
const area = (key, label, localized = true) => ({ key, label, kind: 'textarea', localized });
const img = (key, label) => ({ key, label, kind: 'image' });
const file = (key, label) => ({ key, label, kind: 'file' });
const info = (key, label) => ({ key, label, kind: 'readonly' });
// Groupe « à plat » (champs de la fiche elle-même) ou imbriqué (sous-objet draft[key], absent = groupe masqué).
const group = (key, label, fields, nested = false) => ({ key, label, kind: 'group', fields, nested });
const list = (key, label, item, fields) => ({ key, label, kind: 'list', item, fields });

/* ------------------------------------------------------------------ */
/* Prestations                                                         */
/* ------------------------------------------------------------------ */
const SECTION_TYPES = {
  culturePartners: 'Partenaires (logos + PDF)',
  bankOffers: 'Offres bancaires (voir « Offres bancaires »)',
  medicalPartners: 'Conventions médicales (voir « Conventions médicales »)',
  cultureRubrique: 'Rubrique détaillée'
};

function prestationDraft(key) {
  const t = Object.fromEntries(CODES.map((code) => [code, serviceText(key, code)]));
  const fr = t.fr;
  const at = (code, read) => {
    try { return read(t[code]); } catch { return ''; }
  };
  const draft = {
    id: key,
    title: L((c) => t[c].title),
    meta: L((c) => t[c].meta),
    summary: L((c) => t[c].summary),
    image: serviceImages[key],
    menu: (fr.menuItems || []).map((item, i) => ({ id: item.id, icon: item.icon, label: L((c) => at(c, (x) => x.menuItems[i].label)) }))
  };
  if (fr.centerMedical) {
    draft.center = {
      badge: L((c) => at(c, (x) => x.centerMedical.badge)),
      title: L((c) => at(c, (x) => x.centerMedical.title)),
      intro: L((c) => at(c, (x) => x.centerMedical.intro)),
      items: (fr.centerMedical.items || []).map((item, i) => ({
        icon: item.icon,
        title: L((c) => at(c, (x) => x.centerMedical.items[i].title)),
        body: L((c) => at(c, (x) => join(x.centerMedical.items[i].body))),
        bullets: L((c) => at(c, (x) => lines(x.centerMedical.items[i].bullets)))
      }))
    };
  }
  if (fr.amcDetail) {
    draft.amc = {
      title: L((c) => at(c, (x) => x.amcDetail.title)),
      subtitle: L((c) => at(c, (x) => x.amcDetail.subtitle)),
      dispositions: (fr.amcDetail.dispositions || []).map((card, i) => ({
        title: L((c) => at(c, (x) => x.amcDetail.dispositions[i].title)),
        body: L((c) => at(c, (x) => join([...[].concat(x.amcDetail.dispositions[i].body || []), lines(x.amcDetail.dispositions[i].bullets)])))
      })),
      options: (fr.amcDetail.options || []).map((option, o) => ({
        title: L((c) => at(c, (x) => x.amcDetail.options[o].title)),
        kicker: L((c) => at(c, (x) => x.amcDetail.options[o].kicker)),
        guarantees: (option.guarantees || []).map((g, i) => ({
          title: L((c) => at(c, (x) => x.amcDetail.options[o].guarantees[i].title)),
          assured: L((c) => at(c, (x) => x.amcDetail.options[o].guarantees[i].assured)),
          benefits: L((c) => at(c, (x) => lines(x.amcDetail.options[o].guarantees[i].benefits)))
        }))
      })),
      note: L((c) => at(c, (x) => x.amcDetail.note))
    };
  }
  if (fr.amtsDetail) {
    draft.amts = {
      title: L((c) => at(c, (x) => x.amtsDetail.title)),
      subtitle: L((c) => at(c, (x) => join(x.amtsDetail.subtitle))),
      groups: (fr.amtsDetail.groups || []).map((g, i) => ({
        title: L((c) => at(c, (x) => x.amtsDetail.groups[i].title)),
        services: (g.services || []).map((_, s) => ({
          title: L((c) => at(c, (x) => x.amtsDetail.groups[i].services[s][0])),
          content: L((c) => at(c, (x) => lines(x.amtsDetail.groups[i].services[s][1])))
        }))
      })),
      phone: fr.amtsDetail.phone || ''
    };
  }
  draft.sections = (fr.extraSections || []).map((section, i) => {
    const sec = (c) => t[c].extraSections?.[i] || {};
    return {
      type: SECTION_TYPES[section.type] || 'Rubrique standard',
      icon: section.icon || '',
      badge: L((c) => sec(c).badge),
      title: L((c) => sec(c).title),
      intro: L((c) => join(sec(c).intro)),
      details: L((c) => join([lines(sec(c).apercu), sec(c).beneficiaires, lines(sec(c).inscription), lines(sec(c).pieces), lines(sec(c).destinations)].filter(Boolean))),
      blocks: (section.blocks || []).flatMap((block, b) => (block.items || []).map((_, k) => ({
        title: L((c) => sec(c).blocks?.[b]?.items?.[k]?.title || sec(c).blocks?.[b]?.items?.[k]?.amount),
        text: L((c) => {
          const entry = sec(c).blocks?.[b]?.items?.[k] || {};
          return join([join(entry.body), lines(entry.bullets), entry.label, entry.text].filter(Boolean));
        })
      }))),
      partners: (section.groups || []).flatMap((g) => (g.items || []).map((item) => ({
        name: item.name || '',
        logo: item.logo || '',
        pdf: item.pdf || (item.pdfs || []).map((p) => p.pdf).join(', ')
      })))
    };
  });
  return draft;
}

const PRESTATION_SCHEMA = [
  group('presentation', 'Présentation', [text('title', 'Titre'), text('meta', 'Sous-titre'), area('summary', 'Résumé'), img('image', 'Image du bandeau')]),
  list('menu', 'Menu des sous-rubriques', 'entrée du menu', [text('label', 'Libellé'), info('id', 'Identifiant (ancre)'), text('icon', 'Icône', false)]),
  group('center', 'Onglet « À propos »', [
    text('badge', 'Étiquette'), text('title', 'Titre'), area('intro', 'Introduction'),
    list('items', 'Blocs dépliables', 'bloc', [text('title', 'Titre'), area('body', 'Texte'), area('bullets', 'Liste à puces (une par ligne)'), text('icon', 'Icône', false)])
  ], true),
  group('amc', 'Assurance Maladie Complémentaire (AMC)', [
    text('title', 'Titre'), area('subtitle', 'Sous-titre'),
    list('dispositions', 'Dispositions contractuelles', 'carte', [text('title', 'Titre'), area('body', 'Texte')]),
    list('options', 'Formules', 'formule', [
      text('title', 'Nom de la formule'), area('kicker', 'Description'),
      list('guarantees', 'Garanties', 'garantie', [text('title', 'Garantie'), area('assured', 'Affections / actes assurés'), area('benefits', 'Prestations (une par ligne)')])
    ]),
    area('note', 'Note importante')
  ], true),
  group('amts', 'Assistance médicale et transport sanitaire (AMTS)', [
    text('title', 'Titre'), area('subtitle', 'Introduction'), text('phone', 'Téléphone d’assistance', false),
    list('groups', 'Groupes de prestations', 'groupe', [
      text('title', 'Titre du groupe'),
      list('services', 'Prestations', 'prestation', [text('title', 'Prestation'), area('content', 'Détail (une ligne par point)')])
    ])
  ], true),
  list('sections', 'Sous-rubriques détaillées', 'sous-rubrique', [
    info('type', 'Type'), text('badge', 'Étiquette'), text('title', 'Titre'), area('intro', 'Introduction'),
    area('details', 'Aperçu, bénéficiaires, inscription, pièces à fournir'),
    list('blocks', 'Blocs', 'bloc', [text('title', 'Titre'), area('text', 'Contenu')]),
    list('partners', 'Partenaires', 'partenaire', [text('name', 'Nom', false), img('logo', 'Logo'), file('pdf', 'Document (PDF)')])
  ])
];

/* ------------------------------------------------------------------ */
/* La Fondation                                                        */
/* ------------------------------------------------------------------ */
const dict = (dictionary, key) => L((c) => dictionary[c]?.[key] || '');

function messageDraft(id, label, prefix, dictionary, photo, photoAltKey) {
  const k = (key) => dict(dictionary, `${prefix}.${key}`);
  return {
    id, label, schema: 'message',
    pageTitle: k('pageTitle'), name: k('name'), position: k('position'),
    paragraph1: k('message.paragraph1'), paragraph2: k('message.paragraph2'), paragraph3: k('message.paragraph3'),
    signatureName: k('signature.name'), signaturePosition: k('signature.position'),
    photo, photoAlt: dict(dictionary, photoAltKey)
  };
}

const ORG_LEVELS = [];
function collectOrg(node, level) {
  if (!node) return;
  ORG_LEVELS.push({
    level,
    title: L((c) => (c === 'ar' ? node.titleAr : c === 'zgh' ? node.titleZgh : node.title) || node.title || ''),
    name: L((c) => (c === 'ar' ? node.nameAr || node.managerNameAr : c === 'zgh' ? node.nameZgh || node.managerNameZgh : node.name || node.managerName) || '')
  });
  (node.supports || []).forEach((support) => collectOrg(support, 'Rattaché'));
  (node.children || []).forEach((child) => collectOrg(child, 'Secrétariat général'));
  (node.services || []).forEach((service) => collectOrg(service, 'Service'));
}
ORGANISATION.leadership.forEach((node) => collectOrg(node, 'Présidence'));
ORGANISATION.directions.forEach((node) => collectOrg(node, 'Direction'));

const FONDATION_ITEMS = () => [
  messageDraft('ministre', 'Mot du Ministre', 'minister', ministerI18n, 'assets/images/ministre-khalid-hatimi.webp', 'minister.image.alt'),
  messageDraft('president', 'Mot du Président', 'president', presidentI18n, 'assets/images/president.jpg', 'president.imageAlt'),
  {
    id: 'histoire', label: 'Histoire (frise chronologique)', schema: 'timeline',
    entries: TIMELINE.map((entry) => ({
      year: entry.year, icon: entry.icon,
      title: entry.titleKey ? dict(histoireI18n, entry.titleKey) : L(() => ''),
      items: entry.items.map((item) => ({ text: dict(histoireI18n, item.textKey) }))
    }))
  },
  {
    id: 'valeurs', label: 'Valeurs', schema: 'values',
    values: VALUES.map((value) => ({ icon: value.icon, title: dict(histoireI18n, value.titleKey), desc: dict(histoireI18n, value.descKey) }))
  },
  {
    id: 'gouvernance', label: 'Comités de gouvernance', schema: 'committees',
    committees: COMMITTEES.map((committee) => ({
      number: committee.number,
      title: dict(governanceI18n, committee.titleKey),
      compositionIntro: dict(governanceI18n, committee.introKey),
      composition: committee.compositionKeys.map((key) => ({ text: dict(governanceI18n, key) })),
      responsibilityIntro: dict(governanceI18n, committee.responsibilityIntroKey),
      responsibilities: committee.responsibilityKeys.map((key) => ({ text: dict(governanceI18n, key) }))
    }))
  },
  { id: 'organigramme', label: 'Organigramme', schema: 'organisation', positions: ORG_LEVELS }
];

const FONDATION_SCHEMAS = {
  message: [
    group('identity', 'Signataire', [text('name', 'Nom'), text('position', 'Fonction'), img('photo', 'Photo'), text('photoAlt', 'Description de la photo')]),
    group('message', 'Message', [area('paragraph1', 'Paragraphe 1'), area('paragraph2', 'Paragraphe 2'), area('paragraph3', 'Paragraphe 3')]),
    group('signature', 'Signature', [text('signatureName', 'Nom'), text('signaturePosition', 'Fonction')])
  ],
  timeline: [list('entries', 'Étapes', 'étape', [text('year', 'Année', false), text('title', 'Titre (facultatif)'), text('icon', 'Icône', false), list('items', 'Points', 'point', [area('text', 'Texte')])])],
  values: [list('values', 'Valeurs', 'valeur', [text('title', 'Valeur'), area('desc', 'Description'), text('icon', 'Icône', false)])],
  committees: [list('committees', 'Comités', 'comité', [
    text('number', 'Numéro', false), text('title', 'Nom du comité'),
    area('compositionIntro', 'Introduction de la composition'), list('composition', 'Composition', 'membre', [text('text', 'Membre')]),
    area('responsibilityIntro', 'Introduction des responsabilités'), list('responsibilities', 'Responsabilités', 'responsabilité', [area('text', 'Responsabilité')])
  ])],
  organisation: [list('positions', 'Postes', 'poste', [info('level', 'Niveau'), text('title', 'Poste'), text('name', 'Titulaire')])]
};

/* ------------------------------------------------------------------ */
/* Adhésion                                                            */
/* ------------------------------------------------------------------ */
const tr = (value) => L((c) => value?.[c] || value?.fr || '');

const ADHESION_ITEMS = () => [
  {
    id: 'accueil', label: 'Page d’accueil de l’adhésion', schema: 'overview',
    ...Object.fromEntries(['title', 'body', 'overviewTitle', 'orientationTitle', 'orientationBody', 'orientationCta'].map((key) => [key, dict(adhesionI18n, key)]))
  },
  ...ADHESION_SECTIONS.map((section) => ({
    id: section.id, label: section.title.fr, schema: section.cards ? 'cards' : section.groups ? 'groups' : 'fees',
    title: tr(section.title), eyebrow: tr(section.eyebrow), summary: tr(section.summary), image: section.image,
    cards: (section.cards || []).map((card) => ({ icon: card.icon, title: tr(card.title), body: tr(card.body) })),
    groups: (section.groups || []).map((g) => ({ icon: g.icon, title: tr(g.title), intro: tr(g.intro), items: g.items.map((item) => ({ label: tr(item.label), href: item.href || '' })) })),
    fees: (section.fees || []).map((fee) => ({ label: tr(fee.label), amount: fee.amount }))
  }))
];

const ADHESION_HEAD = [text('title', 'Titre'), text('eyebrow', 'Étiquette'), area('summary', 'Résumé'), img('image', 'Image')];
const ADHESION_SCHEMAS = {
  overview: [group('texts', 'Textes', [text('title', 'Titre'), area('body', 'Introduction'), text('overviewTitle', 'Titre du catalogue'), text('orientationTitle', 'Titre « orientation »'), area('orientationBody', 'Texte « orientation »'), text('orientationCta', 'Bouton')])],
  cards: [group('head', 'En-tête', ADHESION_HEAD), list('cards', 'Situations', 'situation', [text('title', 'Titre'), area('body', 'Texte'), text('icon', 'Icône', false)])],
  groups: [group('head', 'En-tête', ADHESION_HEAD), list('groups', 'Cas', 'cas', [text('title', 'Titre'), area('intro', 'Procédure'), text('icon', 'Icône', false), list('items', 'Pièces à fournir', 'pièce', [text('label', 'Pièce'), file('href', 'Formulaire (facultatif)')])])],
  fees: [group('head', 'En-tête', ADHESION_HEAD), list('fees', 'Catégories', 'catégorie', [text('label', 'Catégorie'), text('amount', 'Montant mensuel', false)])]
};

/* ------------------------------------------------------------------ */
/* Médiathèque                                                         */
/* ------------------------------------------------------------------ */
const GALLERY_COUNTS = { 2017: 3, 2018: 6, 2019: 6, 2020: 2 };
const MEDIA_ITEMS = () => Object.entries(GALLERY_COUNTS).map(([year, count]) => ({
  id: `galerie-${year}`, label: `Galerie ${year}`, schema: 'gallery', year,
  albums: Array.from({ length: count }, (_, i) => ({ title: L((c) => translateShared(c, `med_${year}_${i + 1}`)), photos: [] }))
}));
const MEDIA_SCHEMAS = {
  gallery: [text('year', 'Année', false), list('albums', 'Albums', 'album', [text('title', 'Titre de l’album'), list('photos', 'Photos', 'photo', [img('src', 'Photo'), text('caption', 'Légende')])])]
};

/* ------------------------------------------------------------------ */
/* Réglages                                                            */
/* ------------------------------------------------------------------ */
const SETTINGS_ITEMS = () => [
  {
    id: 'menu', label: 'Menu principal', schema: 'menu',
    entries: MAIN_NAV.map((entry) => ({
      label: L((c) => translateShared(c, entry.key)), href: entry.href,
      children: (entry.children || []).map((child) => ({ label: L((c) => translateShared(c, child.key)), href: child.href }))
    }))
  },
  {
    id: 'coordonnees', label: 'Coordonnées et réseaux sociaux', schema: 'contact',
    email: CONTACT.email, phone: CONTACT.phoneLabel, maps: CONTACT.mapsHref,
    address: L((c) => translateShared(c, 'ctc_address')),
    socials: SOCIAL_LINKS.map((link) => ({ name: link.label, href: link.href }))
  },
  {
    id: 'seo', label: 'Pages et référencement (Google)', schema: 'seo',
    pages: ROUTES.filter((route) => route.path !== '/admin').map((route) => ({ path: route.path, title: route.title, description: route.description || '' }))
  }
];
const SETTINGS_SCHEMAS = {
  menu: [list('entries', 'Entrées du menu', 'entrée', [text('label', 'Libellé'), text('href', 'Lien', false), list('children', 'Sous-menu', 'lien', [text('label', 'Libellé'), text('href', 'Lien', false)])])],
  contact: [
    group('contact', 'Coordonnées', [text('email', 'Email', false), text('phone', 'Téléphone', false), text('address', 'Adresse'), text('maps', 'Lien Google Maps', false)]),
    list('socials', 'Réseaux sociaux', 'réseau', [text('name', 'Réseau', false), text('href', 'Lien', false)])
  ],
  seo: [list('pages', 'Pages', 'page', [info('path', 'Adresse'), text('title', 'Titre de l’onglet', false), area('description', 'Description pour Google', false)])]
};

/* ------------------------------------------------------------------ */
/* Types exportés                                                      */
/* ------------------------------------------------------------------ */
const label = (draft) => draft.label || draft.title?.fr || draft.id;

export const STRUCTURED_TYPES = [
  {
    id: 'prestations', group: 'Prestations', label: 'Prestations (textes)', icon: 'fa-layer-group', singular: 'une prestation',
    description: 'Les 6 prestations : présentation, menu, onglet « À propos », AMC / AMTS, sous-rubriques et partenaires.',
    items: () => Object.keys(services).map(prestationDraft),
    schemaFor: () => PRESTATION_SCHEMA,
    title: (draft) => draft.title.fr,
    columns: [{ label: 'Prestation', value: (d) => d.title.fr, wide: true }, { label: 'Sous-rubriques', value: (d) => String(d.menu.length) }]
  },
  {
    id: 'fondation', group: 'Contenu', label: 'La Fondation', icon: 'fa-landmark', singular: 'une page',
    description: 'Mots du Ministre et du Président, histoire, valeurs, gouvernance et organigramme.',
    items: FONDATION_ITEMS, schemaFor: (draft) => FONDATION_SCHEMAS[draft.schema], title: label,
    columns: [{ label: 'Page', value: label, wide: true }]
  },
  {
    id: 'adhesion', group: 'Contenu', label: 'Adhésion', icon: 'fa-id-card', singular: 'une rubrique',
    description: 'Accueil de l’adhésion, situations des adhérents, procédure et cotisations.',
    items: ADHESION_ITEMS, schemaFor: (draft) => ADHESION_SCHEMAS[draft.schema], title: label,
    columns: [{ label: 'Rubrique', value: label, wide: true }]
  },
  {
    id: 'media', group: 'Contenu', label: 'Médiathèque', icon: 'fa-images', singular: 'une galerie',
    description: 'Galeries photo par année et leurs albums (photos à ajouter).',
    items: MEDIA_ITEMS, schemaFor: (draft) => MEDIA_SCHEMAS[draft.schema], title: label,
    columns: [{ label: 'Galerie', value: label, wide: true }, { label: 'Albums', value: (d) => String(d.albums.length) }]
  },
  {
    id: 'settings', group: 'Réglages', label: 'Menu, coordonnées, SEO', icon: 'fa-sliders', singular: 'un réglage',
    description: 'Menu principal, coordonnées et réseaux sociaux, titres et descriptions des pages.',
    items: SETTINGS_ITEMS, schemaFor: (draft) => SETTINGS_SCHEMAS[draft.schema], title: label,
    columns: [{ label: 'Réglage', value: label, wide: true }]
  }
];

/** Langues complètes d'une fiche structurée (tous les textes traduits remplis). */
export function structuredLanguageStatus(draft, schema) {
  const status = { fr: true, ar: true, zgh: true };
  const walk = (value, fields) => {
    fields.forEach((field) => {
      const v = value?.[field.key];
      if (field.kind === 'group') { if (!field.nested) walk(value, field.fields); else if (v) walk(v, field.fields); }
      else if (field.kind === 'list') (v || []).forEach((item) => walk(item, field.fields));
      else if (field.localized && v && typeof v === 'object') CODES.forEach((code) => { if (!String(v[code] || '').trim() && String(v.fr || '').trim()) status[code] = false; });
    });
  };
  walk(draft, schema);
  return status;
}
