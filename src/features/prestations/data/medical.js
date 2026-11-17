/**
 * Conventions médicales : régions de la carte, catégories, statuts et
 * fonctions de formatage (repris de l'ancien assets/prestations.js).
 */
export const medicalRegionMeta = [
  { id: 'tanger-tetouan-al-hoceima', source: 'RÉGION DE TANGER -TÉTOUAN -AL HOCEIMA', x: 56, y: 14, target: { x: 455, y: 70 }, labels: { fr: 'Tanger - Tétouan - Al Hoceima', ar: 'طنجة - تطوان - الحسيمة', zgh: 'ⵟⵏⵊⴰ - ⵜⵉⵟⵟⴰⵡⵉⵏ - ⵍⵃⵓⵙⵉⵎⴰ' } },
  { id: 'oriental', source: "RÉGION DE L'ORIENTAL", x: 72, y: 22, target: { x: 585, y: 175 }, labels: { fr: "L'Oriental", ar: 'الشرق', zgh: 'ⵓⵛⵛⵔⵇ' } },
  { id: 'rabat-sale-kenitra', source: 'RÉGION DE RABAT SALÉ KÉNITRA', x: 54, y: 27, target: { x: 388, y: 118 }, labels: { fr: 'Rabat - Salé - Kénitra', ar: 'الرباط - سلا - القنيطرة', zgh: 'ⵕⴱⴰⵟ - ⵙⵍⴰ - ⵇⵏⵉⵟⵔⴰ' } },
  { id: 'fes-meknes', source: 'RÉGION DE FÈS -MEKNÈS', x: 62, y: 34, target: { x: 505, y: 165 }, labels: { fr: 'Fès - Meknès', ar: 'فاس - مكناس', zgh: 'ⴼⴰⵙ - ⵎⴽⵏⴰⵙ' } },
  { id: 'casablanca-settat', source: 'RÉGION DE CASABLANCA -SETTAT', x: 49, y: 39, target: { x: 350, y: 180 }, labels: { fr: 'Casablanca - Settat', ar: 'الدار البيضاء - سطات', zgh: 'ⴰⵏⴼⴰ - ⵙⵟⴰⵜ' } },
  { id: 'beni-mellal-khenifra', source: 'RÉGION DE BÉNI MELLAL -KHÉNIFRA', x: 57, y: 43, target: { x: 450, y: 250 }, labels: { fr: 'Béni Mellal - Khénifra', ar: 'بني ملال - خنيفرة', zgh: 'ⴱⵏⵉ ⵎⵍⵍⴰⵍ - ⵅⵏⵉⴼⵔⴰ' } },
  { id: 'marrakech-safi', source: 'RÉGION DE MARRAKECH -SAFI', x: 45, y: 50, target: { x: 390, y: 295 }, labels: { fr: 'Marrakech - Safi', ar: 'مراكش - آسفي', zgh: 'ⵎⵕⵕⴰⴽⵛ - ⴰⵙⴼⵉ' } },
  { id: 'draa-tafilalet', source: 'RÉGION DE DRÂA-TAFILALET', x: 57, y: 58, target: { x: 515, y: 305 }, labels: { fr: 'Drâa - Tafilalet', ar: 'درعة - تافيلالت', zgh: 'ⴷⵔⴰⵄⴰ - ⵜⴰⴼⵉⵍⴰⵍⵜ' } },
  { id: 'souss-massa', source: 'RÉGION DE SOUSS -MASSA -AGADIR', x: 38, y: 61, target: { x: 340, y: 360 }, labels: { fr: 'Souss - Massa', ar: 'سوس - ماسة', zgh: 'ⵙⵓⵙ - ⵎⴰⵙⴰ' } },
  { id: 'guelmim-oued-noun', source: 'RÉGION DE GUELMIM -OUED NOUN', x: 34, y: 70, target: { x: 275, y: 430 }, labels: { fr: 'Guelmim - Oued Noun', ar: 'كلميم - واد نون', zgh: 'ⴳⵯⵍⵎⵉⵎ - ⴰⵙⵉⴼ ⵏⵓⵏ' } },
  { id: 'laayoune-sakia-el-hamra', source: 'RÉGION DE LAÂYOUNE -SAKIA EL HAMRA', x: 28, y: 80, target: { x: 220, y: 505 }, labels: { fr: 'Laâyoune - Sakia El Hamra', ar: 'العيون - الساقية الحمراء', zgh: 'ⵍⵄⵢⵓⵏ - ⵙⴰⵇⵢⴰ ⵍⵃⴰⵎⵔⴰ' } },
  { id: 'dakhla-oued-ed-dahab', source: 'RÉGION DE DAKHLA -OUED ED DAHAB', x: 21, y: 90, target: { x: 123.7455, y: 609.5922 }, labels: { fr: 'Dakhla - Oued Eddahab', ar: 'الداخلة - وادي الذهب', zgh: 'ⴷⴰⵅⵍⴰ - ⴰⵙⵉⴼ ⴷⴰⵀⴰⴱ' } }
];

