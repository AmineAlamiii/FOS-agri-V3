import { useInsertionEffect } from 'react';

/**
 * Feuille de style d'une page, ajoutée dans <head> tant que la page est affichée
 * (comme avant : chaque page ne charge que ses propres styles, dans le même ordre).
 */
export default function PageStyles({ css }) {
  useInsertionEffect(() => {
    const style = document.createElement('style');
    style.dataset.pageStyles = '';
    style.textContent = css;
    document.head.appendChild(style);
    return () => style.remove();
  }, [css]);
  return null;
}
