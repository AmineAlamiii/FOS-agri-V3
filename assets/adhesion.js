(function () {
  const root = document.getElementById('adhesion-root');
  if (!root) return;

  const body = document.body;
  const html = document.documentElement;
  const supported = ['fr', 'ar', 'zgh'];
  const base = body.dataset.base || '';
  const overviewHeroImage = 'assets/images/adhesion-hero.png';
  let lang = getLang();

  const copy = {
    fr: {
      kicker: 'Adhésion',
      title: 'Adhérents et procédures',
      body: "Conditions d'adhésion, pièces à fournir et cotisations de la Fondation.",
      explore: 'Voir les rubriques',
      contact: 'Nous contacter',
      discover: 'Découvrir',
      back: 'Toutes les rubriques',
      details: 'Détails',
      overviewTitle: 'Adhésion',
      overviewBody: "Chaque rubrique dispose désormais de sa page dédiée, avec le contenu, les pièces et les informations associées.",
      documents: 'Documents à télécharger',
      download: 'Télécharger',
      monthly: 'Mensuel',
      orientationTitle: 'Besoin d’une orientation ?',
      orientationBody: 'Les équipes FOS-Agri sont là pour vous orienter.',
      orientationCta: 'Demander une orientation',
      relays: 'Relais régionaux'
    },
    ar: {
      kicker: 'الانخراط',
      title: 'المنخرطون والمساطر',
      body: 'شروط الانخراط، الوثائق المطلوبة، والاشتراكات الخاصة بالمؤسسة.',
      explore: 'عرض المحاور',
      contact: 'اتصل بنا',
      discover: 'اكتشف',
      back: 'كل المحاور',
      details: 'التفاصيل',
      overviewTitle: 'الانخراط',
      overviewBody: 'لكل محور صفحة مخصصة تتضمن المحتوى والوثائق والمعلومات المرتبطة به.',
      documents: 'الوثائق للتحميل',
      download: 'تحميل',
      monthly: 'شهريا',
      orientationTitle: 'هل تحتاج إلى توجيه؟',
      orientationBody: 'فرق FOS-Agri رهن إشارتكم لتوجيهكم.',
      orientationCta: 'طلب التوجيه',
      relays: 'المنسقون الجهويون'
    },
    zgh: {
      kicker: 'ⴰⵎⵓⵏ',
      title: 'ⵉⵎⵓⵏⵏ ⴷ ⵜⵎⵙⵙⴰⵔⵉⵏ',
      body: 'ⵜⵉⵡⵜⵜⴰⵙ ⵏ ⵓⵎⵓⵏ, ⵜⵉⴼⵔⴽⵉⵡⵉⵏ ⵉⵍⴰⵇⵏ, ⴷ ⵜⵉⵡⵙⵉⵡⵉⵏ ⵏ ⵜⵙⴷⴰⵡⵉⵜ.',
      explore: 'ⵥⵕ ⵜⵉⵙⴳⴰⵔ',
      contact: 'ⵎⵢⴰⵡⴰⵍ',
      discover: 'ⵙⵙⵏ',
      back: 'ⴽⵓ ⵜⵉⵙⴳⴰⵔ',
      details: 'ⵜⴰⵍⵇⴰⵢⵜ',
      overviewTitle: 'ⴰⵎⵓⵏ',
      overviewBody: 'ⴽⵓ ⵜⴰⵙⴳⴰ ⵜⴰⵍⵍⴰ ⴷⴰⵔⵙ ⵜⴰⵙⵏⴰ ⵏⵏⵙ ⵙ ⵓⴳⴱⵓⵔ, ⵜⵉⴼⵔⴽⵉⵡⵉⵏ ⴷ ⵉⵙⴰⵍⵍⵏ.',
      documents: 'ⵜⵉⴼⵔⴽⵉⵡⵉⵏ ⵏ ⵓⵙⴰⴷⴰⵔ',
      download: 'ⵙⴰⴷⴰⵔ',
      monthly: 'ⴽⵓ ⴰⵢⵢⵓⵔ',
      orientationTitle: 'ⵜⵔⵉⴷ ⴰⵙⵎⵓⵜⵜⴳ ?',
      orientationBody: 'ⵜⵉⵔⴱⴰⵜⵉⵏ ⵏ FOS-Agri ⵍⵍⴰⵏⵜ ⴷⵉⵏ ⴰⴷ ⴽⵏ ⵙⵎⵓⵜⵜⴳⵏⵜ.',
      orientationCta: 'ⵙⵙⵓⵜⵔ ⴰⵙⵎⵓⵜⵜⴳ',
      relays: 'ⵉⵎⵙⵏⴰⵡⵏ ⵉⵎⵏⴰⴹⵏ'
    }
  };

  const sections = [
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

  function card(id, icon, frTitle, arTitle, zghTitle, frBody, arBody, zghBody) {
    return {
      id,
      icon,
      title: { fr: frTitle, ar: arTitle, zgh: zghTitle },
      body: { fr: frBody, ar: arBody, zgh: zghBody }
    };
  }

  function item(fr, ar, zgh, href) {
    return { label: { fr, ar, zgh }, href };
  }

  function fee(fr, ar, zgh, amount) {
    return { label: { fr, ar, zgh }, amount };
  }

  function getLang() {
    let stored = null;
    try { stored = localStorage.getItem('fosagri-lang'); } catch (_) { stored = null; }
    return supported.includes(stored) ? stored : (supported.includes(html.lang) ? html.lang : 'fr');
  }

  function tr(value) {
    return value?.[lang] || value?.fr || '';
  }

  function t(key) {
    return copy[lang]?.[key] || copy.fr[key] || '';
  }

  function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  function url(path) {
    return `${base}${path}`;
  }

  function imageUrl(section) {
    return url(section.image);
  }

  function heroBackgroundUrl(section, detail) {
    const path = detail ? section.image : overviewHeroImage;
    return base ? url(path) : `../${path}`;
  }

  function currentSection() {
    const id = body.dataset.adhesionSection;
    return sections.find((section) => section.id === id) || sections[0];
  }

  function applyChrome(section) {
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    body.dataset.lang = lang;
    document.title = `FOS-Agri | ${tr(section?.title) || t('kicker')}`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', section ? tr(section.summary) : t('body'));
  }

  function hero(section, detail = false) {
    const active = section || sections[0];
    const heroBg = heroBackgroundUrl(active, detail);
    return `
      <section class="adhesion-detail-hero${detail ? ' is-detail' : ''}" style="--hero-image: url('${esc(heroBg)}')">
        <div class="container">
          <span class="page-kicker"><i class="fa-solid ${esc(active.heroIcon || 'fa-id-card')}" aria-hidden="true"></i> ${esc(detail ? tr(active.eyebrow) : t('kicker'))}</span>
          <h1>${esc(detail ? tr(active.title) : t('title'))}</h1>
          ${detail && !active.hideSummary ? `<p>${esc(tr(active.summary))}</p>` : ''}
          <div class="adhesion-hero-actions">
            <a class="btn btn-primary" href="${detail ? '#adhesion-detail-content' : '#adhesion-catalog'}">${esc(detail ? t('details') : t('explore'))}</a>
            <a class="btn btn-secondary" href="${detail ? url('adhesion.html') : 'contact.html'}">${esc(detail ? t('back') : t('contact'))}</a>
          </div>
        </div>
        <div class="adhesion-floating-icons" aria-hidden="true">
          ${sections.map((item) => `<span><i class="fa-solid ${esc(item.icon)}"></i></span>`).join('')}
        </div>
      </section>`;
  }

  function catalogCard(section) {
    return `
      <article class="adhesion-catalog-card">
        <a href="${esc(section.page)}">
          <span class="adhesion-catalog-media" style="--image: url('${esc(imageUrl(section))}')">
            <img src="${esc(imageUrl(section))}" alt="${esc(tr(section.title))}" loading="lazy" decoding="async" />
            <span><i class="fa-solid ${esc(section.icon)}" aria-hidden="true"></i></span>
          </span>
          <span class="adhesion-catalog-body">
            <small>${esc(tr(section.eyebrow))}</small>
            <strong>${esc(tr(section.title))}</strong>
            <span>${esc(tr(section.summary))}</span>
            <em>${esc(t('discover'))} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></em>
          </span>
        </a>
      </article>`;
  }

  function renderCatalog() {
    applyChrome(null);
    root.innerHTML = `
      ${hero(null, false)}
      <section class="section page-section-soft" id="adhesion-catalog">
        <div class="container">
          <div class="adhesion-section-head centered">
            <span class="section-tag"><i class="fa-solid fa-compass" aria-hidden="true"></i> FOS-Agri</span>
            <h2>${esc(t('overviewTitle'))}</h2>
          </div>
          <div class="adhesion-catalog-grid">
            ${sections.map(catalogCard).join('')}
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="adhesion-cta-panel">
            <div>
              <h2>${esc(t('orientationTitle'))}</h2>
              <p>${esc(t('orientationBody'))}</p>
            </div>
            <a class="btn btn-primary" href="contact.html">${esc(t('orientationCta'))}</a>
          </div>
        </div>
      </section>`;
  }

  function detailNav(active) {
    return `
      <section class="adhesion-detail-nav" aria-label="${esc(t('overviewTitle'))}">
        <div class="container adhesion-detail-nav-inner">
          ${sections.map((section) => `
            <a class="adhesion-nav-chip${section.id === active.id ? ' is-active' : ''}" href="${esc(url(section.page))}" ${section.id === active.id ? 'aria-current="page"' : ''}>
              <i class="fa-solid ${esc(section.icon)}" aria-hidden="true"></i>
              <span>${esc(tr(section.title))}</span>
            </a>`).join('')}
        </div>
      </section>`;
  }

  function renderAdherents(section) {
    return `
      <section class="section page-section-soft" id="adhesion-detail-content">
        <div class="container">
          <div class="adhesion-section-head">
            <span class="section-tag"><i class="fa-solid ${esc(section.icon)}" aria-hidden="true"></i> ${esc(tr(section.eyebrow))}</span>
            <h2>${esc(tr(section.title))}</h2>
            <p>${esc(tr(section.summary))}</p>
          </div>
          <div class="adhesion-feature-grid">
            ${section.cards.map((entry) => `
              <article class="adhesion-feature-card" id="${esc(entry.id)}">
                <span class="adhesion-card-icon"><i class="fa-solid ${esc(entry.icon)}" aria-hidden="true"></i></span>
                <h3>${esc(tr(entry.title))}</h3>
                <p>${esc(tr(entry.body))}</p>
              </article>`).join('')}
          </div>
        </div>
      </section>`;
  }

  function renderDocRow(entry) {
    return `
      <li>
        <span>${esc(tr(entry.label))}</span>
        ${entry.href ? `<a class="adhesion-download" href="${esc(url(entry.href))}" download><i class="fa-solid fa-download" aria-hidden="true"></i>${esc(t('download'))}</a>` : ''}
      </li>`;
  }

  function renderProcedure(section) {
    return `
      <section class="section page-section-soft" id="adhesion-detail-content">
        <div class="container">
          <div class="adhesion-section-head">
            <span class="section-tag"><i class="fa-solid ${esc(section.icon)}" aria-hidden="true"></i> ${esc(tr(section.eyebrow))}</span>
            <h2>${esc(tr(section.title))}</h2>
            ${section.hideSummary ? '' : `<p>${esc(tr(section.summary))}</p>`}
          </div>
          <div class="adhesion-procedure-grid">
            ${section.groups.map((group) => `
              <article class="adhesion-procedure-card" id="${esc(group.id)}">
                <span class="adhesion-card-icon"><i class="fa-solid ${esc(group.icon)}" aria-hidden="true"></i></span>
                <h3>${esc(tr(group.title))}</h3>
                ${group.intro ? `<p>${esc(tr(group.intro))}</p>` : ''}
                ${group.items.length ? `<ul class="adhesion-doc-list">${group.items.map(renderDocRow).join('')}</ul>` : ''}
                ${group.cta ? `<div class="adhesion-card-actions"><a class="btn btn-primary" href="${esc(url('contact.html'))}">${esc(t('orientationCta'))}</a></div>` : ''}
              </article>`).join('')}
          </div>
        </div>
      </section>`;
  }

  function renderCotisations(section) {
    return `
      <section class="section page-section-soft" id="adhesion-detail-content">
        <div class="container">
          <div class="adhesion-section-head">
            <span class="section-tag"><i class="fa-solid ${esc(section.icon)}" aria-hidden="true"></i> ${esc(tr(section.eyebrow))}</span>
            <h2>${esc(tr(section.title))}</h2>
            <p>${esc(tr(section.summary))}</p>
          </div>
          <div class="adhesion-fee-grid">
            ${section.fees.map((entry) => `
              <article class="adhesion-fee-card">
                <h3>${esc(tr(entry.label))}</h3>
                <div class="adhesion-fee-amount">
                  <small>${esc(t('monthly'))}</small>
                  <strong>${esc(entry.amount)}</strong>
                </div>
              </article>`).join('')}
          </div>
          <div class="adhesion-cta-panel">
            <div>
              <h2>${esc(t('orientationTitle'))}</h2>
              <p>${esc(t('orientationBody'))}</p>
            </div>
            <a class="btn btn-primary" href="${esc(url('contact.html'))}">${esc(t('contact'))}</a>
          </div>
        </div>
      </section>`;
  }

  function renderDetail() {
    const section = currentSection();
    applyChrome(section);
    const bodyHtml = section.cards ? renderAdherents(section) : (section.groups ? renderProcedure(section) : renderCotisations(section));
    root.innerHTML = `${hero(section, true)}${detailNav(section)}${bodyHtml}`;
  }

  function render() {
    lang = getLang();
    if (body.dataset.adhesionSection) renderDetail();
    else renderCatalog();
  }

  window.addEventListener('fosagri:lang-change', render);
  render();
})();
