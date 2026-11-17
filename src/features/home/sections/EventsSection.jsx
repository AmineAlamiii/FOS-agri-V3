import { useState } from 'react';
import { siteData } from '@/data/siteData';
import { localizedEntry } from '@/i18n/useSiteT';

const MONTHS = {
  fr: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
  ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'ماي', 'يونيو', 'يوليوز', 'غشت', 'شتنبر', 'أكتوبر', 'نونبر', 'دجنبر'],
  zgh: ['ⵉⵏⵏⴰⵢⵔ', 'ⴼⵓⵕⴰⵕ', 'ⵎⴰⵕⵚ', 'ⵉⴱⵔⵉⵔ', 'ⵎⴰⵢⵢⵓ', 'ⵢⵓⵏⵢⵓ', 'ⵢⵓⵍⵢⵓⵣ', 'ⵖⵓⵛⵜ', 'ⵛⵓⵜⴰⵏⴱⵉⵔ', 'ⴽⵜⵓⴱⵔ', 'ⵏⵓⵡⴰⵏⴱⵉⵔ', 'ⴷⵓⵊⴰⵏⴱⵉⵔ']
};
const WEEKDAYS = {
  fr: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
  ar: ['الاث', 'الثل', 'الأر', 'الخم', 'الجم', 'السب', 'الأح'],
  zgh: ['ⴰⵢⵏ', 'ⴰⵙⵉ', 'ⴰⴽⵕ', 'ⴰⴽⵡ', 'ⴰⵙⵉⵎ', 'ⴰⵙⵉⴹ', 'ⴰⵙⴰ']
};
const LABELS = {
  fr: { filter: 'Filtre :', empty: 'Aucun événement pour cette période', details: 'Voir les détails' },
  ar: { filter: 'تصفية :', empty: 'لا يوجد حدث لهذه الفترة', details: 'عرض التفاصيل' },
  zgh: { filter: 'ⴰⵙⵜⴰⵢ :', empty: 'ⵓⵔ ⵉⵍⵉ ⵓⵙⴳⵔⴰⵡ ⵉ ⵜⵉⵣⵉ ⴰⴷ', details: 'ⵙⴽⵏ ⵉⴼⵔⴰⴹ' }
};

const parseDate = (value) => {
  const parts = value.split('/');
  return parts.length === 3 ? new Date(+parts[2], +parts[1] - 1, +parts[0]) : null;
};
const dateKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const EVENTS = (siteData.events || []).map((event) => ({ ...event, _date: parseDate(event.date) })).filter((event) => event._date);
const EVENTS_BY_DAY = EVENTS.reduce((map, event) => {
  const key = dateKey(event._date);
  (map[key] = map[key] || []).push(event);
  return map;
}, {});

/** Calendrier du mois : jours avec événement, jour courant, jour sélectionné. */
function Calendar({ lang, year, month, selected, onSelect, onMonth, t }) {
  const months = MONTHS[lang] || MONTHS.fr;
  const today = new Date();
  const todayKey = dateKey(today);
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const days = new Date(year, month + 1, 0).getDate();
  return (
    <div className="agenda-calendar" id="agenda-calendar">
      <div className="cal-title">{t('events.calendar')}</div>
      <div className="cal-header">
        <button className="cal-nav" id="cal-prev" aria-label="Mois précédent" onClick={() => onMonth(-1)}><i className="fa-solid fa-chevron-left"></i></button>
        <span className="cal-month-label" id="cal-month-label">{`${months[month]} ${year}`}</span>
        <button className="cal-nav" id="cal-next" aria-label="Mois suivant" onClick={() => onMonth(1)}><i className="fa-solid fa-chevron-right"></i></button>
      </div>
      <div className="cal-weekdays" id="cal-weekdays">
        {(WEEKDAYS[lang] || WEEKDAYS.fr).map((day) => <div key={day} className="cal-weekday">{day}</div>)}
      </div>
      <div className="cal-days" id="cal-days" aria-live="polite">
        {Array.from({ length: offset }, (_, i) => <button key={`empty-${i}`} className="cal-day is-empty" tabIndex={-1} aria-hidden="true"></button>)}
        {Array.from({ length: days }, (_, i) => {
          const day = i + 1;
          const date = new Date(year, month, day);
          const key = dateKey(date);
          const events = EVENTS_BY_DAY[key];
          const classes = ['cal-day'];
          if (date < today && key !== todayKey) classes.push('is-past');
          if (events) classes.push('has-event');
          if (events?.some((event) => event.important)) classes.push('is-important');
          if (key === todayKey) classes.push('is-today');
          if (key === selected) classes.push('is-selected');
          return <button key={key} className={classes.join(' ')} aria-label={`${day} ${months[month]} ${year}`} onClick={() => onSelect(key)}>{day}</button>;
        })}
      </div>
      <div className="cal-legend">
        <span className="cal-legend-item"><span className="cal-legend-dot upcoming"></span> <span>{t('events.legendUpcoming')}</span></span>{' '}
        <span className="cal-legend-item"><span className="cal-legend-dot important"></span> <span>{t('events.legendImportant')}</span></span>{' '}
        <span className="cal-legend-item"><span className="cal-legend-dot past"></span> <span>{t('events.legendPast')}</span></span>
      </div>
      <div className="cal-hint">
        <i className="fa-regular fa-calendar-days"></i>{' '}
        <span>{t('events.hint')}</span>
      </div>
    </div>
  );
}

