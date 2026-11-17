import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;
// Fichiers (PDF, images, vidéo…) : ouverts normalement, pas par le routeur.
const FILE_PATTERN = /\.(pdf|xlsx?|docx?|png|jpe?g|gif|webp|svg|mp4|zip)$/i;

/** Adresse interne au site → chemin du routeur (sans le préfixe GitHub Pages), sinon null. */
function toRouterPath(urlLike) {
  const target = new URL(urlLike, window.location.href);
  if (target.origin !== window.location.origin || !target.pathname.startsWith(BASE)) return null;
  if (FILE_PATTERN.test(target.pathname)) return null;
  return {
    path: `/${target.pathname.slice(BASE.length)}`,
    search: target.search,
    hash: target.hash
  };
}

/**
 * Les composants gardent de simples <a href> (balisage identique à l'origine) :
 * les clics vers une page du site passent par le routeur, sans rechargement.
 * Idem pour les formulaires GET internes (barre de recherche).
 */
export function useInternalNavigation() {
  const navigate = useNavigate();

  useEffect(() => {
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.('a[href]');
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const target = toRouterPath(link.href);
      if (!target) return;
      const samePage = target.path.replace(/\/$/, '') === `/${window.location.pathname.slice(BASE.length)}`.replace(/\/$/, '') && target.search === window.location.search;
      if (samePage && target.hash) return; // ancre sur la même page : comportement normal du navigateur
      event.preventDefault();
      navigate(`${target.path}${target.search}${target.hash}`);
    };
    const onSubmit = (event) => {
      const form = event.target;
      if (event.defaultPrevented || (form.method || 'get').toLowerCase() !== 'get' || !form.getAttribute('action')) return;
      const target = toRouterPath(form.action);
      if (!target) return;
      event.preventDefault();
      const query = new URLSearchParams(new FormData(form)).toString();
      navigate(`${target.path}${query ? `?${query}` : ''}`);
    };
    document.addEventListener('click', onClick);
    document.addEventListener('submit', onSubmit);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('submit', onSubmit);
    };
  }, [navigate]);
}
