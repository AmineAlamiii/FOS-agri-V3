/**
 * Défilement animé vers une sous-rubrique (en tenant compte de l'en-tête
 * et du menu collants) + effet de mise en avant de la cible.
 */
const root = document.documentElement;
const body = document.body;

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function visibleStickyHeight(element) {
  if (!element) return 0;
  const styles = window.getComputedStyle(element);
  if (!['fixed', 'sticky'].includes(styles.position)) return 0;
  const rect = element.getBoundingClientRect();
  if (rect.height <= 0 || rect.bottom <= 0) return 0;
  return rect.height;
}

/** Relance l'animation CSS de mise en avant sur la cible. */
export function revealScrollTarget(target) {
  if (!target || prefersReducedMotion()) return;
  target.classList.remove('is-service-scroll-reveal');
  void target.offsetWidth;
  target.classList.add('is-service-scroll-reveal');
}

let activeScrollAnimation = 0;
let activeScrollBehavior = '';
let activeBodyScrollBehavior = '';
let activeOverflowAnchor = '';

function stopAnimatedScroll() {
  if (!activeScrollAnimation) return;
  window.cancelAnimationFrame(activeScrollAnimation);
  activeScrollAnimation = 0;
  root.style.scrollBehavior = activeScrollBehavior;
  body.style.scrollBehavior = activeBodyScrollBehavior;
  root.style.overflowAnchor = activeOverflowAnchor;
}

function setPageScrollTop(top) {
  const scroller = document.scrollingElement || root;
  scroller.scrollTop = top;
  if (scroller !== body) body.scrollTop = top;
}

function animatePageScrollTo(top, duration = 720, options = {}) {
  stopAnimatedScroll();
  const shouldReduceMotion = options.respectReducedMotion !== false && prefersReducedMotion();
  if (shouldReduceMotion || duration <= 0) {
    const previousRootBehavior = root.style.scrollBehavior;
    const previousBodyBehavior = body.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    body.style.scrollBehavior = 'auto';
    setPageScrollTop(top);
    root.style.scrollBehavior = previousRootBehavior;
    body.style.scrollBehavior = previousBodyBehavior;
    return;
  }
  const start = window.scrollY;
  const distance = top - start;
  if (Math.abs(distance) < 2) return;
  const startedAt = window.performance.now();
  activeScrollBehavior = root.style.scrollBehavior;
  activeBodyScrollBehavior = body.style.scrollBehavior;
  activeOverflowAnchor = root.style.overflowAnchor;
  root.style.scrollBehavior = 'auto';
  body.style.scrollBehavior = 'auto';
  root.style.overflowAnchor = 'none';
  const step = (now) => {
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = -(Math.cos(Math.PI * progress) - 1) / 2;
    setPageScrollTop(start + distance * eased);
    if (progress < 1) {
      activeScrollAnimation = window.requestAnimationFrame(step);
      return;
    }
    activeScrollAnimation = 0;
    root.style.scrollBehavior = activeScrollBehavior;
    body.style.scrollBehavior = activeBodyScrollBehavior;
    root.style.overflowAnchor = activeOverflowAnchor;
  };
  activeScrollAnimation = window.requestAnimationFrame(step);
}

/** Fait défiler la page jusqu'à `target`, sous l'en-tête et le menu de la prestation. */
export function scrollToServiceTarget(target, scope, options = {}) {
  if (!target) return;
  const header = document.querySelector('.site-header');
  const serviceNav = scope?.querySelector?.('.prestation-nav');
  const offset = visibleStickyHeight(header) + visibleStickyHeight(serviceNav) + 28;
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
  if (options.duration) {
    animatePageScrollTo(top, options.duration, options);
  } else {
    stopAnimatedScroll();
    window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
  revealScrollTarget(target);
}
