import { useState } from 'react';
import { url } from '@/lib/paths';

/**
 * Accès à la démonstration par mot de passe.
 *
 * Le site est statique (pas de serveur) : la vérification se fait dans le navigateur.
 * Seule l'empreinte SHA-256 du mot de passe est dans le code, jamais le mot de passe.
 * C'est une barrière contre les visiteurs, pas une vraie sécurité : la vraie
 * authentification viendra avec le backend.
 */
const PASSWORD_SHA256 = '2a893235fb2761e2f085c2be09cded2d235f75ebad1aad8ac5abe1486812fb0b';
const SESSION_KEY = 'fosagri-admin-session';

async function sha256(text) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export const isAdminSession = () => {
  try {
    return sessionStorage.getItem(SESSION_KEY) === PASSWORD_SHA256;
  } catch {
    return false;
  }
};

export const endAdminSession = () => {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Stockage indisponible : rien à effacer.
  }
};

export default function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);
  const [visible, setVisible] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (!password) return;
    setChecking(true);
    const hash = await sha256(password);
    setChecking(false);
    if (hash !== PASSWORD_SHA256) {
      setError('Mot de passe incorrect.');
      setPassword('');
      return;
    }
    try {
      sessionStorage.setItem(SESSION_KEY, hash);
    } catch {
      // Navigation privée stricte : l'accès vaut pour cette page seulement.
    }
    onSuccess();
  };

  return (
    <div className="cms-login">
      <form className="cms-login-card" onSubmit={submit}>
        <img src={url('assets/images/logo.png')} alt="" width="64" height="50" />
        <h1>Espace de gestion</h1>
        <p>Accès réservé. Saisissez le mot de passe pour continuer.</p>
        <label htmlFor="cms-password">Mot de passe</label>
        <div className="cms-login-field">
          <input
            id="cms-password"
            type={visible ? 'text' : 'password'}
            autoComplete="current-password"
            autoFocus
            value={password}
            onChange={(event) => { setPassword(event.target.value); setError(''); }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'cms-login-error' : undefined}
          />
          <button type="button" className="cms-login-eye" onClick={() => setVisible(!visible)} aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}>
            <i className={`fa-solid ${visible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>
        {error && <p id="cms-login-error" className="cms-login-error" role="alert"><i className="fa-solid fa-circle-exclamation"></i> {error}</p>}
        <button type="submit" className="cms-btn cms-btn-primary" disabled={checking || !password}>
          <i className="fa-solid fa-lock-open"></i> Se connecter
        </button>
        <a className="cms-login-back" href={url('index.html')}><i className="fa-solid fa-arrow-left"></i> Retour au site</a>
      </form>
    </div>
  );
}
