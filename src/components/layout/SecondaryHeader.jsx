import { useEffect, useRef } from 'react';
import { useScrollHeader } from '@/hooks/useScrollHeader';
import { url } from '@/lib/paths';
import HeaderSearchBar from './HeaderSearchBar';
import { useLayout } from './LayoutContext';
import NavActions from './NavActions';
import SiteNav from './SiteNav';

/** En-tête commun des pages secondaires. */
export default function SecondaryHeader({ activePage, brandLabel }) {
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const { menuOpen, setMenuOpen } = useLayout();
  useScrollHeader(headerRef);

  // Clic en dehors du tiroir mobile : on le referme.
  useEffect(() => {
    const onClick = (event) => {
      const nav = document.getElementById('site-nav');
      if (!document.body.classList.contains('menu-open')) return;
      if (nav?.contains(event.target) || toggleRef.current?.contains(event.target)) return;
      setMenuOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [setMenuOpen]);

  return (
    <header className="site-header" id="top" ref={headerRef}>
      <div className="container nav-shell">
        <a className="brand" href={url('index.html')} aria-label={brandLabel}>
          <span className="brand-mark"><img src={url('assets/images/logo.png')} alt="Logo FOS-Agri" width="78" height="60" decoding="async" /></span>
          <span className="brand-copy"><strong>FOS-Agri</strong></span>
        </a>
        <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={menuOpen ? 'true' : 'false'} aria-controls="site-nav" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="burger-box"><span className="burger-inner"></span></span>
        </button>
        <SiteNav activePage={activePage} />
        <NavActions />
      </div>
      <HeaderSearchBar />
    </header>
  );
}
