import { useMemo, useState } from 'react';
import { assetUrl, url } from '@/lib/paths';
import { CONTENT_TYPES, LANGS, PLANNED_SECTIONS } from './contentTypes';

const GROUPS = ['Contenu', 'Prestations', 'Accueil', 'Réglages'];

/** Langues complètes d'une fiche : tous les champs traduits sont remplis. */
function languageStatus(type, draft) {
  const localized = type.fields.filter((field) => field.localized);
  return Object.fromEntries(LANGS.map(({ code }) => [
    code,
    localized.length === 0 || localized.every((field) => String(draft[`${field.key}_${code}`] || '').trim())
  ]));
}

function LangDots({ status }) {
  return (
    <span className="cms-langs">
      {LANGS.map(({ code }) => (
        <span key={code} className={`cms-lang-dot${status[code] ? ' is-ok' : ''}`} title={status[code] ? 'Traduction complète' : 'Traduction manquante'}>{code.toUpperCase()}</span>
      ))}
    </span>
  );
}

/** Champ du formulaire (texte, zone de texte, liste, case, image, fichier). */
function Field({ field, value, onChange, dir }) {
  const id = `cms-${field.key}`;
  let input;
  if (field.checkbox) {
    input = <label className="cms-check"><input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} /> Oui</label>;
  } else if (field.options) {
    input = (
      <select id={id} value={value || ''} onChange={(e) => onChange(e.target.value)}>
        <option value="">— Choisir —</option>
        {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
        {value && !field.options.includes(value) && <option value={value}>{value}</option>}
      </select>
    );
  } else if (field.multiline) {
    input = <textarea id={id} dir={dir} rows={field.rows || 3} value={value || ''} onChange={(e) => onChange(e.target.value)} />;
  } else {
    input = <input id={id} dir={dir} type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} />;
  }
  return (
    <div className="cms-field">
      <label htmlFor={id}>{field.label}{field.required && <span className="cms-required"> *</span>}</label>
      {input}
      {field.image && value && (
        <img className="cms-preview" src={assetUrl(`${field.prefix || ''}${value}`)} alt="" />
      )}
      {(field.image || field.file) && (
        <button type="button" className="cms-btn cms-btn-light cms-upload"><i className="fa-solid fa-upload"></i> Choisir un fichier</button>
      )}
    </div>
  );
}

/** Formulaire d'édition : textes traduits par onglet de langue, puis champs communs. */
function Editor({ type, draft, onSave, onCancel, onDelete }) {
  const [form, setForm] = useState(draft);
  const [lang, setLang] = useState('fr');
  const status = languageStatus(type, form);
  const localized = type.fields.filter((field) => field.localized);
  const common = type.fields.filter((field) => !field.localized);
  const missing = LANGS.filter(({ code }) => !status[code]).map(({ label }) => label);
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const activeDir = LANGS.find(({ code }) => code === lang).dir;

  return (
    <div className="cms-editor">
      <div className="cms-editor-head">
        <button type="button" className="cms-back" onClick={onCancel}><i className="fa-solid fa-arrow-left"></i> {type.label}</button>
        <h2>{draft.isNew ? `Ajouter ${type.singular}` : type.title(draft) || 'Sans titre'}</h2>
      </div>

      {localized.length > 0 && (
        <section className="cms-card">
          <div className="cms-tabs" role="tablist">
            {LANGS.map(({ code, label }) => (
              <button key={code} type="button" role="tab" aria-selected={lang === code} className={`cms-tab${lang === code ? ' is-active' : ''}`} onClick={() => setLang(code)}>
                {label} <span className={`cms-tab-state${status[code] ? ' is-ok' : ''}`}><i className={`fa-solid ${status[code] ? 'fa-check' : 'fa-exclamation'}`}></i></span>
              </button>
            ))}
          </div>
          {localized.map((field) => (
            <Field key={`${field.key}_${lang}`} field={field} dir={activeDir} value={form[`${field.key}_${lang}`]} onChange={(value) => set(`${field.key}_${lang}`, value)} />
          ))}
        </section>
      )}

      {common.length > 0 && (
        <section className="cms-card cms-grid">
          {common.map((field) => (
            <Field key={field.key} field={field} value={form[field.key]} onChange={(value) => set(field.key, value)} />
          ))}
        </section>
      )}

      {missing.length > 0 && (
        <p className="cms-warning"><i className="fa-solid fa-triangle-exclamation"></i> Traduction incomplète : {missing.join(', ')}. La publication sera bloquée tant que les 3 langues ne sont pas remplies.</p>
      )}

      <div className="cms-actions">
        {!draft.isNew && <button type="button" className="cms-btn cms-btn-danger" onClick={onDelete}><i className="fa-solid fa-trash"></i> Supprimer</button>}
        <span className="cms-spacer"></span>
        <button type="button" className="cms-btn cms-btn-light" onClick={onCancel}>Annuler</button>
        <button type="button" className="cms-btn cms-btn-primary" onClick={() => onSave(form)}><i className="fa-solid fa-floppy-disk"></i> Enregistrer</button>
      </div>
    </div>
  );
}

