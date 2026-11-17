import SecondaryLayout from '@/components/layout/SecondaryLayout';
import PageHero from '@/components/ui/PageHero';
import { useSecondaryT } from '@/i18n/useSecondaryT';

const STEPS = [
  { number: 1, key: 'ag_1' },
  { number: 2, key: 'ag_2' },
  { number: 3, key: 'ag_3' }
];

function AgendaContent() {
  const t = useSecondaryT();
  return (
    <main>
      <PageHero kicker={{ icon: 'fa-solid fa-calendar-days', text: t('agendaKicker') }} title={t('agendaTitle')} body={t('agendaBody')} />
      <section className="section">
        <div className="container page-list">
          {STEPS.map((step) => (
            <article key={step.key} className="page-list-item">
              <span className="page-list-number">{step.number}</span>
              <div><h3>{t(`${step.key}Title`)}</h3><p>{t(`${step.key}Body`)}</p></div>
            </article>
          ))}
        </div>
      </section>
      <section className="section page-section-soft">
        <div className="container page-grid-2">
          <article className="page-card"><span className="page-card-icon"><i className="fa-regular fa-calendar-check"></i></span><h2>{t('ag_upcomingTitle')}</h2><p>{t('ag_upcomingBody')}</p></article>
          <article className="page-card"><span className="page-card-icon"><i className="fa-solid fa-clock-rotate-left"></i></span><h2>{t('ag_archivesTitle')}</h2><p>{t('ag_archivesBody')}</p></article>
        </div>
      </section>
    </main>
  );
}

export default function AgendaPage() {
  return (
    <SecondaryLayout activePage="agenda">
      <AgendaContent />
    </SecondaryLayout>
  );
}
