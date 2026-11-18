// Session de démonstration de l'espace adhérent (aucune vraie connexion).
const KEY = 'fosagri-member-demo';

export const startMemberDemo = () => {
  try { sessionStorage.setItem(KEY, '1'); } catch { /* stockage indisponible */ }
};

export const endMemberDemo = () => {
  try { sessionStorage.removeItem(KEY); } catch { /* stockage indisponible */ }
};
