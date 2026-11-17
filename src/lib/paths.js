const BASE = import.meta.env.BASE_URL;

/**
 * Adresse d'une page ou d'un fichier du site (respecte le préfixe GitHub Pages).
 * Les anciennes adresses de pages en .html sont converties en adresses propres :
 *   'contact.html' → '/contact', 'la-fondation/gouvernance/index.html' → '/la-fondation/gouvernance',
 *   'index.html#news' → '/#news', 'actualite.html?article=x' → '/actualite?article=x'.
 */
export function url(path = '') {
  if (/^(https?:|\/\/|mailto:|tel:|#)/i.test(path)) return path;
  const [, file = '', rest = ''] = path.replace(/^\.?\//, '').match(/^([^?#]*)(.*)$/) || [];
  const clean = file.endsWith('.html')
    ? file.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '').replace(/\/$/, '')
    : file;
  return `${BASE}${clean}${rest}`;
}

/** Image/média : les chemins de données commencent par "assets/…" ou "./…". */
export function assetUrl(path = '') {
  if (/^(https?:|\/\/|data:)/i.test(path)) return path;
  return url(path.replace(/^\.\//, 'assets/'));
}
