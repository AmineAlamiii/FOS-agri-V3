// Données fictives de la démonstration de l'espace adhérent.
// Textes localisés : { fr, ar, zgh } (mêmes éléments et mêmes identifiants dans les trois langues).
// Dates au format AAAA-MM-JJ.

const L = (fr, ar, zgh) => ({ fr, ar, zgh });

/** Prestations qu'on peut demander, regroupées comme sur la page Prestations. */
export const SERVICE_GROUPS = [
  { id: 'prevoyance', label: L('Prévoyance médico-sociale', 'الاحتياط الطبي الاجتماعي', 'ⵜⴰⴼⵔⴰⵙⵜ ⵜⴰⴷⴰⵡⵙⴰⵏⵜ'), page: 'services/prevoyance.html' },
  { id: 'culture', label: L('Culture, loisirs et voyages', 'الثقافة والترفيه والأسفار', 'ⵜⴰⴷⵍⵙⴰ, ⴰⵙⴰⵢⵔⴰⵔ ⴷ ⵉⵙⵉⴽⵍⵏ'), page: 'services/culture-loisirs-voyages.html' },
  { id: 'formation', label: L('Formation et scolarisation', 'التكوين والتمدرس', 'ⴰⵙⴳⵎⵉ ⴷ ⵜⵙⴳⵎⵉ'), page: 'services/formation-scolarisation.html' },
  { id: 'logement', label: L('Accès au logement', 'الولوج إلى السكن', 'ⴰⴽⵛⵓⵎ ⵖⵔ ⵜⴰⴷⴷⴰⵔⵜ'), page: 'services/acces-logement.html' }
];

