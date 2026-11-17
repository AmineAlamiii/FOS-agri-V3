import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { quickSearch } from '@/features/search/searchEngine';
import { useLanguage } from '@/i18n/LanguageProvider';
import { withoutNumberIsolation } from '@/lib/arabicNumbers';
import { url } from '@/lib/paths';
import { useLayout } from './LayoutContext';

/** Fenêtre de recherche rapide ouverte depuis le menu mobile. */
export default function SearchModal({ t, index, isolateNumbers = true }) {
  const { lang } = useLanguage();
  const { searchOpen, setSearchOpen } = useLayout();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchOpen) return undefined;
    const timer = setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (event) => {
      if (event.key === 'Escape') setSearchOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', onKey);
    };
  }, [searchOpen, setSearchOpen]);

  const close = () => setSearchOpen(false);
  const submit = (event) => {
    event.preventDefault();
    const q = query.trim();
    setSearchOpen(false);
    navigate(`/search${q ? `?q=${encodeURIComponent(q)}` : ''}`);
  };

  const hits = quickSearch(query, lang, t, index);

  const render = () => createPortal(
    <div id="site-search-modal" className="search-modal" role="dialog" aria-modal="true" aria-label={t('search') || 'Recherche'} hidden={!searchOpen}>
      <div className="search-modal-backdrop" onClick={close}></div>
      <div className="search-modal-box">
        <button className="search-modal-close" type="button" aria-label={t('memberClose')} onClick={close}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <form className="search-modal-form" role="search" onSubmit={submit}>
          <button className="search-modal-submit" type="submit" aria-label={t('search')}>
            <i className="fa-solid fa-magnifying-glass search-modal-icon" aria-hidden="true"></i>
          </button>
          <input ref={inputRef} id="site-search-input" className="search-modal-input" type="search" placeholder={t('searchPlaceholder')} autoComplete="off" spellCheck="false" value={query} onChange={(event) => setQuery(event.target.value)} />
        </form>
        <div className="search-results" id="site-search-results" aria-live="polite">
          {hits === null && <p className="search-results-empty" data-state="initial">{t('searchStart')}</p>}
          {hits?.length === 0 && <p className="search-results-empty" data-state="empty">{t('searchEmpty')}</p>}
          {hits?.map(({ entry, label }) => (
            <a key={entry.key} className="search-result-item" href={url(entry.url)}>
              <span className="search-result-icon"><i className={`fa-solid ${entry.icon}`} aria-hidden="true"></i></span>
              <span className="search-result-text">{label}</span>
              <i className="fa-solid fa-arrow-right search-result-arrow" aria-hidden="true"></i>
            </a>
          ))}
        </div>
        <p className="search-modal-hint">{t('searchHint')}</p>
      </div>
    </div>,
    document.body
  );
  // Accueil : la fenêtre de recherche n'était pas concernée par l'isolation des nombres.
  return isolateNumbers ? render() : withoutNumberIsolation(render);
}
