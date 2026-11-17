import { CONTACT, SOCIAL_LINKS } from '@/config/navigation';
import { isolateNumbersInHtml } from '@/lib/arabicNumbers';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useSiteT } from '@/i18n/useSiteT';
import { url } from '@/lib/paths';

/** Pied de page de l'accueil (balisage d'origine, textes de siteData). */
export default function HomeFooter() {
  const t = useSiteT();
  const { lang } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="container footer-grid" id="footer-links">
        <div>
          <a className="brand footer-brand" href="#top">
            <span className="brand-mark footer-brand-mark">
              <img src={url('assets/images/logo.png')} alt="Logo FOS-Agri" width="78" height="60" loading="lazy" decoding="async" />
            </span>
            <span className="brand-copy">
              <strong>FOS-Agri</strong>
            </span>
          </a>
          <p className="footer-copy">{t('footer.about')}</p>
        </div>
        <div>
          <h3>{t('footer.usefulTitle')}</h3>
          <ul className="footer-links">
            <li><a href="#news">{t('footer.useful1')}</a></li>
            <li><a href={url('contact.html')}>{t('footer.useful2')}</a></li>
            <li><a href={`mailto:${CONTACT.email}`}>{t('footer.useful3')}</a></li>
          </ul>
        </div>
        <div>
          <h3>{t('footer.quickTitle')}</h3>
          <ul className="footer-links">
            <li><a href={url('espace-adherent.html')}>{t('footer.quick1')}</a></li>
            <li><a href={url('prestations.html')}>{t('footer.quick2')}</a></li>
            <li><a href={url('espace-documentaire.html')}>{t('footer.quick3')}</a></li>
          </ul>
        </div>
        <div>
          <h3>{t('footer.contactTitle')}</h3>
          <ul className="footer-links">
            <li>
              <a href={`mailto:${CONTACT.email}`}>
                <i className="fa-solid fa-envelope"></i>
                {` ${CONTACT.email} `}
              </a>
            </li>
            <li>
              <a href={CONTACT.phoneHref}>
                <i className="fa-solid fa-phone"></i>{' '}
                <span>{CONTACT.phoneLabel}</span>
              </a>
            </li>
            <li>
              <a href={CONTACT.mapsHref} target="_blank">
                <i className="fa-solid fa-location-dot"></i>{' '}
                <span>{t('contact.address')}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <div className="footer-meta">
          <p>{t('footer.copy')}</p>
          {/* Le crédit contient un lien : texte HTML fourni par les traductions. */}
          <p className="footer-credit" dangerouslySetInnerHTML={{ __html: isolateNumbersInHtml(t('footer.credit') || '', lang) }}></p>
        </div>
        <div className="footer-social">
          {SOCIAL_LINKS.map((link) => (
            <a key={link.label} href={link.href} target="_blank" className="footer-social-link" aria-label={link.label}><i className={`fa-brands ${link.icon}`}></i></a>
          ))}
        </div>
      </div>
    </footer>
  );
}