/** Liste des événements (à venir / historique, filtrée par jour sélectionné). */
function AgendaList({ lang, tab, selected }) {
  const months = MONTHS[lang] || MONTHS.fr;
  const labels = LABELS[lang] || LABELS.fr;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let events = tab === 'upcoming'
    ? EVENTS.filter((event) => event._date >= today).sort((a, b) => a._date - b._date)
    : EVENTS.filter((event) => event._date < today).sort((a, b) => b._date - a._date);
  if (selected) events = events.filter((event) => dateKey(event._date) === selected);
  if (!events.length) return <div className="agenda-empty">{labels.empty}</div>;
  const pick = (event, base) => (lang === 'ar' ? event[`${base}Ar`] || event[base] || '' : lang === 'zgh' ? event[`${base}Zgh`] || event[base] || '' : event[base] || '');
  return events.map((event) => {
    const content = localizedEntry(event, lang);
    const typeLabel = pick(event, 'type');
    const location = pick(event, 'location');
    const time = pick(event, 'time');
    const typeColor = event.typeColor || '#1f6a43';
    return (
      <article key={`${event.date}-${event.fr?.title}`} className={`agenda-event-card${event._date < today ? ' is-past' : ''}${event.important ? ' is-important' : ''}`}>
        <div className="event-date-block">
          <span className="edb-day">{String(event._date.getDate()).padStart(2, '0')}</span>
          <span className="edb-month">{months[event._date.getMonth()].substring(0, 3).toUpperCase()}</span>
          <span className="edb-year">{event._date.getFullYear()}</span>
        </div>
        <div className="event-icon-circle" style={{ background: event.iconBg || '#e8f5ee', color: event.iconColor || '#1f6a43' }}>
          <i className={`fa-solid ${event.icon || 'fa-calendar-day'}`}></i>
        </div>
        <div className="event-body">
          <p className="event-title">{content.title}</p>
          {content.excerpt && <p className="event-excerpt">{content.excerpt}</p>}
          <div className="event-meta">
            {location && <span><i className="fa-solid fa-location-dot"></i>{` ${location}`}</span>}
            {time && <span><i className="fa-regular fa-clock"></i>{` ${time}`}</span>}
          </div>
        </div>
        <div className="event-side">
          {typeLabel && <span className="event-type-badge" style={{ background: event.typeColor ? `${event.typeColor}18` : '#e8f5ee', color: typeColor }}>{typeLabel}</span>}
          <a href="#agenda-calendar" className="event-detail-link">{`${labels.details} `}<i className="fa-solid fa-arrow-right"></i></a>
        </div>
      </article>
    );
  });
}

/** Agenda solidaire : calendrier interactif + onglets « À venir / Historique ». */
function Agenda({ lang, t, tab, setTab, selected, setSelected }) {
  const now = new Date();
  const [view, setView] = useState({ year: now.getFullYear(), month: now.getMonth() });
  const months = MONTHS[lang] || MONTHS.fr;
  const moveMonth = (delta) => setView(({ year, month }) => {
    const next = month + delta;
    if (next < 0) return { year: year - 1, month: 11 };
    if (next > 11) return { year: year + 1, month: 0 };
    return { year, month: next };
  });
  const chooseTab = (next) => {
    setTab(next);
    setSelected(null);
  };
  let filterLabel = '';
  if (selected) {
    const [y, m, d] = selected.split('-');
    filterLabel = `${(LABELS[lang] || LABELS.fr).filter} ${d} ${months[+m - 1]} ${y}`;
  }
  return (
    <div className="agenda-layout">
      <Calendar lang={lang} year={view.year} month={view.month} selected={selected} onSelect={(key) => setSelected((current) => (current === key ? null : key))} onMonth={moveMonth} t={t} />
      <div className="agenda-events">
        <div className="agenda-tabs">
          <button className={`agenda-tab${tab === 'upcoming' ? ' is-active' : ''}`} id="tab-upcoming" onClick={() => chooseTab('upcoming')}>
            <i className="fa-regular fa-calendar"></i> <span>{t('events.tabUpcoming')}</span>
          </button>
          <button className={`agenda-tab${tab === 'past' ? ' is-active' : ''}`} id="tab-past" onClick={() => chooseTab('past')}>
            <i className="fa-regular fa-clock"></i> <span>{t('events.tabPast')}</span>
          </button>
        </div>
        <div className="agenda-filter-label" id="agenda-filter-label">{filterLabel}</div>
        <div className="agenda-list" id="agenda-list" aria-live="polite">
          <AgendaList key={lang} lang={lang} tab={tab} selected={selected} />
        </div>
        <div className="agenda-view-all-wrap">
          <button className="btn-view-all-events" id="btn-view-all-events">{t('events.viewAll')}</button>
        </div>
      </div>
    </div>
  );
}

export default function EventsSection({ t, lang }) {
  // L'onglet et le jour choisis sont conservés lors d'un changement de langue.
  const [tab, setTab] = useState('upcoming');
  const [selected, setSelected] = useState(null);
  return (
    <section className="section events-section" id="events">
      <div className="container">
        <div className="events-hero">
          <div className="events-hero-content">
            <div className="agenda-tag">{t('events.tag')}</div>
            <h2>{t('events.title')}</h2>
            <p className="events-hero-sub">{t('events.subtitle')}</p>
          </div>
          <a href="#agenda-list" className="btn-agenda-all">
            <i className="fa-regular fa-calendar"></i>{' '}
            <span>{t('events.viewAllLink')}</span>{' '}
            <i className="fa-solid fa-arrow-right"></i>
          </a>
          <div className="events-hero-photo" aria-hidden="true"></div>
        </div>
      </div>
      <div className="container">
        {/* Comme avant, le calendrier revient au mois courant à chaque changement de langue. */}
        <Agenda key={lang} lang={lang} t={t} tab={tab} setTab={setTab} selected={selected} setSelected={setSelected} />
      </div>
    </section>
  );
}
