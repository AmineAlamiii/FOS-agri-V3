import { useMemberT, STATUS_ICON, STATUS_TONE } from './memberUtils';

/** Petits éléments réutilisés dans toutes les rubriques de l'espace adhérent. */

export function SectionHead({ title, intro, action }) {
  return (
    <div className="ms-section-head">
      <div>
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatusBadge({ status }) {
  const { t } = useMemberT();
  return (
    <span className={`ms-badge is-${STATUS_TONE[status]}`}>
      <i className={`fa-solid ${STATUS_ICON[status]}`} aria-hidden="true"></i> <span>{t(`status_${status}`)}</span>
    </span>
  );
}

export function Field({ id, label, error, hint, children }) {
  return (
    <div className={`ms-field${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && !error && <small className="ms-hint" id={`${id}-hint`}>{hint}</small>}
      {error && <small className="ms-error" id={`${id}-error`} role="alert"><i className="fa-solid fa-circle-exclamation" aria-hidden="true"></i> <span>{error}</span></small>}
    </div>
  );
}

/** Attributs d'accessibilité d'un champ selon son erreur / son aide. */
export const describedBy = (id, error, hint) => ({
  'aria-invalid': Boolean(error),
  'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : undefined
});

export function Card({ title, icon, action, className = '', children }) {
  return (
    <section className={`ms-card ${className}`}>
      {(title || action) && (
        <div className="ms-card-head">
          {title && <h3>{icon && <i className={`fa-solid ${icon}`} aria-hidden="true"></i>} <span>{title}</span></h3>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function InfoList({ items }) {
  return (
    <dl className="ms-info-list">
      {items.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Référence de dossier : toujours de gauche à droite, même en arabe. */
export function Ref({ children }) {
  return <bdi dir="ltr" className="ms-ref">{children}</bdi>;
}

/** Texte contenant {ref} : la référence est insérée isolée (ordre correct en arabe). */
export function WithRef({ text, refValue }) {
  if (!refValue || !text.includes('{ref}')) return text;
  const [before, after] = text.split('{ref}');
  return <>{before}<Ref>{refValue}</Ref>{after}</>;
}
