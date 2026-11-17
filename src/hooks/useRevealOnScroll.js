import { useEffect } from 'react';

const STAGGER = '.service-card, .service-box, .news-card, .news-slide-mini, .news-item-mini, .timeline-item, .agenda-event-card, .stat-card, .partner-card, .contact-item, .member-card';
const TARGETS = '.section-head, .intro-grid > *, .service-card, .service-box, .service-summary, .news-card, .news-slide-mini, .news-item-mini, .timeline-item, .agenda-event-card, .stat-card, .testimonial-card, .region-card, .member-card, .partner-card, .contact-item, .footer-grid > div';

/**
 * Apparition au défilement de l'accueil et des pages « service »
 * (ex-initRevealAnimations de app.js) : classes reveal-on-scroll / is-visible.
 * `scope` : élément racine dans lequel chercher les blocs (par défaut tout le document).
 */
export function revealOnScroll(scope = document) {
  const targets = [...scope.querySelectorAll(TARGETS)];
  if (!targets.length) return () => {};
  targets.forEach((item) => {
    item.classList.add('reveal-on-scroll');
    const siblings = item.parentElement ? [...item.parentElement.children].filter((child) => child.matches?.(STAGGER)) : [];
    if (siblings.length > 1 && item.matches?.(STAGGER)) {
      item.style.transitionDelay = `${Math.min(siblings.indexOf(item), 5) * 70}ms`;
    }
  });
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    targets.forEach((item) => item.classList.add('is-visible'));
    return () => {};
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16 });
  targets.forEach((item) => {
    if (!item.classList.contains('is-visible')) observer.observe(item);
  });
  return () => observer.disconnect();
}

/** Version hook : appliqué une fois le contenu de la page monté. */
export function useRevealOnScroll(ref) {
  useEffect(() => revealOnScroll(ref?.current || document), [ref]);
}
