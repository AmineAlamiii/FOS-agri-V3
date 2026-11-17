import { url } from '@/lib/paths';

/** Accès Espace adhérent / Club Agri. */
export default function MemberSection({ t }) {
  return (
    <section className="section member-section" id="member-space">
      <div className="container member-grid">
        <article className="member-card member-card-primary reveal-on-scroll is-visible">
          <div className="section-tag light">{t('member.memberTag')}</div>
          <h2>{t('member.memberTitle')}</h2>
          <p>{t('member.memberBody')}</p>
          <a className="btn btn-light" href={url('espace-adherent.html')}>{t('member.memberCta')}</a>
        </article>
        <article className="member-card member-card-secondary reveal-on-scroll is-visible">
          <div className="section-tag light">{t('member.clubTag')}</div>
          <h2>{t('member.clubTitle')}</h2>
          <p>{t('member.clubBody')}</p>
          <a className="btn btn-outline-light" href={url('club-agri.html')}>{t('member.clubCta')}</a>
        </article>
      </div>
    </section>
  );
}
