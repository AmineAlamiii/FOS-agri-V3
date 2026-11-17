import { useLanguage } from '@/i18n/LanguageProvider';
import { useSecondaryT } from '@/i18n/useSecondaryT';
import { url } from '@/lib/paths';

const LANG_BUTTONS = [['ar', 'Ar'], ['zgh', 'Am'], ['fr', 'Fr']];

/** Desktop : langues, Espace adhérent, Espace club. */
export default function NavActions() {
  const t = useSecondaryT();
  const { lang, setLang } = useLanguage();
  return (
    <div className="nav-actions">
      <div className="lang-toggle header-lang-switch" role="group" aria-label={t('langMenuLabel')}>
        {LANG_BUTTONS.map(([code, label]) => (
          <button key={code} className={`lang-btn${lang === code ? ' is-active' : ''}`} type="button" data-lang={code} aria-pressed={lang === code ? 'true' : 'false'} lang={code} onClick={() => setLang(code)}>
            {label}
          </button>
        ))}
      </div>
      <a className="btn-cta-nav desktop-only" href={url('espace-adherent.html')}>{t('member')}</a>
      <a className="btn-cta-nav btn-cta-nav--secondary desktop-only" href={url('club-agri.html')}>{t('club')}</a>
    </div>
  );
}
