import { useEffect, useRef, useState } from 'react';
import { siteData } from '@/data/siteData';
import { url } from '@/lib/paths';

const config = siteData.heroMedia || {};
const displayMode = ['video', 'images', 'both'].includes(config.displayMode) ? config.displayMode : 'video';
const SLIDES = (Array.isArray(config.slides) ? config.slides : []).filter((slide) => {
  if (displayMode === 'both') return slide.type === 'video' || slide.type === 'image';
  if (displayMode === 'images') return slide.type === 'image';
  return slide.type === 'video';
});

/** Diaporama du héros (vidéo et/ou images, selon siteData.heroMedia). */
function HeroSlides() {
  const [active, setActive] = useState(0);
  const slidesRef = useRef(null);

  useEffect(() => {
    const slides = [...(slidesRef.current?.querySelectorAll('.hero-slide') || [])];
    if (!slides.length) return undefined;
    let timer;
    const next = () => setActive((index) => (index + 1) % slides.length);
    slides.forEach((slide, index) => {
      const video = slide.querySelector('video');
      if (!video) return;
      if (index === active) {
        video.loop = slides.length === 1;
        video.currentTime = 0;
        video.play().catch(() => {});
        video.onended = slides.length > 1 ? next : null;
      } else {
        video.pause();
        video.onended = null;
      }
    });
    if (!slides[active].querySelector('video')) timer = setTimeout(next, 5000);
    return () => clearTimeout(timer);
  }, [active]);

  // React ne pose pas l'attribut « muted » : on l'ajoute pour retrouver le balisage d'origine.
  useEffect(() => {
    slidesRef.current?.querySelectorAll('video').forEach((video) => video.setAttribute('muted', ''));
  }, []);

  return (
    <>
      <div className="hero-slides" id="hero-slides" ref={slidesRef}>
        {SLIDES.map((slide, index) => (slide.type === 'video' ? (
          <div key={slide.id} className={`hero-slide${index === active ? ' is-active' : ''}`} data-type="video" data-slide-id={slide.id}>
            <video className="hero-video" muted playsInline preload="auto">
              <source src={url(slide.src)} type={slide.mimeType || 'video/mp4'} />
            </video>
          </div>
        ) : (
          <div key={slide.id} className={`hero-slide${index === active ? ' is-active' : ''}`} data-image={slide.src} data-slide-id={slide.id} style={{ backgroundImage: `url("${slide.src}")` }}></div>
        )))}
      </div>
      <div className="hero-overlay"></div>
      <div className="hero-dots" id="hero-dots" hidden={SLIDES.length <= 1}>
        {SLIDES.length > 1 && SLIDES.map((slide, index) => (
          <button key={slide.id} className={`hero-dot ${index === active ? 'is-active' : ''}`} type="button" aria-label={`Slide ${index + 1}`} onClick={() => setActive(index)}></button>
        ))}
      </div>
    </>
  );
}

export default function HeroSection({ t }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-media" aria-hidden="true">
        <HeroSlides />
      </div>
      <div className="container hero-content">
        <div className="eyebrow">{t('hero.eyebrow')}</div>
        <h1>{t('hero.title')}</h1>
        <p className="hero-description">{t('hero.description')}</p>
        <div className="hero-actions">
          <a className="btn btn-hero-primary" href="#services">{t('hero.ctaServices')}</a>
          <a className="btn btn-hero-secondary" href={url('contact.html')}>{t('hero.ctaContact')}</a>
        </div>
      </div>
    </section>
  );
}
