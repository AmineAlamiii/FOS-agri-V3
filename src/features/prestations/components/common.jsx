import { useState } from 'react';

export const subrubriqueId = (index) => `subrubrique-${index + 1}`;

const textArray = (value) => [].concat(value || []).filter(Boolean);

/** Un <p> par paragraphe (chaîne ou tableau de chaînes). */
export function Paragraphs({ value }) {
  return textArray(value).map((paragraph, index) => <p key={index}>{paragraph}</p>);
}

export function BulletList({ items }) {
  if (!items?.length) return null;
  return <ul>{items.map((bullet, index) => <li key={index}>{bullet}</li>)}</ul>;
}

/** Petite étiquette « icône + libellé » au-dessus des titres. */
export function SectionTag({ icon, children, className = 'section-tag' }) {
  return <span className={className}><i className={`fa-solid ${icon}`} aria-hidden="true"></i>{` ${children ?? ''}`}</span>;
}

/** Bloc dépliable d'un accordéon de prestation. */
export function AccordionItem({ id, className = '', icon, title, open, onToggle, children }) {
  return (
    <article className={`prestation-accordion-item${className ? ` ${className}` : ''}${open ? ' is-open' : ''}`} id={id}>
      <button className="prestation-accordion-trigger" type="button" aria-expanded={open ? 'true' : 'false'} onClick={onToggle}>
        <span className="prestation-accordion-title">
          <i className={`fa-solid ${icon}`} aria-hidden="true"></i>
          <span>{title}</span>
        </span>
        <i className={`fa-solid ${open ? 'fa-minus' : 'fa-plus'} prestation-accordion-toggle`} aria-hidden="true"></i>
      </button>
      <div className="prestation-accordion-content" hidden={!open}>{children}</div>
    </article>
  );
}

/**
 * Accordéon « un seul ouvert à la fois ».
 * `initialOpen` : index ouvert au départ (-1 = tout fermé).
 * `render(item, index, { open, toggle })` dessine chaque élément.
 */
export function Accordion({ className = 'prestation-accordion', items, initialOpen = -1, openIndex, onOpenChange, render }) {
  const [localOpen, setLocalOpen] = useState(initialOpen);
  const current = openIndex !== undefined ? openIndex : localOpen;
  const setOpen = onOpenChange || setLocalOpen;
  return (
    <div className={className}>
      {items.map((item, index) => render(item, index, {
        open: current === index,
        toggle: () => setOpen(current === index ? -1 : index)
      }))}
    </div>
  );
}

export function MiniCards({ items }) {
  if (!items?.length) return null;
  return (
    <div className="prestation-extra-mini-grid">
      {items.map((item, index) => (
        <article key={index} className="prestation-extra-mini-card">
          <span>{item.number || ''}</span>
          <p>{item.text || item}</p>
        </article>
      ))}
    </div>
  );
}

export function KeyRows({ rows }) {
  if (!rows?.length) return null;
  return (
    <dl className="prestation-extra-keyrows">
      {rows.map(([label, value], index) => (
        <div key={index}>
          <dt>{label}</dt>
          <dd>{value || '—'}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Logo de partenaire : si l'image manque, on affiche le nom (comme avant). */
export function PartnerLogo({ src, name, className = 'bank-card-logo', loading = 'lazy' }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`${className}${failed || !src ? ' is-fallback' : ''}`}>
      {src && !failed && <img className="bank-logo" src={src} alt={name} loading={loading} decoding="async" onError={() => setFailed(true)} />}
      <span className="bank-logo-fallback">{name}</span>
    </div>
  );
}
