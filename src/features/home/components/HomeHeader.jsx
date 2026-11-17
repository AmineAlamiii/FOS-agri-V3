import { useCallback, useEffect, useRef, useState } from 'react';
import { useLayout } from '@/components/layout/LayoutContext';
import { MAIN_NAV, MOBILE_QUERY } from '@/config/navigation';
import { useScrollHeader } from '@/hooks/useScrollHeader';
import { useLanguage } from '@/i18n/LanguageProvider';
import { withoutNumberIsolation } from '@/lib/arabicNumbers';
import { url } from '@/lib/paths';
import { homeNavI18n } from '../data/homeNav.i18n';

const isMobile = () => window.matchMedia(MOBILE_QUERY).matches;

/** Menu de l'accueil (mêmes rubriques que les autres pages, balisage d'origine de l'accueil). */
function HomeNav({ t, lang, setLang, menuOpen, setMenuOpen, openSearch }) {
  const [openKey, setOpenKey] = useState(null);
  const toggleSubmenu = (event, key) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenKey((current) => (current === key ? null : key));
  };
  const onParentClick = (event, key) => {
    if (!isMobile() || openKey === key) return;
    event.preventDefault();
    event.stopPropagation();
    setOpenKey(key);
  };
  const onNavClick = (event) => {
    if (event.target.closest('a[href]') || event.target.closest('[data-header-search]')) setMenuOpen(false);
  };
  // Comme l'ancien accueil, le menu n'est pas concerné par l'isolation des nombres.
  return withoutNumberIsolation(() => (
    <nav className={`site-nav${menuOpen ? ' is-open' : ''}`} id="site-menu" aria-label="Navigation principale" onClick={onNavClick}>
      {MAIN_NAV.map((entry) => (entry.children ? (
        <div key={entry.key} className={`nav-item has-submenu${openKey === entry.key ? ' is-open' : ''}`}>
          <a href={url(entry.href)} onClick={(event) => onParentClick(event, entry.key)}>{t(entry.key)}</a>
          <button className="submenu-toggle" type="button" aria-expanded={openKey === entry.key ? 'true' : 'false'} onClick={(event) => toggleSubmenu(event, entry.key)}><i className="fa-solid fa-chevron-down"></i></button>
          <div className="nav-submenu">
            {entry.children.map((child) => <a key={child.key} href={url(child.href)}>{t(child.key)}</a>)}
          </div>
        </div>
      ) : (
        <a key={entry.key} href={url(entry.href)} className="is-active" aria-current="page">{t(entry.key)}</a>
      )))}
      <button className="mobile-search-btn" type="button" data-header-search="true" onClick={openSearch}>
        <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>{` ${t('search')}`}
      </button>
      <a className="member-link mobile-only btn-cta-nav" href="#member-space">{t('member')}</a>
      <a className="member-link mobile-only btn-cta-nav btn-cta-nav--secondary" href={url('club-agri.html')}>{t('club')}</a>
      <div className="lang-toggle mobile-nav-lang" role="group" aria-label="Choix de langue">
        {[['fr', 'FR'], ['ar', 'AR'], ['zgh', 'Amazigh']].map(([code, label]) => (
          <button key={code} className={`lang-btn${lang === code ? ' is-active' : ''}`} type="button" data-lang={code} onClick={() => setLang(code)}>{label}</button>
        ))}
      </div>
    </nav>
  ));
}

/** En-tête de l'accueil : marque, menu, langues, recherche. */
export default function HomeHeader() {
  const { lang, setLang } = useLanguage();
  const { menuOpen, setMenuOpen, setSearchOpen } = useLayout();
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const t = useCallback((key) => homeNavI18n[lang]?.[key] || homeNavI18n.fr[key] || '', [lang]);
  useScrollHeader(headerRef, { home: true });

  // Clic en dehors du tiroir mobile : on le referme.
  useEffect(() => {
    const onClick = (event) => {
      const nav = document.getElementById('site-menu');
      if (!nav?.classList.contains('is-open')) return;
      if (nav.contains(event.target) || toggleRef.current?.contains(event.target)) return;
      setMenuOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [setMenuOpen]);

  const openSearch = (event) => {
    event.preventDefault();
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    if (!(rect.width > 0 && rect.height > 0)) return;
    if (isMobile() && !(menuOpen && document.getElementById('site-menu')?.classList.contains('is-open'))) return;
    setSearchOpen(true);
  };

  return withoutNumberIsolation(() => (
    <header className="site-header" id="top" ref={headerRef}>
      <div className="container nav-shell">
        <a className="brand" href={url('index.html')} aria-label="FOS-Agri accueil">
          <span className="brand-mark">
            <img src={url('assets/images/logo.png')} alt="Logo FOS-Agri" width="78" height="60" decoding="async" />
          </span>
          <span className="brand-copy">
            <strong>FOS-Agri</strong>
          </span>
        </a>
        <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={menuOpen ? 'true' : 'false'} aria-controls="site-menu" aria-label="Ouvrir le menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="burger-box">
            <span className="burger-inner"></span>
          </span>
        </button>
        <HomeNav t={t} lang={lang} setLang={setLang} menuOpen={menuOpen} setMenuOpen={setMenuOpen} openSearch={openSearch} />
        <div className="nav-actions">
          <div className="lang-toggle header-lang-switch" role="group" aria-label="Choix de langue">
            {[['ar', 'Ar'], ['zgh', 'Am'], ['fr', 'Fr']].map(([code, label]) => (
              <button key={code} className={`lang-btn${lang === code ? ' is-active' : ''}`} type="button" data-lang={code} aria-pressed={lang === code ? 'true' : 'false'} onClick={() => setLang(code)}>{label}</button>
            ))}
          </div>
          <a className="btn-cta-nav desktop-only" href="#member-space">{t('member')}</a>
          <a className="btn-cta-nav btn-cta-nav--secondary desktop-only" href={url('club-agri.html')}>{t('club')}</a>
        </div>
      </div>
      <div className="container header-search-row">
        <form className="header-search-form" role="search" action={url('search.html')} method="get">
          <input className="header-search-input" type="search" name="q" placeholder={t('searchBar')} aria-label={t('search')} autoComplete="off" spellCheck="false" />
          <button className="header-search-submit" type="submit" aria-label={t('search')}>
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          </button>
        </form>
      </div>
    </header>
  ));
}

/** Traduction du menu de l'accueil (utilisée aussi par la fenêtre de recherche). */
export const homeNavT = (lang) => (key) => homeNavI18n[lang]?.[key] || homeNavI18n.fr[key] || '';
