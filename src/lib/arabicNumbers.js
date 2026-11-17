/**
 * Isolation des nombres en arabe (RTL).
 *
 * L'ancien site parcourait le DOM après chaque rendu et entourait chaque
 * nombre d'un <span class="ar-number-ltr" dir="ltr">. Ici, la même
 * transformation est faite au moment du rendu React (voir ./jsx), ce qui
 * produit exactement le même HTML sans modifier le DOM derrière React.
 */
const NUMBER_PATTERN = /\d[\d\s.,:/+()-]*\d%?|\d%?/g;

// Langue active partagée via globalThis : le runtime JSX peut être chargé
// comme un module séparé (pré-empaquetage Vite en développement).
const STATE_KEY = '__fosAgriActiveLang';
globalThis[STATE_KEY] = globalThis[STATE_KEY] || 'fr';

export function setActiveLang(lang) {
  globalThis[STATE_KEY] = lang;
}

export function getActiveLang() {
  return globalThis[STATE_KEY];
}

export function hasNumber(text) {
  NUMBER_PATTERN.lastIndex = 0;
  return NUMBER_PATTERN.test(text);
}

/** Découpe un texte en segments { text } et { number }. */
export function splitNumbers(text) {
  const parts = [];
  let lastIndex = 0;
  NUMBER_PATTERN.lastIndex = 0;
  text.replace(NUMBER_PATTERN, (match, offset) => {
    if (offset > lastIndex) parts.push({ text: text.slice(lastIndex, offset) });
    parts.push({ number: match });
    lastIndex = offset + match.length;
    return match;
  });
  if (lastIndex < text.length) parts.push({ text: text.slice(lastIndex) });
  return parts;
}

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

/** Même transformation pour du HTML brut (dangerouslySetInnerHTML). */
export function isolateNumbersInHtml(html, lang = getActiveLang()) {
  if (lang !== 'ar' || !html) return html;
  return html.replace(/(<(script|style|svg|select|textarea)\b[\s\S]*?<\/\2>)|(<[^>]+>)|([^<]+)/gi, (all, skipped, _tag, tag, text) => {
    if (skipped || tag) return all;
    if (!text.trim() || !hasNumber(text)) return text;
    return splitNumbers(text)
      .map((part) => (part.number ? `<span class="ar-number-ltr" dir="ltr">${part.number}</span>` : part.text))
      .join('');
  });
}

export { escapeHtml };
