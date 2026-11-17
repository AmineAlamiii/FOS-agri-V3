import SecondaryLayout from '@/components/layout/SecondaryLayout';
import { useDocumentMeta } from '@/i18n/usePageT';
import { url } from '@/lib/paths';
import AdhesionHero from './AdhesionHero';
import { ADHESION_SECTIONS } from './adhesion.data';
import { useAdhesionText } from './useAdhesionText';

function SectionHead({ section, withSummary = true }) {
  const { tr } = useAdhesionText();
  return (
    <div className="adhesion-section-head">
      <span className="section-tag"><i className={`fa-solid ${section.icon}`} aria-hidden="true"></i>{` ${tr(section.eyebrow)}`}</span>
      <h2>{tr(section.title)}</h2>
      {withSummary && <p>{tr(section.summary)}</p>}
    </div>
  );
}

/** Rubrique « Nos adhérents » : une carte par situation. */
function Adherents({ section }) {
  const { tr } = useAdhesionText();
  return (
    <div className="adhesion-feature-grid">
      {section.cards.map((entry) => (
        <article key={entry.id} className="adhesion-feature-card" id={entry.id}>
          <span className="adhesion-card-icon"><i className={`fa-solid ${entry.icon}`} aria-hidden="true"></i></span>
          <h3>{tr(entry.title)}</h3>
          <p>{tr(entry.body)}</p>
        </article>
      ))}
    </div>
  );
}

/** Rubrique « Procédure d'adhésion » : pièces à fournir par situation. */
function Procedure({ section }) {
  const { t, tr } = useAdhesionText();
  return (
    <div className="adhesion-procedure-grid">
      {section.groups.map((group) => (
        <article key={group.id} className="adhesion-procedure-card" id={group.id}>
          <span className="adhesion-card-icon"><i className={`fa-solid ${group.icon}`} aria-hidden="true"></i></span>
          <h3>{tr(group.title)}</h3>
          {group.intro && <p>{tr(group.intro)}</p>}
          {group.items.length > 0 && (
            <ul className="adhesion-doc-list">
              {group.items.map((entry) => (
                <li key={entry.label.fr}>
                  <span>{tr(entry.label)}</span>
                  {entry.href && <a className="adhesion-download" href={url(entry.href)} download><i className="fa-solid fa-download" aria-hidden="true"></i>{t('download')}</a>}
                </li>
              ))}
            </ul>
          )}
          {group.cta && <div className="adhesion-card-actions"><a className="btn btn-primary" href={url('contact.html')}>{t('orientationCta')}</a></div>}
        </article>
      ))}
    </div>
  );
}

/** Rubrique « Cotisations » : montant mensuel par catégorie. */
function Cotisations({ section }) {
  const { t, tr } = useAdhesionText();
  return (
    <>
      <div className="adhesion-fee-grid">
        {section.fees.map((entry) => (
          <article key={entry.label.fr} className="adhesion-fee-card">
            <h3>{tr(entry.label)}</h3>
            <div className="adhesion-fee-amount">
              <small>{t('monthly')}</small>
              <strong>{entry.amount}</strong>
            </div>
          </article>
        ))}
      </div>
      <div className="adhesion-cta-panel">
        <div>
          <h2>{t('orientationTitle')}</h2>
          <p>{t('orientationBody')}</p>
        </div>
        <a className="btn btn-primary" href={url('contact.html')}>{t('contact')}</a>
      </div>
    </>
  );
}

function SectionContent({ sectionId }) {
  const { lang, t, tr } = useAdhesionText();
  const section = ADHESION_SECTIONS.find((entry) => entry.id === sectionId) || ADHESION_SECTIONS[0];
  useDocumentMeta(`FOS-Agri | ${tr(section.title) || t('kicker')}`, tr(section.summary));
  const Body = section.cards ? Adherents : section.groups ? Procedure : Cotisations;
  return (
    <main id="adhesion-root" key={lang}>
      <AdhesionHero section={section} />
      <section className="adhesion-detail-nav" aria-label={t('overviewTitle')}>
        <div className="container adhesion-detail-nav-inner">
          {ADHESION_SECTIONS.map((entry) => (
            <a key={entry.id} className={`adhesion-nav-chip${entry.id === section.id ? ' is-active' : ''}`} href={url(entry.page)} aria-current={entry.id === section.id ? 'page' : undefined}>
              <i className={`fa-solid ${entry.icon}`} aria-hidden="true"></i>
              <span>{tr(entry.title)}</span>
            </a>
          ))}
        </div>
      </section>
      <section className="section page-section-soft" id="adhesion-detail-content">
        <div className="container">
          <SectionHead section={section} withSummary={!section.hideSummary} />
          <Body section={section} />
        </div>
      </section>
    </main>
  );
}

/** Page d'une rubrique Adhésion (adhérents, procédure, cotisations). */
export default function AdhesionSectionPage({ sectionId }) {
  return (
    <SecondaryLayout activePage="adhesion" brandLabel="FOS-Agri accueil">
      <SectionContent sectionId={sectionId} />
    </SecondaryLayout>
  );
}