export const SERVICES = [
  {
    id: 'amc', group: 'prevoyance', icon: 'fa-notes-medical',
    label: L('Assurance maladie complémentaire (AMC)', 'التأمين التكميلي عن المرض (AMC)', 'ⴰⵙⵙⵓⵔⵏ ⴰⵎⵙⵎⴰⴷ ⵏ ⵓⵟⵟⴰⵏ (AMC)'),
    docs: [L('Feuille de soins', 'ورقة العلاج', 'ⵜⴰⵙⵏⴰ ⵏ ⵓⵙⵏⵓⵊⵊⵉ'), L('Ordonnance', 'الوصفة الطبية', 'ⵜⴰⵙⵏⴰ ⵏ ⵉⵙⴼⵔⴰ'), L('Factures', 'الفواتير', 'ⵜⵉⴼⴰⵜⵓⵔⵉⵏ')]
  },
  {
    id: 'amts', group: 'prevoyance', icon: 'fa-truck-medical',
    label: L('Transport sanitaire (AMTS)', 'النقل الصحي (AMTS)', 'ⴰⵙⵎⵓⵜⵜⵉ ⴰⵙⵙⵏⴰⵊⵉ (AMTS)'),
    docs: [L('Certificat médical', 'شهادة طبية', 'ⵜⴰⴽⵓⵜⵉ ⵜⴰⵙⵙⵏⴰⵊⵉⵜ'), L('Bon de transport', 'وصل النقل', 'ⴰⵡⵚⵍ ⵏ ⵓⵙⵎⵓⵜⵜⵉ')]
  },
  {
    id: 'handicap', group: 'prevoyance', icon: 'fa-wheelchair',
    label: L('Aide aux personnes en situation de handicap', 'المساعدة الخاصة بالأشخاص في وضعية إعاقة', 'ⵜⴰⵡⵉⵙⵉ ⵏ ⵉⵎⴷⵓⴽⴰⵍ ⴳ ⵡⴰⴷⴷⴰⴷ ⵏ ⵓⵙⵓⵎⵔ'),
    docs: [L('Dossier médical', 'الملف الطبي', 'ⴰⴼⵉⵛⵢ ⴰⵙⵙⵏⴰⵊⵉ'), L('Avis de la commission médicale provinciale', 'رأي اللجنة الطبية الإقليمية', 'ⵜⴰⵏⵏⴰⵢⵜ ⵏ ⵜⵎⵙⵙⵓⵔⵜ ⵜⴰⵙⵙⵏⴰⵊⵉⵜ')]
  },
  {
    id: 'cms', group: 'prevoyance', icon: 'fa-stethoscope',
    label: L('Consultation au centre médico-social', 'استشارة بالمركز الطبي الاجتماعي', 'ⴰⵙⵓⵎⵔ ⴳ ⵓⵏⵎⵎⴰⵙ ⴰⵏⴰⵎⵓⵏ ⴰⵙⵙⵏⴰⵊⵉ'),
    docs: [L('Carte d’adhérent', 'بطاقة الانخراط', 'ⵜⴰⴽⴰⵔⴹⴰ ⵏ ⵓⵎⵓⵏ')]
  },
  {
    id: 'omra', group: 'culture', icon: 'fa-kaaba',
    label: L('Omra 2026', 'العمرة 2026', 'ⵄⵓⵎⵔⴰ 2026'),
    docs: [L('Copie du passeport', 'نسخة من جواز السفر', 'ⵜⴰⵏⵖⵍⵜ ⵏ ⵓⵙⵉⵔⵓ ⵏ ⵓⵎⵓⴷⴷⵓ'), L('Photo d’identité', 'صورة شمسية', 'ⵜⴰⵡⵍⴰⴼⵜ ⵏ ⵜⵉⴷⵜⵉ')]
  },
  {
    id: 'colonies', group: 'culture', icon: 'fa-campground',
    label: L('Colonies de vacances', 'المخيمات الصيفية', 'ⵉⵙⵉⴽⵍⵏ ⵏ ⵓⵏⴱⴷⵓ'),
    docs: [L('Certificat médical de l’enfant', 'شهادة طبية للطفل', 'ⵜⴰⴽⵓⵜⵉ ⵜⴰⵙⵙⵏⴰⵊⵉⵜ ⵏ ⵓⵔⴰⵡ'), L('Fiche d’inscription', 'بطاقة التسجيل', 'ⵜⴰⵙⵏⴰ ⵏ ⵓⵣⵎⵎⴻⵎ')]
  },
  {
    id: 'scolarite', group: 'formation', icon: 'fa-graduation-cap',
    label: L('Aide à la scolarité', 'منحة التمدرس', 'ⵜⴰⵡⵉⵙⵉ ⵏ ⵜⵙⴳⵎⵉ'),
    docs: [L('Certificat de scolarité', 'شهادة التمدرس', 'ⵜⴰⴽⵓⵜⵉ ⵏ ⵜⵙⴳⵎⵉ'), L('Relevé de notes', 'كشف النقط', 'ⴰⵙⴽⵓⵜⵜⴻⵔ ⵏ ⵜⵏⵇⵇⵉⴹⵉⵏ')]
  },
  {
    id: 'logement', group: 'logement', icon: 'fa-house',
    label: L('Attestation pour un crédit logement', 'شهادة من أجل قرض السكن', 'ⵜⴰⴽⵓⵜⵉ ⵉ ⵓⵔⴹⵍ ⵏ ⵜⴰⴷⴷⴰⵔⵜ'),
    docs: [L('Offre de la banque', 'عرض البنك', 'ⵜⴰⵡⵙⴰ ⵏ ⵓⴱⴰⵏⴽ'), L('Dernier bulletin de paie', 'آخر ورقة أداء', 'ⵜⴰⵙⵏⴰ ⵜⴰⵏⴳⴳⴰⵔⵓⵜ ⵏ ⵜⵖⵔⵉⴼⵜ')]
  }
];

