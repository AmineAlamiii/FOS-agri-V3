import { useSecondaryT } from '@/i18n/useSecondaryT';
import { url } from '@/lib/paths';

/** Barre de recherche desktop sous le menu : envoie vers search.html?q=… */
export default function HeaderSearchBar() {
  const t = useSecondaryT();
  return (
    <div className="container header-search-row">
      <form className="header-search-form" role="search" action={url('search.html')} method="get">
        <input className="header-search-input" type="search" name="q" placeholder={t('searchBar')} aria-label={t('search')} autoComplete="off" spellCheck="false" />
        <button className="header-search-submit" type="submit" aria-label={t('search')}>
          <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
        </button>
      </form>
    </div>
  );
}
