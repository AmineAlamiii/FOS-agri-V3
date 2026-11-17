import { assetUrl, url } from '@/lib/paths';
import { ADHESION_SECTIONS, OVERVIEW_HERO_IMAGE } from './adhesion.data';
import { useAdhesionText } from './useAdhesionText';

/** Bandeau des pages Adhésion (accueil de l'espace ou page de rubrique). */
export default function AdhesionHero({ section }) {
  const { t, tr } = useAdhesionText();
  const detail = Boolean(section);
  const active = section || ADHESION_SECTIONS[0];
  const background = assetUrl(detail ? active.image : OVERVIEW_HERO_IMAGE);
  return (
    <section className={`adhesion-detail-hero${detail ? ' is-detail' : ''}`} style={{ '--hero-image': `url('${background}')` }}>
      <div className="container">
        <span className="page-kicker"><i className={`fa-solid ${active.heroIcon || 'fa-id-card'}`} aria-hidden="true"></i>{` ${detail ? tr(active.eyebrow) : t('kicker')}`}</span>
        <h1>{detail ? tr(active.title) : t('title')}</h1>
        {detail && !active.hideSummary && <p>{tr(active.summary)}</p>}
        <div className="adhesion-hero-actions">
          <a className="btn btn-primary" href={detail ? '#adhesion-detail-content' : '#adhesion-catalog'}>{detail ? t('details') : t('explore')}</a>
          <a className="btn btn-secondary" href={url(detail ? 'adhesion.html' : 'contact.html')}>{detail ? t('back') : t('contact')}</a>
        </div>
      </div>
      <div className="adhesion-floating-icons" aria-hidden="true">
        {ADHESION_SECTIONS.map((item) => <span key={item.id}><i className={`fa-solid ${item.icon}`}></i></span>)}
      </div>
    </section>
  );
}