export const MEMBER = {
  firstName: L('Mohammed', 'محمد', 'ⵎⵓⵃⵎⵎⴰⴷ'),
  fullName: L('Mohammed El Amrani', 'محمد العمراني', 'ⵎⵓⵃⵎⵎⴰⴷ ⵍⵄⵎⵔⴰⵏⵉ'),
  memberNo: 'FA-2014-03127',
  cin: 'AB123456',
  matricule: '1084523',
  birthDate: '1982-04-17',
  entity: L('Direction régionale de l’agriculture — Rabat-Salé-Kénitra', 'المديرية الجهوية للفلاحة — الرباط-سلا-القنيطرة', 'ⵜⴰⵎⵀⵍⴰ ⵜⴰⵏⴰⵎⵓⵏⵜ ⵏ ⵜⴼⵍⴰⵃⵜ — ⵕⵕⴱⴰⵟ-ⵙⵍⴰ-ⵇⵏⵉⵟⵔⴰ'),
  region: L('Rabat-Salé-Kénitra', 'الرباط-سلا-القنيطرة', 'ⵕⵕⴱⴰⵟ-ⵙⵍⴰ-ⵇⵏⵉⵟⵔⴰ'),
  category: L('Catégorie 4 : échelle 11', 'الفئة 4: السلم 11', 'ⵜⴰⴳⴳⴰⵢⵜ 4: ⴰⵙⴽⴰⵍⴰ 11'),
  monthlyFee: 70,
  memberSince: '2014-09-01',
  phone: '+212 6 12 34 56 78',
  email: 'm.elamrani@exemple.ma',
  address: '12, rue Oued Ziz, Agdal — Rabat'
};

export const FAMILY = [
  { id: 'spouse', relation: 'spouse', firstName: L('Fatima Zahra', 'فاطمة الزهراء', 'ⴼⴰⵟⵉⵎⴰ ⵣⵣⴰⵀⵔⴰ'), birthDate: '1986-02-09', validated: true },
  { id: 'child-1', relation: 'child', firstName: L('Yassine', 'ياسين', 'ⵢⴰⵙⵉⵏ'), birthDate: '2012-10-21', validated: true },
  { id: 'child-2', relation: 'child', firstName: L('Salma', 'سلمى', 'ⵙⴰⵍⵎⴰ'), birthDate: '2016-06-03', validated: true }
];

const step = (status, date) => ({ status, date });

export const REQUESTS = [
  {
    ref: 'FOS-2026-01510', service: 'scolarite', beneficiary: 'child-1', date: '2026-11-10', status: 'missing',
    details: L('Aide à la scolarité 2026-2027 pour Yassine (collège).', 'منحة التمدرس 2026-2027 لياسين (الإعدادي).', 'ⵜⴰⵡⵉⵙⵉ ⵏ ⵜⵙⴳⵎⵉ 2026-2027 ⵉ ⵢⴰⵙⵉⵏ (ⵜⴰⵙⴳⵎⵉ ⵜⴰⵏⴰⵎⴰⵙⵜ).'),
    comment: L('Merci d’ajouter le certificat de scolarité 2026-2027.', 'المرجو إضافة شهادة التمدرس 2026-2027.', 'ⵔⵏⵓ ⵜⴰⴽⵓⵜⵉ ⵏ ⵜⵙⴳⵎⵉ 2026-2027.'),
    files: ['releve-notes-2025-2026.pdf'],
    history: [step('sent', '2026-11-10'), step('review', '2026-11-12'), step('missing', '2026-11-14')]
  },
  {
    ref: 'FOS-2026-01482', service: 'amc', beneficiary: 'child-2', date: '2026-11-03', status: 'review',
    details: L('Remboursement d’une consultation pédiatrique et de médicaments.', 'استرجاع مصاريف فحص لدى طبيب الأطفال وأدوية.', 'ⴰⵙⵙⵓⵖⵍ ⵏ ⵓⵙⵓⵎⵔ ⵖⵓⵔ ⴰⵏⴰⵙⵙⴰⵢ ⵏ ⵉⵔⴰⵡⵏ ⴷ ⵉⵙⴼⵔⴰ.'),
    comment: null,
    files: ['feuille-de-soins.pdf', 'ordonnance.jpg', 'facture-pharmacie.pdf'],
    history: [step('sent', '2026-11-03'), step('review', '2026-11-05')]
  },
  {
    ref: 'FOS-2026-01377', service: 'colonies', beneficiary: 'child-1', date: '2026-06-12', status: 'accepted',
    details: L('Colonie de vacances d’été pour Yassine.', 'مخيم صيفي لياسين.', 'ⴰⵙⵉⴽⵍ ⵏ ⵓⵏⴱⴷⵓ ⵉ ⵢⴰⵙⵉⵏ.'),
    comment: L('Séjour à Ifrane du 15 au 29 juillet 2026. Départ le 15 juillet à 8 h depuis Rabat.', 'إقامة بإفران من 15 إلى 29 يوليوز 2026. الانطلاق يوم 15 يوليوز على الساعة 8 صباحا من الرباط.', 'ⴰⵙⵉⴷⴷⵔ ⴳ ⵢⵉⴼⵔⴰⵏ ⵙⴳ 15 ⴰⵔ 29 ⵢⵓⵍⵢⵓⵣ 2026. ⴰⵙⵎⵓⵜⵜⵉ ⴳ 15 ⵢⵓⵍⵢⵓⵣ ⴳ 8 ⵙⴳ ⵕⵕⴱⴰⵟ.'),
    files: ['certificat-medical-yassine.pdf', 'fiche-inscription.pdf'],
    history: [step('sent', '2026-06-12'), step('review', '2026-06-15'), step('accepted', '2026-06-24')]
  },
  {
    ref: 'FOS-2026-00921', service: 'amts', beneficiary: 'self', date: '2026-03-02', status: 'accepted',
    details: L('Transport en ambulance vers l’hôpital Ibn Sina.', 'النقل بسيارة الإسعاف إلى مستشفى ابن سينا.', 'ⴰⵙⵎⵓⵜⵜⵉ ⵙ ⵜⵎⵓⵙⵙⵓⵜ ⵏ ⵓⵙⵏⵓⵊⵊⵉ ⵖⵔ ⵓⵙⴳⵏⴰⴼ ⵉⴱⵏ ⵙⵉⵏⴰ.'),
    comment: L('Remboursement de 450 DH versé sur votre compte le 20/03/2026.', 'تم تحويل مبلغ 450 درهم إلى حسابك بتاريخ 20/03/2026.', 'ⴰⵙⵙⵓⵖⵍ ⵏ 450 DH ⵉⵜⵜⵓⵣⵏ ⵖⵔ ⵓⵎⵉⴹⴰⵏ ⵏⵏⴽ ⴳ 20/03/2026.'),
    files: ['certificat-medical.pdf', 'bon-transport.pdf'],
    history: [step('sent', '2026-03-02'), step('review', '2026-03-04'), step('accepted', '2026-03-16')]
  }
];

