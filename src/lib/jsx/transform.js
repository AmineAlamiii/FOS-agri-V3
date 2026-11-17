import { jsx as reactJsx } from 'react/jsx-runtime';
import { getActiveLang, hasNumber, isNumberIsolationSuspended, splitNumbers } from '../arabicNumbers.js';

// Éléments dont le texte ne doit jamais être modifié (comme l'ancien site).
const SKIPPED = new Set([
  'script', 'style', 'noscript', 'textarea', 'select', 'option', 'input', 'canvas',
  'svg', 'text', 'tspan', 'textPath'
]);

function isolate(child, index) {
  if (typeof child !== 'string' && typeof child !== 'number') return child;
  const text = String(child);
  if (!text.trim() || !hasNumber(text)) return child;
  const parts = splitNumbers(text).map((part, partIndex) =>
    part.number
      ? reactJsx('span', { className: 'ar-number-ltr', dir: 'ltr', children: part.number }, `n${index}-${partIndex}`)
      : part.text
  );
  return parts;
}

/** Applique l'isolation des nombres aux enfants texte d'un élément HTML. */
export function transformProps(type, props) {
  if (getActiveLang() !== 'ar' || isNumberIsolationSuspended() || typeof type !== 'string' || SKIPPED.has(type)) return props;
  if (!props || props.children == null || props['data-no-number-ltr'] != null) return props;
  const { children } = props;
  if (Array.isArray(children)) {
    let changed = false;
    const next = children.flatMap((child, index) => {
      const result = isolate(child, index);
      if (result !== child) changed = true;
      return Array.isArray(result) ? result : [result];
    });
    return changed ? { ...props, children: next } : props;
  }
  const result = isolate(children, 0);
  return result === children ? props : { ...props, children: result };
}
