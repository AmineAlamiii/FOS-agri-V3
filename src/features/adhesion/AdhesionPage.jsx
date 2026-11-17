import SecondaryLayout from '@/components/layout/SecondaryLayout';
import { useDocumentMeta } from '@/i18n/usePageT';
import { assetUrl, url } from '@/lib/paths';
import AdhesionHero from './AdhesionHero';
import { ADHESION_SECTIONS } from './adhesion.data';
import { useAdhesionText } from './useAdhesionText';

function CatalogCard({ section }) {
  const { t, tr } = useAdhesionText();
  const image = assetUrl(section.image);
  return (
    <article className="adhesion-catalog-card">
      <a href={url(section.page)}>
        <span className="adhesion-catalog-media" style={{ '--image': `url('${image}')` }}>
          <img src={image} alt={tr(section.title)} loading="lazy" decoding="async" />
          <span><i className={`fa-solid ${section.icon}`} aria-hidden="true"></i></span>
        </span>
        <span className="adhesion-catalog-body">
          <small>{tr(section.eyebrow)}</small>
          <strong>{tr(section.title)}</strong>
          <span>{tr(section.summary)}</span>
          <em>{`${t('discover')} `}<i className="fa-solid fa-arrow-right" aria-hidden="true"></i></em>
        </span>
      </a>
    </article>
  );
}

/** Accueil de l'espace Adhésion : catalogue des rubriques. */
function AdhesionContent() {
  const { lang, t } = useAdhesionText();
  useDocumentMeta(`FOS-Agri | ${t('kicker')}`, t('body'));
  return (
    // Tout le contenu est recréé au changement de langue, comme l'ancien rendu.
    <main id="adhesion-root" key={lang}>
      <AdhesionHero />
      <section className="section page-section-soft" id="adhesion-catalog">
        <div className="container">
          <div className="adhesion-section-head centered">
            <span className="section-tag"><i className="fa-solid fa-compass" aria-hidden="true"></i> FOS-Agri</span>
            <h2>{t('overviewTitle')}</h2>
          </div>
          <div className="adhesion-catalog-grid">
            {ADHESION_SECTIONS.map((section) => <CatalogCard key={section.id} section={section} />)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="adhesion-cta-panel">
            <div>
              <h2>{t('orientationTitle')}</h2>
              <p>{t('orientationBody')}</p>
            </div>
            <a className="btn btn-primary" href={url('contact.html')}>{t('orientationCta')}</a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function AdhesionPage() {
  return (
    <SecondaryLayout activePage="adhesion" brandLabel="FOS-Agri accueil">
      <AdhesionContent />
    </SecondaryLayout>
  );
}