export const medicalMapRegionAliases = {
  'laayoune-sakia-el-hamra': 'tanger-tetouan-al-hoceima',
  'oriental': 'oriental',
  'beni-mellal-khenifra': 'draa-tafilalet',
  'marrakech-safi': 'souss-massa',
  'souss-massa': 'guelmim-oued-noun',
  'rabat-sale-kenitra': 'casablanca-settat',
  'casablanca-settat': 'marrakech-safi',
  'guelmim-oued-noun': 'laayoune-sakia-el-hamra',
  'dakhla-oued-ed-dahab': 'dakhla-oued-ed-dahab',
  'tanger-tetouan-al-hoceima': 'rabat-sale-kenitra',
  'draa-tafilalet': 'fes-meknes',
  'fes-meknes': 'beni-mellal-khenifra'
};

export const medicalCategoryLabels = {
  "LABORATOIRES D’ANALYSES": { ar: 'مختبرات التحاليل', zgh: 'ⵉⵎⵣⵣⴰⵔⵏ ⵏ ⵜⵙⵍⵉⴹⵜ' },
  'CENTRES DE RADIOLOGIE': { ar: 'مراكز الأشعة', zgh: 'ⵉⵎⵎⴰⵙⵏ ⵏ ⵕⴰⴷⵢⵓ' },
  'CENTRES DE SOINS DENTAIRE': { ar: 'مراكز علاج الأسنان', zgh: 'ⵉⵎⵎⴰⵙⵏ ⵏ ⵓⵅⵙⴰⵏ' },
  'PHARMACIES': { ar: 'صيدليات', zgh: 'ⵜⵉⴼⴰⵔⵎⴰⵙⵉⵜⵉⵏ' },
  'CLINIQUES': { ar: 'مصحات', zgh: 'ⵉⵙⵉⴱⵉⵜⴰⵍⵏ' },
  'CLINIQUE': { ar: 'مصحة', zgh: 'ⴰⵙⵉⴱⵉⵜⴰⵍ' },
  'OPTICIENS': { ar: 'نظاراتيون', zgh: 'ⵉⵎⵙⵡⴰⵍⵏ ⵏ ⵜⵉⵟⵟ' },
  'MÉDECINS À TARIF PRÉFÉRENTIELS': { ar: 'أطباء بتعرفة تفضيلية', zgh: 'ⵉⵎⵙⵙⵉⵊⵊⵉⵏ ⵙ ⵓⵙⵙⵓⵎ ⵉⵎⵥⵍⵉ' },
  'CABINETS DE KINÉSITHÉRAPIE': { ar: 'عيادات الترويض الطبي', zgh: 'ⵜⵉⵔⵣⴰ ⵏ ⴽⵉⵏⵉⵣⵉⵜⵉⵔⴰⴱⵉ' },
  'MATÉRIEL MÉDICO-CHIRURGICAL ET PARAMÉDICAL': { ar: 'معدات طبية وجراحية وشبه طبية', zgh: 'ⴰⵙⵍⵓⴳⵏ ⴰⴷⵓⵙⴰⵏ ⴷ ⴰⵊⵉⵔⵓⵔⵊⵉ' }
};

export const medicalStatusLabels = {
  'Confirmé': { ar: 'مؤكد', zgh: 'ⵉⵜⵜⵓⵙⴷⵓⵙ' },
  'Confirmé – avis manquant': { ar: 'مؤكد - الإشعار غير متوفر', zgh: 'ⵉⵜⵜⵓⵙⴷⵓⵙ - ⴰⵙⴰⵍⵉ ⵓⵔ ⵉⵍⵍⵉ' },
  'Résilier': { ar: 'ملغى', zgh: 'ⵉⵜⵜⵓⵙⴼⵙⵔ' },
  'À voir avec Mme Lehmami': { ar: 'قيد التحقق مع السيدة لهمامي', zgh: 'ⵉⵇⵇⴰⵏ ⴰⵙⵏⵉⵔⵎ ⴷ Mme Lehmami' }
};

export const medicalCategoryIcons = {
  "LABORATOIRES D’ANALYSES": 'fa-vial-circle-check',
  'CENTRES DE RADIOLOGIE': 'fa-x-ray',
  'CENTRES DE SOINS DENTAIRE': 'fa-tooth',
  'PHARMACIES': 'fa-prescription-bottle-medical',
  'CLINIQUES': 'fa-hospital',
  'CLINIQUE': 'fa-hospital',
  'OPTICIENS': 'fa-glasses',
  'MÉDECINS À TARIF PRÉFÉRENTIELS': 'fa-user-doctor',
  'CABINETS DE KINÉSITHÉRAPIE': 'fa-person-walking',
  'MATÉRIEL MÉDICO-CHIRURGICAL ET PARAMÉDICAL': 'fa-briefcase-medical'
};

