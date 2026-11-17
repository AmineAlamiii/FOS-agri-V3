import { useInitialHashScroll } from '@/hooks/useInitialHashScroll';
import { useMotion } from '@/hooks/useMotion';
import { usePageEnter } from '@/hooks/usePageEnter';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useSecondaryT } from '@/i18n/useSecondaryT';
import FloatingSocial from './FloatingSocial';
import { LayoutProvider } from './LayoutContext';
import SearchModal from './SearchModal';
import SecondaryHeader from './SecondaryHeader';
import SiteFooter from './SiteFooter';

/**
 * Gabarit des pages secondaires : en-tête, contenu, pied de page,
 * bouton flottant et fenêtre de recherche.
 */
export default function SecondaryLayout({ activePage, brandLabel, headerId, children }) {
  const t = useSecondaryT();
  usePageEnter();
  useInitialHashScroll();
  useScrollReveal();
  useMotion();
  return (
    <LayoutProvider>
      <SecondaryHeader activePage={activePage} brandLabel={brandLabel} headerId={headerId} />
      {children}
      <SiteFooter />
      <FloatingSocial callLabel={t('callFoundation')} />
      <SearchModal t={t} />
    </LayoutProvider>
  );
}
