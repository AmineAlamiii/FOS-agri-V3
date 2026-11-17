import '@/app/secondaryEntry';
import '@/styles/mot-president.css';
import { mountPage } from '@/app/mountPage';
import InstitutionalMessagePage from './InstitutionalMessagePage';
import { presidentI18n } from './president.i18n';

const MESSAGE = { image: 'assets/images/president.jpg', imageAltKey: 'president.imageAlt' };

mountPage(() => <InstitutionalMessagePage prefix="president" dictionary={presidentI18n} message={MESSAGE} withIntro />);
