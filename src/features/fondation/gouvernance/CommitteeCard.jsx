import { useState } from 'react';
import { COMMITTEE_ICONS } from './committees.data';

const ACCENTS = { teal: 'var(--green)', neutral: '#4e5554' };
const isMobile = () => window.matchMedia('(max-width: 760px)').matches;

/** Bloc dépliable (composition / responsabilités) d'un comité. */
function GovBlock({ id, collapsible, label, title, intro, items, t }) {
  // Mobile : tout est replié. Desktop : la composition est ouverte, les responsabilités repliées.
  const [expanded, setExpanded] = useState(() => (isMobile() ? false : !collapsible));
  return (
    <div className={`gov-block${collapsible ? ' gov-block-collapsible' : ''}`}>
      <button className={`gov-toggle${collapsible ? ' gov-toggle-desktop' : ''}`} type="button" aria-expanded={expanded ? 'true' : 'false'} onClick={() => setExpanded(!expanded)}>
        <span>{label}</span>
        <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
      </button>
      <div className="gov-block-content" id={id} hidden={!expanded}>
        <h4 className="gov-block-title">{title}</h4>
        <p className="gov-block-intro">{intro}</p>
        <ul className="gov-list">{items.map((key) => <li key={key}>{t(key)}</li>)}</ul>
      </div>
    </div>
  );
}

/** Carte d'un comité de gouvernance. */
export default function CommitteeCard({ committee, t }) {
  return (
    <article className="gov-card" style={{ '--committee-accent': ACCENTS[committee.colorVariant] || 'var(--gold)' }}>
      <header className="gov-card-head">
        <span className="gov-card-number">{committee.number || ''}</span>
        <h3 className="gov-card-title">{t(committee.titleKey)}</h3>
        <span className="gov-card-icon" aria-hidden="true"><i className={COMMITTEE_ICONS[committee.icon] || 'fa-solid fa-circle-info'}></i></span>
      </header>
      <div className="gov-card-body">
        <GovBlock
          id={`composition-${committee.id}`}
          label={t('governance.actions.viewComposition')}
          title={t('governance.labels.composition')}
          intro={t(committee.introKey)}
          items={committee.compositionKeys || []}
          t={t}
        />
        <GovBlock
          id={`responsibilities-${committee.id}`}
          collapsible
          label={t('governance.actions.viewResponsibilities')}
          title={t('governance.labels.responsibilities')}
          intro={t(committee.responsibilityIntroKey)}
          items={committee.responsibilityKeys || []}
          t={t}
        />
      </div>
    </article>
  );
}
