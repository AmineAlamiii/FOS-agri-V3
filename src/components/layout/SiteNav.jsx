import { useEffect, useRef, useState } from 'react';
import { MAIN_NAV, MOBILE_QUERY } from '@/config/navigation';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useSecondaryT } from '@/i18n/useSecondaryT';
import { url } from '@/lib/paths';
import { useLayout } from './LayoutContext';

const isMobile = () => window.matchMedia(MOBILE_QUERY).matches;

/** Menu principal des pages secondaires (desktop + tiroir mobile). */
export default function SiteNav({ activePage }) {
  const t = useSecondaryT();
  const { lang, setLang } = useLanguage();
  const { menuOpen, setMenuOpen, setSearchOpen } = useLayout();
  const [openKey, setOpenKey] = useState(null);
  const navRef = useRef(null);

  // Un clic hors d'un sous-menu referme les sous-menus ouverts.
  useEffect(() => {
    const onClick = (event) => {
      if (!event.target.closest?.('.nav-item')) setOpenKey(null);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const toggleSubmenu = (event, key) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenKey((current) => (current === key ? null : key));
  };

  // Mobile : le premier appui sur un parent ouvre son sous-menu, le second navigue.
  const onParentClick = (event, key) => {
    if (!isMobile() || openKey === key) return;
    event.preventDefault();
    event.stopPropagation();
    setOpenKey(key);
  };

  // Fermer le tiroir après un lien ou le bouton de recherche.
  const onNavClick = (event) => {
    if (event.target.closest('a[href]') || event.target.closest('.mobile-search-btn, .nav-search-btn')) {
      setMenuOpen(false);
    }
  };

  const openSearch = (event) => {
    event.preventDefault();
    const nav = navRef.current;
    if (isMobile() && !(menuOpen && nav?.classList.contains('is-open'))) return;
    setSearchOpen(true);
  };

  return (
    <nav
      ref={navRef}
      className={`site-nav${menuOpen ? ' is-open' : ''}`}
      id="site-nav"
      aria-label={t('navLabel')}
      onClick={onNavClick}
    >
      {MAIN_NAV.map((entry) => {
        const active = activePage === entry.page;
        if (!entry.children) {
          return (
            <a key={entry.key} href={url(entry.href)} className={active ? 'is-active' : undefined} aria-current={active ? 'page' : undefined} data-nav-key={entry.key}>
              {t(entry.key)}
            </a>
          );
        }
        const open = openKey === entry.key;
        return (
          <div key={entry.key} className={`nav-item has-submenu${active ? ' is-active' : ''}${open ? ' is-open' : ''}`}>
            <a href={url(entry.href)} aria-current={active ? 'page' : undefined} data-nav-key={entry.key} onClick={(event) => onParentClick(event, entry.key)}>
              {t(entry.key)}
            </a>
            <button className="submenu-toggle" type="button" aria-label={`${t(entry.key)} - ${t('submenuLabel')}`} aria-expanded={open ? 'true' : 'false'} onClick={(event) => toggleSubmenu(event, entry.key)}>
              <i className="fa-solid fa-chevron-down"></i>
            </button>
            <div className="nav-submenu">
              {entry.children.map((child) => (
                <a key={child.key} href={url(child.href)}>{t(child.key)}</a>
              ))}
            </div>
          </div>
        );
      })}
      <button className="mobile-search-btn" type="button" data-header-search="true" aria-label={t('search')} onClick={openSearch}>
        <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>{` ${t('search')}`}
      </button>
      <a className="member-link mobile-only btn-cta-nav" href={url('espace-adherent.html')} data-nav-key="member">{t('member')}</a>
      <a className="member-link mobile-only btn-cta-nav btn-cta-nav--secondary" href={url('club-agri.html')} data-nav-key="club">{t('club')}</a>
      <div className="lang-toggle mobile-nav-lang" role="group" aria-label={t('langMenuLabel')}>
        {/* Espaces entre les boutons : identiques à l'ancien gabarit HTML. */}
        {[['fr', 'FR'], ['ar', 'AR'], ['zgh', 'ⵜⵎⵣⵉⵖⵜ']].map(([code, label]) => [
          ' ',
          <button key={code} className={`lang-btn${lang === code ? ' is-active' : ''}`} type="button" data-lang={code} onClick={() => setLang(code)}>
            {label}
          </button>
        ])}{' '}
      </div>
    </nav>
  );
}
