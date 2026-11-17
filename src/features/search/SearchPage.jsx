import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SecondaryLayout from '@/components/layout/SecondaryLayout';
import PageHero from '@/components/ui/PageHero';
import { useLanguage } from '@/i18n/LanguageProvider';
import { url } from '@/lib/paths';
import { normalize } from '@/lib/text';
import { getNewsSearchEntries } from './searchEngine';
import { SEARCH_INDEX, SEARCH_PAGE_KEYWORDS } from './searchIndex';
import { searchPageLabels } from './searchPageLabels';

function SearchContent() {
  const { lang } = useLanguage();
  const t = (key) => searchPageLabels[lang]?.[key] || searchPageLabels.fr[key] || key;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = (searchParams.get('q') || '').trim();
  const [value, setValue] = useState(query);

  useEffect(() => setValue(query), [query]);

  const submit = (event) => {
    event.preventDefault();
    const q = value.trim();
    navigate(`/search${q ? `?q=${encodeURIComponent(q)}` : ''}`);
  };

  const q = normalize(query);
  const entries = SEARCH_INDEX.concat(getNewsSearchEntries(lang));
  const hits = q
    ? entries.filter((entry) => normalize([entry.label || t(entry.key), entry.key, entry.url, entry.searchText || '', SEARCH_PAGE_KEYWORDS[entry.key] || ''].join(' ')).includes(q))
    : [];

  return (
    <main>
      <PageHero className="search-hero" kicker={{ icon: 'fa-solid fa-magnifying-glass', text: t('search.kicker') }} title={t('search.title')} body={t('search.body')} />
      <section className="section search-results-section">
        <div className="container">
          <form className="search-page-form" id="search-page-form" role="search" onSubmit={submit}>
            <label className="sr-only" htmlFor="search-page-input">{t('search.inputLabel')}</label>
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            <input id="search-page-input" type="search" autoComplete="off" spellCheck="false" placeholder={t('search.placeholder')} aria-label={t('search.inputLabel')} value={value} onChange={(event) => setValue(event.target.value)} />
            <button className="btn btn-primary" type="submit">{t('search.button')}</button>
          </form>

          <div className="search-page-summary" id="search-page-summary">
            {q ? `${hits.length} ${t('search.count')} ${t('search.for')} "${query}"` : ''}
          </div>
          <div className="search-page-results" id="search-page-results">
            {!q && <div className="search-page-empty">{t('search.emptyStart')}</div>}
            {q && !hits.length && <div className="search-page-empty">{t('search.empty')}</div>}
            {hits.map((entry) => (
              <a key={entry.key} className="search-page-result" href={url(entry.url)}>
                <span className="search-page-result-icon"><i className={`fa-solid ${entry.icon}`} aria-hidden="true"></i></span>
                <span>
                  <h2>{entry.label || t(entry.key)}</h2>
                  <p>{entry.summary || entry.url}</p>
                </span>
                <i className="fa-solid fa-arrow-right search-page-result-arrow" aria-hidden="true"></i>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function SearchPage() {
  return (
    <SecondaryLayout activePage="search">
      <SearchContent />
    </SecondaryLayout>
  );
}
