import { siteData } from '@/data/siteData';
import { normalize } from '@/lib/text';
import { SEARCH_INDEX, SEARCH_KEYWORDS } from './searchIndex';

const localizedNews = (item, lang) => item?.[lang] || item?.fr || item?.ar || item?.zgh || {};

/** Une entrée de recherche par actualité (toutes langues indexées). */
export function getNewsSearchEntries(lang) {
  const items = Array.isArray(siteData.news) ? siteData.news : [];
  return items.map((item, index) => {
    const content = localizedNews(item, lang);
    const slug = item.slug || `actualite-${index + 1}`;
    return {
      key: `news-${slug}`,
      url: `actualite.html?article=${encodeURIComponent(slug)}`,
      icon: 'fa-newspaper',
      label: content.title || slug,
      summary: content.excerpt || content.detail || '',
      searchText: [
        slug,
        item.date || '',
        ...[item.fr, item.ar, item.zgh].filter(Boolean).flatMap((entry) => [entry.title || '', entry.excerpt || '', entry.detail || ''])
      ].join(' ')
    };
  });
}

/** Résultats de la recherche rapide (fenêtre de recherche du menu). */
export function quickSearch(query, lang, translate) {
  const q = normalize(query).trim();
  if (!q) return null;
  return SEARCH_INDEX.concat(getNewsSearchEntries(lang))
    .map((entry) => ({ entry, label: entry.label || translate(entry.key) || entry.key }))
    .filter(({ entry, label }) =>
      normalize([label, entry.key, entry.url, entry.searchText || '', SEARCH_KEYWORDS[entry.key] || ''].join(' ')).includes(q)
    );
}