export const NOTIFICATIONS = [
  { id: 'n1', ref: 'FOS-2026-01510', date: '2026-11-14', icon: 'fa-file-circle-exclamation', tone: 'warning', text: L('Pièce manquante pour votre demande {ref}.', 'وثيقة ناقصة في طلبك {ref}.', 'ⵉⵅⵚⵚⴰ ⵢⴰⵏ ⵓⵙⴻⵎⴹⴰⵍ ⴳ ⵓⵙⵓⵜⵔ ⵏⵏⴽ {ref}.'), section: 'requests' },
  { id: 'n2', date: '2026-11-12', icon: 'fa-envelope', tone: 'info', text: L('Nouvelle réponse de la Fondation à votre message.', 'رد جديد من المؤسسة على رسالتك.', 'ⴰⵔⴰⵔ ⴰⵎⴰⵢⵏⵓ ⵙⴳ ⵜⵎⵙⵙⵓⵔⵜ ⵖⴼ ⵜⵓⵣⵉⵏⵜ ⵏⵏⴽ.'), section: 'messages' },
  { id: 'n3', date: '2026-11-05', icon: 'fa-kaaba', tone: 'info', text: L('Inscriptions Omra 2026 ouvertes jusqu’au 30/11/2026.', 'التسجيل في العمرة 2026 مفتوح إلى غاية 30/11/2026.', 'ⴰⵣⵎⵎⴻⵎ ⵏ ⵄⵓⵎⵔⴰ 2026 ⵉⵕⵥⵎ ⴰⵔ 30/11/2026.'), section: 'benefits' }
];

