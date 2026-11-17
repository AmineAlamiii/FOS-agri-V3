import { useEffect, useRef } from 'react';
import { animate, inView, stagger } from 'motion';
import { useLanguage } from '@/i18n/LanguageProvider';

const REVEAL_SELECTOR = [
  '.section-head', '.gov-section-head', '.org-section-head', '.prestation-section-head', '.intro-panel',
  '.intro-list-item', '.service-card', '.service-box', '.news-card', '.news-slide-mini', '.news-item-mini',
  '.agenda-event-card', '.stat-card', '.testimonial-card', '.region-card', '.member-card', '.partner-card',
  '.contact-item', '.page-card', '.page-list-item', '.prestation-card', '.prestation-panel', '.prestation-nav-chip',
  '.prestation-feature-card', '.prestation-extra-card', '.prestation-accordion-item', '.prestation-keypoints-panel',
  '.medical-partner-panel', '.bank-card', '.gov-card', '.org-node', '.footer-grid > div'
].join(',');

const EASE = [0.22, 1, 0.36, 1];
const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

const isRenderable = (element) => {
  if (!element || element.closest('[hidden], .is-hidden')) return false;
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
};

function animatePageEntrance() {
  const header = document.querySelector('.site-header');
  if (header) animate(header, { opacity: [0, 1], y: [-12, 0] }, { duration: 0.55, ease: EASE });

  const heroChildren = Array.from(new Set([
    ...qsa('.hero-content > *'),
    ...qsa('.page-hero-secondary .container > *'),
    ...qsa('.prestation-detail-hero .container > *')
  ])).filter(isRenderable);
  if (heroChildren.length) {
    animate(heroChildren, { opacity: [0, 1], y: [24, 0], filter: ['blur(6px)', 'blur(0px)'] }, { delay: stagger(0.08, { startDelay: 0.12 }), duration: 0.7, ease: EASE });
  }

  const heroMedia = document.querySelector('.hero-media, .prestation-detail-hero, .page-hero-secondary');
  if (heroMedia) animate(heroMedia, { scale: [1.025, 1] }, { duration: 1.2, ease: [0.16, 1, 0.3, 1] });
}

function initScrollReveals() {
  const revealed = new WeakSet();
  const registered = new WeakSet();

  const prepare = (scope = document) => {
    const candidates = scope.matches?.(REVEAL_SELECTOR) ? [scope, ...qsa(REVEAL_SELECTOR, scope)] : qsa(REVEAL_SELECTOR, scope);
    const targets = candidates.filter((target) => isRenderable(target) && !registered.has(target));
    if (!targets.length) return;
    targets.forEach((target) => {
      registered.add(target);
      target.dataset.motionReveal = 'true';
      target.style.willChange = 'transform, opacity';
    });
    inView(targets, (target) => {
      if (revealed.has(target) || !isRenderable(target)) return;
      revealed.add(target);
      const siblings = target.parentElement
        ? Array.from(target.parentElement.children).filter((child) => child.dataset.motionReveal === 'true')
        : [];
      const delay = Math.min(Math.max(0, siblings.indexOf(target)), 6) * 0.045;
      const controls = animate(target, { opacity: [0, 1], y: [22, 0], scale: [0.985, 1] }, { delay, duration: 0.62, ease: EASE });
      const clear = () => { target.style.willChange = ''; };
      if (controls?.finished?.finally) controls.finished.finally(clear);
      else window.setTimeout(clear, 900);
    }, { amount: 0.18, margin: '0px 0px -8% 0px' });
  };

  prepare();
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) prepare(node);
    }));
  });
  observer.observe(document.body, { childList: true, subtree: true });
  return () => observer.disconnect();
}

/**
 * Animations « motion » du site (ex-assets/motion-site.js) :
 * entrée de page, apparition au défilement, fondu au changement de langue.
 */
export function useMotion() {
  const { lang } = useLanguage();
  const firstLang = useRef(true);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('motion-dev-enabled');
    if (reducedMotion()) {
      root.classList.add('motion-dev-reduced');
      return undefined;
    }
    let cleanup;
    // Après le premier rendu complet, comme l'ancien script chargé en fin de page.
    const frame = requestAnimationFrame(() => {
      animatePageEntrance();
      cleanup = initScrollReveals();
    });
    return () => {
      cancelAnimationFrame(frame);
      cleanup?.();
    };
  }, []);

  // Léger fondu du corps de page à chaque changement de langue.
  useEffect(() => {
    if (firstLang.current) {
      firstLang.current = false;
      return;
    }
    if (reducedMotion()) return;
    animate(document.body, { opacity: [0.96, 1] }, { duration: 0.28, ease: 'easeOut' });
  }, [lang]);
}
