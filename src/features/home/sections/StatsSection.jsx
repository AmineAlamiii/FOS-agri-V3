import { useCallback, useEffect, useRef, useState } from 'react';
import { siteData } from '@/data/siteData';
import { localizedEntry } from '@/i18n/useSiteT';

const DEFAULT_ICONS = ['fa-users', 'fa-file-signature', 'fa-map-location-dot', 'fa-coins'];
const TESTIMONIALS = Array.isArray(siteData.testimonials) ? siteData.testimonials : [];

/** Carrousel de témoignages (auto toutes les 5 s, flèches, points, glisser). */
function Testimonials({ t, lang }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const cardRef = useRef(null);
  const touchStartRef = useRef(0);
  const count = TESTIMONIALS.length;
  const go = useCallback((next) => setIndex((next + count) % count), [count]);
  const stop = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);
  const start = useCallback(() => {
    stop();
    if (count < 2) return;
    timerRef.current = setInterval(() => setIndex((current) => (current + 1) % count), 5000);
  }, [count, stop]);

  // Redémarre à chaque changement de langue (comme le rendu d'origine).
  useEffect(() => {
    start();
    return stop;
  }, [start, stop, lang]);

  const pagination = t('testimonials.pagination') || 'Choisir un témoignage';
  const choose = (next) => {
    go(next);
    start();
  };

  return (
    <div className="testimonial-card reveal-on-scroll is-visible" id="testimonial-card" ref={cardRef}
      onFocus={stop}
      onBlur={(event) => { if (!cardRef.current?.contains(event.relatedTarget)) start(); }}>
      <div className="section-tag">{t('testimonials.tag')}</div>
      <div className="testimonial-viewport" id="testimonial-viewport"
        onTouchStart={(event) => { touchStartRef.current = event.changedTouches[0]?.clientX || 0; stop(); }}
        onTouchEnd={(event) => {
          const delta = (event.changedTouches[0]?.clientX || 0) - touchStartRef.current;
          if (Math.abs(delta) > 45) go(index + (delta < 0 ? 1 : -1));
          start();
        }}>
        <div className="testimonial-track" id="testimonial-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {TESTIMONIALS.map((item, slide) => {
            const content = localizedEntry(item, lang) || {};
            return (
              <article key={`${lang}-${slide}`} className="testimonial-slide" aria-hidden={slide === index ? 'false' : 'true'}>
                <p className="testimonial-category">{content.category}</p>
                <blockquote>{`“${content.quote}”`}</blockquote>
                <p className="testimonial-author">{content.author}</p>
                <p className="testimonial-role">{content.role}</p>
              </article>
            );
          })}
        </div>
      </div>
      <div className="testimonial-controls">
        <button className="testimonial-arrow" id="testimonial-prev" type="button" aria-label={t('testimonials.previous') || 'Témoignage précédent'} onClick={() => choose(index - 1)}>
          <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
        </button>
        <div className="testimonial-dots" id="testimonial-dots" role="group" aria-label={pagination}>
          {TESTIMONIALS.map((_, dot) => (
            <button key={`${lang}-${dot}`} className={`testimonial-dot${dot === index ? ' is-active' : ''}`} type="button" aria-label={`${pagination} ${dot + 1}`} aria-current={dot === index ? 'true' : 'false'} onClick={() => choose(dot)}></button>
          ))}
        </div>
        <button className="testimonial-arrow" id="testimonial-next" type="button" aria-label={t('testimonials.next') || 'Témoignage suivant'} onClick={() => choose(index + 1)}>
          <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

/** Chiffres clés + témoignages. */
export default function StatsSection({ t, lang }) {
  return (
    <section className="section stats-section" id="stats">
      <div className="container">
        <div className="section-head reveal-on-scroll is-visible">
          <div>
            <div className="section-tag">{t('stats.tag')}</div>
            <h2>{t('stats.title')}</h2>
          </div>
        </div>
        <div className="stats-layout">
          <div className="stats-grid" id="stats-grid" aria-live="polite">
            {siteData.stats.map((item, index) => (
              <article key={`${lang}-${index}`} className="stat-card">
                <div className="stat-icon" aria-hidden="true"><i className={`fa-solid ${item.icon || DEFAULT_ICONS[index] || 'fa-chart-line'}`}></i></div>
                <strong>{item.value}</strong>
                <span>{item[lang] || item.fr || item.ar || ''}</span>
              </article>
            ))}
          </div>
          {TESTIMONIALS.length > 0 && <Testimonials t={t} lang={lang} />}
        </div>
      </div>
    </section>
  );
}
