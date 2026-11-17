import { useCallback, useEffect, useRef, useState } from 'react';
import { localizeNewsDate, localizedNews, NEWS, newsSlug } from '@/features/actualites/newsHelpers';
import { url } from '@/lib/paths';

const CATEGORIES = {
  fr: ['Portée stratégique', 'Gouvernance', 'Formation & Développement', 'Direction digitale', 'Comité innovation', 'Ressources humaines'],
  ar: ['بعد استراتيجي', 'الحكامة', 'التكوين والتطوير', 'التحول الرقمي', 'لجنة الابتكار', 'الموارد البشرية'],
  zgh: ['ⴰⵙⵓⵍⴰⵏ ⴰⵎⵓⵙⵙⵓ', 'ⴰⵏⴰⴹⴰⵎ', 'ⴰⵙⴳⵎⵉ ⴷ ⵜⵏⴼⵍⵉⵜ', 'ⴰⵙⵏⴼⵍ ⴰⵎⴰⵜⴰⵢ', 'ⴰⵙⵇⵇⵉⵎ ⵏ ⵓⵙⵏⴽⴻⵔ', 'ⵉⵎⴰⵍⴰⵙⵏ ⵉⵎⴷⴰⵏⵏ']
};
const FALLBACK_IMAGES = [
  'assets/images/news-vacances-2025.webp', 'assets/images/news-pathologie-bouregreg.jpg', 'assets/images/news-omra-2025.jpg',
  'assets/images/news-partenariat-sportif.jpg', 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=900&q=80',
  'assets/images/news-campagne-info.jpg'
];
const CARDS = NEWS.slice(0, 6);
const GAP = 24;

