import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageProvider';
import { url } from '@/lib/paths';
import { useDocumentMeta } from '@/i18n/usePageT';
import { endMemberDemo } from './memberSession';
import { APPOINTMENTS, CONVERSATIONS, CONTRIBUTIONS, DOCUMENTS, FAMILY, MEMBER, NOTIFICATIONS, placeLabel, reasonLabel, REQUESTS, serviceLabel } from './memberDemo';
import { ageFrom, formatDate, isEmail, OPEN_STATUSES, todayIso, useMemberT } from './memberUtils';
import { Card, describedBy, Field, InfoList, Ref, SectionHead, StatusBadge, WithRef } from './MemberUi';
import { RequestsSection } from './MemberRequests';
import { AppointmentsSection, BenefitsSection, ContributionsSection, DocumentsSection, MessagesSection } from './MemberServices';

const SECTIONS = [
  { id: 'dashboard', icon: 'fa-gauge-high' },
  { id: 'profile', icon: 'fa-id-badge' },
  { id: 'family', icon: 'fa-people-roof' },
  { id: 'requests', icon: 'fa-folder-open' },
  { id: 'documents', icon: 'fa-file-lines' },
  { id: 'contributions', icon: 'fa-receipt' },
  { id: 'benefits', icon: 'fa-gift' },
  { id: 'messages', icon: 'fa-comments' },
  { id: 'appointments', icon: 'fa-calendar-check' }
];

const LANG_BUTTONS = [
  { code: 'fr', label: 'Fr' },
  { code: 'ar', label: 'Ar' },
  { code: 'zgh', label: 'Am' }
];

const sectionFromHash = () => {
  const id = window.location.hash.replace('#', '');
  return SECTIONS.some((section) => section.id === id) ? id : 'dashboard';
};

/* ------------------------------------------------------------------ */
/* Tableau de bord                                                     */
/* ------------------------------------------------------------------ */

