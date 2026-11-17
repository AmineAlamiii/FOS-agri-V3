import { useEffect } from 'react';

/**
 * Adresse avec ancre (ex. contact.html#coordonnees) : le contenu étant rendu
 * par React, le navigateur ne trouve pas la cible au moment où il défile
 * normalement. On reproduit donc son comportement : à la fin du chargement de
 * la page, défilement (doux, via le CSS du site) jusqu'à l'ancre.
 */
export function useInitialHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return undefined;
    let frame = 0;
    let cancelled = false;
    // Attendre aussi les polices web : leur chargement change la hauteur des titres.
    const scroll = () => {
      const fontsReady = document.fonts?.ready || Promise.resolve();
      fontsReady.then(() => {
        if (cancelled) return;
        frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
      });
    };
    if (document.readyState === 'complete') scroll();
    else window.addEventListener('load', scroll, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', scroll);
      cancelAnimationFrame(frame);
    };
  }, []);
}
