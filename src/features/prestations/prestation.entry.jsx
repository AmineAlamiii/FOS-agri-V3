import '@/app/secondaryEntry';
import '@/styles/prestations.css';
import { mountPage } from '@/app/mountPage';
import PrestationDetailPage from './PrestationDetailPage';

// La prestation affichée est indiquée par <body data-service="…">.
const serviceKey = document.body.dataset.service;

mountPage(() => <PrestationDetailPage serviceKey={serviceKey} />);
