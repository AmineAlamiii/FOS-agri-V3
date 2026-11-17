import { useEffect } from 'react';
import SecondaryLayout from '@/components/layout/SecondaryLayout';
import PageHero from '@/components/ui/PageHero';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useSecondaryT } from '@/i18n/useSecondaryT';
import { assetUrl, url } from '@/lib/paths';
import { NEWS, localizedNews, newsImageUrl, newsMeta, newsSlug } from './newsHelpers';

function Attachment({ attachment, index, title }) {
  const t = useSecondaryT();
  const href = assetUrl(attachment.path);
  const label = `${attachment.type === 'image' ? t('articleImage') : t('articleDocument')} ${index + 1}`;
  if (attachment.type === 'image') {
    return (
      <figure className="article-attachment article-attachment-image">
        <img src={href} alt={`${label} — ${title}`} loading="lazy" />
        <figcaption>
          <span><i className="fa-regular fa-image" aria-hidden="true"></i>{` ${label}`}</span>
          <a href={href} target="_blank" rel="noopener">{t('articleOpen')}</a>
        </figcaption>
      </figure>
    );
  }
  return (
    <details className="article-attachment article-document" open={index === 0}>
      <summary><span><i className="fa-regular fa-file-pdf" aria-hidden="true"></i>{` ${label}`}</span><i className="fa-solid fa-chevron-down article-document-chevron" aria-hidden="true"></i></summary>
      <div className="article-document-actions">
        <a href={href} target="_blank" rel="noopener"><i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>{` ${t('articleOpen')}`}</a>
        <a href={href} download><i className="fa-solid fa-download" aria-hidden="true"></i>{` ${t('articleDownload')}`}</a>
      </div>
      <img className="article-document-preview" src={assetUrl(attachment.preview)} alt={`${label} — ${title}`} loading="lazy" />
      <iframe src={`${href}#view=FitH`} title={`${label} — ${title}`} loading="lazy"></iframe>
    </details>
  );
}

function ActualiteContent() {
  const t = useSecondaryT();
  const { lang } = useLanguage();
  const slug = new URLSearchParams(window.location.search).get('article');
  const index = NEWS.findIndex((item, itemIndex) => newsSlug(item, itemIndex) === slug);
  const item = NEWS[index];
  const content = item ? localizedNews(item, lang) : null;

  useEffect(() => {
    document.title = `FOS-Agri | ${item ? content.title || t('articleKicker') : t('articleNotFoundTitle')}`;
  }, [item, content, t]);

  const kicker = { icon: 'fa-solid fa-newspaper', text: t('articleKicker') };
  if (!item) {
    return (
      <main>
        <PageHero className="actualite-detail-hero" kicker={kicker} title={t('articleNotFoundTitle')} body={t('articleNotFoundBody')} />
        <section className="section">
          <div className="container actualite-detail">
            <div key={lang} className="page-card actualite-detail-card actualite-detail-empty">
              <p>{t('articleNotFoundBody')}</p>
              <a className="article-back-link" href={url('actualites.html')}>{t('articleBack')}</a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const attachments = Array.isArray(item.attachments) ? item.attachments : [];
  return (
    <main>
      <PageHero className="actualite-detail-hero" kicker={kicker} title={content.title || ''} body={content.excerpt || ''} />
      <section className="section">
        <div className="container actualite-detail">
          {/* Recréée à chaque changement de langue, comme l'ancien rendu. */}
          <div key={lang} className="page-card actualite-detail-card">
            <div className="actualite-detail-media" style={{ backgroundImage: `url("${newsImageUrl(index, item)}")` }} aria-hidden="true"></div>
            <div className="actualite-detail-content">
              <span className="page-date">{newsMeta(index, item, lang)}</span>
              <p>{content.detail || content.excerpt || ''}</p>
              {attachments.length > 0 && (
                <section className="article-attachments" aria-labelledby="article-attachments-title">
                  <h2 id="article-attachments-title">{t('articleAttachments')}</h2>
                  <div className="article-attachments-list">
                    {attachments.map((attachment, attachmentIndex) => (
                      <Attachment key={attachment.path} attachment={attachment} index={attachmentIndex} title={content.title} />
                    ))}
                  </div>
                </section>
              )}
              <div className="article-detail-links">
                <a className="article-back-link" href={url('actualites.html')}>{t('articleBack')}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ActualitePage() {
  return (
    <SecondaryLayout activePage="actualites">
      <ActualiteContent />
    </SecondaryLayout>
  );
}
