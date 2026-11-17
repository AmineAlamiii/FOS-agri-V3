import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { setActiveLang } from '@/lib/arabicNumbers';
import { SUPPORTED_LANGS, isRtl, readStoredLang, storeLang } from './languages';

const LanguageContext = createContext(null);

/**
 * Langue courante du site (FR / AR / ZGH), partagée par toutes les pages.
 * Met à jour <html lang dir>, le localStorage et prévient les modules
 * qui écoutent l'évènement « fosagri:lang-change » (comme l'ancien site).
 */
export function LanguageProvider({ children, bodyLang = true }) {
  const [lang, setLangState] = useState(readStoredLang);
  setActiveLang(lang);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = isRtl(lang) ? 'rtl' : 'ltr';
    if (bodyLang) document.body.dataset.lang = lang;
    window.dispatchEvent(new CustomEvent('fosagri:lang-change', { detail: { lang } }));
  }, [lang, bodyLang]);

  const setLang = useCallback((next) => {
    const value = SUPPORTED_LANGS.includes(next) ? next : 'fr';
    storeLang(value);
    setActiveLang(value);
    setLangState(value);
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage doit être utilisé dans <LanguageProvider>');
  return context;
}
