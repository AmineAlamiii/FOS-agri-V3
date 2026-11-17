import SecondaryLayout from '@/components/layout/SecondaryLayout';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useDocumentMeta, usePageT } from '@/i18n/usePageT';
import { url } from '@/lib/paths';
import { TIMELINE, VALUES } from './histoire.data';
import { histoireI18n } from './histoire.i18n';

const byOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0);
const activeTimeline = TIMELINE.filter((entry) => entry && entry.isActive !== false).sort(byOrder);
const activeValues = VALUES.filter((value) => value && value.isActive !== false).sort(byOrder);

function Timeline({ t }) {
  if (!activeTimeline.length) {
    return <ol className="hmv-timeline" id="hmv-timeline" data-state="empty"><li className="hmv-timeline-status">{t('timeline.empty')}</li></ol>;
  }
  return (
    <ol className="hmv-timeline" id="hmv-timeline" data-state="ready">
      {activeTimeline.map((entry, index) => (
        <li key={entry.id} className={`hmv-timeline-item${index % 2 === 1 ? ' is-right' : ''}`}>
          <article className="hmv-card">
            <span className="hmv-card-year">{entry.icon && <i className={entry.icon} aria-hidden="true"></i>}<span>{entry.year}</span></span>
            {entry.titleKey && <h3 className="hmv-card-title">{t(entry.titleKey)}</h3>}
            {entry.items?.length > 0 && (
              <ul className="hmv-card-items">{entry.items.map((item) => <li key={item.id}>{t(item.textKey)}</li>)}</ul>
            )}
          </article>
        </li>
      ))}
    </ol>
  );
}

function Values({ t }) {
  if (!activeValues.length) {
    return <div className="hmv-values-render" id="hmv-values" data-state="empty"><p className="hmv-values-status">{t('values.empty')}</p></div>;
  }
  return (
    <div className="hmv-values-render" id="hmv-values" data-state="ready">
      <div className="values-cards">
        <article className="page-card values-intro-card">
          <h3>{t('values.intro.title')}</h3>
          <p>{t('values.intro.body')}</p>
        </article>
        <div className="values-timeline" aria-label={t('sections.values.title')}>
          {activeValues.map((value) => (
            <article key={value.id} className="page-card timeline-item" id={value.id}>
              <span className="timeline-dot" aria-hidden="true"></span>
              <span className="value-node-icon" aria-hidden="true"><i className={value.icon || 'fa-solid fa-circle'}></i></span>
              <h3>{t(value.titleKey)}</h3>
              <p>{t(value.descKey)}</p>
            </article>
          ))}
        </div>
        <img className="values-line-art" src={url('line.svg')} alt="" aria-hidden="true" />
      </div>
    </div>
  );
}

function HistoireContent() {
  const t = usePageT(histoireI18n);
  const { lang } = useLanguage();
  useDocumentMeta(`FOS-Agri | ${t('page.title')}`);
  return (
    <main id="content">
      <section className="page-hero-secondary">
        <div className="container">
          <span className="page-kicker">
            <i className="fa-solid fa-clock-rotate-left" aria-hidden="true"></i> <span>{t('hero.kicker')}</span>
          </span>
          <h1>{t('page.title')}</h1>
          <p>{t('hero.lead')}</p>
        </div>
      </section>

      <section className="section hmv-section" id="histoire" aria-labelledby="histoire-title">
        <div className="container">
          <header className="hmv-section-head">
            <span className="section-tag">{t('sections.history.tag')}</span>
            <h2 id="histoire-title">{t('sections.history.title')}</h2>
            <p className="section-copy">{t('sections.history.intro')}</p>
          </header>
          <div className="hmv-timeline-wrap" role="region" aria-label={t('sections.history.ariaTimeline')}>
            {/* Recréée à chaque langue, comme l'ancien rendu (réanimation des cartes). */}
            <Timeline key={lang} t={t} />
          </div>
        </div>
      </section>

      <section className="section hmv-section page-section-soft" id="mission" aria-labelledby="mission-title">
        <div className="container hmv-mission">
          <div className="hmv-mission-text">
            <span className="section-tag">{t('sections.mission.tag')}</span>
            <h2 id="mission-title">{t('sections.mission.title')}</h2>
            <p>{t('sections.mission.paragraph1')}</p>
            <p>{t('sections.mission.paragraph2')}</p>
            <p>{t('sections.mission.paragraph3')}</p>
          </div>
          <aside className="hmv-mission-card" aria-hidden="true">
            <i className="fa-solid fa-bullseye hmv-mission-icon"></i>
            <p>{t('sections.mission.quote')}</p>
          </aside>
        </div>
      </section>

      <section className="section hmv-section page-section-soft hmv-values-section" id="valeurs" aria-labelledby="valeurs-title">
        <div className="container">
          <header className="hmv-section-head values-head">
            <span className="section-tag">{t('sections.values.tag')}</span>
            <h2 id="valeurs-title">{t('sections.values.title')}</h2>
            <p className="section-copy">{t('sections.values.intro')}</p>
          </header>
          <Values key={lang} t={t} />
        </div>
      </section>
    </main>
  );
}

export default function HistoirePage() {
  return (
    <SecondaryLayout activePage="histoire-mission-valeurs" brandLabel="FOS-Agri accueil">
      <HistoireContent />
    </SecondaryLayout>
  );
}
