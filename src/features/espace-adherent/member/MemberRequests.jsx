import { useRef, useState } from 'react';
import { MEMBER, SERVICE_GROUPS, SERVICES, serviceLabel } from './memberDemo';
import { formatDate, OPEN_STATUSES, sameText, todayIso, useMemberT } from './memberUtils';
import { Card, describedBy, Field, InfoList, Ref, SectionHead, StatusBadge } from './MemberUi';

const FILTERS = ['all', 'open', 'accepted', 'refused'];
const filterMatches = (filter, status) => (filter === 'all' ? true : filter === 'open' ? OPEN_STATUSES.includes(status) : status === filter);
const STEPS = ['step1', 'step2', 'step3', 'step4'];

function useBeneficiaryLabel(store) {
  const { t, loc } = useMemberT();
  return (id) => {
    if (id === 'self') return `${t('myself')} (${loc(MEMBER.firstName)})`;
    const member = store.family.find((entry) => entry.id === id);
    return member ? loc(member.firstName) : '—';
  };
}

/* ------------------------------------------------------------------ */
/* Liste                                                               */
/* ------------------------------------------------------------------ */

function RequestList({ store, setView }) {
  const { t, loc } = useMemberT();
  const [filter, setFilter] = useState('all');
  const beneficiaryLabel = useBeneficiaryLabel(store);
  const rows = store.requests.filter((request) => filterMatches(filter, request.status));
  const filterLabel = { all: t('filterAll'), open: t('statRequests'), accepted: t('status_accepted'), refused: t('status_refused') };
  return (
    <>
      <SectionHead
        title={t('nav_requests')}
        intro={t('intro_requests')}
        action={<button type="button" className="ms-btn ms-btn-primary" onClick={() => setView({ mode: 'new' })}><i className="fa-solid fa-plus" aria-hidden="true"></i> <span>{t('newRequest')}</span></button>}
      />
      <div className="ms-chips" role="group" aria-label={t('colStatus')}>
        {FILTERS.map((id) => (
          <button key={id} type="button" className={filter === id ? 'is-active' : undefined} aria-pressed={filter === id} onClick={() => setFilter(id)}>
            <span>{filterLabel[id]}</span> <span className="ms-chip-count">{store.requests.filter((request) => filterMatches(id, request.status)).length}</span>
          </button>
        ))}
      </div>
      <Card className="ms-card-flush">
        <table className="ms-table">
          <thead>
            <tr>
              <th scope="col">{t('colRef')}</th>
              <th scope="col">{t('colService')}</th>
              <th scope="col">{t('colBeneficiary')}</th>
              <th scope="col">{t('colDate')}</th>
              <th scope="col">{t('colStatus')}</th>
              <th scope="col"><span className="ms-sr">{t('viewDetails')}</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((request) => (
              <tr key={request.ref}>
                <td data-label={t('colRef')}><Ref>{request.ref}</Ref></td>
                <td data-label={t('colService')} className="is-strong">{loc(serviceLabel(request.service))}</td>
                <td data-label={t('colBeneficiary')}>{beneficiaryLabel(request.beneficiary)}</td>
                <td data-label={t('colDate')}>{formatDate(request.date)}</td>
                <td data-label={t('colStatus')}><StatusBadge status={request.status} /></td>
                <td className="ms-row-action">
                  <button type="button" className="ms-link" onClick={() => setView({ mode: 'detail', ref: request.ref })}>
                    <span>{t('viewDetails')}</span> <i className="fa-solid fa-chevron-right ms-flip" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={6} className="ms-empty">{t('noRequests')}</td></tr>}
          </tbody>
        </table>
      </Card>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Détail                                                              */
/* ------------------------------------------------------------------ */

function RequestDetail({ store, setStore, setView, notify, request }) {
  const { t, loc } = useMemberT();
  const beneficiaryLabel = useBeneficiaryLabel(store);
  const fileInput = useRef(null);
  const service = SERVICES.find((entry) => entry.id === request.service);

  const sendMissing = (event) => {
    const names = [...(event.target.files || [])].map((file) => file.name);
    if (!names.length) return;
    setStore((current) => ({
      ...current,
      requests: current.requests.map((entry) => (entry.ref === request.ref
        ? { ...entry, status: 'review', files: [...entry.files, ...names], history: [...entry.history, { status: 'review', date: todayIso() }] }
        : entry))
    }));
    event.target.value = '';
    notify(t('missingSent'));
  };

  return (
    <>
      <button type="button" className="ms-back" onClick={() => setView({ mode: 'list' })}>
        <i className="fa-solid fa-arrow-left ms-flip" aria-hidden="true"></i> <span>{t('back')}</span>
      </button>
      <SectionHead title={loc(service.label)} intro={<Ref>{request.ref}</Ref>} action={<StatusBadge status={request.status} />} />

      {request.comment && (
        <p className={`ms-callout is-${request.status === 'missing' ? 'warning' : 'info'}`}>
          <i className="fa-solid fa-comment-dots" aria-hidden="true"></i>
          <span><strong>{t('requestComment')}</strong> <span>{loc(request.comment)}</span></span>
        </p>
      )}
      {request.status === 'missing' && (
        <div className="ms-missing">
          <input ref={fileInput} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="ms-sr" id="ms-missing-file" onChange={sendMissing} />
          <button type="button" className="ms-btn ms-btn-primary" onClick={() => fileInput.current?.click()}>
            <i className="fa-solid fa-upload" aria-hidden="true"></i> <span>{t('sendMissing')}</span>
          </button>
        </div>
      )}

      <div className="ms-two-cols">
        <Card title={t('summary')} icon="fa-circle-info">
          <InfoList items={[
            [t('colService'), loc(service.label)],
            [t('colBeneficiary'), beneficiaryLabel(request.beneficiary)],
            [t('colDate'), formatDate(request.date)],
            [t('details'), loc(request.details)]
          ]} />
          <h4 className="ms-subtitle">{t('requestFiles')}</h4>
          <ul className="ms-files">
            {request.files.map((file) => <li key={file}><i className="fa-solid fa-paperclip" aria-hidden="true"></i> <span dir="ltr">{file}</span></li>)}
          </ul>
        </Card>

        <Card title={t('requestHistory')} icon="fa-list-check">
          <ol className="ms-timeline">
            {request.history.map((entry, index) => (
              <li key={`${entry.status}-${index}`} className={index === request.history.length - 1 ? 'is-current' : undefined}>
                <StatusBadge status={entry.status} />
                <span>{formatDate(entry.date)}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Nouvelle demande (4 étapes)                                         */
/* ------------------------------------------------------------------ */

function NewRequest({ store, setStore, setView, notify, initialService }) {
  const { t, loc } = useMemberT();
  const beneficiaryLabel = useBeneficiaryLabel(store);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ service: initialService || '', beneficiary: 'self', details: '', files: [], certify: false });
  const [errors, setErrors] = useState({});
  const fileInput = useRef(null);
  const headingRef = useRef(null);
  const service = SERVICES.find((entry) => entry.id === form.service);
  const beneficiaries = ['self', ...store.family.map((member) => member.id)];

  const go = (next) => {
    setStep(next);
    requestAnimationFrame(() => headingRef.current?.focus());
  };
  const validate = () => {
    const nextErrors = {};
    if (step === 0 && !form.service) nextErrors.service = t('errorChooseService');
    if (step === 1 && !form.details.trim()) nextErrors.details = t('errorRequired');
    if (step === 3 && !form.certify) nextErrors.certify = t('errorCertify');
    setErrors(nextErrors);
    return !Object.keys(nextErrors).length;
  };
  const next = () => { if (validate()) go(step + 1); };
  const submit = (event) => {
    event.preventDefault();
    if (step < 3) return next();
    if (!validate()) return;
    const ref = `FOS-2026-0${1600 + store.requests.length}`;
    const request = {
      ref, service: form.service, beneficiary: form.beneficiary, date: todayIso(), status: 'sent',
      details: sameText(form.details.trim()), comment: null, files: form.files,
      history: [{ status: 'sent', date: todayIso() }]
    };
    setStore((current) => ({ ...current, requests: [request, ...current.requests] }));
    // Isolée de gauche à droite pour rester lisible dans le message en arabe.
    notify(t('submitted', { ref: `\u2066${ref}\u2069` }));
    setView({ mode: 'detail', ref });
  };
  const addFiles = (event) => {
    const names = [...(event.target.files || [])].map((file) => file.name);
    setForm((current) => ({ ...current, files: [...new Set([...current.files, ...names])] }));
    event.target.value = '';
  };

  return (
    <>
      <button type="button" className="ms-back" onClick={() => setView({ mode: 'list' })}>
        <i className="fa-solid fa-arrow-left ms-flip" aria-hidden="true"></i> <span>{t('back')}</span>
      </button>
      <SectionHead title={t('newRequest')} intro={t('stepOf', { n: step + 1 })} />

      <ol className="ms-stepper">
        {STEPS.map((key, index) => (
          <li key={key} className={index === step ? 'is-current' : index < step ? 'is-done' : undefined} aria-current={index === step ? 'step' : undefined}>
            <span className="ms-step-dot">{index < step ? <i className="fa-solid fa-check" aria-hidden="true"></i> : index + 1}</span>
            <span>{t(key)}</span>
          </li>
        ))}
      </ol>

      <Card className="ms-wizard">
        <form className="ms-form" onSubmit={submit} noValidate>
          <h3 ref={headingRef} tabIndex={-1} className="ms-wizard-title">{t(STEPS[step])}</h3>

          {step === 0 && (
            <fieldset className="ms-fieldset" aria-describedby={errors.service ? 'ms-service-error' : undefined}>
              <legend>{t('chooseService')}</legend>
              {SERVICE_GROUPS.map((group) => (
                <div key={group.id} className="ms-service-group">
                  <h4>{loc(group.label)}</h4>
                  <div className="ms-service-grid">
                    {SERVICES.filter((entry) => entry.group === group.id).map((entry) => (
                      <label key={entry.id} className={`ms-service${form.service === entry.id ? ' is-selected' : ''}`}>
                        <input type="radio" name="service" value={entry.id} checked={form.service === entry.id} onChange={() => { setForm({ ...form, service: entry.id }); setErrors({}); }} />
                        <i className={`fa-solid ${entry.icon}`} aria-hidden="true"></i>
                        <span>{loc(entry.label)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              {errors.service && <small className="ms-error" id="ms-service-error" role="alert"><i className="fa-solid fa-circle-exclamation" aria-hidden="true"></i> <span>{errors.service}</span></small>}
            </fieldset>
          )}

          {step === 1 && (
            <>
              <Field id="ms-beneficiary" label={t('beneficiary')}>
                <select id="ms-beneficiary" value={form.beneficiary} onChange={(event) => setForm({ ...form, beneficiary: event.target.value })}>
                  {beneficiaries.map((id) => <option key={id} value={id}>{beneficiaryLabel(id)}</option>)}
                </select>
              </Field>
              <Field id="ms-details" label={t('details')} hint={t('detailsHint')} error={errors.details}>
                <textarea id="ms-details" rows={5} value={form.details} onChange={(event) => setForm({ ...form, details: event.target.value })} {...describedBy('ms-details', errors.details, t('detailsHint'))}></textarea>
              </Field>
            </>
          )}

          {step === 2 && (
            <>
              <div className="ms-callout is-info">
                <i className="fa-solid fa-list-check" aria-hidden="true"></i>
                <span>
                  <strong>{t('requiredDocs')}</strong>
                  <ul>{service.docs.map((doc) => <li key={doc.fr}>{loc(doc)}</li>)}</ul>
                </span>
              </div>
              <input ref={fileInput} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="ms-sr" id="ms-files" onChange={addFiles} />
              <div>
                <button type="button" className="ms-btn ms-btn-light" onClick={() => fileInput.current?.click()}>
                  <i className="fa-solid fa-paperclip" aria-hidden="true"></i> <span>{t('chooseFiles')}</span>
                </button>
                <small className="ms-hint">{t('filesHint')}</small>
              </div>
              {form.files.length ? (
                <ul className="ms-files">
                  {form.files.map((file) => (
                    <li key={file}>
                      <i className="fa-solid fa-file" aria-hidden="true"></i> <span dir="ltr">{file}</span>
                      <button type="button" className="ms-link" onClick={() => setForm({ ...form, files: form.files.filter((name) => name !== file) })}>{t('removeFile')}</button>
                    </li>
                  ))}
                </ul>
              ) : <p className="ms-empty">{t('noFiles')}</p>}
            </>
          )}

          {step === 3 && (
            <>
              <InfoList items={[
                [t('colService'), loc(service.label)],
                [t('beneficiary'), beneficiaryLabel(form.beneficiary)],
                [t('details'), form.details],
                [t('step3'), form.files.length ? form.files.join(', ') : t('noFiles')]
              ]} />
              <label className={`ms-check${errors.certify ? ' has-error' : ''}`}>
                <input type="checkbox" checked={form.certify} onChange={(event) => { setForm({ ...form, certify: event.target.checked }); setErrors({}); }} aria-describedby={errors.certify ? 'ms-certify-error' : undefined} />
                <span>{t('certify')}</span>
              </label>
              {errors.certify && <small className="ms-error" id="ms-certify-error" role="alert"><i className="fa-solid fa-circle-exclamation" aria-hidden="true"></i> <span>{errors.certify}</span></small>}
            </>
          )}

          <div className="ms-form-actions">
            {step > 0 && <button type="button" className="ms-btn ms-btn-light" onClick={() => go(step - 1)}><i className="fa-solid fa-arrow-left ms-flip" aria-hidden="true"></i> <span>{t('previous')}</span></button>}
            {step < 3
              ? <button type="button" className="ms-btn ms-btn-primary" onClick={next}><span>{t('next')}</span> <i className="fa-solid fa-arrow-right ms-flip" aria-hidden="true"></i></button>
              : <button type="submit" className="ms-btn ms-btn-primary"><i className="fa-solid fa-paper-plane" aria-hidden="true"></i> <span>{t('submitRequest')}</span></button>}
          </div>
        </form>
      </Card>
    </>
  );
}

export function RequestsSection({ view, setView, ...shared }) {
  if (view.mode === 'new') return <NewRequest {...shared} setView={setView} initialService={view.service} />;
  const request = view.mode === 'detail' && shared.store.requests.find((entry) => entry.ref === view.ref);
  if (request) return <RequestDetail {...shared} setView={setView} request={request} />;
  return <RequestList {...shared} setView={setView} />;
}
