import { useRef, useState } from 'react';
import SecondaryLayout from '@/components/layout/SecondaryLayout';
import { usePageT } from '@/i18n/usePageT';
import { url } from '@/lib/paths';
import { espaceI18n } from './espace.i18n';

/** Champ de formulaire avec icône et message d'erreur. */
function Field({ id, fieldId, label, error, children }) {
  return (
    <div className={`espace-field${error.active ? ' has-error' : ''}`} id={fieldId}>
      <label htmlFor={id}>{label}</label>
      {children}
      <span className="espace-field-error"><i className="fa-solid fa-circle-exclamation" aria-hidden="true"></i> <span>{error.text}</span></span>
    </div>
  );
}

/** Alerte affichée après l'envoi d'un formulaire valide. */
function Alert({ id, icon, visible, alertRef, children }) {
  return (
    <div ref={alertRef} className={`espace-alert is-info${visible ? ' is-visible' : ''}`} id={id} role="alert" tabIndex={visible ? -1 : undefined}>
      <i className={`fa-solid ${icon}`} aria-hidden="true"></i>{' '}
      {children}
    </div>
  );
}

/**
 * Erreur d'un champ. Comme avant : le texte reste celui affiché au moment de
 * l'envoi (il ne change pas avec la langue) et seul l'état « actif » disparaît
 * quand on modifie le champ.
 */
function useFieldError() {
  const [state, setState] = useState({ text: '', active: false });
  return {
    ...state,
    show: (text) => setState({ text, active: true }),
    clear: () => setState((current) => (current.active ? { ...current, active: false } : current))
  };
}