export const DOCUMENTS = [
  { id: 'd1', type: 'attestation', date: '2026-01-05', title: L('Attestation d’adhésion 2026', 'شهادة الانخراط 2026', 'ⵜⴰⴽⵓⵜⵉ ⵏ ⵓⵎⵓⵏ 2026'), size: '120 Ko' },
  { id: 'd2', type: 'attestation', date: '2026-01-05', title: L('Attestation de cotisations 2025', 'شهادة الاشتراكات 2025', 'ⵜⴰⴽⵓⵜⵉ ⵏ ⵜⵎⵙⵙⴰⵔⵉⵏ 2025'), size: '98 Ko' },
  { id: 'd3', type: 'decision', date: '2026-06-24', title: L('Décision : colonie de vacances 2026 (Yassine)', 'قرار: المخيم الصيفي 2026 (ياسين)', 'ⴰⵙⵖⵜⵙ: ⴰⵙⵉⴽⵍ ⵏ ⵓⵏⴱⴷⵓ 2026 (ⵢⴰⵙⵉⵏ)'), size: '210 Ko' },
  { id: 'd4', type: 'receipt', date: '2026-03-20', title: L('Reçu de remboursement : transport sanitaire', 'وصل الاسترجاع: النقل الصحي', 'ⴰⵡⵚⵍ ⵏ ⵓⵙⵙⵓⵖⵍ: ⴰⵙⵎⵓⵜⵜⵉ ⴰⵙⵙⵏⴰⵊⵉ'), size: '86 Ko' }
];

export const ATTESTATION_TYPES = [
  { id: 'adhesion', label: L('Attestation d’adhésion', 'شهادة الانخراط', 'ⵜⴰⴽⵓⵜⵉ ⵏ ⵓⵎⵓⵏ') },
  { id: 'cotisations', label: L('Attestation de cotisations', 'شهادة الاشتراكات', 'ⵜⴰⴽⵓⵜⵉ ⵏ ⵜⵎⵙⵙⴰⵔⵉⵏ') },
  { id: 'prise-en-charge', label: L('Attestation de prise en charge', 'شهادة التكفل', 'ⵜⴰⴽⵓⵜⵉ ⵏ ⵓⵙⵙⵓⴳⵔ') }
];

/** Cotisations : 70 DH par mois (catégorie 4). L'année en cours est payée jusqu'en novembre. */
export const CONTRIBUTIONS = [
  { year: 2026, months: 11, complete: false },
  { year: 2025, months: 12, complete: true },
  { year: 2024, months: 12, complete: true },
  { year: 2023, months: 12, complete: true }
];

export const OFFERS = [
  {
    id: 'omra', icon: 'fa-kaaba', until: '2026-11-30', page: 'services/culture-loisirs-voyages.html',
    title: L('Omra 2026', 'العمرة 2026', 'ⵄⵓⵎⵔⴰ 2026'),
    text: L('Huitième édition, du 9 au 21 ou 22 novembre 2026.', 'النسخة الثامنة، من 9 إلى 21 أو 22 نونبر 2026.', 'ⵜⵉⵙ 8, ⵙⴳ 9 ⴰⵔ 21 ⵏⵖ 22 ⵏ ⵏⵓⵡⴰⵏⴱⵉⵔ 2026.')
  },
  {
    id: 'scolarite', icon: 'fa-graduation-cap', until: '2026-12-15', page: 'services/formation-scolarisation.html',
    title: L('Aide à la scolarité 2026-2027', 'منحة التمدرس 2026-2027', 'ⵜⴰⵡⵉⵙⵉ ⵏ ⵜⵙⴳⵎⵉ 2026-2027'),
    text: L('Pour les enfants scolarisés du primaire à l’université.', 'لفائدة الأبناء المتمدرسين من الابتدائي إلى الجامعة.', 'ⵉ ⵉⵔⴰⵡⵏ ⵉⵍⵍⴰⵏ ⴳ ⵜⵙⴳⵎⵉ ⵙⴳ ⵜⴰⵏⵣⵡⴰⵔⵓⵜ ⴰⵔ ⵜⵙⴷⴰⵡⵉⵜ.')
  }
];

