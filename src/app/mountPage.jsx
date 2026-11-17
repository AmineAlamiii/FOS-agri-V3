import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from '@/i18n/LanguageProvider';

/**
 * Point d'entrée de chaque page HTML (site multi-pages) :
 * monte le composant de la page dans <div id="root">.
 */
export function mountPage(Page, { bodyLang = true } = {}) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <LanguageProvider bodyLang={bodyLang}>
        <Page />
      </LanguageProvider>
    </StrictMode>
  );
}
