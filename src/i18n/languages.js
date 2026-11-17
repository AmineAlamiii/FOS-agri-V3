export const SUPPORTED_LANGS = ['fr', 'ar', 'zgh'];
export const STORAGE_KEY = 'fosagri-lang';

export function readStoredLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED_LANGS.includes(saved) ? saved : 'fr';
  } catch {
    return 'fr';
  }
}

export function storeLang(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* stockage indisponible : la langue reste valable pour la session */
  }
}

export const isRtl = (lang) => lang === 'ar';
