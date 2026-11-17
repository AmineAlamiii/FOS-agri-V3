/**
 * Menu principal des pages secondaires — source unique.
 * `key` : clé de traduction (voir i18n/secondaryStrings.js) et identifiant stable.
 * `page` : valeur de data-page qui rend l'entrée active.
 */
export const MAIN_NAV = [
  { key: 'home', page: 'home', href: 'index.html' },
  {
    key: 'foundation', page: 'fondation', href: 'fondation.html',
    children: [
      { key: 'minister', href: 'la-fondation/mot-du-ministre/index.html' },
      { key: 'president', href: 'la-fondation/mot-du-president/index.html' },
      { key: 'history', href: 'histoire-mission-valeurs.html' },
      { key: 'governance', href: 'la-fondation/gouvernance/index.html' }
    ]
  },
  {
    key: 'adhesion', page: 'adhesion', href: 'adhesion.html',
    children: [
      { key: 'adherents', href: 'adhesion/adherents-beneficiaires.html' },
      { key: 'procedure', href: 'adhesion/procedure-adhesion.html' },
      { key: 'cotisations', href: 'adhesion/cotisations.html' }
    ]
  },
  {
    key: 'services', page: 'prestations', href: 'prestations.html',
    children: [
      { key: 'prevoyance', href: 'services/prevoyance.html' },
      { key: 'culture', href: 'services/culture-loisirs-voyages.html' },
      { key: 'scolarisation', href: 'services/formation-scolarisation.html' },
      { key: 'logement', href: 'services/acces-logement.html' },
      { key: 'projets', href: 'services/projets-personnels.html' },
      { key: 'quotidien', href: 'services/services-quotidien.html' }
    ]
  },
  {
    key: 'mediatheque', page: 'mediatheque', href: 'mediatheque.html',
    children: [
      { key: 'media2017', href: 'mediatheque.html#galerie-2017' },
      { key: 'media2018', href: 'mediatheque.html#galerie-2018' },
      { key: 'media2019', href: 'mediatheque.html#galerie-2019' },
      { key: 'media2020', href: 'mediatheque.html#galerie-2020' }
    ]
  },
  {
    key: 'contact', page: 'contact', href: 'contact.html',
    children: [
      { key: 'coordinates', href: 'contact.html#coordonnees' },
      { key: 'regional', href: 'contact.html#relais-regionaux' },
      { key: 'social', href: 'contact.html#reseaux-sociaux' }
    ]
  }
];

export const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/FOS.Agri', icon: 'fa-facebook-f' },
  { label: 'Instagram', href: 'https://www.instagram.com/fos.agri/', icon: 'fa-instagram' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/fosagri/', icon: 'fa-linkedin-in' },
  { label: 'YouTube', href: 'https://www.youtube.com/@FOSAgri', icon: 'fa-youtube' }
];

export const CONTACT = {
  email: 'fos-agri@fos-agri.ma',
  phoneHref: 'tel:+212537665540',
  phoneLabel: '0537665540/39',
  mapsHref: 'https://maps.app.goo.gl/mUGT2XwCk56UjA5KA'
};

export const MOBILE_QUERY = '(max-width: 980px)';
