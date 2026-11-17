import '@/app/secondaryEntry';
import '@/styles/mot-ministre.css';
import { mountPage } from '@/app/mountPage';
import InstitutionalMessagePage from './InstitutionalMessagePage';
import { ministerI18n } from './minister.i18n';

const MESSAGE = { image: 'assets/images/ministre-khalid-hatimi.webp', imageAltKey: 'minister.image.alt' };

mountPage(() => <InstitutionalMessagePage prefix="minister" dictionary={ministerI18n} message={MESSAGE} />);