const imageOf = (item, index) => {
  const image = item?.image ? (item.image.startsWith('./assets/') ? item.image.slice(2) : item.image.replace(/^\.\//, 'assets/')) : FALLBACK_IMAGES[index % 6];
  return /^https?:/.test(image) ? image : url(image);
};
const metaOf = (item, index, lang) => {
  const categories = CATEGORIES[lang] || CATEGORIES.fr;
  return `${localizedNews(item, lang)?.category || categories[index % categories.length]} • ${localizeNewsDate(item.date, lang)}`;
};
const perView = () => (window.innerWidth <= 720 ? 1 : window.innerWidth <= 980 ? 2 : 3);

/** Carrousel des actualités (défilement auto, flèches, points, glisser). */
function NewsCarousel({ lang }) {
  const [index, setIndex] = useState(0);
  const [dotCount, setDotCount] = useState(() => Math.max(0, CARDS.length - perView()) + 1);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const timerRef = useRef(null);
  const indexRef = useRef(0);
  indexRef.current = index;

  const goTo = useCallback((next) => {
    const last = Math.max(0, CARDS.length - perView());
    setIndex(next > last ? 0 : next < 0 ? last : next);
  }, []);
  const startAuto = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => goTo(indexRef.current + 1), 4500);
  }, [goTo]);
  const stopAuto = useCallback(() => clearInterval(timerRef.current), []);

  // Position de la piste (mesurée sur la largeur réelle d'une carte).
  useEffect(() => {
    const track = trackRef.current;
    const card = track?.querySelector('.news-card');
    if (!card) return;
    const width = card.getBoundingClientRect().width + GAP;
    const rtl = document.documentElement.dir === 'rtl';
    track.style.transform = `translateX(${rtl ? index * width : -index * width}px)`;
  });

  useEffect(() => {
    startAuto();
    const onResize = () => {
      setIndex(0);
      setDotCount(Math.max(0, CARDS.length - perView()) + 1);
    };
    window.addEventListener('resize', onResize);
    return () => {
      stopAuto();
      window.removeEventListener('resize', onResize);
    };
  }, [startAuto, stopAuto]);

  // Glisser (souris ou doigt) pour passer d'une actualité à l'autre.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;
    let startX = 0;
    let startY = 0;
    let dragging = false;
    let pointerDown = false;
    const rtl = () => document.documentElement.dir === 'rtl';
    const begin = (x, y) => { startX = x; startY = y; dragging = false; pointerDown = true; stopAuto(); };
    const move = (x, y, event) => {
      if (!pointerDown) return;
      const dx = x - startX;
      if (!dragging && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(y - startY)) dragging = true;
      if (dragging && event?.cancelable) event.preventDefault();
    };
    const end = (x) => {
      if (!pointerDown) return;
      pointerDown = false;
      const dx = x - startX;
      if (dragging && Math.abs(dx) >= 40) goTo(indexRef.current + ((rtl() ? dx > 0 : dx < 0) ? 1 : -1));
      dragging = false;
      startAuto();
    };
    const handlers = {
      mouseenter: stopAuto,
      touchstart: (e) => begin(e.touches[0].clientX, e.touches[0].clientY),
      touchmove: (e) => move(e.touches[0].clientX, e.touches[0].clientY, e),
      touchend: (e) => end(e.changedTouches[0].clientX),
      touchcancel: () => { pointerDown = false; dragging = false; startAuto(); },
      mousedown: (e) => begin(e.clientX, e.clientY),
      mousemove: (e) => move(e.clientX, e.clientY, e),
      mouseup: (e) => end(e.clientX),
      mouseleave: () => { if (pointerDown) { pointerDown = false; dragging = false; } startAuto(); }
    };
    const options = { touchstart: { passive: true }, touchmove: { passive: false } };
    Object.entries(handlers).forEach(([name, fn]) => viewport.addEventListener(name, fn, options[name]));
    return () => Object.entries(handlers).forEach(([name, fn]) => viewport.removeEventListener(name, fn));
  }, [goTo, startAuto, stopAuto]);

  const step = (delta) => {
    goTo(index + delta);
    startAuto();
  };

  return (
    <>
      <div className="news-carousel">
        <button className="news-nav news-prev" type="button" id="news-prev" aria-label="Actualité précédente" onClick={() => step(-1)}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div className="news-viewport" ref={viewportRef}>
          <div className="news-grid" id="news-grid" aria-live="polite" ref={trackRef}>
            {CARDS.map((item, cardIndex) => {
              const content = localizedNews(item, lang);
              const slug = newsSlug(item, cardIndex);
              return (
                <a key={slug} className="news-card" href={`${url('actualite.html')}?article=${encodeURIComponent(slug)}`} aria-label={content.title}>
                  <div className="news-media" style={{ backgroundImage: `url('${imageOf(item, cardIndex)}')` }} aria-hidden="true"></div>
                  <div className="news-body">
                    <span className="news-date">{metaOf(item, cardIndex, lang)}</span>
                    <h3>{content.title}</h3>
                    <p>{content.excerpt}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        <button className="news-nav news-next" type="button" id="news-next" aria-label="Actualité suivante" onClick={() => step(1)}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
      <div className="news-dots" id="news-dots" aria-label="Navigation du carrousel des actualités">
        {Array.from({ length: dotCount }, (_, dot) => (
          <button key={dot} className={`news-dot ${dot === index ? 'is-active' : ''}`} type="button" aria-label={`Actualités ${dot + 1}`} onClick={() => { goTo(dot); startAuto(); }}></button>
        ))}
      </div>
    </>
  );
}

export default function NewsSection({ t, lang }) {
  return (
    <section className="section news-section" id="news">
      <div className="container">
        <div className="section-head reveal-on-scroll is-visible">
          <div>
            <div className="section-tag">{t('news.tag')}</div>
            <h2>{t('news.title')}</h2>
          </div>
          <a className="section-link" href={url('actualites.html')}>{t('news.more')}</a>
        </div>
        {/* Recréé à chaque langue : position et minuterie repartent de zéro, comme avant. */}
        <NewsCarousel key={lang} lang={lang} />
      </div>
    </section>
  );
}
