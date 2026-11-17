import { useCallback } from 'react';
import { siteData } from '@/data/siteData';
import { useLanguage } from './LanguageProvider';

/** Traduction « a.b.c » depuis siteData.translations (langue, puis FR, puis AR). */
export function translateSite(lang, key) {
  const branches = [siteData.translations?.[lang], siteData.translations?.fr, siteData.translations?.ar];
  for (const branch of branches) {
    const value = key.split('.').reduce((node, part) => node?.[part], branch);
    if (typeof value === 'string') return value;
  }
  return null;
}

/** Textes de l'accueil et des pages « service » (ex-data-i18n de app.js). */
export function useSiteT() {
  const { lang } = useLanguage();
  return useCallback((key) => translateSite(lang, key), [lang]);
}

/** Contenu localisé d'une entrée de données { fr, ar, zgh }. */
export const localizedEntry = (entry, lang) => entry?.[lang] || entry?.fr || entry?.ar || null;
