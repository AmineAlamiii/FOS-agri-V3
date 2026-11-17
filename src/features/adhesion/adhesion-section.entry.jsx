import '@/styles/pages/adhesion.css';
import { mountPage } from '@/app/mountPage';
import AdhesionSectionPage from './AdhesionSectionPage';

// La rubrique affichée est indiquée par <body data-adhesion-section="…">.
const sectionId = document.body.dataset.adhesionSection;

mountPage(() => <AdhesionSectionPage sectionId={sectionId} />);