export const ADVANTAGES = [
  {
    id: 'medical', icon: 'fa-hospital', page: 'services/prevoyance.html',
    title: L('Conventions médicales', 'الاتفاقيات الطبية', 'ⵜⵉⵎⵙⵙⴰⵔⵉⵏ ⵜⵉⵙⵙⵏⴰⵊⵉⵏ'),
    text: L('Plus de 100 cliniques, laboratoires, opticiens et médecins à tarif préférentiel.', 'أكثر من 100 مصحة ومختبر ونظاراتي وطبيب بأسعار تفضيلية.', 'ⵓⴳⴳⴰⵔ ⵏ 100 ⵏ ⵜⵙⴳⵏⴰⴼⵉⵏ, ⵉⵎⵙⵙⵓⵔⵔⴰⵙ ⴷ ⵉⵎⵙⵙⵏⴰⵊⵉⵢⵏ ⵙ ⵜⵖⵓⵔⵉ ⵉⴼⵓⵍⴽⵉⵏ.')
  },
  {
    id: 'banks', icon: 'fa-building-columns', page: 'services/acces-logement.html',
    title: L('Offres bancaires', 'العروض البنكية', 'ⵜⵉⵡⵙⵉⵡⵉⵏ ⵏ ⵉⴱⴰⵏⴽⵏ'),
    text: L('16 offres de crédit immobilier et à la consommation auprès de 13 banques.', '16 عرضا للقروض العقارية والاستهلاكية لدى 13 بنكا.', '16 ⵏ ⵜⵡⵙⵉⵡⵉⵏ ⵏ ⵓⵔⴹⵍ ⴳ 13 ⵏ ⵉⴱⴰⵏⴽⵏ.')
  },
  {
    id: 'club', icon: 'fa-umbrella-beach', page: 'club-agri.html',
    title: L('Club Agri', 'نادي الفلاحة', 'ⴰⵙⴰⵢⵍⴰ ⵏ ⴽⵍⵓⴱ'),
    text: L('Piscine, espaces de loisirs et activités pour toute la famille.', 'مسبح وفضاءات ترفيهية وأنشطة لكل أفراد الأسرة.', 'ⴰⵎⴰⵙ ⵏ ⵓⵛⵛⵓⴼ, ⵉⵎⵙⴽⴰⵔⵏ ⵏ ⵓⵙⴰⵢⵔⴰⵔ ⴷ ⵜⵉⵎⵀⵍⴰ ⵉ ⵜⵡⵊⵊⴰ ⴽⵓⵍⵍⵓ.')
  }
];

export const CONVERSATIONS = [
  {
    id: 'c1', type: 'question', unread: true,
    subject: L('Remboursement des lunettes de Salma', 'استرجاع مصاريف نظارات سلمى', 'ⴰⵙⵙⵓⵖⵍ ⵏ ⵜⵉⵙⴽⵏⵉⵡⵉⵏ ⵏ ⵙⴰⵍⵎⴰ'),
    messages: [
      { from: 'member', date: '2026-11-10', text: L('Bonjour, les lunettes de ma fille sont-elles prises en charge par l’AMC ?', 'السلام عليكم، هل يتكفل التأمين التكميلي بنظارات ابنتي؟', 'ⴰⵣⵓⵍ, ⵉⵙ ⵜⵉⵙⴽⵏⵉⵡⵉⵏ ⵏ ⵉⵍⵍⵉ ⵜⵜⵓⵙⵓⴳⵔⵏⵜ ⵙ AMC?') },
      { from: 'foundation', date: '2026-11-12', text: L('Bonjour, oui : l’optique est remboursée selon le barème AMC. Joignez la facture et l’ordonnance à une demande AMC.', 'مرحبا، نعم: يتم استرجاع مصاريف النظارات حسب سلم التأمين التكميلي. أرفق الفاتورة والوصفة بطلب AMC.', 'ⴰⵣⵓⵍ, ⵢⴰⵀ: ⵜⵉⵙⴽⵏⵉⵡⵉⵏ ⵜⵜⵓⵙⵙⵓⵖⵍⵏⵜ ⵙ ⵓⵙⴽⴰⵍⴰ ⵏ AMC. ⵔⵏⵓ ⵜⴰⴼⴰⵜⵓⵔⵜ ⴷ ⵜⵙⵏⴰ ⵏ ⵉⵙⴼⵔⴰ ⵉ ⵓⵙⵓⵜⵔ AMC.') }
    ]
  },
  {
    id: 'c2', type: 'complaint', unread: false, closed: true,
    subject: L('Retard de remboursement', 'تأخر في الاسترجاع', 'ⴰⵙⵙⵓⵖⵍ ⵉⵜⵜⴻⴹⵍⵍⵉⵏ'),
    messages: [
      { from: 'member', date: '2026-03-12', text: L('Mon remboursement de transport sanitaire n’est pas encore arrivé.', 'لم أتوصل بعد باسترجاع مصاريف النقل الصحي.', 'ⵓⵔ ⵙⵓⵍ ⵢⵓⵡⵉⴷ ⵓⵙⵙⵓⵖⵍ ⵏ ⵓⵙⵎⵓⵜⵜⵉ ⴰⵙⵙⵏⴰⵊⵉ.') },
      { from: 'foundation', date: '2026-03-16', text: L('Votre dossier est validé, le virement sera effectué cette semaine.', 'تمت المصادقة على ملفك، وسيتم التحويل خلال هذا الأسبوع.', 'ⴰⴼⵉⵛⵢ ⵏⵏⴽ ⵉⵜⵜⵓⵙⵙⵓⴷⵙ, ⴰⵙⵎⵓⵜⵜⵉ ⴰⴷ ⵢⵉⵍⵉ ⴳ ⵉⵎⴰⵍⴰⵙ ⴰ.') }
    ]
  }
];