/** Liste des fiches d'un type de contenu, avec recherche. */
function ContentList({ type, drafts, onEdit, onAdd }) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const rows = q ? drafts.filter((draft) => Object.values(draft).some((value) => String(value).toLowerCase().includes(q))) : drafts;
  return (
    <>
      <div className="cms-page-head">
        <div>
          <h2><i className={`fa-solid ${type.icon}`}></i> {type.label}</h2>
          <p>{type.description}</p>
        </div>
        <button type="button" className="cms-btn cms-btn-primary" onClick={onAdd}><i className="fa-solid fa-plus"></i> Ajouter</button>
      </div>
      <div className="cms-card cms-table-card">
        <div className="cms-search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="search" placeholder={`Rechercher (${drafts.length} éléments)…`} value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <table className="cms-table">
          <thead>
            <tr>
              {type.columns.map((column) => <th key={column.label}>{column.label}</th>)}
              <th>Langues</th>
              <th aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((draft) => (
              <tr key={draft.id} onClick={() => onEdit(draft)}>
                {type.columns.map((column) => <td key={column.label} className={column.wide ? 'is-wide' : undefined}>{column.value(draft) || '—'}</td>)}
                <td><LangDots status={languageStatus(type, draft)} /></td>
                <td className="cms-row-action"><i className="fa-solid fa-pen"></i></td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={type.columns.length + 2} className="cms-empty">Aucun résultat.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Dashboard({ data, onOpen }) {
  const incomplete = CONTENT_TYPES.reduce((total, type) => total + data[type.id].filter((draft) => Object.values(languageStatus(type, draft)).includes(false)).length, 0);
  const latest = data.news.slice(0, 5);
  return (
    <>
      <div className="cms-page-head">
        <div>
          <h2>Tableau de bord</h2>
          <p>Vue d’ensemble du contenu du site FOS-Agri.</p>
        </div>
      </div>
      <div className="cms-stats">
        {CONTENT_TYPES.map((type) => (
          <button key={type.id} type="button" className="cms-stat" onClick={() => onOpen(type.id)}>
            <i className={`fa-solid ${type.icon}`}></i>
            <strong>{data[type.id].length}</strong>
            <span>{type.label}</span>
          </button>
        ))}
        <div className="cms-stat is-alert">
          <i className="fa-solid fa-language"></i>
          <strong>{incomplete}</strong>
          <span>Fiches à traduire</span>
        </div>
      </div>
      <div className="cms-card">
        <h3 className="cms-card-title">Dernières actualités</h3>
        <ul className="cms-latest">
          {latest.map((draft) => (
            <li key={draft.id}>
              <img src={assetUrl(draft.image)} alt="" />
              <div><strong>{draft.title_fr}</strong><span>{draft.date} · {draft.category_fr}</span></div>
              <LangDots status={languageStatus(CONTENT_TYPES[0], draft)} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function Planned({ section }) {
  return (
    <>
      <div className="cms-page-head">
        <div>
          <h2><i className={`fa-solid ${section.icon}`}></i> {section.label}</h2>
          <p>Rubrique prévue — pas encore disponible dans cette démonstration.</p>
        </div>
      </div>
      <div className="cms-card">
        <h3 className="cms-card-title">Ce qui sera modifiable</h3>
        <ul className="cms-planned">{section.items.map((item) => <li key={item}><i className="fa-solid fa-circle-check"></i> {item}</li>)}</ul>
      </div>
    </>
  );
}

/**
 * Espace de gestion du contenu — DÉMONSTRATION.
 * Les données affichées sont les vraies données du site ; les modifications
 * restent dans le navigateur (aucun backend pour l'instant).
 */
export default function AdminPage() {
  const [data, setData] = useState(() => Object.fromEntries(CONTENT_TYPES.map((type) => [type.id, type.items()])));
  const [view, setView] = useState('dashboard');
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState('');
  const type = CONTENT_TYPES.find((entry) => entry.id === view);
  const planned = PLANNED_SECTIONS.find((entry) => entry.id === view);
  const nav = useMemo(() => GROUPS.map((group) => ({
    group,
    entries: [...CONTENT_TYPES, ...PLANNED_SECTIONS].filter((entry) => entry.group === group)
  })), []);

  const notify = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 2600);
  };
  const open = (id) => {
    setView(id);
    setEditing(null);
  };
  const save = (form) => {
    const { isNew, ...draft } = form;
    setData((current) => ({
      ...current,
      [type.id]: isNew ? [draft, ...current[type.id]] : current[type.id].map((entry) => (entry.id === draft.id ? draft : entry))
    }));
    setEditing(null);
    notify('Enregistré (démonstration : rien n’est envoyé au site).');
  };
  const remove = () => {
    setData((current) => ({ ...current, [type.id]: current[type.id].filter((entry) => entry.id !== editing.id) }));
    setEditing(null);
    notify('Supprimé (démonstration).');
  };

  return (
    <div className="cms">
      <header className="cms-topbar">
        <a className="cms-brand" href={url('index.html')}>
          <img src={url('assets/images/logo.png')} alt="" width="46" height="36" />
          <span><strong>FOS-Agri</strong> Espace de gestion</span>
        </a>
        <span className="cms-demo-badge"><i className="fa-solid fa-flask"></i> Démonstration — aucune modification n’est enregistrée</span>
        <a className="cms-btn cms-btn-light" href={url('index.html')} target="_blank" rel="noopener"><i className="fa-solid fa-arrow-up-right-from-square"></i> Voir le site</a>
        <span className="cms-user"><i className="fa-solid fa-user"></i> Administrateur</span>
      </header>

      <div className="cms-body">
        <nav className="cms-sidebar" aria-label="Rubriques">
          <button type="button" className={`cms-nav${view === 'dashboard' ? ' is-active' : ''}`} onClick={() => open('dashboard')}>
            <i className="fa-solid fa-gauge"></i> Tableau de bord
          </button>
          {nav.map(({ group, entries }) => (
            <div key={group} className="cms-nav-group">
              <span className="cms-nav-title">{group}</span>
              {entries.map((entry) => (
                <button key={entry.id} type="button" className={`cms-nav${view === entry.id ? ' is-active' : ''}`} onClick={() => open(entry.id)}>
                  <i className={`fa-solid ${entry.icon}`}></i> {entry.label}
                  {data[entry.id] ? <span className="cms-count">{data[entry.id].length}</span> : <span className="cms-soon">bientôt</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <main className="cms-main">
          {view === 'dashboard' && <Dashboard data={data} onOpen={open} />}
          {planned && <Planned section={planned} />}
          {type && !editing && (
            <ContentList type={type} drafts={data[type.id]} onEdit={setEditing} onAdd={() => setEditing({ id: `${type.id}-${Date.now()}`, isNew: true })} />
          )}
          {type && editing && (
            <Editor key={editing.id} type={type} draft={editing} onSave={save} onCancel={() => setEditing(null)} onDelete={remove} />
          )}
        </main>
      </div>

      {toast && <div className="cms-toast" role="status"><i className="fa-solid fa-circle-check"></i> {toast}</div>}
    </div>
  );
}
