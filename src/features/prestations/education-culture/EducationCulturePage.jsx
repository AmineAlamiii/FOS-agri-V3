import { useRef } from 'react';
import SecondaryLayout from '@/components/layout/SecondaryLayout';
import { siteData } from '@/data/siteData';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { useLanguage } from '@/i18n/LanguageProvider';
import { localizedEntry, useSiteT } from '@/i18n/useSiteT';
import { url } from '@/lib/paths';

/** Ancienne page « Éducation et culture » (contenu issu de siteData.services). */
function EducationContent() {
  const t = useSiteT();
  const { lang } = useLanguage();
  const mainRef = useRef(null);
  useRevealOnScroll(mainRef);
  const service = siteData.services.find((item) => item.key === 'education' || item.id === 'education');
  const content = service ? localizedEntry(service, lang) : null;
  return (
    <main ref={mainRef}>
      <section className="hero service-hero">
        <div className="hero-media" aria-hidden="true"></div>
        <div className="container hero-content">
          <div className="service-meta"><i id="service-icon" className={`fa-solid ${service ? service.icon : 'fa-book-open-reader'}`}></i><span>{t('services.tag')}</span></div>
          <h1 id="service-title">{content?.title}</h1>
          <p className="hero-description" id="service-description">{content ? content.description || content.excerpt || '' : null}</p>
        </div>
      </section>
      <section className="section">
        <div className="container service-layout">
          <article className="service-box">
            <h3>{t('partners.title')}</h3>
            <p id="service-detail">{content ? content.detail || content.excerpt || '' : null}</p>
          </article>
          <aside className="service-summary">
            <h3>{t('news.title')}</h3>
            <ul className="service-list">
              <li><a href={url('index.html#news')}>{t('news.more')}</a></li>
              <li><a href={url('index.html#partners')}>WAFA</a></li>
              <li><a href={url('index.html#partners')}>WAFAINJAD</a></li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default function EducationCulturePage() {
  return (
    <SecondaryLayout activePage="service" brandLabel="FOS-Agri accueil" headerId={null}>
      <EducationContent />
    </SecondaryLayout>
  );
}
