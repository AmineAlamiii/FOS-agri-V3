import InstitutionalMessagePage from './InstitutionalMessagePage';
import { ministerI18n } from './minister.i18n';

const MESSAGE = { image: 'assets/images/ministre-khalid-hatimi.webp', imageAltKey: 'minister.image.alt' };

/** Page « Mot du Ministre ». */
export default function MotDuMinistrePage() {
  return <InstitutionalMessagePage prefix="minister" dictionary={ministerI18n} message={MESSAGE} />;
}
