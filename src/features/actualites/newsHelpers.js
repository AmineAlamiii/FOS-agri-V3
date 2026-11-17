import { siteData } from '@/data/siteData';
import { assetUrl, url } from '@/lib/paths';

export const NEWS = siteData.news || [];

const FALLBACK_IMAGES = [
  'assets/images/news-vacances-2025.webp',
  'assets/images/news-pathologie-bouregreg.jpg',
  'assets/images/news-omra-2025.jpg',
  'assets/images/news-partenariat-sportif.jpg',
  'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=900&q=80',
  'assets/images/news-campagne-info.jpg'
];

const CATEGORIES = {
  fr: ['Portée stratégique', 'Gouvernance', 'Formation & Développement', 'Direction digitale', 'Comité innovation', 'Ressources humaines'],
  ar: ['بعد استراتيجي', 'الحكامة', 'التكوين والتطوير', 'التحول الرقمي', 'لجنة الابتكار', 'الموارد البشرية'],
  zgh: ['ⴰⵙⵓⵍⴰⵏ ⴰⵎⵓⵙⵙⵓ', 'ⴰⵏⴰⴹⴰⵎ', 'ⴰⵙⴳⵎⵉ ⴷ ⵜⵏⴼⵍⵉⵜ', 'ⴰⵙⵏⴼⵍ ⴰⵎⴰⵜⴰⵢ', 'ⴰⵙⵇⵇⵉⵎ ⵏ ⵓⵙⵏⴽⵔ', 'ⵉⵎⴰⵍⴰⵙⵏ ⵉⵎⴷⴰⵏⵏ']
};

const MONTHS = {
  ar: {
    Janvier: 'يناير', Fevrier: 'فبراير', Février: 'فبراير', Mars: 'مارس', Avril: 'أبريل',
    Mai: 'ماي', Juin: 'يونيو', Juillet: 'يوليوز', Aout: 'غشت', Août: 'غشت',
    Septembre: 'شتنبر', Octobre: 'أكتوبر', Novembre: 'نونبر', Decembre: 'دجنبر'
  },
  zgh: {
    Janvier: 'ⵉⵏⵏⴰⵢⵔ', Fevrier: 'ⴼⵓⵕⴰⵕ', Février: 'ⴼⵓⵕⴰⵕ', Mars: 'ⵎⴰⵕⵚ', Avril: 'ⵉⴱⵔⵉⵔ',
    Mai: 'ⵎⴰⵢⵢⵓ', Juin: 'ⵢⵓⵏⵢⵓ', Juillet: 'ⵢⵓⵍⵢⵓⵣ', Aout: 'ⵖⵓⵛⵜ', Août: 'ⵖⵓⵛⵜ',
    Septembre: 'ⵛⵓⵜⴰⵏⴱⵉⵔ', Octobre: 'ⴽⵜⵓⴱⵔ', Novembre: 'ⵏⵓⵡⴰⵏⴱⵉⵔ', Decembre: 'ⴷⵓⵊⴰⵏⴱⵉⵔ'
  }
};

export const localizedNews = (item, lang) => item?.[lang] || item?.fr || item?.ar || item?.zgh || {};

export const newsSlug = (item, index) => item?.slug || `actualite-${index + 1}`;

export function newsImageUrl(index, item) {
  return assetUrl(item?.image || FALLBACK_IMAGES[index % 6]);
}

export function newsArticleUrl(item, index) {
  return `${url('actualite.html')}?article=${encodeURIComponent(newsSlug(item, index))}`;
}

export function localizeNewsDate(dateStr, lang) {
  if (lang === 'fr') return dateStr;
  const months = lang === 'ar' ? MONTHS.ar : MONTHS.zgh;
  const match = (dateStr || '').match(/^(\d{1,2})\s+(.+)\s+(\d{4})$/);
  if (!match) return dateStr;
  const [, day, month, year] = match;
  return `${day} ${months[month] || month} ${year}`;
}

/** « Catégorie • date » affiché au-dessus du titre. */
export function newsMeta(index, item, lang) {
  const categories = CATEGORIES[lang] || CATEGORIES.fr;
  const content = localizedNews(item, lang);
  return `${content.category || categories[index % categories.length]} • ${localizeNewsDate(item.date, lang)}`;
}
