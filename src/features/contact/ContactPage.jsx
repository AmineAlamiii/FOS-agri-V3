import SecondaryLayout from '@/components/layout/SecondaryLayout';
import { SOCIAL_LINKS } from '@/config/navigation';
import { useSecondaryT } from '@/i18n/useSecondaryT';

// Le JSX est créé au rendu (pas au chargement du module) pour suivre la langue active.
const CONTACT_CARDS = [
  { icon: 'fa-envelope', titleKey: 'ctc_emailTitle', renderContent: () => <a href="mailto:fos-agri@fos-agri.ma">fos-agri@fos-agri.ma</a> },
  { icon: 'fa-phone', titleKey: 'ctc_phoneTitle', renderContent: () => <a href="tel:+212537774748">+212 537 77 47 48</a> },
  { icon: 'fa-map-location-dot', titleKey: 'ctc_addressTitle', textKey: 'ctc_address' }
];

function ContactContent() {
  const t = useSecondaryT();
  return (
    <main>
      <section className="page-hero-secondary">
        <div className="container">
          <span className="page-kicker"><i className="fa-solid fa-location-dot"></i> <span>{t('contactKicker')}</span></span>
          <h1>{t('contactTitle')}</h1>
          <p>{t('contactBody')}</p>
        </div>
      </section>

      <section className="section" id="coordonnees">
        <div className="container page-grid-3">
          {CONTACT_CARDS.map((card) => (
            <article key={card.titleKey} className="page-card">
              <span className="page-card-icon"><i className={`fa-solid ${card.icon}`}></i></span>
              <h3>{t(card.titleKey)}</h3>
              <p>{card.textKey ? t(card.textKey) : card.renderContent()}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section page-section-soft" id="relais-regionaux">
        <div className="container page-grid-2">
          <article className="page-card">
            <h2>{t('ctc_relaisTitle')}</h2>
            <p>{t('ctc_relaisBody')}</p>
            <ul>
              <li>{t('ctc_relais1')}</li>
              <li>{t('ctc_relais2')}</li>
              <li>{t('ctc_relais3')}</li>
            </ul>
          </article>
          <article className="page-card">
            <h2>{t('ctc_demandesTitle')}</h2>
            <p>{t('ctc_demandesBody')}</p>
          </article>
        </div>
      </section>

      <section className="section" id="reseaux-sociaux">
        <div className="container">
          <article className="page-card">
            <h2>{t('ctc_socialTitle')}</h2>
            <p>{t('ctc_socialBody')}</p>
            <p style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              {SOCIAL_LINKS.map((link) => (
                <a key={link.label} className="btn btn-primary" href={link.href} target="_blank" rel="noopener">
                  <i className={`fa-brands ${link.icon}`} style={{ marginRight: '.5rem' }}></i>{link.label}
                </a>
              ))}
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container page-map-card">
          <iframe title="Localisation FOS-Agri Rabat" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=461%20Avenue%20Hassan%20II%20Agdal%20Rabat&output=embed"></iframe>
        </div>
      </section>
    </main>
  );
}

export default function ContactPage() {
  return (
    <SecondaryLayout activePage="contact">
      <ContactContent />
    </SecondaryLayout>
  );
}
