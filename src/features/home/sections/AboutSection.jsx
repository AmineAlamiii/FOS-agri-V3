const SCOPE = ['about.scope1', 'about.scope2', 'about.scope3', 'about.scope4', 'about.scope5', 'about.scope6'];

/** « La Fondation » : présentation, mission, périmètre, promesse. */
export default function AboutSection({ t }) {
  return (
    <section className="section intro" id="about">
      <div className="container intro-grid">
        <div className="reveal-on-scroll is-visible">
          <div className="section-tag">{t('about.tag')}</div>
          <h2>{t('about.title')}</h2>
          <p>{t('about.body')}</p>
        </div>
        <div className="intro-panel reveal-on-scroll is-visible">
          <div className="intro-list-item">
            <strong><i className="fa-solid fa-bullseye"></i> <span>{t('about.missionTitle')}</span></strong>
            <p>{t('about.missionBody')}</p>
          </div>
          <div className="intro-list-item">
            <strong><i className="fa-solid fa-layer-group"></i> <span>{t('about.scopeTitle')}</span></strong>
            <ul className="intro-scope-list">
              {SCOPE.map((key) => <li key={key}>{t(key)}</li>)}
            </ul>
          </div>
          <div className="intro-list-item">
            <strong><i className="fa-solid fa-hand-holding-heart"></i> <span>{t('about.promiseTitle')}</span></strong>
            <p>{t('about.promiseBody')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
