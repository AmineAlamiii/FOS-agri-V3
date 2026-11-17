import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CONTACT, SOCIAL_LINKS } from '@/config/navigation';

/** Bouton flottant de l'accueil (balisage d'origine de app.js). */
export default function HomeFloatingSocial({ callLabel }) {
  const [open, setOpen] = useState(false);
  const hostRef = useRef(null);
  useEffect(() => {
    const onClick = (event) => {
      if (hostRef.current && !hostRef.current.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);
  return createPortal(
    <div ref={hostRef} className={`floating-social${open ? ' is-open' : ''}`}>
      <div className="floating-social-links" aria-label="Liens sociaux rapides">
        <a className="floating-social-link floating-social-phone" href={CONTACT.phoneHref} aria-label={callLabel}>
          <i className="fa-solid fa-phone" aria-hidden="true"></i>
        </a>
        {SOCIAL_LINKS.map((link) => (
          <a key={link.label} className="floating-social-link" href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
            <i className={`fa-brands ${link.icon}`}></i>
          </a>
        ))}
      </div>
      <button className="floating-social-main" type="button" aria-label="Ouvrir les liens sociaux" onClick={(event) => { event.stopPropagation(); setOpen((value) => !value); }}>
        <i className="fa-solid fa-share-nodes"></i>
      </button>
    </div>,
    document.body
  );
}
