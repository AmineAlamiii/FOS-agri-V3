import SecondaryLayout from '@/components/layout/SecondaryLayout';
import { useDocumentMeta, usePageT } from '@/i18n/usePageT';
import { url } from '@/lib/paths';
import { valuesI18n } from './values.i18n';

// Les quatre valeurs, dans l'ordre de la frise.
const VALUES = [
  { id: 'equite', key: 'equity', icon: 'fa-scale-balanced' },
  { id: 'proximite', key: 'proximity', icon: 'fa-location-dot' },
  { id: 'sens-du-service', key: 'service', icon: 'fa-hand-holding-heart' },
  { id: 'inclusion', key: 'inclusion', icon: 'fa-handshake' }
];

function NosValeursContent() {
  const t = usePageT(valuesI18n);
  useDocumentMeta(`FOS-Agri | ${t('values.pageTitle')}`);
  return (
    <main id="content">
      <section className="page-hero-secondary values-hero">
        <div className="container">
          <span className="page-kicker">
            <i className="fa-solid fa-gem" aria-hidden="true"></i> <span>{t('values.hero.kicker')}</span>
          </span>
          <h1>{t('values.pageTitle')}</h1>
          <p>{t('values.hero.subtitle')}</p>
        </div>
      </section>

      <section className="section page-section-soft values-section" aria-labelledby="nos-valeurs-title">
        <div className="container">
          <header className="values-head">
            <span className="section-tag">{t('values.section.tag')}</span>
            <h2 id="nos-valeurs-title">{t('values.section.title')}</h2>
          </header>
          <div className="values-cards">
            <article className="page-card values-intro-card">
              <h3>{t('values.intro.title')}</h3>
              <p>{t('values.intro.body')}</p>
            </article>
            <div className="values-timeline" aria-label="Timeline des valeurs">
              {VALUES.map((value) => (
                <article key={value.id} className="page-card timeline-item" id={value.id}>
                  <span className="timeline-dot" aria-hidden="true"></span>
                  <span className="value-node-icon" aria-hidden="true"><i className={`fa-solid ${value.icon}`}></i></span>
                  <h3>{t(`values.${value.key}.title`)}</h3>
                  <p>{t(`values.${value.key}.body`)}</p>
                </article>
              ))}
            </div>
            <img className="values-line-art" src={url('line.svg')} alt="" aria-hidden="true" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default function NosValeursPage() {
  return (
    <SecondaryLayout activePage="nos-valeurs" brandLabel="FOS-Agri accueil">
      <NosValeursContent />
    </SecondaryLayout>
  );
}
