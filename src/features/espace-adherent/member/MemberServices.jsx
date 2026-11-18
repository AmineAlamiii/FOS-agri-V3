import { useState } from 'react';
import { url } from '@/lib/paths';
import { ADVANTAGES, ATTESTATION_TYPES, CONTRIBUTIONS, DOCUMENTS, MEMBER, OFFERS, PLACES, placeLabel, REASONS, reasonLabel, TIME_SLOTS } from './memberDemo';
import { formatDate, sameText, todayIso, useMemberT } from './memberUtils';
import { Card, describedBy, Field, SectionHead } from './MemberUi';

/* ------------------------------------------------------------------ */
/* Documents                                                           */
/* ------------------------------------------------------------------ */

const DOC_ICON = { attestation: 'fa-file-signature', decision: 'fa-file-circle-check', receipt: 'fa-file-invoice' };

export function DocumentsSection({ notify }) {
  const { t, loc } = useMemberT();
  const [asking, setAsking] = useState(false);
  const [type, setType] = useState(ATTESTATION_TYPES[0].id);
  const request = (event) => {
    event.preventDefault();
    setAsking(false);
    notify(t('docRequested'));
  };
  return (
    <>
      <SectionHead
        title={t('nav_documents')}
        intro={t('intro_documents')}
        action={!asking && <button type="button" className="ms-btn ms-btn-primary" onClick={() => setAsking(true)}><i className="fa-solid fa-file-circle-plus" aria-hidden="true"></i> <span>{t('requestAttestation')}</span></button>}
      />
      {asking && (
        <Card title={t('requestAttestation')} icon="fa-file-circle-plus" className="ms-card-form">
          <form className="ms-form ms-form-inline" onSubmit={request}>
            <Field id="ms-attestation" label={t('attestationType')}>
              <select id="ms-attestation" value={type} onChange={(event) => setType(event.target.value)}>
                {ATTESTATION_TYPES.map((entry) => <option key={entry.id} value={entry.id}>{loc(entry.label)}</option>)}
              </select>
            </Field>
            <div className="ms-form-actions">
              <button type="button" className="ms-btn ms-btn-light" onClick={() => setAsking(false)}>{t('cancel')}</button>
              <button type="submit" className="ms-btn ms-btn-primary">{t('send')}</button>
            </div>
          </form>
        </Card>
      )}
      <div className="ms-documents">
        {DOCUMENTS.map((doc) => (
          <article key={doc.id} className="ms-document">
            <i className={`fa-solid ${DOC_ICON[doc.type]}`} aria-hidden="true"></i>
            <div>
              <h3>{loc(doc.title)}</h3>
              <p>{t(`docType_${doc.type}`)} · {formatDate(doc.date)} · PDF <span dir="ltr">{doc.size}</span></p>
            </div>
            <button type="button" className="ms-btn ms-btn-light" onClick={() => notify(t('docDemo'))}>
              <i className="fa-solid fa-download" aria-hidden="true"></i> <span>{t('download')}</span>
            </button>
          </article>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Cotisations                                                         */
/* ------------------------------------------------------------------ */

export function ContributionsSection({ notify }) {
  const { t, loc } = useMemberT();
  const total = CONTRIBUTIONS.reduce((sum, row) => sum + row.months * MEMBER.monthlyFee, 0);
  return (
    <>
      <SectionHead title={t('nav_contributions')} intro={t('intro_contributions')} />
      <div className="ms-stats is-three">
        <div className="ms-stat is-static"><i className="fa-solid fa-coins" aria-hidden="true"></i><strong>{t('amount', { n: MEMBER.monthlyFee })}</strong><span>{t('monthlyAmount')}</span></div>
        <div className="ms-stat is-static"><i className="fa-solid fa-layer-group" aria-hidden="true"></i><strong className="is-small">{loc(MEMBER.category)}</strong><span>{t('fieldCategory')}</span></div>
        <div className="ms-stat is-static"><i className="fa-solid fa-building-columns" aria-hidden="true"></i><strong className="is-small">{t('paymentModeValue')}</strong><span>{t('paymentMode')}</span></div>
      </div>
      <Card className="ms-card-flush">
        <table className="ms-table">
          <thead>
            <tr>
              <th scope="col">{t('colYear')}</th>
              <th scope="col">{t('colMonths')}</th>
              <th scope="col">{t('colAmount')}</th>
              <th scope="col">{t('colStatus')}</th>
              <th scope="col">{t('colReceipt')}</th>
            </tr>
          </thead>
          <tbody>
            {CONTRIBUTIONS.map((row) => (
              <tr key={row.year}>
                <td data-label={t('colYear')} className="is-strong">{row.year}</td>
                <td data-label={t('colMonths')}>{row.months} / 12</td>
                <td data-label={t('colAmount')}>{t('amount', { n: row.months * MEMBER.monthlyFee })}</td>
                <td data-label={t('colStatus')}>
                  <span className={`ms-badge ${row.complete ? 'is-success' : 'is-info'}`}>
                    <i className={`fa-solid ${row.complete ? 'fa-circle-check' : 'fa-hourglass-half'}`} aria-hidden="true"></i> <span>{row.complete ? t('contribPaid') : t('contribInProgress')}</span>
                  </span>
                </td>
                <td data-label={t('colReceipt')}>
                  <button type="button" className="ms-link" onClick={() => notify(t('docDemo'))}><i className="fa-solid fa-download" aria-hidden="true"></i> <span>{t('download')}</span></button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colSpan={2}>{t('totalPaid')}</th>
              <td colSpan={3} className="is-strong">{t('amount', { n: total })}</td>
            </tr>
          </tfoot>
        </table>
      </Card>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Avantages                                                           */
/* ------------------------------------------------------------------ */

export function BenefitsSection({ open }) {
  const { t, loc } = useMemberT();
  return (
    <>
      <SectionHead title={t('nav_benefits')} intro={t('intro_benefits')} />
      <h3 className="ms-group-title">{t('currentOffers')}</h3>
      <div className="ms-offers">
        {OFFERS.map((offer) => (
          <article key={offer.id} className="ms-offer">
            <i className={`fa-solid ${offer.icon}`} aria-hidden="true"></i>
            <div>
              <h4>{loc(offer.title)}</h4>
              <p>{loc(offer.text)}</p>
              <p className="ms-offer-date"><i className="fa-regular fa-clock" aria-hidden="true"></i> <span>{t('registrationsUntil', { date: formatDate(offer.until) })}</span></p>
            </div>
            <div className="ms-offer-actions">
              <button type="button" className="ms-btn ms-btn-primary" onClick={() => open('requests', { mode: 'new', service: offer.id })}>{t('actionNewRequest')}</button>
              <a className="ms-link" href={url(offer.page)}>{t('learnMore')}</a>
            </div>
          </article>
        ))}
      </div>
      <h3 className="ms-group-title">{t('myAdvantages')}</h3>
      <div className="ms-advantages">
        {ADVANTAGES.map((advantage) => (
          <a key={advantage.id} className="ms-advantage" href={url(advantage.page)}>
            <i className={`fa-solid ${advantage.icon}`} aria-hidden="true"></i>
            <h4>{loc(advantage.title)}</h4>
            <p>{loc(advantage.text)}</p>
            <span className="ms-link">{t('learnMore')} <i className="fa-solid fa-arrow-right ms-flip" aria-hidden="true"></i></span>
          </a>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Messagerie et réclamations                                          */
/* ------------------------------------------------------------------ */

export function MessagesSection({ store, setStore, notify }) {
  const { t, loc } = useMemberT();
  const [activeId, setActiveId] = useState(store.conversations[0]?.id);
  const [composing, setComposing] = useState(false);
  const [reply, setReply] = useState('');
  const [form, setForm] = useState({ type: 'question', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const active = store.conversations.find((conversation) => conversation.id === activeId);

  const select = (id) => {
    setActiveId(id);
    setComposing(false);
    setStore((current) => ({ ...current, conversations: current.conversations.map((entry) => (entry.id === id ? { ...entry, unread: false } : entry)) }));
  };
  const sendReply = (event) => {
    event.preventDefault();
    if (!reply.trim()) return;
    const message = { from: 'member', date: todayIso(), text: sameText(reply.trim()) };
    setStore((current) => ({ ...current, conversations: current.conversations.map((entry) => (entry.id === activeId ? { ...entry, messages: [...entry.messages, message] } : entry)) }));
    setReply('');
    notify(t('messageSent'));
  };
  const create = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.subject.trim()) nextErrors.subject = t('errorRequired');
    if (!form.message.trim()) nextErrors.message = t('errorRequired');
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const conversation = {
      id: `c-${Date.now()}`, type: form.type, unread: false,
      subject: sameText(form.subject.trim()),
      messages: [{ from: 'member', date: todayIso(), text: sameText(form.message.trim()) }]
    };
    setStore((current) => ({ ...current, conversations: [conversation, ...current.conversations] }));
    setForm({ type: 'question', subject: '', message: '' });
    setComposing(false);
    setActiveId(conversation.id);
    notify(t('messageSent'));
  };

  return (
    <>
      <SectionHead
        title={t('nav_messages')}
        intro={t('intro_messages')}
        action={!composing && <button type="button" className="ms-btn ms-btn-primary" onClick={() => setComposing(true)}><i className="fa-solid fa-pen-to-square" aria-hidden="true"></i> <span>{t('newMessage')}</span></button>}
      />
      <div className="ms-messages">
        <Card title={t('conversations')} icon="fa-inbox" className="ms-card-flush ms-threads">
          <ul>
            {store.conversations.map((conversation) => (
              <li key={conversation.id}>
                <button type="button" className={conversation.id === activeId && !composing ? 'is-active' : undefined} aria-current={conversation.id === activeId && !composing ? 'true' : undefined} onClick={() => select(conversation.id)}>
                  <span className="ms-thread-top">
                    <strong>{loc(conversation.subject)}</strong>
                    {conversation.unread && <span className="ms-dot"><span className="ms-sr">{t('unread')}</span></span>}
                  </span>
                  <span className="ms-thread-meta">
                    <span>{t(`type_${conversation.type}`)}</span>
                    <span>{formatDate(conversation.messages[conversation.messages.length - 1].date)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {composing ? (
          <Card title={t('newMessage')} icon="fa-pen-to-square">
            <form className="ms-form" onSubmit={create} noValidate>
              <Field id="ms-message-type" label={t('messageType')}>
                <select id="ms-message-type" value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}>
                  <option value="question">{t('type_question')}</option>
                  <option value="complaint">{t('type_complaint')}</option>
                </select>
              </Field>
              <Field id="ms-subject" label={t('subject')} error={errors.subject}>
                <input id="ms-subject" value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} {...describedBy('ms-subject', errors.subject)} />
              </Field>
              <Field id="ms-message" label={t('message')} error={errors.message}>
                <textarea id="ms-message" rows={6} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} {...describedBy('ms-message', errors.message)}></textarea>
              </Field>
              <div className="ms-form-actions">
                <button type="button" className="ms-btn ms-btn-light" onClick={() => setComposing(false)}>{t('cancel')}</button>
                <button type="submit" className="ms-btn ms-btn-primary"><i className="fa-solid fa-paper-plane" aria-hidden="true"></i> <span>{t('send')}</span></button>
              </div>
            </form>
          </Card>
        ) : active && (
          <Card
            title={loc(active.subject)}
            icon={active.type === 'complaint' ? 'fa-triangle-exclamation' : 'fa-circle-question'}
            action={active.type === 'complaint' && <span className={`ms-badge ${active.closed ? 'is-success' : 'is-warning'}`}><span>{t(active.closed ? 'complaintStatus_closed' : 'complaintStatus_open')}</span></span>}
          >
            <ol className="ms-conversation">
              {active.messages.map((message, index) => (
                <li key={index} className={message.from === 'member' ? 'is-mine' : 'is-theirs'}>
                  <span className="ms-bubble-meta">{message.from === 'member' ? t('you') : t('foundation')} · {formatDate(message.date)}</span>
                  <p>{loc(message.text)}</p>
                </li>
              ))}
            </ol>
            <form className="ms-reply" onSubmit={sendReply}>
              <label htmlFor="ms-reply" className="ms-sr">{t('writeReply')}</label>
              <textarea id="ms-reply" rows={2} placeholder={t('writeReply')} value={reply} onChange={(event) => setReply(event.target.value)}></textarea>
              <button type="submit" className="ms-btn ms-btn-primary" disabled={!reply.trim()}><i className="fa-solid fa-paper-plane" aria-hidden="true"></i> <span>{t('send')}</span></button>
            </form>
          </Card>
        )}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Rendez-vous                                                         */
/* ------------------------------------------------------------------ */

export function AppointmentsSection({ store, setStore, notify }) {
  const { t, loc } = useMemberT();
  const today = todayIso();
  const [booking, setBooking] = useState(false);
  const [form, setForm] = useState({ place: PLACES[0].id, reason: REASONS[0].id, date: '', time: TIME_SLOTS[0] });
  const [errors, setErrors] = useState({});
  const sorted = [...store.appointments].sort((a, b) => a.date.localeCompare(b.date));
  const upcoming = sorted.filter((entry) => entry.date >= today);
  const past = sorted.filter((entry) => entry.date < today).reverse();

  const book = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.date) nextErrors.date = t('errorRequired');
    else if (form.date < today) nextErrors.date = t('errorDatePast');
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStore((current) => ({ ...current, appointments: [...current.appointments, { id: `a-${Date.now()}`, ...form }] }));
    setBooking(false);
    setForm({ place: PLACES[0].id, reason: REASONS[0].id, date: '', time: TIME_SLOTS[0] });
    notify(t('booked'));
  };
  const cancel = (id) => {
    setStore((current) => ({ ...current, appointments: current.appointments.filter((entry) => entry.id !== id) }));
    notify(t('cancelled'));
  };
  const item = (entry, canCancel) => (
    <li key={entry.id} className="ms-appointment">
      <span className="ms-date-box">
        <strong>{entry.date.slice(8, 10)}/{entry.date.slice(5, 7)}</strong>
        <span>{entry.date.slice(0, 4)}</span>
      </span>
      <div>
        <h4>{loc(placeLabel(entry.place))}</h4>
        <p>{loc(reasonLabel(entry.reason))} · <span dir="ltr">{entry.time}</span></p>
      </div>
      {canCancel && <button type="button" className="ms-btn ms-btn-light" onClick={() => cancel(entry.id)}>{t('cancelAppointment')}</button>}
    </li>
  );

  return (
    <>
      <SectionHead
        title={t('nav_appointments')}
        intro={t('intro_appointments')}
        action={!booking && <button type="button" className="ms-btn ms-btn-primary" onClick={() => setBooking(true)}><i className="fa-solid fa-calendar-plus" aria-hidden="true"></i> <span>{t('newAppointment')}</span></button>}
      />
      {booking && (
        <Card title={t('newAppointment')} icon="fa-calendar-plus" className="ms-card-form">
          <form className="ms-form ms-form-grid" onSubmit={book} noValidate>
            <Field id="ms-place" label={t('place')}>
              <select id="ms-place" value={form.place} onChange={(event) => setForm({ ...form, place: event.target.value })}>
                {PLACES.map((place) => <option key={place.id} value={place.id}>{loc(place.label)}</option>)}
              </select>
            </Field>
            <Field id="ms-reason" label={t('reason')}>
              <select id="ms-reason" value={form.reason} onChange={(event) => setForm({ ...form, reason: event.target.value })}>
                {REASONS.map((reason) => <option key={reason.id} value={reason.id}>{loc(reason.label)}</option>)}
              </select>
            </Field>
            <Field id="ms-date" label={t('date')} error={errors.date}>
              <input id="ms-date" type="date" min={today} value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} {...describedBy('ms-date', errors.date)} />
            </Field>
            <Field id="ms-time" label={t('time')}>
              <select id="ms-time" value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })}>
                {TIME_SLOTS.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
              </select>
            </Field>
            <div className="ms-form-actions">
              <button type="button" className="ms-btn ms-btn-light" onClick={() => setBooking(false)}>{t('cancel')}</button>
              <button type="submit" className="ms-btn ms-btn-primary">{t('book')}</button>
            </div>
          </form>
        </Card>
      )}
      <div className="ms-two-cols">
        <Card title={t('upcoming')} icon="fa-calendar-check">
          {upcoming.length ? <ul className="ms-appointments">{upcoming.map((entry) => item(entry, true))}</ul> : <p className="ms-empty">{t('noUpcoming')}</p>}
        </Card>
        <Card title={t('past')} icon="fa-clock-rotate-left">
          <ul className="ms-appointments is-past">{past.map((entry) => item(entry, false))}</ul>
        </Card>
      </div>
    </>
  );
}
