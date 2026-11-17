import { Suspense, lazy, useLayoutEffect, useMemo } from 'react';
import PageStyles from './PageStyles';

const DEFAULT_DESCRIPTION = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';

/** Composant de page chargé à la demande, avec sa feuille de style. */
function usePageComponent(route) {
  return useMemo(() => lazy(async () => {
    const [pageModule, stylesModule] = await Promise.all([route.page(), route.styles()]);
    const Page = pageModule.default;
    const css = stylesModule.default;
    return {
      default: function LoadedPage() {
        return (
          <>
            <PageStyles css={css} />
            <Page {...route.props} />
          </>
        );
      }
    };
  }), [route]);
}

/**
 * Prépare le document pour une page : titre, description, classes et attributs
 * du <body> (le CSS d'origine en dépend), retour en haut de page.
 */
export default function RouteShell({ route }) {
  const Page = usePageComponent(route);

  useLayoutEffect(() => {
    document.title = route.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', route.description || DEFAULT_DESCRIPTION);
    const { body } = document;
    body.className = route.bodyClass || '';
    if (!body.className) body.removeAttribute('class');
    Object.keys(body.dataset).forEach((key) => {
      if (key !== 'lang') delete body.dataset[key];
    });
    Object.entries(route.bodyData || {}).forEach(([key, value]) => {
      body.setAttribute(`data-${key}`, value);
    });
    // Nouvelle page : on repart du haut (sauf ancre #…, gérée par la page).
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route]);

  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  );
}
