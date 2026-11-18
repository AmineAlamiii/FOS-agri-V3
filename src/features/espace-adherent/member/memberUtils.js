import { useCallback } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { usePageT } from '@/i18n/usePageT';
import { memberSpaceI18n } from './memberSpace.i18n';

/**
 * Traductions de l'espace adhérent :
 *  - t('clé', { n: 3 }) remplace {n} dans le texte ;
 *  - loc({ fr, ar, zgh }) choisit la langue active (repli sur le français).
 */
export function useMemberT() {
  const { lang } = useLanguage();
  const base = usePageT(memberSpaceI18n);
  const t = useCallback((key, vars) => {
    let text = base(key);
    if (vars) Object.entries(vars).forEach(([name, value]) => { text = text.replace(`{${name}}`, value); });
    return text;
  }, [base]);
  const loc = useCallback((value) => (value && typeof value === 'object' ? value[lang] ?? value.fr : value), [lang]);
  return { t, loc, lang };
}

/** Texte saisi par l'adhérent : identique dans toutes les langues. */
export const sameText = (text) => ({ fr: text, ar: text, zgh: text });

/** AAAA-MM-JJ → JJ/MM/AAAA (même format dans les trois langues). */
export const formatDate = (iso) => (iso ? iso.split('-').reverse().join('/') : '');

export const todayIso = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

export function ageFrom(birthIso) {
  const [year, month, day] = birthIso.split('-').map(Number);
  const now = new Date();
  let age = now.getFullYear() - year;
  if (now.getMonth() + 1 < month || (now.getMonth() + 1 === month && now.getDate() < day)) age -= 1;
  return age;
}

/** Couleur de chaque état de demande. */
export const STATUS_TONE = { sent: 'info', review: 'info', missing: 'warning', accepted: 'success', refused: 'danger' };
export const STATUS_ICON = { sent: 'fa-paper-plane', review: 'fa-hourglass-half', missing: 'fa-file-circle-exclamation', accepted: 'fa-circle-check', refused: 'fa-circle-xmark' };
export const OPEN_STATUSES = ['sent', 'review', 'missing'];

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
