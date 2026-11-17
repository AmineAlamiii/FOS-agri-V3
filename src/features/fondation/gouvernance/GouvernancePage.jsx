import { useEffect, useState } from 'react';
import SecondaryLayout from '@/components/layout/SecondaryLayout';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useDocumentMeta, usePageT } from '@/i18n/usePageT';
import { url } from '@/lib/paths';
import CommitteeCard from './CommitteeCard';
import { COMMITTEES } from './committees.data';
import { governanceI18n } from './gouvernance.i18n';
import OrgChart from './OrgChart';

const activeCommittees = COMMITTEES.filter((item) => item && item.isActive !== false).sort((a, b) => (a.order || 0) - (b.order || 0));

/** Compteur incrémenté à chaque redimensionnement (les comités sont alors réinitialisés). */
function useResizeCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const onResize = () => setCount((value) => value + 1);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return count;
}

function GouvernanceContent() {
  const t = usePageT(governanceI18n);
  const { lang } = useLanguage();
  const resizeCount = useResizeCount();
  useDocumentMeta(`FOS-Agri | ${t('governance.pageTitle')}`);

  return (
    <main id="content">
      <section className="page-hero-secondary">
        <div className="container">
          <nav className="gov-breadcrumb" aria-label={t('governance.breadcrumb.label')}>
            <ol>
              <li><a href={url('index.html')}>{t('governance.breadcrumb.home')}</a></li>
              <li><a href={url('fondation.html')}>{t('governance.breadcrumb.foundation')}</a></li>
              <li aria-current="page">{t('governance.breadcrumb.governance')}</li>
            </ol>
          </nav>
          <span className="page-kicker">
            <i className="fa-solid fa-landmark" aria-hidden="true"></i> <span>{t('governance.hero.kicker')}</span>
          </span>
          <h1>{t('governance.pageTitle')}</h1>
          <p>{t('governance.intro.paragraph1')}</p>
          <p>{t('governance.intro.paragraph2')}</p>
        </div>
      </section>

      <section className="section gov-section" aria-labelledby="gov-committees-title">
        <div className="container">
          <header className="gov-section-head">
            <span className="section-tag">{t('governance.hero.kicker')}</span>
            <h2 id="gov-committees-title">{t('governance.section.title')}</h2>
            <p className="section-copy">{t('governance.section.description')}</p>
          </header>
          <div className="gov-grid" id="gov-grid" data-state={activeCommittees.length ? 'ready' : 'empty'}>
            {activeCommittees.length ? activeCommittees.map((committee) => (
              // Recréées au changement de langue et au redimensionnement, comme avant.
              <CommitteeCard key={`${committee.id}-${lang}-${resizeCount}`} committee={committee} t={t} />
            )) : (
              <article className="gov-status-card"><h3>{t('governance.empty.title')}</h3><p>{t('governance.empty.description')}</p></article>
            )}
          </div>
        </div>
      </section>

      <section className="section org-section" id="organigramme" aria-labelledby="gov-org-title">
        <div className="container">
          <header className="org-section-head">
            <span className="section-tag">{t('governance.hero.kicker')}</span>
            <h2 id="gov-org-title">{t('governance.org.title')}</h2>
            <p className="section-copy">{t('governance.org.intro')}</p>
          </header>
          <div className="org-chart-wrap" role="region" aria-label="Organigramme FOS-Agri">
            <OrgChart key={lang} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default function GouvernancePage() {
  return (
    <SecondaryLayout activePage="fondation" brandLabel="FOS-Agri accueil">
      <GouvernanceContent />
    </SecondaryLayout>
  );
}
