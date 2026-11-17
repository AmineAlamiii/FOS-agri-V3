import { useCallback } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { adhesionI18n } from './adhesion.i18n';

/** t(clé) pour les libellés communs, tr({fr, ar, zgh}) pour les textes des données. */
export function useAdhesionText() {
  const { lang } = useLanguage();
  const t = useCallback((key) => adhesionI18n[lang]?.[key] || adhesionI18n.fr[key] || '', [lang]);
  const tr = useCallback((value) => value?.[lang] || value?.fr || '', [lang]);
  return { lang, t, tr };
}
