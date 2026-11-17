import { useState } from 'react';
import SecondaryLayout from '@/components/layout/SecondaryLayout';
import { useLanguage } from '@/i18n/LanguageProvider';
import { assetUrl, url } from '@/lib/paths';
import { icons, image, labels, services, serviceText } from './data/prestations.content';

const SERVICE_KEYS = Object.keys(services);

/** Sélecteur de prestations : liste à gauche, détail de la prestation choisie à droite. */
function Navigator({ lang, t, selected, onSelect }) {
  return (
    <div className="prestations-navigator">
      <nav className="prestations-category-nav" id="prestations-category-nav" aria-label="Rubriques prestations">
        {SERVICE_KEYS.map((key) => {
          const active = key === selected;
          return (
            <button key={key} className={`prestations-category-button${active ? ' is-active' : ''}`} type="button" aria-pressed={active ? 'true' : 'false'} onClick={() => onSelect(key)}>
              <span className="prestations-category-icon"><i className={`fa-solid ${icons[key]}`} aria-hidden="true"></i></span>
              <span>
                <strong>{serviceText(key, lang).title}</strong>
              </span>
            </button>
          );
        })}
      </nav>
      <article className="prestations-category-panel" id="prestations-category-panel">
        {SERVICE_KEYS.map((key) => {
          const item = serviceText(key, lang);
          return (
            <section key={key} className="prestations-category-detail" style={{ '--image': `url('${assetUrl(image[key])}')` }} hidden={key !== selected}>
              <div className="prestations-panel-body">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <ul className="prestations-subcategory-list">
                  {item.chips.map((chip) => <li key={chip}><i className="fa-solid fa-circle-check" aria-hidden="true"></i>{chip}</li>)}
                </ul>
                <a className="btn btn-primary" href={url(services[key].href)}>{t('discover')}</a>
              </div>
            </section>
          );
        })}
      </article>
    </div>
  );
}

function PrestationsContent() {
  const { lang } = useLanguage();
  const t = (key) => labels[lang]?.[key] || labels.fr[key] || key;
  // La prestation choisie est conservée lors d'un changement de langue.
  const [selected, setSelected] = useState('prevoyance');
  return (
    <main>
      <section className="page-hero-secondary prestations-hero">
        <div className="container">
          <span className="page-kicker"><i className="fa-solid fa-layer-group" aria-hidden="true"></i> <span id="prestations-kicker">{t('kicker')}</span></span>
          <h1 id="prestations-title">{t('catalogueTitle')}</h1>
          <p id="prestations-body">{t('catalogueBody')}</p>
          <div className="prestation-hero-actions">
            <a className="btn btn-primary" href="#prestations-navigator" id="prestations-explore">{t('explore')}</a>
            <a className="btn btn-secondary" href={url('contact.html')} id="prestations-contact">{t('contact')}</a>
          </div>
        </div>
      </section>

      <section className="section page-section-soft" id="prestations-navigator">
        <div className="container">
          <div className="prestation-section-head centered">
            <span className="section-tag"><i className="fa-solid fa-compass" aria-hidden="true"></i> FOS-Agri</span>
            <h2 id="prestations-flow-title">{t('flowTitle')}</h2>
          </div>
          {/* Recréé à chaque langue (réanimation des boutons, comme avant). */}
          <Navigator key={lang} lang={lang} t={t} selected={selected} onSelect={setSelected} />
        </div>
      </section>
    </main>
  );
}

export default function PrestationsPage() {
  return (
    <SecondaryLayout activePage="prestations" brandLabel="FOS-Agri accueil">
      <PrestationsContent />
    </SecondaryLayout>
  );
}
