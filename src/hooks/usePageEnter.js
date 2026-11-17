import { useEffect } from 'react';

/** Animation d'entrée de page (en-tête + héros), une seule fois au chargement. */
export function usePageEnter() {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const root = document.documentElement;
    root.classList.add('sec-entering');
    const clear = () => root.classList.remove('sec-entering');
    const done = () => window.setTimeout(clear, 1500);
    if (document.readyState === 'complete') done();
    else window.addEventListener('load', done, { once: true });
    const safety = window.setTimeout(clear, 4000);
    return () => window.clearTimeout(safety);
  }, []);
}