function LoginView({ t, hidden, onForgot }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const idError = useFieldError();
  const passError = useFieldError();
  const [alertVisible, setAlertVisible] = useState(false);
  const alertRef = useRef(null);
  const idRef = useRef(null);
  const passRef = useRef(null);

  const submit = (event) => {
    event.preventDefault();
    setAlertVisible(false);
    let valid = true;
    let firstInvalid = null;
    if (id.trim().length < 3) {
      idError.show(t(id.trim() ? 'errorIdMin' : 'errorRequired'));
      valid = false;
      firstInvalid = idRef.current;
    } else idError.clear();
    if (password.length < 6) {
      passError.show(t(password ? 'errorPasswordMin' : 'errorRequired'));
      valid = false;
      firstInvalid = firstInvalid || passRef.current;
    } else passError.clear();
    if (!valid) {
      firstInvalid?.focus();
      return;
    }
    setAlertVisible(true);
    requestAnimationFrame(() => alertRef.current?.focus({ preventScroll: false }));
  };

  return (
    <div className="espace-view" id="espace-view-login" hidden={hidden}>
      <div className="espace-auth-head">
        <h2>{t('loginHeading')}</h2>
        <p>{t('loginSub')}</p>
      </div>

      <Alert id="espace-login-alert" icon="fa-circle-info" visible={alertVisible} alertRef={alertRef}>
        <span>
          <span>{t('loginAlert')}</span>{' '}
          <a href={url('contact.html')}>{t('loginAlertCta')}</a>
        </span>
      </Alert>

      <form className="espace-form" id="espace-login-form" noValidate onSubmit={submit}>
        <Field id="espace-login-id" fieldId="espace-login-id-field" label={t('labelId')} error={idError}>
          <div className="espace-input-wrap">
            <i className="fa-solid fa-id-badge espace-input-icon" aria-hidden="true"></i>
            <input ref={idRef} type="text" id="espace-login-id" name="identifiant" autoComplete="username" placeholder={t('placeholderId')} value={id} onChange={(event) => { setId(event.target.value); idError.clear(); }} />
          </div>
        </Field>

        <Field id="espace-login-password" fieldId="espace-login-password-field" label={t('labelPassword')} error={passError}>
          <div className="espace-input-wrap has-toggle">
              <i className="fa-solid fa-lock espace-input-icon" aria-hidden="true"></i>
            <input ref={passRef} type={passwordVisible ? 'text' : 'password'} id="espace-login-password" name="password" autoComplete="current-password" placeholder={t('placeholderPassword')} value={password} onChange={(event) => { setPassword(event.target.value); passError.clear(); }} />
            <button className="espace-toggle-visibility" type="button" data-state={passwordVisible ? 'visible' : 'hidden'} aria-label={t(passwordVisible ? 'hidePassword' : 'showPassword')} onClick={() => setPasswordVisible(!passwordVisible)}>
              <i className={`fa-solid ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
            </button>
          </div>
        </Field>

        <div className="espace-row-between">
          <label className="espace-checkbox">
            <input type="checkbox" name="remember" />
            <span>{t('rememberMe')}</span>
          </label>
          <button type="button" className="espace-link-inline" onClick={onForgot}>{t('forgotLink')}</button>
        </div>

        <button type="submit" className="btn btn-primary espace-submit">
          <i className="fa-solid fa-right-to-bracket" aria-hidden="true"></i>
          <span>{t('submitLogin')}</span>
        </button>
      </form>

      <div className="espace-divider">{t('dividerOr')}</div>

      <p className="espace-footnote">
        <strong>{t('noAccount')}</strong>{' '}
        <span>{t('noAccountBody')}</span>{' '}
        <a href={url('contact.html')}>{t('noAccountLink')}</a>
      </p>
    </div>
  );
}

function ForgotView({ t, hidden, onBack, inputRef }) {
  const [value, setValue] = useState('');
  const error = useFieldError();
  const [alertVisible, setAlertVisible] = useState(false);
  const alertRef = useRef(null);

  const submit = (event) => {
    event.preventDefault();
    setAlertVisible(false);
    if (value.trim().length < 3) {
      error.show(t(value.trim() ? 'errorIdOrEmail' : 'errorRequired'));
      inputRef.current?.focus();
      return;
    }
    error.clear();
    setAlertVisible(true);
    requestAnimationFrame(() => alertRef.current?.focus({ preventScroll: false }));
  };

  return (
    <div className="espace-view" id="espace-view-forgot" hidden={hidden}>
      <button type="button" className="espace-back-link" onClick={onBack}>
        <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
        <span>{t('backToLogin')}</span>
      </button>

      <div className="espace-auth-head" style={{ marginTop: '1rem' }}>
        <h2>{t('forgotHeading')}</h2>
        <p>{t('forgotSub')}</p>
      </div>

      <Alert id="espace-forgot-alert" icon="fa-circle-check" visible={alertVisible} alertRef={alertRef}>
        <span>{t('forgotAlert')}</span>
      </Alert>

      <form className="espace-form" id="espace-forgot-form" noValidate onSubmit={submit}>
        <Field id="espace-forgot-id" fieldId="espace-forgot-id-field" label={t('labelIdOrEmail')} error={error}>
          <div className="espace-input-wrap">
            <i className="fa-solid fa-envelope espace-input-icon" aria-hidden="true"></i>
            <input ref={inputRef} type="text" id="espace-forgot-id" name="identifiant-email" autoComplete="username" placeholder={t('placeholderIdOrEmail')} value={value} onChange={(event) => { setValue(event.target.value); error.clear(); }} />
          </div>
        </Field>

        <button type="submit" className="btn btn-primary espace-submit">
          <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>
          <span>{t('submitForgot')}</span>
        </button>
      </form>
    </div>
  );
}

function EspaceContent() {
  const t = usePageT(espaceI18n);
  const [view, setView] = useState('login');
  const forgotInputRef = useRef(null);
  const show = (next) => {
    setView(next);
    // Comme avant : le premier champ de la vue affichée reçoit le focus.
    requestAnimationFrame(() => document.querySelector(`#espace-view-${next} input`)?.focus());
  };
  return (
    <main>
      <section className="page-hero-secondary">
        <div className="container">
          <span className="page-kicker"><i className="fa-solid fa-user-shield" aria-hidden="true"></i> <span>{t('kicker')}</span></span>
          <h1>{t('title')}</h1>
          <p>{t('body')}</p>
        </div>
      </section>

      <section className="section espace-section">
        <div className="container espace-grid">
          <article className="espace-auth-card">
            <LoginView t={t} hidden={view !== 'login'} onForgot={() => show('forgot')} />
            <ForgotView t={t} hidden={view !== 'forgot'} onBack={() => show('login')} inputRef={forgotInputRef} />
          </article>

          <aside className="espace-info-card">
            <h2>{t('infoTitle')}</h2>
            <p>{t('infoBody')}</p>
            <ul className="espace-benefits">
              {['benefit1', 'benefit2', 'benefit3', 'benefit4'].map((key) => (
                <li key={key}><i className="fa-solid fa-circle-check" aria-hidden="true"></i> <span>{t(key)}</span></li>
              ))}
            </ul>
            <div className="espace-info-contact">
              <h3>{t('helpTitle')}</h3>
              <p>{t('helpBody')}</p>
              <a href={url('contact.html')}><i className="fa-solid fa-arrow-right" aria-hidden="true"></i> <span>{t('helpContact')}</span></a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default function EspaceAdherentPage() {
  return (
    <SecondaryLayout activePage="espace-adherent" brandLabel="FOS-Agri accueil">
      <EspaceContent />
    </SecondaryLayout>
  );
}
