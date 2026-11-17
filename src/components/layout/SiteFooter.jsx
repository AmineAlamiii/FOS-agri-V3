import { CONTACT, SOCIAL_LINKS } from '@/config/navigation';
import { useSecondaryT } from '@/i18n/useSecondaryT';
import { url } from '@/lib/paths';

/** Pied de page commun (identique à celui de l'accueil). */
export default function SiteFooter() {
  const t = useSecondaryT();
  return (
    <footer className="site-footer">
      <div className="container footer-grid" id="footer-links">
        <div>
          <a className="brand footer-brand" href={url('index.html')}>
            <span className="brand-mark footer-brand-mark"><img src={url('assets/images/logo.png')} alt="Logo FOS-Agri" width="78" height="60" loading="lazy" decoding="async" /></span>
            <span className="brand-copy"><strong>FOS-Agri</strong></span>
          </a>
          <p className="footer-copy">{t('footerAbout')}</p>
        </div>
        <div>
          <h3>{t('usefulTitle')}</h3>
          <ul className="footer-links">
            <li><a href={url('index.html#news')}>{t('useful1')}</a></li>
            <li><a href={url('contact.html')}>{t('useful2')}</a></li>
            <li><a href={`mailto:${CONTACT.email}`}>{t('useful3')}</a></li>
          </ul>
        </div>
        <div>
          <h3>{t('quickTitle')}</h3>
          <ul className="footer-links">
            <li><a href={url('espace-adherent.html')}>{t('quick1')}</a></li>
            <li><a href={url('prestations.html')}>{t('quick2')}</a></li>
            <li><a href={url('espace-documentaire.html')}>{t('quick3')}</a></li>
          </ul>
        </div>
        <div>
          <h3>{t('contactTitle')}</h3>
          <ul className="footer-links">
            <li><a href={`mailto:${CONTACT.email}`}><i className="fa-solid fa-envelope"></i>{` ${CONTACT.email}`}</a></li>
            <li><a href={CONTACT.phoneHref}><i className="fa-solid fa-phone"></i> <span>{CONTACT.phoneLabel}</span></a></li>
            <li><a href={CONTACT.mapsHref} target="_blank" rel="noopener"><i className="fa-solid fa-location-dot"></i> <span>{t('ctc_address')}</span></a></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <div className="footer-meta">
          <p>{t('copy')}</p>
          <p className="footer-credit">Powered by <a href="https://neonovia.com/" target="_blank" rel="noopener noreferrer">NEONOVIA</a></p>
        </div>
        <div className="footer-social">
          {SOCIAL_LINKS.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener" className="footer-social-link" aria-label={link.label}><i className={`fa-brands ${link.icon}`}></i></a>
          ))}
        </div>
      </div>
    </footer>
  );
}
