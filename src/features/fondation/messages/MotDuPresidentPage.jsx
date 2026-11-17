import InstitutionalMessagePage from './InstitutionalMessagePage';
import { presidentI18n } from './president.i18n';

const MESSAGE = { image: 'assets/images/president.jpg', imageAltKey: 'president.imageAlt' };

/** Page « Mot du Président ». */
export default function MotDuPresidentPage() {
  return <InstitutionalMessagePage prefix="president" dictionary={presidentI18n} message={MESSAGE} withIntro />;
}
