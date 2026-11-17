import { siteData } from '@/data/siteData';
import { localizedEntry } from '@/i18n/useSiteT';
import { url } from '@/lib/paths';

/** « Tout un écosystème de soutien » : une carte par prestation. */
export default function ServicesSection({ t, lang }) {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-head reveal-on-scroll is-visible">
          <div>
            <div className="section-tag">{t('services.tag')}</div>
            <h2>{t('services.title')}</h2>
          </div>
        </div>
        <div className="services-grid" id="services-grid" aria-live="polite">
          {siteData.services.map((service) => {
            const content = localizedEntry(service, lang);
            const card = (
              <article key={`${lang}-${service.key}`} className="service-card">
                <div className="service-icon" aria-hidden="true">
                  <i className={`fa-solid ${service.icon}`}></i>
                </div>
                <h3>{content.title}</h3>
                <p>{content?.description || content?.excerpt || ''}</p>
              </article>
            );
            return service.href ? <a key={`${lang}-${service.key}`} className="service-card-link" href={url(service.href)}>{card}</a> : card;
          })}
        </div>
      </div>
    </section>
  );
}
