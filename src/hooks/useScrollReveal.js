import { useEffect } from 'react';

const SELECTORS = [
  '.section > .container > *', '.page-card', '.page-list-item', '.page-news-card',
  '.foundation-highlight', '.foundation-page-card', '.org-node', '.org-direction', '.gov-card',
  '.minister-card', '.president-card', '.value-card', '.prestation-section-head', '.prestation-nav-chip',
  '.prestation-card', '.prestation-feature-card', '.prestation-partner-card', '.prestation-timeline-item',
  '.prestation-accordion-item', '.prestation-center-keypoints', '.prestation-cta-panel', '.prestation-panel',
  '.prestations-category-button', '.prestations-category-detail'
].join(',');

const SCALE = '.prestation-card, .prestation-feature-card, .prestation-partner-card, .prestation-timeline-item, .prestation-accordion-item, .page-card';
const FADE = '.prestation-section-head, .section > .container > h1, .section > .container > h2, .section > .container > p';
const EXCLUDED = '.site-header, .site-footer, .search-modal, .floating-social, .page-hero-secondary';

/**
 * Apparition progressive des blocs au défilement (pages secondaires).
 * Ajoute les mêmes attributs/classes que l'ancien site. Si React réécrit la
 * classe d'un bloc déjà visible, la classe « is-scroll-visible » est remise.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const root = document.documentElement;
    root.classList.add('scroll-motion-ready');
    const seen = new WeakSet();
    const visible = new WeakSet();
    let order = 0;

    const reveal = (el) => {
      visible.add(el);
      el.classList.add('is-scroll-visible');
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.1 });

    const register = () => {
      document.querySelectorAll(SELECTORS).forEach((el) => {
        if (seen.has(el) || el.closest(EXCLUDED)) return;
        seen.add(el);
        el.setAttribute('data-scroll-reveal', '');
        if (el.matches(SCALE)) el.setAttribute('data-reveal-style', 'scale');
        else if (el.matches(FADE)) el.setAttribute('data-reveal-style', 'fade');
        el.style.setProperty('--scroll-reveal-delay', `${Math.min(order % 6, 5) * 45}ms`);
        order += 1;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.94) {
          requestAnimationFrame(() => reveal(el));
          return;
        }
        observer.observe(el);
      });
    };

    // Premier passage à l'image suivante : le contenu rendu au montage est alors en place.
    const firstFrame = requestAnimationFrame(register);
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        const el = record.target;
        if (record.type === 'attributes' && visible.has(el) && !el.classList.contains('is-scroll-visible')) {
          el.classList.add('is-scroll-visible');
        }
      });
      if (records.some((record) => record.addedNodes?.length)) requestAnimationFrame(register);
    });
    mutations.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    return () => {
      cancelAnimationFrame(firstFrame);
      root.classList.remove('scroll-motion-ready');
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);
}
