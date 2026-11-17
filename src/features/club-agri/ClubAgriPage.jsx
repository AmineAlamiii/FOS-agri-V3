import { useRef } from 'react';
import SecondaryLayout from '@/components/layout/SecondaryLayout';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { useSiteT } from '@/i18n/useSiteT';
import { url } from '@/lib/paths';

/** Page « Club Agri » : avantages négociés avec les partenaires. */
function ClubAgriContent() {
  const t = useSiteT();
  const mainRef = useRef(null);
  useRevealOnScroll(mainRef);
  return (
    <main ref={mainRef}>
      <section className="hero service-hero">
        <div className="hero-media" aria-hidden="true"></div>
        <div className="container hero-content">
          <div className="service-meta"><i className="fa-solid fa-handshake"></i><span>{t('pages.club.kicker')}</span></div>
          <h1>{t('pages.club.title')}</h1>
          <p className="hero-description">{t('pages.club.intro')}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={url('index.html#partners')}>{t('pages.club.cta')}</a>
            <a className="btn btn-secondary" href={url('index.html#news')}>{t('news.more')}</a>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container service-layout">
          <article className="service-box">
            <h3>{t('pages.club.card1Title')}</h3>
            <p>{t('pages.club.card1Body')}</p>
          </article>
          <aside className="service-summary">
            <h3>{t('pages.club.card2Title')}</h3>
            <p>{t('pages.club.card2Body')}</p>
          </aside>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <article className="service-box">
            <h3>{t('pages.club.card3Title')}</h3>
            <p>{t('pages.club.card3Body')}</p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default function ClubAgriPage() {
  return (
    <SecondaryLayout activePage="special" brandLabel="FOS-Agri accueil">
      <ClubAgriContent />
    </SecondaryLayout>
  );
}
