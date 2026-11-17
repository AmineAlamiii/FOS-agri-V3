import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LayoutContext = createContext(null);

/** État partagé de l'en-tête : menu mobile ouvert, fenêtre de recherche. */
export function LayoutProvider({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.toggle('search-modal-open', searchOpen);
    return () => document.body.classList.remove('search-modal-open');
  }, [searchOpen]);

  const value = useMemo(() => ({ menuOpen, setMenuOpen, searchOpen, setSearchOpen }), [menuOpen, searchOpen]);
  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout() {
  return useContext(LayoutContext);
}
