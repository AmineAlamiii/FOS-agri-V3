/** Minuscules sans accents, pour une recherche insensible aux accents. */
export function normalize(value) {
  return (value || '').toString().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}
