import SecondaryLayout from '@/components/layout/SecondaryLayout';
import { useDocumentMeta, usePageT } from '@/i18n/usePageT';
import { assetUrl, url } from '@/lib/paths';

/**
 * Gabarit commun « Mot du Ministre » / « Mot du Président ».
 * `prefix` : préfixe des clés de traduction et des classes CSS (minister | president).
 */
function MessageContent({ prefix, dictionary, message, withIntro }) {
  const t = usePageT(dictionary);
  const k = (key) => t(`${prefix}.${key}`);
  useDocumentMeta(k('seo.title'), k('seo.description'));

  return (
    <main id="content">
      <section className={`page-hero-secondary ${prefix}-hero`}>
        <div className="container">
          <nav className={`${prefix}-breadcrumb`} aria-label={k('breadcrumb.label')}>
            <ol>
              <li><a href={url('index.html')}>{k('breadcrumb.home')}</a></li>
              <li><a href={url('fondation.html')}>{k('breadcrumb.foundation')}</a></li>
              <li aria-current="page">{k('breadcrumb.page')}</li>
            </ol>
          </nav>
          <span className="page-kicker">
            <i className="fa-solid fa-user-tie" aria-hidden="true"></i> <span>{k('hero.kicker')}</span>
          </span>
          <h1>{k('pageTitle')}</h1>
          {withIntro && <p>{k('hero.intro')}</p>}
        </div>
      </section>

      <section className={`section ${prefix}-section`} aria-labelledby={`${prefix}-message-title`}>
        <div className="container">
          <article className={`${prefix}-card`} id={`${prefix}-message-root`} data-state="ready">
            <div className={`${prefix}-grid`}>
              <div className={`${prefix}-media`}>
                <div className={`${prefix}-portrait-wrap`}>
                  <img className={`${prefix}-portrait`} src={assetUrl(message.image)} alt={t(message.imageAltKey)} loading="eager" decoding="async" />
                </div>
              </div>
              <div className={`${prefix}-content`}>
                <h2 className={`${prefix}-name`} id={`${prefix}-message-title`}>{k('name')}</h2>
                <p className={`${prefix}-position`}>{k('position')}</p>
                <div className={`${prefix}-divider`} aria-hidden="true"></div>
                <div className={`${prefix}-message`}>
                  {['paragraph1', 'paragraph2', 'paragraph3'].map((key) => <p key={key}>{k(`message.${key}`)}</p>)}
                </div>
                <footer className={`${prefix}-signature`}>
                  <p className={`${prefix}-signature-label`}>{k('signature.label')}</p>
                  <p className={`${prefix}-signature-name`}>{k('signature.name')}</p>
                  <p className={`${prefix}-signature-position`}>{k('signature.position')}</p>
                </footer>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export default function InstitutionalMessagePage(props) {
  return (
    <SecondaryLayout activePage="fondation" brandLabel="FOS-Agri accueil">
      <MessageContent {...props} />
    </SecondaryLayout>
  );
}
