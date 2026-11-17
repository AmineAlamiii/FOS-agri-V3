import SecondaryLayout from '@/components/layout/SecondaryLayout';
import { useDocumentMeta, usePageT } from '@/i18n/usePageT';
import { url } from '@/lib/paths';
import { fondationI18n } from './fondation.i18n';

const CARDS = [
  { id: 'minister', icon: 'fa-user-tie', href: 'la-fondation/mot-du-ministre/index.html' },
  { id: 'president', icon: 'fa-user-check', href: 'la-fondation/mot-du-president/index.html' },
  { id: 'history', icon: 'fa-clock-rotate-left', href: 'histoire-mission-valeurs.html' },
  { id: 'governance', icon: 'fa-building-columns', href: 'la-fondation/gouvernance/index.html' }
];

function FondationContent() {
  const t = usePageT(fondationI18n);
  useDocumentMeta(t('title'), t('description'));
  return (
    <main id="content">
      <section className="page-hero-secondary fondation-hero">
        <div className="container">
          <span className="page-kicker">
            <i className="fa-solid fa-landmark" aria-hidden="true"></i> <span>{t('hero.kicker')}</span>
          </span>
          <h1>{t('hero.title')}</h1>
          <p>{t('hero.body')}</p>
          <div className="foundation-hero-actions">
            <a className="btn btn-primary" href={url('histoire-mission-valeurs.html')}>{t('hero.primary')}</a>
            <a className="btn btn-light" href={url('la-fondation/gouvernance/index.html')}>{t('hero.secondary')}</a>
          </div>
        </div>
      </section>

      <section className="section page-section-soft foundation-path-section" aria-labelledby="foundation-path-title">
        <div className="container">
          <header className="foundation-section-head">
            <span className="section-tag">{t('path.tag')}</span>
            <h2 id="foundation-path-title">{t('path.title')}</h2>
            <p>{t('path.body')}</p>
          </header>
          <div className="foundation-pages-grid">
            {CARDS.map((card) => (
              <article key={card.id} className="page-card foundation-page-card">
                <span className="page-card-icon"><i className={`fa-solid ${card.icon}`} aria-hidden="true"></i></span>
                <h3>{t(`cards.${card.id}.title`)}</h3>
                <p>{t(`cards.${card.id}.body`)}</p>
                <a className="service-link" href={url(card.href)}>{t(`cards.${card.id}.link`)}</a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function FondationPage() {
  return (
    <SecondaryLayout activePage="fondation" brandLabel="FOS-Agri accueil">
      <FondationContent />
    </SecondaryLayout>
  );
}
