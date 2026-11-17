/** URL absolue d'un fichier du site (respecte le base path GitHub Pages). */
export function url(path = '') {
  if (/^(https?:|\/\/|mailto:|tel:|#)/i.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\.?\//, '')}`;
}

/** Image/média : les chemins de données commencent par "assets/…" ou "./…". */
export function assetUrl(path = '') {
  if (/^(https?:|\/\/|data:)/i.test(path)) return path;
  return url(path.replace(/^\.\//, 'assets/'));
}
