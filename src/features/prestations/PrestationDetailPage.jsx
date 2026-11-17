import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import SecondaryLayout from '@/components/layout/SecondaryLayout';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useDocumentMeta } from '@/i18n/usePageT';
import { assetUrl, url } from '@/lib/paths';
import AmcSection from './components/AmcSection';
import AmtsSection from './components/AmtsSection';
import CenterSection, { centerItemId } from './components/CenterSection';
import { subrubriqueId } from './components/common';
import { ExtraSection } from './components/ExtraSections';
import { icons, image, labels, serviceText, subIcons } from './data/prestations.content';
import { revealScrollTarget, scrollToServiceTarget } from './lib/serviceScroll';

const FLOATING_ICONS = ['fa-hand-holding-heart', 'fa-shield-heart', 'fa-people-group'];

/** Contenu d'une prestation (recréé à chaque changement de langue, comme avant). */
function DetailBody({ serviceKey, lang }) {
  const item = serviceText(serviceKey, lang);
  const t = (key) => labels[lang]?.[key] || labels.fr[key] || key;
  const langLabels = { bankOffers: labels[lang]?.bankOffers || labels.fr.bankOffers, medicalPartners: labels[lang]?.medicalPartners || labels.fr.medicalPartners };
  const menu = item.menuItems || item.chips.map((chip, index) => ({ id: subrubriqueId(index), icon: subIcons[serviceKey]?.[index] || 'fa-circle-check', label: chip }));
  const extras = item.extraSections?.length && item.chips?.length
    ? item.extraSections.map((section, index) => ({
      section,
      navIndex: Number.isInteger(section.navIndex) ? section.navIndex : item.chips.length - item.extraSections.length + index
    }))
    : [];
  const hasAmc = Boolean(item.amcDetail);
  const hasAmts = Boolean(item.amtsDetail);
  const legacyBlocks = !item.centerMedical && serviceKey !== 'projets';
  useDocumentMeta(`FOS-Agri | ${item.title}`, item.summary);

  const centerRef = useRef(null);
  const amcRef = useRef(null);
  const amtsRef = useRef(null);
  const extraRefs = useRef({});
  // shown = null : affichage initial (« À propos » visible, aucun onglet encore choisi).
  const [shown, setShown] = useState(null);
  const [activeChip, setActiveChip] = useState(0);
  const [centerOpen, setCenterOpen] = useState(-1);
  const [request, setRequest] = useState(null);

  const kindOf = useCallback((index) => ({
    isAmc: index === 1 && hasAmc,
    isAmts: index === 2 && hasAmts,
    isExtra: extras.some((entry) => entry.navIndex === index)
  }), [hasAmc, hasAmts, extras]);

  /** Affiche la sous-rubrique `index` (et fait défiler si demandé). */
  const showTab = useCallback((index, shouldScroll) => {
    const kind = kindOf(index);
    setActiveChip(index < menu.length ? index : -1);
    setShown(index);
    if (!kind.isAmc && !kind.isAmts && !kind.isExtra && index > 1) {
      // Lien vers un élément de l'accordéon « À propos » : on l'ouvre.
      const centerIndex = (item.centerMedical?.items || []).findIndex((entry, i) => centerItemId(entry, i) === subrubriqueId(index));
      if (centerIndex > -1) setCenterOpen(centerIndex);
    }
    setRequest((previous) => ({ seq: (previous?.seq || 0) + 1, index, shouldScroll, ...kind }));
  }, [kindOf, menu.length, item.centerMedical]);

  // Après l'affichage : URL (#…), défilement et mise en avant de la cible.
  useLayoutEffect(() => {
    if (!request) return;
    const { index, isAmc, isAmts, isExtra, shouldScroll } = request;
    const target = isAmc ? amcRef.current
      : isAmts ? amtsRef.current
        : isExtra ? extraRefs.current[index]
          : index === 0 ? centerRef.current : document.getElementById(subrubriqueId(index));
    window.history?.pushState?.(null, '', `#${isAmc ? subrubriqueId(index) : target?.id || subrubriqueId(index)}`);
    if (shouldScroll && target) scrollToServiceTarget(target, document.getElementById('prestation-detail-root'));
    else revealScrollTarget(target);
  }, [request]);

  // Ouverture directe via #… dans l'URL, et liens « Voir plus ».
  // useLayoutEffect : l'onglet est affiché avant le premier rendu à l'écran (comme l'ancien script).
  useLayoutEffect(() => {
    const hashIndex = () => {
      const { hash } = window.location;
      const direct = menu.findIndex((_, index) => `#${subrubriqueId(index)}` === hash);
      if (direct > -1) return direct;
      const alias = decodeURIComponent((hash || '').replace(/^#/, ''));
      return menu.findIndex((navItem) => navItem.id === alias);
    };
    const onHashChange = () => {
      const index = hashIndex();
      if (index > -1) showTab(index, false);
    };
    window.addEventListener('hashchange', onHashChange);
    const initial = hashIndex();
    if (initial > 0) showTab(initial, false);
    else if (!item.centerMedical && extras.length) showTab(0, false);
    return () => window.removeEventListener('hashchange', onHashChange);
    // Une seule fois par rendu de la page (comme l'ancien script).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = shown === null ? null : kindOf(shown);
  const centerVisible = !current || (!current.isAmc && !current.isAmts && !current.isExtra);
  const navClasses = ['container', 'prestation-nav-inner', menu.length === 7 && 'is-split-nav', serviceKey === 'culture' && 'is-culture-nav', serviceKey === 'prevoyance' && 'is-prevoyance-nav'].filter(Boolean).join(' ');

  return (
    <>
      <section className="prestation-detail-hero" style={{ '--hero-image': `url('${assetUrl(image[serviceKey])}')` }}>
        <div className="container">
          <span className="page-kicker"><i className={`fa-solid ${icons[serviceKey]}`} aria-hidden="true"></i>{` ${item.meta}`}</span>
          <h1>{item.title}</h1>
          <p>{item.summary}</p>
          <div className="prestation-hero-actions">
            <a className="btn btn-primary" href={`#${item.centerMedical ? subrubriqueId(0) : 'overview'}`}>{t('details')}</a>
            <a className="btn btn-secondary" href={url('prestations.html')}>{t('back')}</a>
          </div>
        </div>
        <div className="prestation-floating-icons" aria-hidden="true">
          {menu.slice(0, 3).map((_, index) => <span key={index}><i className={`fa-solid ${FLOATING_ICONS[index]}`} aria-hidden="true"></i></span>)}
        </div>
      </section>

      <section className="prestation-nav">
        <div className={navClasses}>
          {menu.map((navItem, index) => (
            <a key={navItem.id} className={`prestation-nav-chip${activeChip === index ? ' is-active' : ''}`} href={`#${subrubriqueId(index)}`} onClick={(event) => { event.preventDefault(); showTab(index, true); }}>
              <i className={`fa-solid ${navItem.icon}`} aria-hidden="true"></i>
              <span>{navItem.label}</span>
            </a>
          ))}
        </div>
      </section>

      {legacyBlocks && (
        <section className="section" id="overview">
          <div className="container prestation-content-grid">
            <article className="prestation-panel">
              <span className="section-tag"><i className={`fa-solid ${icons[serviceKey]}`} aria-hidden="true"></i>{` ${item.meta}`}</span>
              <h2>{t('details')}</h2>
              <p>{item.overview}</p>
            </article>
          </div>
        </section>
      )}

      {item.centerMedical && (
        <CenterSection ref={centerRef} center={item.centerMedical} visible={centerVisible} tabActive={Boolean(current) && centerVisible} openIndex={centerOpen} onOpenChange={setCenterOpen} seeMoreLabel={t('seeMore')} />
      )}
      {hasAmc && <AmcSection ref={amcRef} detail={item.amcDetail} visible={Boolean(current?.isAmc)} />}
      {hasAmts && <AmtsSection ref={amtsRef} detail={item.amtsDetail} visible={Boolean(current?.isAmts)} />}
      {extras.map(({ section, navIndex }) => (
        <ExtraSection
          key={`${navIndex}-${section.type || 'extra'}`}
          ref={(node) => { extraRefs.current[navIndex] = node; }}
          section={section}
          navIndex={navIndex}
          visible={shown === navIndex}
          labels={langLabels}
          lang={lang}
          subIcons={subIcons}
        />
      ))}

      {legacyBlocks && (
        <>
          <section className="section page-section-soft" id="subrubriques">
            <div className="container">
              <div className="prestation-section-head centered">
                <h2>{t('subrubriques')}</h2>
                <p>{item.summary}</p>
              </div>
              <div className="prestation-feature-grid">
                {item.features.map(([title, body], index) => (
                  <article key={index} className="prestation-feature-card" id={subrubriqueId(index)}>
                    <span className="page-card-icon"><i className={`fa-solid ${subIcons[serviceKey]?.[index] || 'fa-circle-check'}`} aria-hidden="true"></i></span>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section className="section" id="partners">
            <div className="container">
              <div className="prestation-section-head">
                <h2>{t('partners')}</h2>
                <p>{item.meta}</p>
              </div>
              <div className="prestation-partner-grid">
                {item.partners.map((partner) => <article key={partner} className="prestation-partner-card"><h3>{partner}</h3></article>)}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

function DetailContent({ serviceKey }) {
  const { lang } = useLanguage();
  return (
    <main id="prestation-detail-root">
      <DetailBody key={lang} serviceKey={serviceKey} lang={lang} />
    </main>
  );
}

/** Page d'une prestation (services/<prestation>.html). */
export default function PrestationDetailPage({ serviceKey }) {
  return (
    <SecondaryLayout activePage="prestations" brandLabel="FOS-Agri accueil">
      <DetailContent serviceKey={serviceKey} />
    </SecondaryLayout>
  );
}
