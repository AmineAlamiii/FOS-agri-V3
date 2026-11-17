import SecondaryLayout from '@/components/layout/SecondaryLayout';
import PageHero from '@/components/ui/PageHero';
import { useSecondaryT } from '@/i18n/useSecondaryT';

// Galeries par année : identifiants stables + clés de traduction.
const GALLERIES = {
  2017: ['med_2017_1', 'med_2017_2', 'med_2017_3'],
  2018: ['med_2018_1', 'med_2018_2', 'med_2018_3', 'med_2018_4', 'med_2018_5', 'med_2018_6'],
  2019: ['med_2019_1', 'med_2019_2', 'med_2019_3', 'med_2019_4', 'med_2019_5', 'med_2019_6'],
  2020: ['med_2020_1', 'med_2020_2']
};

function GalleryCard({ year, id }) {
  const t = useSecondaryT();
  return (
    <article className="page-card" id={id}>
      <span className="page-card-icon"><i className="fa-solid fa-calendar"></i></span>
      <h3>{year}</h3>
      <ul>{GALLERIES[year].map((key) => <li key={key}>{t(key)}</li>)}</ul>
      <a className="service-link" href="#">{t('med_seePhotos')}</a>
    </article>
  );
}

function MediathequeContent() {
  const t = useSecondaryT();
  return (
    <main>
      <PageHero kicker={{ icon: 'fa-solid fa-images', text: t('mediathequeKicker') }} title={t('mediathequeTitle')} body={t('mediathequeBody')} />
      <section className="section" id="galerie-2017">
        <div className="container page-grid-3">
          <GalleryCard year="2017" />
          <GalleryCard year="2018" id="galerie-2018" />
          <GalleryCard year="2019" id="galerie-2019" />
        </div>
      </section>
      <section className="section page-section-soft" id="galerie-2020">
        <div className="container page-grid-2">
          <GalleryCard year="2020" />
          <article className="page-card"><h2>{t('med_orgTitle')}</h2><p>{t('med_orgBody')}</p></article>
        </div>
      </section>
    </main>
  );
}

export default function MediathequePage() {
  return (
    <SecondaryLayout activePage="mediatheque">
      <MediathequeContent />
    </SecondaryLayout>
  );
}