export const PLACES = [
  { id: 'cms-rabat', label: L('Centre médico-social — Rabat', 'المركز الطبي الاجتماعي — الرباط', 'ⴰⵏⵎⵎⴰⵙ ⴰⵏⴰⵎⵓⵏ ⴰⵙⵙⵏⴰⵊⵉ — ⵕⵕⴱⴰⵟ') },
  { id: 'dr-casablanca', label: L('Délégation régionale — Casablanca', 'المندوبية الجهوية — الدار البيضاء', 'ⵜⴰⵎⵙⵙⵓⵔⵜ ⵜⴰⵏⴰⵎⵓⵏⵜ — ⴰⵏⴼⴰ') },
  { id: 'dr-fes', label: L('Délégation régionale — Fès', 'المندوبية الجهوية — فاس', 'ⵜⴰⵎⵙⵙⵓⵔⵜ ⵜⴰⵏⴰⵎⵓⵏⵜ — ⴼⴰⵙ') },
  { id: 'dr-marrakech', label: L('Délégation régionale — Marrakech', 'المندوبية الجهوية — مراكش', 'ⵜⴰⵎⵙⵙⵓⵔⵜ ⵜⴰⵏⴰⵎⵓⵏⵜ — ⵎⵕⵕⴰⴽⵛ') }
];

export const REASONS = [
  { id: 'consultation', label: L('Consultation médicale', 'فحص طبي', 'ⴰⵙⵓⵎⵔ ⴰⵙⵙⵏⴰⵊⵉ') },
  { id: 'dossier', label: L('Dépôt de dossier', 'إيداع ملف', 'ⴰⵙⵔⵙ ⵏ ⵓⴼⵉⵛⵢ') },
  { id: 'information', label: L('Information sur les prestations', 'معلومات حول الخدمات', 'ⵉⵙⴰⵍⵏ ⵖⴼ ⵜⵉⵏⴼⴰ') }
];

export const TIME_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30'];

export const APPOINTMENTS = [
  { id: 'a1', place: 'cms-rabat', reason: 'consultation', date: '2026-11-25', time: '10:00' },
  { id: 'a2', place: 'cms-rabat', reason: 'consultation', date: '2026-09-08', time: '09:30' },
  { id: 'a3', place: 'dr-casablanca', reason: 'dossier', date: '2026-05-19', time: '14:00' }
];

export const serviceLabel = (id) => SERVICES.find((service) => service.id === id)?.label;
export const placeLabel = (id) => PLACES.find((place) => place.id === id)?.label;
export const reasonLabel = (id) => REASONS.find((reason) => reason.id === id)?.label;
