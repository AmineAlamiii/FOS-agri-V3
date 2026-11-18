import { useState } from 'react';
import { assetUrl } from '@/lib/paths';
import { LANGS } from './contentTypes';
import { structuredLanguageStatus } from './structuredTypes';

/** Copie de `object` avec la valeur `value` placée au chemin `path`. */
function setIn(object, path, value) {
  if (!path.length) return value;
  const [head, ...rest] = path;
  const copy = Array.isArray(object) ? [...object] : { ...object };
  copy[head] = setIn(object?.[head], rest, value);
  return copy;
}

/** Élément vide pour une liste (textes traduits = { fr, ar, zgh }). */
function emptyItem(fields) {
  return Object.fromEntries(fields.flatMap((field) => {
    if (field.kind === 'group') return field.nested ? [[field.key, emptyItem(field.fields)]] : Object.entries(emptyItem(field.fields));
    if (field.kind === 'list') return [[field.key, []]];
    return [[field.key, field.localized ? { fr: '', ar: '', zgh: '' } : '']];
  }));
}

/** Libellé court d'un élément de liste : son premier texte rempli. */
function itemLabel(item, fields, fallback) {
  for (const field of fields) {
    const value = item?.[field.key];
    if (field.kind === 'list' || field.kind === 'group' || field.kind === 'image' || field.kind === 'file') continue;
    const text = field.localized ? value?.fr : value;
    if (String(text || '').trim()) return String(text).slice(0, 90);
  }
  return fallback;
}

function Leaf({ field, value, lang, dir, onChange }) {
  const current = field.localized ? value?.[lang] ?? '' : value ?? '';
  const set = (next) => onChange(field.localized ? { ...(value || {}), [lang]: next } : next);
  let input;
  if (field.kind === 'readonly') input = <div className="cms-readonly">{String(current || '—')}</div>;
  else if (field.kind === 'textarea') input = <textarea dir={field.localized ? dir : undefined} rows={Math.min(8, Math.max(3, String(current).split('\n').length + 1))} value={current} onChange={(e) => set(e.target.value)} />;
  else input = <input type="text" dir={field.localized ? dir : undefined} value={current} onChange={(e) => set(e.target.value)} />;
  return (
    <div className="cms-field">
      <label>{field.label}{field.localized && <span className="cms-lang-mark">{lang.toUpperCase()}</span>}</label>
      {input}
      {field.kind === 'image' && current && <img className="cms-preview cms-preview-wide" src={assetUrl(current)} alt="" />}
      {(field.kind === 'image' || field.kind === 'file') && (
        <button type="button" className="cms-btn cms-btn-light cms-upload"><i className="fa-solid fa-upload"></i> Choisir un fichier</button>
      )}
    </div>
  );
}