function Dashboard({ store, open, onNewRequest }) {
  const { t, loc } = useMemberT();
  const openRequests = store.requests.filter((request) => OPEN_STATUSES.includes(request.status));
  const unread = store.conversations.filter((conversation) => conversation.unread).length;
  const next = store.appointments.filter((appointment) => appointment.date >= todayIso()).sort((a, b) => a.date.localeCompare(b.date))[0];
  const current = CONTRIBUTIONS[0];
  const stats = [
    { id: 'requests', icon: 'fa-folder-open', value: openRequests.length, label: t('statRequests') },
    { id: 'documents', icon: 'fa-file-lines', value: DOCUMENTS.length, label: t('statDocuments') },
    { id: 'messages', icon: 'fa-envelope', value: unread, label: t('statMessages') },
    { id: 'contributions', icon: 'fa-circle-check', value: t('upToDate'), label: t('statContribution'), small: true }
  ];
  const actions = [
    { icon: 'fa-plus', label: t('actionNewRequest'), run: onNewRequest },
    { icon: 'fa-download', label: t('actionDocuments'), run: () => open('documents') },
    { icon: 'fa-pen-to-square', label: t('actionMessage'), run: () => open('messages') },
    { icon: 'fa-calendar-plus', label: t('actionAppointment'), run: () => open('appointments') }
  ];
  return (
    <>
      <SectionHead
        title={`${t('hello')} ${loc(MEMBER.firstName)}`}
        intro={t('intro_dashboard')}
        action={(
          <div className="ms-member-tags">
            <span className="ms-badge is-neutral"><i className="fa-solid fa-id-card" aria-hidden="true"></i> <span>{t('memberNo')} <bdi dir="ltr">{MEMBER.memberNo}</bdi></span></span>
            <span className="ms-badge is-success"><i className="fa-solid fa-circle-check" aria-hidden="true"></i> <span>{t('statusActive')}</span></span>
          </div>
        )}
      />
      <div className="ms-stats">
        {stats.map((stat) => (
          <button key={stat.id} type="button" className="ms-stat" onClick={() => open(stat.id)}>
            <i className={`fa-solid ${stat.icon}`} aria-hidden="true"></i>
            <strong className={stat.small ? 'is-small' : undefined}>{stat.value}</strong>
            <span>{stat.label}</span>
          </button>
        ))}
      </div>

      <div className="ms-dashboard-grid">
        <Card title={t('recentRequests')} icon="fa-folder-open" action={<button type="button" className="ms-link" onClick={() => open('requests')}>{t('seeAll')}</button>}>
          <ul className="ms-mini-list">
            {openRequests.map((request) => (
              <li key={request.ref}>
                <div>
                  <strong>{loc(serviceLabel(request.service))}</strong>
                  <span><Ref>{request.ref}</Ref> · {formatDate(request.date)}</span>
                </div>
                <StatusBadge status={request.status} />
              </li>
            ))}
          </ul>
        </Card>

        <Card title={t('notifications')} icon="fa-bell">
          <ul className="ms-notifications">
            {NOTIFICATIONS.map((notification) => (
              <li key={notification.id}>
                <button type="button" onClick={() => open(notification.section)}>
                  <i className={`fa-solid ${notification.icon} is-${notification.tone}`} aria-hidden="true"></i>
                  <span>
                    <span><WithRef text={loc(notification.text)} refValue={notification.ref} /></span>
                    <small>{formatDate(notification.date)}</small>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card title={t('quickActions')} icon="fa-bolt">
          <div className="ms-actions">
            {actions.map((action) => (
              <button key={action.label} type="button" className="ms-action" onClick={action.run}>
                <i className={`fa-solid ${action.icon}`} aria-hidden="true"></i> <span>{action.label}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card title={t('nextAppointment')} icon="fa-calendar-check">
          {next ? (
            <div className="ms-next-appointment">
              <strong>{formatDate(next.date)} · {next.time}</strong>
              <span>{loc(placeLabel(next.place))}</span>
              <span>{loc(reasonLabel(next.reason))}</span>
            </div>
          ) : <p className="ms-empty">{t('noUpcoming')}</p>}
          <p className="ms-muted-line">{t('monthlyAmount')} : {t('amount', { n: MEMBER.monthlyFee })} · {current.year}</p>
        </Card>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Profil                                                              */
/* ------------------------------------------------------------------ */

function Profile({ store, setStore, notify }) {
  const { t, loc } = useMemberT();
  const { profile } = store;
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState({ current: '', next: '', confirm: '' });
  const [passwordErrors, setPasswordErrors] = useState({});

  const saveContact = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.phone.trim()) nextErrors.phone = t('errorRequired');
    if (!isEmail(form.email)) nextErrors.email = t('errorEmail');
    if (!form.address.trim()) nextErrors.address = t('errorRequired');
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStore((current) => ({ ...current, profile: form }));
    setEditing(false);
    notify(t('savedProfile'));
  };

  const changePassword = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!password.current) nextErrors.current = t('errorRequired');
    if (password.next.length < 8) nextErrors.next = t('errorPasswordLength');
    if (password.confirm !== password.next) nextErrors.confirm = t('errorPasswordMatch');
    setPasswordErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setPassword({ current: '', next: '', confirm: '' });
    notify(t('savedPassword'));
  };

  const contactField = (key, label, type = 'text') => (
    <Field id={`ms-${key}`} label={label} error={errors[key]}>
      <input id={`ms-${key}`} type={type} value={form[key]} dir={type === 'text' ? undefined : 'ltr'} onChange={(event) => setForm({ ...form, [key]: event.target.value })} {...describedBy(`ms-${key}`, errors[key])} />
    </Field>
  );
  const passwordField = (key, label) => (
    <Field id={`ms-password-${key}`} label={label} error={passwordErrors[key]}>
      <input id={`ms-password-${key}`} type="password" autoComplete={key === 'current' ? 'current-password' : 'new-password'} value={password[key]} onChange={(event) => setPassword({ ...password, [key]: event.target.value })} {...describedBy(`ms-password-${key}`, passwordErrors[key])} />
    </Field>
  );

  return (
    <>
      <SectionHead title={t('nav_profile')} intro={t('intro_profile')} />
      <div className="ms-two-cols">
        <Card title={t('personalInfo')} icon="fa-user">
          <InfoList items={[
            [t('fieldName'), loc(MEMBER.fullName)],
            [t('fieldCin'), MEMBER.cin],
            [t('fieldMatricule'), MEMBER.matricule],
            [t('fieldBirth'), formatDate(MEMBER.birthDate)],
            [t('fieldEntity'), loc(MEMBER.entity)],
            [t('fieldRegion'), loc(MEMBER.region)],
            [t('fieldCategory'), loc(MEMBER.category)],
            [t('fieldMemberSince'), formatDate(MEMBER.memberSince)]
          ]} />
          <p className="ms-note"><i className="fa-solid fa-lock" aria-hidden="true"></i> <span>{t('profileLocked')}</span></p>
        </Card>

        <div className="ms-stack">
          <Card title={t('contactInfo')} icon="fa-address-book" action={!editing && <button type="button" className="ms-btn ms-btn-light" onClick={() => { setForm(profile); setErrors({}); setEditing(true); }}><i className="fa-solid fa-pen" aria-hidden="true"></i> <span>{t('edit')}</span></button>}>
            {editing ? (
              <form className="ms-form" onSubmit={saveContact} noValidate>
                {contactField('phone', t('fieldPhone'), 'tel')}
                {contactField('email', t('fieldEmail'), 'email')}
                {contactField('address', t('fieldAddress'))}
                <div className="ms-form-actions">
                  <button type="button" className="ms-btn ms-btn-light" onClick={() => setEditing(false)}>{t('cancel')}</button>
                  <button type="submit" className="ms-btn ms-btn-primary"><i className="fa-solid fa-check" aria-hidden="true"></i> <span>{t('save')}</span></button>
                </div>
              </form>
            ) : (
              <InfoList items={[
                [t('fieldPhone'), <span dir="ltr">{profile.phone}</span>],
                [t('fieldEmail'), <span dir="ltr">{profile.email}</span>],
                [t('fieldAddress'), profile.address]
              ]} />
            )}
          </Card>

          <Card title={t('passwordTitle')} icon="fa-key">
            <form className="ms-form" onSubmit={changePassword} noValidate>
              {passwordField('current', t('currentPassword'))}
              {passwordField('next', t('newPassword'))}
              {passwordField('confirm', t('confirmPassword'))}
              <div className="ms-form-actions">
                <button type="submit" className="ms-btn ms-btn-primary">{t('changePassword')}</button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Famille                                                             */
/* ------------------------------------------------------------------ */

function Family({ store, setStore, notify }) {
  const { t, loc } = useMemberT();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ relation: 'child', firstName: '', birthDate: '' });
  const [errors, setErrors] = useState({});

  const add = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.firstName.trim()) nextErrors.firstName = t('errorRequired');
    if (!form.birthDate) nextErrors.birthDate = t('errorRequired');
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const member = { id: `member-${Date.now()}`, relation: form.relation, firstName: { fr: form.firstName, ar: form.firstName, zgh: form.firstName }, birthDate: form.birthDate, validated: false };
    setStore((current) => ({ ...current, family: [...current.family, member] }));
    setForm({ relation: 'child', firstName: '', birthDate: '' });
    setAdding(false);
    notify(t('addedMember'));
  };

  return (
    <>
      <SectionHead
        title={t('nav_family')}
        intro={t('intro_family')}
        action={!adding && <button type="button" className="ms-btn ms-btn-primary" onClick={() => setAdding(true)}><i className="fa-solid fa-user-plus" aria-hidden="true"></i> <span>{t('addMember')}</span></button>}
      />
      {adding && (
        <Card title={t('addMember')} icon="fa-user-plus" className="ms-card-form">
          <form className="ms-form ms-form-inline" onSubmit={add} noValidate>
            <Field id="ms-relation" label={t('relation')}>
              <select id="ms-relation" value={form.relation} onChange={(event) => setForm({ ...form, relation: event.target.value })}>
                <option value="spouse">{t('relation_spouse')}</option>
                <option value="child">{t('relation_child')}</option>
              </select>
            </Field>
            <Field id="ms-first-name" label={t('firstName')} error={errors.firstName}>
              <input id="ms-first-name" value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} {...describedBy('ms-first-name', errors.firstName)} />
            </Field>
            <Field id="ms-birth" label={t('birthDate')} error={errors.birthDate}>
              <input id="ms-birth" type="date" max={todayIso()} value={form.birthDate} onChange={(event) => setForm({ ...form, birthDate: event.target.value })} {...describedBy('ms-birth', errors.birthDate)} />
            </Field>
            <p className="ms-note"><i className="fa-solid fa-circle-info" aria-hidden="true"></i> <span>{t('familyNote')}</span></p>
            <div className="ms-form-actions">
              <button type="button" className="ms-btn ms-btn-light" onClick={() => setAdding(false)}>{t('cancel')}</button>
              <button type="submit" className="ms-btn ms-btn-primary">{t('save')}</button>
            </div>
          </form>
        </Card>
      )}
      <div className="ms-family">
        {store.family.map((member) => (
          <article key={member.id} className="ms-person">
            <span className="ms-avatar" aria-hidden="true"><i className={`fa-solid ${member.relation === 'spouse' ? 'fa-user' : 'fa-child'}`}></i></span>
            <div>
              <h3>{loc(member.firstName)}</h3>
              <p>{t(`relation_${member.relation}`)} · {t('ageYears', { n: ageFrom(member.birthDate) })}</p>
              <p className="ms-muted-line">{t('bornOn')} {formatDate(member.birthDate)}</p>
            </div>
            <span className={`ms-badge ${member.validated ? 'is-success' : 'is-warning'}`}>
              <i className={`fa-solid ${member.validated ? 'fa-shield-heart' : 'fa-hourglass-half'}`} aria-hidden="true"></i> <span>{member.validated ? t('covered') : t('pendingValidation')}</span>
            </span>
          </article>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function initialStore() {
  return {
    profile: { phone: MEMBER.phone, email: MEMBER.email, address: MEMBER.address },
    family: FAMILY,
    requests: REQUESTS,
    conversations: CONVERSATIONS,
    appointments: APPOINTMENTS
  };
}

function MemberSpace() {
  const { t, loc } = useMemberT();
  const { lang, setLang } = useLanguage();
  const navigate = useNavigate();
  const [section, setSection] = useState(sectionFromHash);
  const [requestView, setRequestView] = useState({ mode: 'list' });
  const [store, setStore] = useState(initialStore);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);
  const contentRef = useRef(null);
  const navRef = useRef(null);
  useDocumentMeta(t('pageTitle'));

  // Sur mobile, les rubriques défilent à l'horizontale : on garde l'onglet actif visible.
  useEffect(() => {
    const nav = navRef.current;
    const active = nav?.querySelector('.is-active');
    if (!nav || !active || nav.scrollWidth <= nav.clientWidth) return;
    const navBox = nav.getBoundingClientRect();
    const box = active.getBoundingClientRect();
    nav.scrollBy({ left: box.left + box.width / 2 - (navBox.left + navBox.width / 2) });
  }, [section]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const notify = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 4000);
  };
  const open = (id, view = { mode: 'list' }) => {
    setSection(id);
    setRequestView(view);
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}#${id}`);
    requestAnimationFrame(() => contentRef.current?.focus({ preventScroll: true }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const logout = () => {
    endMemberDemo();
    navigate('/espace-adherent');
  };

  const shared = { store, setStore, notify, open };
  const unread = store.conversations.filter((conversation) => conversation.unread).length;
  const openRequests = store.requests.filter((request) => OPEN_STATUSES.includes(request.status)).length;
  const badges = { requests: openRequests, messages: unread };

  return (
    <div className="ms-app">
      <header className="ms-topbar">
        <a className="ms-brand" href={url('index.html')}>
          <img src={url('assets/images/logo.png')} alt="" width="46" height="36" />
          <span><strong>FOS-Agri</strong><span>{t('spaceKicker')}</span></span>
        </a>
        <span className="ms-demo-badge" title={t('demoBanner')}><i className="fa-solid fa-flask" aria-hidden="true"></i> <span>{t('demoBadge')}</span></span>
        <div className="ms-lang" role="group" aria-label={t('languageLabel')}>
          {LANG_BUTTONS.map(({ code, label }) => (
            <button key={code} type="button" lang={code} className={lang === code ? 'is-active' : undefined} aria-pressed={lang === code} onClick={() => setLang(code)}>{label}</button>
          ))}
        </div>
        <a className="ms-btn ms-btn-light ms-topbar-link" href={url('index.html')}>
          <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> <span>{t('seeSite')}</span>
        </a>
        <span className="ms-user">
          <span className="ms-avatar" aria-hidden="true">{loc(MEMBER.firstName).charAt(0)}</span>
          <span className="ms-user-name">{loc(MEMBER.fullName)}</span>
        </span>
        <button type="button" className="ms-btn ms-btn-light ms-logout" onClick={logout} aria-label={t('logout')}>
          <i className="fa-solid fa-right-from-bracket" aria-hidden="true"></i> <span>{t('logout')}</span>
        </button>
      </header>

      <div className="ms-body">
        <aside className="ms-sidebar">
          <nav className="ms-nav" ref={navRef} aria-label={t('menuLabel')}>
            {SECTIONS.map((entry) => (
              <button key={entry.id} type="button" className={section === entry.id ? 'is-active' : undefined} aria-current={section === entry.id ? 'page' : undefined} onClick={() => open(entry.id)}>
                <i className={`fa-solid ${entry.icon}`} aria-hidden="true"></i>
                <span>{t(`nav_${entry.id}`)}</span>
                {badges[entry.id] > 0 && <span className="ms-count">{badges[entry.id]}</span>}
              </button>
            ))}
          </nav>
        </aside>

        <main className="ms-main" ref={contentRef} tabIndex={-1}>
          {section === 'dashboard' && <Dashboard {...shared} onNewRequest={() => open('requests', { mode: 'new' })} />}
          {section === 'profile' && <Profile {...shared} />}
          {section === 'family' && <Family {...shared} />}
          {section === 'requests' && <RequestsSection {...shared} view={requestView} setView={setRequestView} />}
          {section === 'documents' && <DocumentsSection {...shared} />}
          {section === 'contributions' && <ContributionsSection {...shared} />}
          {section === 'benefits' && <BenefitsSection {...shared} />}
          {section === 'messages' && <MessagesSection {...shared} />}
          {section === 'appointments' && <AppointmentsSection {...shared} />}
        </main>
      </div>

      <div className="ms-toast-zone" aria-live="polite">
        {toast && <div className="ms-toast"><i className="fa-solid fa-circle-check" aria-hidden="true"></i> <span>{toast}</span></div>}
      </div>
    </div>
  );
}

/** Espace à part, comme l'espace de gestion : sans l'en-tête ni le pied de page du site public. */
export default function MemberSpacePage() {
  return <MemberSpace />;
}
