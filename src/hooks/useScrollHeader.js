import { useEffect } from 'react';

/**
 * En-tête qui se masque en descendant et réapparaît en remontant.
 * `home` : variante de l'accueil (en-tête transparent tant qu'on ne remonte pas).
 */
export function useScrollHeader(headerRef, { home = false } = {}) {
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return undefined;
    const topThreshold = 12;
    const directionThreshold = 6;
    const hideThreshold = 72;
    let lastScrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    let ticking = false;

    const show = (scrolled) => {
      header.classList.toggle('is-scrolled', scrolled);
      header.classList.remove('is-hidden');
      header.style.transform = 'translateY(0)';
      header.style.opacity = '1';
      header.style.pointerEvents = 'auto';
    };
    const hide = () => {
      header.classList.add('is-hidden');
      header.classList.toggle('is-scrolled', !home);
      header.style.transform = 'translateY(calc(-100% - 0.75rem))';
      header.style.opacity = '0';
      header.style.pointerEvents = 'none';
    };
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const delta = scrollTop - lastScrollTop;
      if (scrollTop <= topThreshold) {
        show(false);
        lastScrollTop = 0;
        ticking = false;
        return;
      }
      if (delta > directionThreshold && scrollTop > hideThreshold) hide();
      else if (delta < -directionThreshold) show(true);
      else if (!home && !header.classList.contains('is-hidden')) show(true);
      lastScrollTop = Math.max(0, scrollTop);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, [headerRef, home]);
}
