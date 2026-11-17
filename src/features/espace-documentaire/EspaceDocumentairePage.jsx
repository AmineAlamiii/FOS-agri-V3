import SecondaryLayout from '@/components/layout/SecondaryLayout';
import PageHero from '@/components/ui/PageHero';
import { useSecondaryT } from '@/i18n/useSecondaryT';

function EspaceDocumentaireContent() {
  const t = useSecondaryT();
  return (
    <main>
      <PageHero title={t('docSpace')} body={t('docSpaceBody')} />
    </main>
  );
}

export default function EspaceDocumentairePage() {
  return (
    <SecondaryLayout activePage="espace-documentaire">
      <EspaceDocumentaireContent />
    </SecondaryLayout>
  );
}
