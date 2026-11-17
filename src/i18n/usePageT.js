import { useCallback, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';

/**
 * Traductions propres à une page : dictionnaire { fr: {...}, ar: {...}, zgh: {...} }.
 * Repli sur le français, puis sur la clé elle-même.
 */
export function usePageT(dictionary) {
  const { lang } = useLanguage();
  return useCallback(
    (key) => dictionary[lang]?.[key] || dictionary.fr?.[key] || key,
    [dictionary, lang]
  );
}

/** Met à jour <title> et la meta description selon la langue. */
export function useDocumentMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title;
    if (description !== undefined) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description]);
}
