import { useEffect } from 'react';
import { LayoutProvider } from '@/components/layout/LayoutContext';
import SearchModal from '@/components/layout/SearchModal';
import { HOME_SEARCH_INDEX } from '@/features/search/searchIndex';
import { useInitialHashScroll } from '@/hooks/useInitialHashScroll';
import { useMotion } from '@/hooks/useMotion';
import { revealOnScroll } from '@/hooks/useRevealOnScroll';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useSiteT } from '@/i18n/useSiteT';
import HomeFloatingSocial from './components/HomeFloatingSocial';
import HomeFooter from './components/HomeFooter';
import HomeHeader, { homeNavT } from './components/HomeHeader';
import AboutSection from './sections/AboutSection';
import EventsSection from './sections/EventsSection';
import HeroSection from './sections/HeroSection';
import MapSection from './sections/MapSection';
import MemberSection from './sections/MemberSection';
import NewsSection from './sections/NewsSection';
import PartnersSection from './sections/PartnersSection';
import ServicesSection from './sections/ServicesSection';
import StatsSection from './sections/StatsSection';
import WafaImaBand from './sections/WafaImaBand';

/** Page d'accueil (validée par le client : rendu strictement identique à l'original). */
function HomeContent() {
  const t = useSiteT();
  const { lang } = useLanguage();
  useMotion();
  useInitialHashScroll();

  // Apparition au défilement, relancée à chaque langue comme le rendu d'origine.
  useEffect(() => revealOnScroll(document), [lang]);

  const sectionProps = { t, lang };
  return (
    <>
      <HomeHeader />
      <main id="main-content">
        <HeroSection {...sectionProps} />
        <WafaImaBand {...sectionProps} />
        <NewsSection {...sectionProps} />
        <AboutSection {...sectionProps} />
        <ServicesSection {...sectionProps} />
        <EventsSection {...sectionProps} />
        <StatsSection {...sectionProps} />
        <MapSection {...sectionProps} />
        <MemberSection {...sectionProps} />
        <PartnersSection {...sectionProps} />
      </main>
      <HomeFooter />
      <HomeFloatingSocial callLabel={t('footer.callAria') || ''} />
      <SearchModal t={homeNavT(lang)} index={HOME_SEARCH_INDEX} isolateNumbers={false} />
    </>
  );
}

export default function HomePage() {
  return (
    <LayoutProvider>
      <HomeContent />
    </LayoutProvider>
  );
}