export const medicalCategoryIcon = (category) => medicalCategoryIcons[category] || 'fa-stethoscope';

export const medicalCategoryFilterValue = (category) => (category === 'CLINIQUE' ? 'CLINIQUES' : category);

export function normalizeMedicalValue(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/œ/g, 'oe')
    .replace(/Œ/g, 'OE')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function medicalRegionFromName(regionName) {
  const normalized = normalizeMedicalValue(regionName);
  return medicalRegionMeta.find((region) => normalizeMedicalValue(region.source) === normalized) || null;
}

export const medicalRegionLabel = (region, lang) => region?.labels?.[lang] || region?.labels?.fr || region?.source || '';

export const translateMedicalCategory = (category, lang) =>
  lang === 'fr' ? category : medicalCategoryLabels[category]?.[lang] || category;

export function translateMedicalStatus(status, lang) {
  if (!status) return '';
  return lang === 'fr' ? status : medicalStatusLabels[status]?.[lang] || status;
}

/** Boutons « Télécharger avis / contact » d'une convention (lien local ou désactivé). */
export function medicalNoticeActions(entry, copy) {
  const avis = String(entry.avis || '');
  const normalized = normalizeMedicalValue(avis);
  const hasContact = /contact\s*:/i.test(avis);
  const hasAvis = /\bavis\b/.test(normalized) || /telecharger ici/.test(normalized.replace(/contact\s*telecharger ici/g, ''));
  const actions = [];
  if (hasAvis) actions.push({ label: copy.downloadNotice, href: entry.pdf || null });
  if (hasContact) actions.push({ label: copy.downloadContact, href: entry.pdfContact || null });
  return actions;
}

/* Sépare le nom de l'organisme de l'offre : "… . OFFRE : REMISE DE 30%"
   -> { name: "…", offer: "REMISE DE 30%" }. L'offre est affichée en badge. */
export function splitMedicalOffer(rawTitle) {
  const raw = String(rawTitle || '');
  const m = raw.match(/\s*[.\-–]?\s*OFFRES?\s*:\s*/i);
  if (!m) return { name: raw.trim(), offer: '' };
  const name = raw.slice(0, m.index).replace(/[.\-–\s]+$/, '').trim();
  const offer = raw.slice(m.index + m[0].length).trim();
  return { name: name || raw.trim(), offer };
}

export function formatMedicalOpeningDate(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const numeric = raw.match(/^(\d{1,2})\/(\d{4})$/);
  if (numeric) return `${numeric[1].padStart(2, '0')}/${numeric[2]}`;
  if (/^\d{4}$/.test(raw)) return `01/${raw}`;
  const normalized = normalizeMedicalValue(raw);
  const monthMap = {
    janv: '01',
    janvier: '01',
    fevr: '02',
    fevrier: '02',
    mars: '03',
    avr: '04',
    avril: '04',
    mai: '05',
    juin: '06',
    juil: '07',
    juillet: '07',
    aout: '08',
    sept: '09',
    septembre: '09',
    oct: '10',
    octobre: '10',
    nov: '11',
    novembre: '11',
    dec: '12',
    decembre: '12'
  };
  const monthKey = Object.keys(monthMap).find((key) => normalized.includes(key));
  const yearMatch = normalized.match(/(?:^|[^0-9])(\d{1,4})(?:$|[^0-9])/);
  if (!monthKey || !yearMatch) return raw;
  const token = yearMatch[1];
  const year = token.length === 4
    ? token
    : token.length === 1
    ? `202${token}`
    : `${Number(token) > 30 ? '19' : '20'}${token}`;
  return `${monthMap[monthKey]}/${year}`;
}

export function formatMedicalPhoneNumber(value) {
  const digits = String(value || '').replace(/\D/g, '');
  const normalized = digits.length === 9 && /^[5-8]/.test(digits) ? `0${digits}` : digits;
  if (normalized.length !== 10 || !/^0[5-8]/.test(normalized)) return value;
  return normalized.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
}

export function formatMedicalContactValue(value) {
  return String(value || '')
    .replace(/\d[\d\s]{6,}\d/g, (match) => formatMedicalPhoneNumber(match))
    .replace(/\s*\/\s*/g, ' / ');
}

export function uniqueMedicalValues(entries, key) {
  return [...new Set(entries.map((entry) => (key === 'categorie' ? medicalCategoryFilterValue(entry[key]) : entry[key])).filter(Boolean))]
    .sort((a, b) => String(a).localeCompare(String(b), 'fr'));
}
