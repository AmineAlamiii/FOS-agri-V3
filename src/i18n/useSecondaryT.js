import { useCallback } from 'react';
import { useLanguage } from './LanguageProvider';
import { extra, nav } from './secondaryStrings';

/** Traduction des libellés partagés (menu, pied de page, en-têtes…). */
export function translateShared(lang, key) {
  return nav[lang]?.[key] || extra[lang]?.[key] || nav.fr[key] || extra.fr[key] || '';
}

export function useSecondaryT() {
  const { lang } = useLanguage();
  return useCallback((key) => translateShared(lang, key), [lang]);
}
