/**
 * Rubriques de l'espace Adhésion : une entrée = une page (adhesion/<id>.html).
 * Textes en FR / AR / ZGH directement dans les données.
 */
const card = (id, icon, frTitle, arTitle, zghTitle, frBody, arBody, zghBody) => ({
  id,
  icon,
  title: { fr: frTitle, ar: arTitle, zgh: zghTitle },
  body: { fr: frBody, ar: arBody, zgh: zghBody }
});

const item = (fr, ar, zgh, href) => ({ label: { fr, ar, zgh }, href });

const fee = (fr, ar, zgh, amount) => ({ label: { fr, ar, zgh }, amount });

export const OVERVIEW_HERO_IMAGE = 'assets/images/adhesion-hero.png';

export const ADHESION_SECTIONS = [
  {
    id: 'adherents-beneficiaires',
    page: 'adhesion/adherents-beneficiaires.html',
    icon: 'fa-users',
    heroIcon: 'fa-hand-holding-heart',
    image: 'assets/images/adhesion-adherents-beneficiaires.png',
    title: {
      fr: 'Nos adhérents',
      ar: 'منخرطونا',
      zgh: 'ⵉⵎⵓⵏⵏ ⵏⵏⵖ'
    },
    eyebrow: {
      fr: 'Adhérent(e)s',
      ar: 'المنخرطون والمنخرطات',
      zgh: 'ⵉⵎⵓⵏⵏ ⴷ ⵜⵎⵓⵏⵉⵏ'
    },
    summary: {
      fr: "Quatre situations d'adhésion sont prévues : personnel en activité, organismes sous tutelle, retraités et détachés.",
      ar: 'هناك أربع وضعيات للانخراط: الموظفون العاملون، المؤسسات تحت الوصاية، المتقاعدون والملحقون.',
      zgh: 'ⵍⵍⴰⵏⵜ ⴽⴽⵓⵥ ⵜⵎⵙⵍⴰⵜⵉⵏ ⵏ ⵓⵎⵓⵏ : ⵉⵎⵙⵡⵓⵔⵉⵢⵏ, ⵜⵉⵎⵙⵙⵉⵡⵉⵏ ⴷⴷⴰⵡ ⵓⵙⵏⴼⵍ, ⵉⵎⴷⴽⴽⵯⴰⵍⵏ ⴷ ⵉⵎⵙⵡⵓⵔⵉⵢⵏ ⵉⵜⵜⵓⵣⵏⵏ.'
    },
    cards: [
      card('active', 'fa-user-check', 'Personnel en activité', 'الموظفون العاملون', 'ⵉⵎⵙⵡⵓⵔⵉⵢⵏ',
        "Tout le personnel actif du Département de l'Agriculture.",
        'جميع الموظفين العاملين بقطاع الفلاحة.',
        'ⴽⵓⵍⵍⵓ ⵉⵎⵙⵡⵓⵔⵉⵢⵏ ⵉⵍⵍⴰⵏ ⴳ ⵜⵡⵓⵔⵉ ⴳ ⵓⴳⵣⵣⵓⵎ ⵏ ⵜⴼⵍⴰⵃⵜ.'),
      card('tutelle', 'fa-building-user', 'Organismes sous tutelle', 'المؤسسات تحت الوصاية', 'ⵜⵉⵎⵙⵙⵉⵡⵉⵏ ⴷⴷⴰⵡ ⵓⵙⵏⴼⵍ',
        "Adhésion pour le personnel des établissements sous tutelle du Département, sous réserve de la conclusion d'une convention entre la FOS-Agri et l'administration de l'établissement concerné.",
        'انخراط موظفي المؤسسات الخاضعة لوصاية القطاع، شريطة إبرام اتفاقية بين FOS-Agri وإدارة المؤسسة المعنية.',
        'ⴰⵎⵓⵏ ⵉ ⵉⵎⵙⵡⵓⵔⵉⵢⵏ ⵏ ⵜⵎⵙⵙⵉⵡⵉⵏ ⴷⴷⴰⵡ ⵓⵙⵏⴼⵍ ⵏ ⵓⴳⵣⵣⵓⵎ, ⵙ ⵓⵙⵖⵏ ⵏ ⵜⵎⵙⴰⵙⴽⵉⵜ ⴳⵔ FOS-Agri ⴷ ⵜⵏⴱⴰⴹⵜ ⵏ ⵜⵎⵙⵙⵉ ⵜⴰⵎⵙⵍⴰⵢⵜ.'),
      card('retraites', 'fa-person-cane', 'Retraités', 'المتقاعدون', 'ⵉⵎⴷⴽⴽⵯⴰⵍⵏ',
        "Adhésion au choix pour les retraités du Département ayant quitté le service à partir de l'année 2015, après validation du montant de prélèvement mensuel.",
        'انخراط اختياري لمتقاعدي القطاع الذين غادروا الخدمة ابتداء من سنة 2015، بعد المصادقة على مبلغ الاقتطاع الشهري.',
        'ⴰⵎⵓⵏ ⵙ ⵓⴼⵔⴰⵏ ⵉ ⵉⵎⴷⴽⴽⵯⴰⵍⵏ ⵏ ⵓⴳⵣⵣⵓⵎ ⵍⵍⵉ ⵉⴼⵓⵖⵏ ⵜⴰⵡⵓⵔⵉ ⵙⴳ ⵓⵙⴳⴳⵯⴰⵙ 2015, ⴷⴼⴼⵉⵔ ⵓⵙⵙⵔⵙ ⵏ ⵓⵎⵟⵟⵓⵏ ⵏ ⵓⴽⴽⴰⵙ ⵏ ⵡⴰⵢⵢⵓⵔ.'),
      card('detaches', 'fa-briefcase', 'Détachés', 'الموظفون الملحقون', 'ⵉⵎⵙⵡⵓⵔⵉⵢⵏ ⵉⵜⵜⵓⵣⵏⵏ',
        "Adhésion facultative, sur demande, du personnel du Ministère détaché auprès d'autres organismes et personnel détaché auprès du Département",
        'انخراط اختياري، بناء على طلب، لموظفي الوزارة الملحقين لدى هيئات أخرى وللموظفين الملحقين لدى القطاع.',
        'ⴰⵎⵓⵏ ⵙ ⵓⴼⵔⴰⵏ, ⵙ ⵓⵙⵓⵜⵔ, ⵉ ⵉⵎⵙⵡⵓⵔⵉⵢⵏ ⵏ ⵜⵎⴰⵡⴰⵙⵜ ⵉⵜⵜⵓⵣⵏⵏ ⵖⵔ ⵜⵎⵙⵙⵉⵡⵉⵏ ⵢⴰⴹⵏ ⴷ ⵉⵎⵙⵡⵓⵔⵉⵢⵏ ⵉⵜⵜⵓⵣⵏⵏ ⵖⵔ ⵓⴳⵣⵣⵓⵎ.')
    ]
  },
  {
    id: 'procedure-adhesion',
    page: 'adhesion/procedure-adhesion.html',
    icon: 'fa-file-signature',
    heroIcon: 'fa-folder-open',
    image: 'assets/images/adhesion-procedure.png',
    title: {
      fr: "Procédure d'adhésion",
      ar: 'مسطرة الانخراط',
      zgh: 'ⵜⴰⵎⵙⵙⴰⵔⵜ ⵏ ⵓⵎⵓⵏ'
    },
    eyebrow: {
      fr: 'Pièces à fournir',
      ar: 'الوثائق المطلوبة',
      zgh: 'ⵜⵉⴼⵔⴽⵉⵡⵉⵏ ⵉⵍⴰⵇⵏ'
    },
    summary: {
      fr: 'Les pièces à fournir dépendent de votre situation.',
      ar: 'تختلف الوثائق المطلوبة حسب وضعيتكم.',
      zgh: 'ⵜⵉⴼⵔⴽⵉⵡⵉⵏ ⵉⵍⴰⵇⵏ ⴱⴷⴷⵍⵏⵜ ⵙ ⵜⵎⵙⵍⴰ ⵏⵏⵓⵏ.'
    },
    hideSummary: true,
    groups: [
      {
        id: 'active',
        icon: 'fa-user-check',
        title: { fr: 'Personnel en activité', ar: 'الموظفون العاملون', zgh: 'ⵉⵎⵙⵡⵓⵔⵉⵢⵏ' },
        intro: {
          fr: "L’intéressé accède à l'espace adhérent afin de créer son compte, renseigne les informations requises et téléverse les pièces justificatives demandées pour constituer son dossier d’adhésion. Une fois sa demande soumise, il peut en suivre l’état d’avancement directement à travers la plateforme. Pièces à fournir :",
          ar: 'يلج المعني بالأمر إلى فضاء المنخرط لإنشاء حسابه، ويملأ المعلومات المطلوبة ويرفع الوثائق المثبتة اللازمة لتكوين ملف انخراطه. وبعد تقديم طلبه، يمكنه تتبع مراحل معالجته مباشرة عبر المنصة. الوثائق المطلوبة:',
          zgh: 'ⴰⵎⵙⵍⴰⵢ ⵉⴽⵛⵛⵎ ⵖⵔ ⵓⵙⴰⵢⵍⴰ ⵏ ⵓⵎⵓⵏ ⴰⴷ ⵉⵙⵏⵓⵍⴼⵓ ⴰⵎⵉⴹⴰⵏ ⵏⵏⵙ, ⵉⵙⵙⵓⴷⵓ ⵉⵙⴰⵍⵏ ⵉⵍⴰⵇⵏ ⴷ ⵉⵙⵙⵓⵍⵢ ⵜⵉⴼⵔⴽⵉⵡⵉⵏ ⵏ ⵓⵙⵙⵏⵜⵎ ⵉⵜⵜⵓⵙⵓⵜⵔⵏ ⴰⴼⴰⴷ ⴰⴷ ⵉⵙⵎⵓⵜⵜⴳ ⴰⴼⴰⵢⵍⵓ ⵏ ⵓⵎⵓⵏ ⵏⵏⵙ. ⴷⴼⴼⵉⵔ ⵓⵙⵙⴽⵛⵎ ⵏ ⵓⵙⵓⵜⵔ ⵏⵏⵙ, ⵉⵣⵎⵔ ⴰⴷ ⵉⴹⴼⵕ ⴰⵙⵏⴼⵍⵓⵍ ⵏⵏⵙ ⵙ ⵜⵖⵍⴰⵢⵜ. ⵜⵉⴼⵔⴽⵉⵡⵉⵏ ⵉⵍⴰⵇⵏ :'
        },
        items: [
          item('Photo de l’adhérent', 'صورة المنخرط', 'ⵜⴰⵡⵍⴰⴼⵜ ⵏ ⵓⵎⵓⵏ'),
          item('Coordonnées bancaires « Chèque barré ou RIB »', 'المعلومات البنكية « شيك مسطر أو RIB »', 'ⵉⵙⴰⵍⵏ ⵏ ⴱⴰⵏⴽ « ⵛⵉⴽ ⴰⵙⵟⵟⴰⵔ ⵏⵖ RIB »'),
          item('Pièces justificatives des ayants droit, le cas échéant : photo ; copie du livret de famille ou de l’acte de mariage ; actes de naissance des enfants.', 'الوثائق المثبتة لذوي الحقوق، عند الاقتضاء: صورة؛ نسخة من دفتر الحالة المدنية أو عقد الزواج؛ رسوم ولادة الأبناء.', 'ⵜⵉⴼⵔⴽⵉⵡⵉⵏ ⵏ ⵓⵙⵙⵏⵜⵎ ⵏ ⵡⵉⴷ ⵉⵙ ⵉⵍⴰ ⵓⵣⵔⴼ, ⵎⴽ ⵉⵍⵍⴰ ⵓⵙⵔⵓⵜ : ⵜⴰⵡⵍⴰⴼⵜ ; ⵜⴰⵏⵖⵍⵜ ⵏ ⵓⴷⵍⵉⵙ ⵏ ⵜⵡⴰⵛⵓⵍⵜ ⵏⵖ ⵏ ⵓⵙⵖⵏ ⵏ ⵓⵎⴰⵔⴰⵢ ; ⵉⵙⵖⵏⴰ ⵏ ⵜⵍⴰⵍⵉⵜ ⵏ ⵜⴰⵔⵡⴰ.')
        ]
      },
      {
        id: 'detaches',
        icon: 'fa-briefcase',
        title: { fr: 'Détachés', ar: 'الموظفون الملحقون', zgh: 'ⵉⵎⵙⵡⵓⵔⵉⵢⵏ ⵉⵜⵜⵓⵣⵏⵏ' },
        intro: {
          fr: "Le fonctionnaire détaché transmet une demande manuscrite d’adhésion accompagnée de l’autorisation de précompte, en version physique. À réception, la Fondation crée son compte et lui notifie sa mise à disposition. Il accède ensuite à son espace adhérent pour renseigner les informations requises et téléverser les pièces justificatives. Il peut suivre l’état d’avancement de son dossier sur la plateforme jusqu’à la génération de sa carte d’adhésion.",
          ar: 'يوجه الموظف الملحق طلبا خطيا للانخراط مرفقا بإذن الاقتطاع، في نسخة ورقية. وعند التوصل به، تنشئ المؤسسة حسابه وتخبره بوضعه رهن إشارته. ثم يلج إلى فضاء المنخرط لملء المعلومات المطلوبة ورفع الوثائق المثبتة. ويمكنه تتبع مراحل معالجة ملفه عبر المنصة إلى حين إصدار بطاقة انخراطه.',
          zgh: 'ⴰⵎⵙⵡⵓⵔⵉ ⵉⵜⵜⵓⵣⵏⵏ ⵉⵜⵜⴰⵣⵏ ⴰⵙⵓⵜⵔ ⵉⵜⵜⵓⵢⴰⵔⴰⵏ ⵙ ⵓⴼⵓⵙ ⵏ ⵓⵎⵓⵏ, ⵙ ⵓⵙⵔⴰⴳ ⵏ ⵓⴽⴽⴰⵙ, ⵙ ⵜⵏⵖⵍⵜ ⵏ ⵜⵙⵏⴰ. ⵎⵔⴰ ⵜⴻⵜⵜⵓⵡⵙ, ⵜⴰⵙⴷⴰⵡⵉⵜ ⵜⵙⵏⵓⵍⴼⵓ ⴰⵎⵉⴹⴰⵏ ⵏⵏⵙ ⵜⵙⵙⵓⴳⵣ ⴰⵙ. ⴷⴼⴼⵉⵔ ⵓⵢⴰ, ⵉⴽⵛⵛⵎ ⵖⵔ ⵓⵙⴰⵢⵍⴰ ⵏ ⵓⵎⵓⵏ ⴰⴷ ⵉⵙⵙⵓⴷⵓ ⵉⵙⴰⵍⵏ ⵉⵍⴰⵇⵏ ⴷ ⴰⴷ ⵉⵙⵙⵓⵍⵢ ⵜⵉⴼⵔⴽⵉⵡⵉⵏ ⵏ ⵓⵙⵙⵏⵜⵎ. ⵉⵣⵎⵔ ⴰⴷ ⵉⴹⴼⵕ ⴰⴼⴰⵢⵍⵓ ⵏⵏⵙ ⵙ ⵜⵖⵍⴰⵢⵜ ⴰⵔ ⴰⵙⵏⵓⵍⴼⵓ ⵏ ⵜⴽⴰⵕⴹⴰ ⵏ ⵓⵎⵓⵏ ⵏⵏⵙ.'
        },
        items: []
      },
      {
        id: 'prolongation',
        icon: 'fa-clock-rotate-left',
        title: { fr: "Prolongation d'adhésion pour futurs retraités", ar: 'تمديد الانخراط للمقبلين على التقاعد', zgh: 'ⴰⵙⵉⵖⵣⴼ ⵏ ⵓⵎⵓⵏ ⵉ ⵉⵎⴷⴽⴽⵯⴰⵍⵏ ⵉⴷⴷⵓⵙⵏ' },
        intro: {
          fr: "Le futur retraité peut initier une demande de prolongation depuis son espace adhérent. Après sa sortie de service, il téléverse son attestation de pension et son autorisation de précompte afin de maintenir son adhésion à la Fondation.",
          ar: 'يمكن للمقبل على التقاعد تقديم طلب التمديد من فضاء المنخرط. وبعد مغادرته الخدمة، يرفع شهادة التقاعد وإذن الاقتطاع من أجل الحفاظ على انخراطه في المؤسسة.',
          zgh: 'ⴰⵎⴷⴽⴽⵯⴰⵍ ⵏ ⵜⵡⵓⵔⵉ ⵉⵣⵎⵔ ⴰⴷ ⵉⵙⵏⵜⵉ ⴰⵙⵓⵜⵔ ⵏ ⵓⵙⵖⵣⵣⵉ ⵙⴳ ⵓⵙⴰⵢⵍⴰ ⵏ ⵓⵎⵓⵏ. ⴷⴼⴼⵉⵔ ⵜⵓⴼⵓⵖⵜ ⵏⵏⵙ ⵙⴳ ⵜⵡⵓⵔⵉ, ⵉⵙⵙⵓⵍⵢ ⵜⴰⵙⴽⵉⵏⵜ ⵏ ⵜⵎⴷⴽⴽⵯⴰⵍⵜ ⴷ ⵓⵙⵔⴰⴳ ⵏ ⵓⴽⴽⴰⵙ ⴰⴼⴰⴷ ⴰⴷ ⵉⵃⴹⵓ ⴰⵎⵓⵏ ⵏⵏⵙ ⴳ ⵜⵙⴷⴰⵡⵉⵜ.'
        },
        items: []
      },
      {
        id: 'retraites',
        icon: 'fa-person-cane',
        title: { fr: 'Retraités', ar: 'المتقاعدون', zgh: 'ⵉⵎⴷⴽⴽⵯⴰⵍⵏ' },
        intro: {
          fr: "L’ancien retraité soumet sa demande via un espace dédié. La Fondation vérifie sa quotité auprès de la CMR ou du RCAR, puis crée son compte sur la plateforme. Après notification, l’intéressé complète son dossier en ligne sur son espace adhérent en renseignant les informations requises et en téléversant les pièces justificatives. Il peut ensuite suivre sa demande jusqu’à la génération de sa carte d’adhésion.",
          ar: 'يقدم المتقاعد طلبه عبر فضاء مخصص. وتتحقق المؤسسة من حصته لدى الصندوق المغربي للتقاعد (CMR) أو النظام الجماعي لمنح رواتب التقاعد (RCAR)، ثم تنشئ حسابه على المنصة. وبعد إشعاره، يستكمل المعني بالأمر ملفه إلكترونيا عبر فضاء المنخرط بملء المعلومات المطلوبة ورفع الوثائق المثبتة، ويمكنه بعد ذلك تتبع طلبه إلى حين إصدار بطاقة انخراطه.',
          zgh: 'ⴰⵎⴷⴽⴽⵯⴰⵍ ⵉⵜⵜⴰⵣⵏ ⴰⵙⵓⵜⵔ ⵏⵏⵙ ⵙ ⵓⵙⴰⵢⵍⴰ ⵉⵥⵍⵉⵏ. ⵜⴰⵙⴷⴰⵡⵉⵜ ⵜⵙⴼⵇⵇⴰⴷ ⴰⵎⵟⵟⵓⵏ ⵏⵏⵙ ⴳ CMR ⵏⵖ RCAR, ⵜⵙⵏⵓⵍⴼⵓ ⴰⵎⵉⴹⴰⵏ ⵏⵏⵙ ⴳ ⵜⵖⵍⴰⵢⵜ. ⴷⴼⴼⵉⵔ ⵓⵙⵓⴳⵣ, ⴰⵎⵙⵍⴰⵢ ⵉⵙⵎⴷ ⴰⴼⴰⵢⵍⵓ ⵏⵏⵙ ⵙ ⵜⵖⵍⴰⵢⵜ ⴳ ⵓⵙⴰⵢⵍⴰ ⵏ ⵓⵎⵓⵏ, ⵙ ⵓⵙⵙⵓⴷⵓ ⵏ ⵉⵙⴰⵍⵏ ⵉⵍⴰⵇⵏ ⴷ ⵓⵙⵙⵓⵍⵢ ⵏ ⵜⵉⴼⵔⴽⵉⵡⵉⵏ ⵏ ⵓⵙⵙⵏⵜⵎ. ⵉⵣⵎⵔ ⴷⴼⴼⵉⵔ ⴰⴷ ⵉⴹⴼⵕ ⴰⵙⵓⵜⵔ ⵏⵏⵙ ⴰⵔ ⴰⵙⵏⵓⵍⴼⵓ ⵏ ⵜⴽⴰⵕⴹⴰ ⵏ ⵓⵎⵓⵏ ⵏⵏⵙ.'
        },
        items: [
          item('Photo récente de l’adhérent', 'صورة حديثة للمنخرط', 'ⵜⴰⵡⵍⴰⴼⵜ ⵜⴰⵎⴰⵢⵏⵓⵜ ⵏ ⵓⵎⵓⵏ'),
          item('Chèque barré ou une attestation de RIB', 'شيك مسطر أو شهادة RIB', 'ⵛⵉⴽ ⴰⵙⵟⵟⴰⵔ ⵏⵖ ⵜⴰⵙⴽⵉⵏⵜ ⵏ RIB'),
          item('Attestation de pension', 'شهادة التقاعد', 'ⵜⴰⵙⴽⵉⵏⵜ ⵏ ⵜⵎⴷⴽⴽⵯⴰⵍⵜ'),
          item('Autorisation de précompte en deux exemplaires', 'إذن بالاقتطاع في نسختين', 'ⴰⵙⵔⴰⴳ ⵏ ⵓⴽⴽⴰⵙ ⴳ ⵙⵏⴰⵜ ⵏ ⵜⵏⵖⵍⵉⵏ'),
          item('Pièces justificatives relatives aux conjoints et aux enfants, le cas échéant : copie du livret de famille ou de l’acte de mariage et actes de naissance des enfants.', 'الوثائق المثبتة المتعلقة بالأزواج والأبناء، عند الاقتضاء: نسخة من دفتر الحالة المدنية أو عقد الزواج ورسوم ولادة الأبناء.', 'ⵜⵉⴼⵔⴽⵉⵡⵉⵏ ⵏ ⵓⵙⵙⵏⵜⵎ ⵏ ⵉⵡⵜⵎⴰⵏ ⴷ ⵜⴰⵔⵡⴰ, ⵎⴽ ⵉⵍⵍⴰ ⵓⵙⵔⵓⵜ : ⵜⴰⵏⵖⵍⵜ ⵏ ⵓⴷⵍⵉⵙ ⵏ ⵜⵡⴰⵛⵓⵍⵜ ⵏⵖ ⵏ ⵓⵙⵖⵏ ⵏ ⵓⵎⴰⵔⴰⵢ ⴷ ⵉⵙⵖⵏⴰ ⵏ ⵜⵍⴰⵍⵉⵜ ⵏ ⵜⴰⵔⵡⴰ.')
        ]
      }
    ]
  },
  {
    id: 'cotisations',
    page: 'adhesion/cotisations.html',
    icon: 'fa-coins',
    heroIcon: 'fa-scale-balanced',
    image: 'assets/images/adhesion-cotisations.png',
    title: { fr: 'Cotisations', ar: 'الاشتراكات', zgh: 'ⵜⵉⵡⵙⵉⵡⵉⵏ' },
    eyebrow: { fr: 'Contribution mensuelle', ar: 'المساهمة الشهرية', zgh: 'ⵜⴰⵡⵙⵉⵡⵜ ⵜⴰⵢⵢⵓⵔⴰⵏⵜ' },
    summary: {
      fr: "Le montant de la cotisation mensuelle dépend de l'échelle ou du grade de l'adhérent.",
      ar: 'يعتمد مبلغ الاشتراك الشهري على السلم أو الدرجة الخاصة بالمنخرط.',
      zgh: 'ⴰⵎⵟⵟⵓⵏ ⵏ ⵜⴰⵡⵙⵉⵡⵜ ⵜⴰⵢⵢⵓⵔⴰⵏⵜ ⵉⵜⵜⵓⵙⵏ ⵙ ⵓⵙⴽⴰⵍⴰ ⵏⵖ ⵜⴰⴷⵔⴰⴷⵜ ⵏ ⵓⵎⵓⵏ.'
    },
    fees: [
      fee('Catégorie 1 : échelles 6 et 7', 'الفئة 1: السلمان 6 و7', 'ⵜⴰⴳⴳⴰⵢⵜ 1: ⵉⵙⴽⴰⵍⴰⵏ 6 ⴷ 7', '20,00 DH'),
      fee('Catégorie 2 : échelles 8 et 9', 'الفئة 2: السلمان 8 و9', 'ⵜⴰⴳⴳⴰⵢⵜ 2: ⵉⵙⴽⴰⵍⴰⵏ 8 ⴷ 9', '30,00 DH'),
      fee('Catégorie 3 : échelle 10', 'الفئة 3: السلم 10', 'ⵜⴰⴳⴳⴰⵢⵜ 3: ⴰⵙⴽⴰⵍⴰ 10', '45,00 DH'),
      fee('Catégorie 4 : échelle 11', 'الفئة 4: السلم 11', 'ⵜⴰⴳⴳⴰⵢⵜ 4: ⴰⵙⴽⴰⵍⴰ 11', '70,00 DH'),
      fee('Catégorie 5 : hors échelle, premier grade', 'الفئة 5: خارج السلم الدرجة الأولى', 'ⵜⴰⴳⴳⴰⵢⵜ 5: ⴱⵕⵕⴰ ⵏ ⵓⵙⴽⴰⵍⴰ ⵜⴰⴷⵔⴰⴷⵜ ⵜⴰⵎⵣⵡⴰⵔⵓⵜ', '100,00 DH'),
      fee('Catégorie 6 : hors échelle, grade principal', 'الفئة 6: خارج السلم الدرجة الرئيسية', 'ⵜⴰⴳⴳⴰⵢⵜ 6: ⴱⵕⵕⴰ ⵏ ⵓⵙⴽⴰⵍⴰ ⵜⴰⴷⵔⴰⴷⵜ ⵜⴰⵎⵇⵔⴰⵏⵜ', '120,00 DH')
    ]
  }
];
