import { useEffect, useState } from 'react';
import SecondaryLayout from '@/components/layout/SecondaryLayout';
import PageHero from '@/components/ui/PageHero';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useSecondaryT } from '@/i18n/useSecondaryT';
import { url } from '@/lib/paths';
import { NEWS, localizedNews, newsArticleUrl, newsImageUrl, newsMeta } from './newsHelpers';

const PER_PAGE = 6;
const TOTAL_PAGES = Math.max(1, Math.ceil(NEWS.length / PER_PAGE));
const clampPage = (page) => Math.min(Math.max(page, 1), TOTAL_PAGES);
const pageFromUrl = () => Number(new URLSearchParams(window.location.search).get('page')) || 1;
const pageUrl = (page) => `${url('actualites.html')}${page > 1 ? `?page=${page}` : ''}`;

function NewsCard({ item, index }) {
  const { lang } = useLanguage();
  const t = useSecondaryT();
  const content = localizedNews(item, lang);
  return (
    <a className="page-card page-news-card" href={newsArticleUrl(item, index)} aria-label={content.title}>
      <div className="page-news-media" style={{ backgroundImage: `url('${newsImageUrl(index, item)}')` }} aria-hidden="true"></div>
      <div className="page-news-body">
        <span className="page-date">{newsMeta(index, item, lang)}</span>
        <h3>{content.title}</h3>
        <p>{content.excerpt}</p>
        <span className="page-news-more">{t('articleRead')}</span>
      </div>
    </a>
  );
}

function Pagination({ current, onNavigate }) {
  const t = useSecondaryT();
  const go = (event, page) => {
    event.preventDefault();
    onNavigate(page);
  };
  return (
    <nav className="page-pagination" aria-label={t('newsPaginationNav')}>
      {current === 1 ? (
        <span className="page-pagination-button is-disabled" aria-disabled="true">{t('newsPaginationPrev')}</span>
      ) : (
        <a className="page-pagination-button" href={pageUrl(current - 1)} onClick={(event) => go(event, current - 1)}>
          <i className="fa-solid fa-chevron-left" aria-hidden="true"></i><span>{t('newsPaginationPrev')}</span>
        </a>
      )}
      <span className="page-pagination-status">{`${t('newsPaginationPage')} ${current} ${t('newsPaginationOf')} ${TOTAL_PAGES}`}</span>
      {Array.from({ length: TOTAL_PAGES }, (_, index) => index + 1).map((page) => (
        <a key={page} className={`page-pagination-number${page === current ? ' is-active' : ''}`} href={pageUrl(page)} aria-label={`${t('newsPaginationPage')} ${page}`} onClick={(event) => go(event, page)}>
          {page}
        </a>
      ))}
      {current === TOTAL_PAGES ? (
        <span className="page-pagination-button is-disabled" aria-disabled="true">{t('newsPaginationNext')}</span>
      ) : (
        <a className="page-pagination-button" href={pageUrl(current + 1)} onClick={(event) => go(event, current + 1)}>
          <span>{t('newsPaginationNext')}</span><i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
        </a>
      )}
    </nav>
  );
}

function ActualitesContent() {
  const t = useSecondaryT();
  const { lang } = useLanguage();
  const [page, setPage] = useState(() => clampPage(pageFromUrl()));

  useEffect(() => {
    document.title = `FOS-Agri | ${t('newsTitle')}`;
  }, [t]);

  // Retour arrière du navigateur : même comportement que l'ancien site.
  useEffect(() => {
    const onPop = () => setPage(clampPage(pageFromUrl()));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (next) => {
    const target = clampPage(next);
    window.history.pushState(null, '', pageUrl(target));
    setPage(target);
  };

  const start = (page - 1) * PER_PAGE;
  return (
    <main>
      <PageHero kicker={{ icon: 'fa-solid fa-newspaper', text: t('actualitesKicker') }} title={t('actualitesTitle')} body={t('actualitesBody')} />
      <section className="section">
        <div className="container">
          <div className="page-news-grid">
            {NEWS.slice(start, start + PER_PAGE).map((item, offset) => (
              // Clé liée à la langue : les cartes sont recréées (et réanimées) comme avant.
              <NewsCard key={`${lang}-${item.slug || start + offset}`} item={item} index={start + offset} />
            ))}
          </div>
          <Pagination current={page} onNavigate={navigate} />
        </div>
      </section>
    </main>
  );
}

export default function ActualitesPage() {
  return (
    <SecondaryLayout activePage="actualites">
      <ActualitesContent />
    </SecondaryLayout>
  );
}
