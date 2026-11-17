import { siteData } from '@/data/siteData';
import { assetUrl } from '@/lib/paths';

/** Logos partenaires en défilement continu (deux séries identiques). */
export default function PartnersSection({ t, lang }) {
  const logos = (hidden) => (
    <div className="partners-set" aria-hidden={hidden ? 'true' : undefined}>
      {siteData.partners.map((partner) => (
        <article key={`${lang}-${partner.name}`} className="partner-card">
          <img src={assetUrl(partner.logo)} alt={partner.name} loading="lazy" />
        </article>
      ))}
    </div>
  );
  return (
    <section className="section partners-section" id="partners">
      <div className="container">
        <div className="section-head reveal-on-scroll is-visible">
          <div>
            <div className="section-tag">{t('partners.tag')}</div>
            <h2>{t('partners.title')}</h2>
          </div>
        </div>
        <div className="partners-marquee">
          <div className="partners-track" id="partners-grid" aria-live="polite">
            {logos(false)}
            {logos(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