/** Rendu récursif d'une liste de champs (groupes, listes, champs simples). */
function Fields({ fields, value, path, depth, ctx }) {
  return fields.map((field) => {
    if (field.kind === 'group') {
      const scope = field.nested ? value?.[field.key] : value;
      if (field.nested && !scope) return null;
      const scopePath = field.nested ? [...path, field.key] : path;
      return (
        <section key={field.key} className={depth === 0 ? 'cms-card' : 'cms-subgroup'}>
          <h3 className="cms-card-title">{field.label}</h3>
          <div className="cms-grid-2">
            <Fields fields={field.fields} value={scope} path={scopePath} depth={depth + 1} ctx={ctx} />
          </div>
        </section>
      );
    }
    if (field.kind === 'list') {
      const items = value?.[field.key] || [];
      const listPath = [...path, field.key];
      const move = (from, to) => {
        if (to < 0 || to >= items.length) return;
        const next = [...items];
        [next[from], next[to]] = [next[to], next[from]];
        ctx.update(listPath, next);
      };
      return (
        <section key={field.key} className={depth === 0 ? 'cms-card' : 'cms-subgroup cms-span'}>
          <div className="cms-list-head">
            <h3 className="cms-card-title">{field.label} <span className="cms-count">{items.length}</span></h3>
            <button type="button" className="cms-btn cms-btn-light" onClick={() => ctx.update(listPath, [...items, emptyItem(field.fields)])}>
              <i className="fa-solid fa-plus"></i> Ajouter {field.item}
            </button>
          </div>
          {!items.length && <p className="cms-muted">Aucun élément.</p>}
          {items.map((item, index) => (
            <details key={index} className="cms-item" open={depth === 0 && items.length <= 3}>
              <summary>
                <span className="cms-item-index">{index + 1}</span>
                <span className="cms-item-label">{itemLabel(item, field.fields, `${field.item} ${index + 1}`)}</span>
                <span className="cms-item-tools" onClick={(e) => e.preventDefault()}>
                  <button type="button" title="Monter" onClick={() => move(index, index - 1)}><i className="fa-solid fa-arrow-up"></i></button>
                  <button type="button" title="Descendre" onClick={() => move(index, index + 1)}><i className="fa-solid fa-arrow-down"></i></button>
                  <button type="button" title="Supprimer" onClick={() => ctx.update(listPath, items.filter((_, i) => i !== index))}><i className="fa-solid fa-trash"></i></button>
                </span>
              </summary>
              <div className="cms-item-body cms-grid-2">
                <Fields fields={field.fields} value={item} path={[...listPath, index]} depth={depth + 1} ctx={ctx} />
              </div>
            </details>
          ))}
        </section>
      );
    }
    return (
      <Leaf key={field.key} field={field} value={value?.[field.key]} lang={ctx.lang} dir={ctx.dir}
        onChange={(next) => ctx.update([...path, field.key], next)} />
    );
  });
}

/** Éditeur des fiches à plusieurs niveaux (prestations, fondation, adhésion…). */
export default function StructuredEditor({ type, draft, onSave, onCancel }) {
  const schema = type.schemaFor(draft);
  const [form, setForm] = useState(draft);
  const [lang, setLang] = useState('fr');
  const status = structuredLanguageStatus(form, schema);
  const missing = LANGS.filter(({ code }) => !status[code]).map(({ label }) => label);
  const ctx = {
    lang,
    dir: LANGS.find(({ code }) => code === lang).dir,
    update: (path, value) => setForm((current) => setIn(current, path, value))
  };
  return (
    <div className="cms-editor">
      <div className="cms-editor-head">
        <button type="button" className="cms-back" onClick={onCancel}><i className="fa-solid fa-arrow-left"></i> {type.label}</button>
        <h2>{type.title(form) || 'Sans titre'}</h2>
      </div>
      {type.notice && <p className="cms-notice"><i className="fa-solid fa-lock"></i> {type.notice}</p>}
      <div className="cms-tabs cms-tabs-sticky" role="tablist">
        {LANGS.map(({ code, label }) => (
          <button key={code} type="button" role="tab" aria-selected={lang === code} className={`cms-tab${lang === code ? ' is-active' : ''}`} onClick={() => setLang(code)}>
            {label} <span className={`cms-tab-state${status[code] ? ' is-ok' : ''}`}><i className={`fa-solid ${status[code] ? 'fa-check' : 'fa-exclamation'}`}></i></span>
          </button>
        ))}
        <span className="cms-tabs-hint">La langue choisie s’applique à tous les textes de la fiche.</span>
      </div>
      <Fields fields={schema} value={form} path={[]} depth={0} ctx={ctx} />
      {missing.length > 0 && (
        <p className="cms-warning"><i className="fa-solid fa-triangle-exclamation"></i> Traduction incomplète : {missing.join(', ')}.</p>
      )}
      <div className="cms-actions cms-actions-sticky">
        <span className="cms-spacer"></span>
        <button type="button" className="cms-btn cms-btn-light" onClick={onCancel}>Annuler</button>
        <button type="button" className="cms-btn cms-btn-primary" onClick={() => onSave(form)}><i className="fa-solid fa-floppy-disk"></i> Enregistrer</button>
      </div>
    </div>
  );
}
