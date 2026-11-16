/* ============================================================
 *  Histoire, mission et valeurs — data + renderer
 *  ------------------------------------------------------------
 *  Static (no backend) but designed to plug into a dashboard / CMS:
 *
 *    1. To override the data at build time, set
 *         window.FOSAGRI_TIMELINE_DATA = [...]
 *         window.FOSAGRI_VALUES_DATA   = [...]
 *       BEFORE this script is loaded (or before DOMContentLoaded).
 *
 *    2. To plug a future REST/CMS endpoint, replace the
 *       `loadTimeline()` / `loadValues()` async functions below
 *       with `fetch('/api/...')` calls. The render functions
 *       already handle loading/empty/error states.
 *
 *    3. Each entry uses translation keys (titleKey, textKey, ...)
 *       so the dashboard only stores stable IDs while the actual
 *       strings live in the I18N dictionary below — making the
 *       same data immediately multilingual.
 * ============================================================ */
(function () {
  'use strict';

  // ----- Supported languages (mirrors assets/secondary-pages.js) -----
  const SUPPORTED = ['fr', 'ar', 'zgh'];
  const DEFAULT_LANG = 'fr';

  function currentLang() {
    const html = document.documentElement.lang;
    if (SUPPORTED.includes(html)) return html;
    const stored = localStorage.getItem('fosagri-lang');
    return SUPPORTED.includes(stored) ? stored : DEFAULT_LANG;
  }

  // ============================================================
  // I18N DICTIONARY
  // Add new languages here and add their code to SUPPORTED above.
  // A missing key falls back to French, then to the raw key.
  // ============================================================
  const I18N = {
    fr: {
      'page.title': 'Histoire, mission et valeurs',
      'hero.kicker': 'Notre parcours',
      'hero.lead': "Depuis sa création, FOS-Agri œuvre au service des femmes et des hommes du secteur agricole. Découvrez les grandes étapes, notre mission et les valeurs qui guident notre action.",

      'sections.history.tag': 'Histoire',
      'sections.history.title': 'Les grandes étapes de FOS-Agri',
      'sections.history.intro': 'Une frise chronologique des moments fondateurs et des initiatives qui ont façonné la Fondation.',
      'sections.history.ariaTimeline': 'Chronologie FOS-Agri',

      'sections.mission.tag': 'Mission',
      'sections.mission.title': 'Notre mission',
      'sections.mission.paragraph1': "Depuis sa création, la mission de la FOS-Agri est d'améliorer les conditions de vie et de travail du personnel de Département de l'Agriculture et de favoriser leur épanouissement.",
      'sections.mission.paragraph2': "Cette mission est alimentée par la conviction intime, de l'ensemble des parties prenantes de la FOS-Agri, que les œuvres sociales constituent un levier fondamental dans la motivation du capital humain.",
      'sections.mission.paragraph3': "La volonté derrière cette création de la Fondation est de donner un nouvel élan aux œuvres sociales et de permettre au Département de marquer un saut qualitatif dans le développement de l'action sociale tout en favorisant les meilleures conditions pour l'épanouissement du personnel.",
      'sections.mission.quote': "« Une Fondation au service de la famille du Ministère de l'Agriculture. »",

      'sections.values.tag': 'Principes fondateurs',
      'sections.values.title': 'Une action guidée par quatre engagements',
      'sections.values.intro': "Les principes qui guident l'action sociale de la FOS-Agri.",

      'timeline.loading': 'Chargement de la chronologie…',
      'timeline.empty': "Aucune étape n'est disponible pour le moment.",
      'timeline.error': "Impossible de charger la chronologie.",
      'values.loading': 'Chargement…',
      'values.empty': "Aucune valeur n'est disponible pour le moment.",
      'values.intro.title': 'Nos valeurs',
      'values.intro.body': "Les valeurs constituent le socle de la culture de la Fondation et guident nos actions ainsi que nos interactions avec l’ensemble de nos parties prenantes. Portées chaque jour par nos collaborateurs, elles donnent du sens à notre action et renforcent la portée de notre mission.",
      'values.equity.title': 'Équité',
      'values.equity.desc': "L’équité garantit l’égalité des chances dans l’accès aux prestations pour l’ensemble des adhérents.",
      'values.service.title': 'Sens du service',
      'values.service.desc': 'Nous nous mobilisons pour fournir le meilleur service avec bienveillance, disponibilité et réactivité, tout en garantissant la continuité et l’accès à nos prestations.',
      'values.inclusion.title': 'Inclusion',
      'values.inclusion.desc': "Garantir l'accès aux prestations sociales à l'ensemble des agents actifs ou retraités du Département, indépendamment de leur grade, de leur genre, de leur région ou de leur fonction.",

      // Timeline content
      'timeline.2015_2017.1': 'Création de la FOS-Agri.',
      'timeline.2015_2017.2': 'Mise en place des organes de gouvernance.',
      'timeline.2015_2017.3': 'Lancement des prestations.',
      'timeline.2015_2017.4': 'Instauration des outils de gestion.',
      'timeline.2015_2017.5': 'Déploiement des prestations phares relatives de l\'AMC et de l\'AMTS.',
      'timeline.2015_2017.6': 'Mise en place du portail de la FOS-Agri.',

      'timeline.2018.1': 'Étude de l\'impact de l\'élargissement de l\'assiette des adhérents, incluant les retraités ainsi que le personnel des établissements sous-tutelle.',

      'timeline.2019.title': 'Ouverture et ancrage régional',
      'timeline.2019.1': 'Intégration des retraités.',
      'timeline.2019.2': 'Nomination des relais régionaux afin de garantir une coordination optimale à l\'échelle régionale.',
      'timeline.2019.3': 'Lancement de la plateforme E-services d\'adhésion et prestations sociales.',

      'timeline.2020.title': 'Adaptation et digitalisation',
      'timeline.2020.1': 'Adaptation de l\'offre à la situation sanitaire.',
      'timeline.2020.2': 'Lancement de l\'application FOSAGRI.',
      'timeline.2020.3': 'Déploiement de la communication digitale.',

      'timeline.2021.title': 'Élargissement et nouveaux crédits',
      'timeline.2021.1': 'Intégration de l\'ONSSA et l\'ONCA.',
      'timeline.2021.2': 'Lancement des crédits sociaux et de la bonification aux crédits de logement.',

      'timeline.2022.title': "Ouverture du Club de l'Agriculture",
      'timeline.2022.1': 'Mise à la disposition du club auprès de la FOS-Agri.',
      'timeline.2022.2': 'Ouverture du club.',
      'timeline.2022.3': 'Lancement de la plateforme E-services des prestations du club.',

      'timeline.2023.title': 'Nouvelles aides et partenariats',
      'timeline.2023.1': 'Mise en place de la nouvelle formule d\'aide au logement.',
      'timeline.2023.2': 'Ouverture du nouveau centre médical.',

      'timeline.2024.title': 'Enrichissement des prestations',
      'timeline.2024.1': 'Mise en place d\'un cadre de gouvernance afin de structurer les processus décisionnels.',
      'timeline.2024.2': 'Enrichissement du panier de l\'AMTS.',
      'timeline.2024.3': 'Mise en place de nouvelles prestations au niveau du centre médical.',

      'timeline.2025.1': 'Enrichissement de l\'offre AMC par l\'introduction d\'une nouvelle option.',
      'timeline.2025.2': 'Lancement du tournois « Génération Green ».',
      'timeline.2025.3': 'Organisation d\'un Camp Ado au profit des enfants des adhérents.',
      'timeline.2025.4': 'Déploiement de cours de soutien scolaire à distance.',
      'timeline.2025.5': 'Instauration d\'une subvention pour l\'accès aux infrastructures sportives de SONARGES.',
      'timeline.2025.6': 'Création d\'une nouvelle prestation : la « Bourse sociale ».',
      'timeline.2025.7': 'Restructurations du schéma directeur.',
      'timeline.2025.8': 'Mise à jour du manuel de procédures et de la cartographie des risques.',

      // Values
      'values.solidarity.title': 'Solidarité',
      'values.solidarity.desc': 'Agir ensemble au service de la famille FOS-Agri et de ses bénéficiaires.',
      'values.proximity.title': 'Proximité',
      'values.proximity.desc': 'Être à l\'écoute des adhérents, partout sur le territoire, grâce à nos relais régionaux.',
      'values.commitment.title': 'Engagement',
      'values.commitment.desc': "Un engagement constant pour la qualité, la fiabilité et l'impact social de nos prestations.",
      'values.innovation.title': 'Innovation',
      'values.innovation.desc': 'Moderniser sans cesse les prestations et les outils pour mieux servir.',
      'values.transparency.title': 'Transparence',
      'values.transparency.desc': 'Une gouvernance claire et une communication ouverte avec nos adhérents.',
      'values.excellence.title': 'Excellence',
      'values.excellence.desc': 'Viser le meilleur niveau de service, de gestion et de satisfaction des bénéficiaires.'
    },

    ar: {
      'page.title': 'التاريخ، المهمة والقيم',
      'hero.kicker': 'مسارنا',
      'hero.lead': 'منذ تأسيسها، تعمل FOS-Agri في خدمة نساء ورجال القطاع الفلاحي. اكتشفوا أبرز المحطات، مهمتنا والقيم التي توجه عملنا.',

      'sections.history.tag': 'التاريخ',
      'sections.history.title': 'أبرز محطات FOS-Agri',
      'sections.history.intro': 'تسلسل زمني للحظات المؤسِّسة والمبادرات التي شكّلت المؤسسة.',
      'sections.history.ariaTimeline': 'تسلسل زمني لـ FOS-Agri',

      'sections.mission.tag': 'المهمة',
      'sections.mission.title': 'مهمتنا',
      'sections.mission.paragraph1': "منذ إحداثها، تتمثل مهمة FOS-Agri في تحسين ظروف عيش وعمل موظفي قطاع الفلاحة والعمل على تحقيق ازدهارهم.",
      'sections.mission.paragraph2': "وتستمد هذه المهمة قوتها من القناعة الراسخة لدى جميع الأطراف المعنية بـ FOS-Agri بأن الأعمال الاجتماعية تشكل رافعة أساسية لتحفيز الرأسمال البشري.",
      'sections.mission.paragraph3': "وتتمثل الإرادة الكامنة وراء إحداث هذه المؤسسة في إعطاء نفس جديد للأعمال الاجتماعية وتمكين القطاع من تحقيق نقلة نوعية في تطوير العمل الاجتماعي، مع توفير أفضل الظروف لازدهار الموظفين.",
      'sections.mission.quote': '«مؤسسة في خدمة أسرة وزارة الفلاحة.»',

      'sections.values.tag': 'مبادئ مؤسِّسة',
      'sections.values.title': 'عملنا يرتكز على أربعة التزامات',
      'sections.values.intro': 'المبادئ التي توجه العمل الاجتماعي لمؤسسة FOS-Agri.',

      'timeline.loading': 'جارٍ تحميل التسلسل الزمني…',
      'timeline.empty': 'لا توجد محطات متاحة حالياً.',
      'timeline.error': 'تعذّر تحميل التسلسل الزمني.',
      'values.loading': 'جارٍ التحميل…',
      'values.empty': 'لا توجد قيم متاحة حالياً.',
      'values.intro.title': 'قيمنا',
      'values.intro.body': 'القيم هي المكونات الأساسية لثقافة المؤسسة، وهي التي توجه أعمالنا وتفاعلاتنا مع مختلف الأطراف المعنية.',
      'values.equity.title': 'الإنصاف',
      'values.equity.desc': 'يرتبط الإنصاف بتكافؤ الفرص من حيث الولوج إلى الخدمات لفائدة جميع المنخرطين.',
      'values.service.title': 'روح الخدمة',
      'values.service.desc': 'نحن معبؤون لضمان خدمة يقظة ونافعة وسريعة التفاعل، مع الاستمرارية وجودة الخدمات.',
      'values.inclusion.title': 'الإدماج',
      'values.inclusion.desc': 'ضمان الولوج إلى الخدمات الاجتماعية لجميع المنخرطين، بغض النظر عن الدرجة أو النوع أو الجهة أو الوظيفة.',

      'timeline.2015_2017.1': 'إحداث مؤسسة FOS-Agri.',
      'timeline.2015_2017.2': 'إرساء أجهزة الحكامة.',
      'timeline.2015_2017.3': 'إطلاق الخدمات.',
      'timeline.2015_2017.4': 'اعتماد أدوات التدبير.',
      'timeline.2015_2017.5': 'تعميم الخدمات الرئيسية المتعلقة بالتأمين الصحي التكميلي (AMC) والمساعدة الطبية والنقل الصحي (AMTS).',
      'timeline.2015_2017.6': 'إطلاق البوابة الإلكترونية لـ FOS-Agri.',

      'timeline.2018.1': 'دراسة أثر توسيع قاعدة المنخرطين لتشمل المتقاعدين وموظفي المؤسسات الخاضعة للوصاية.',

      'timeline.2019.title': 'الانفتاح والتجذّر الجهوي',
      'timeline.2019.1': 'إدماج المتقاعدين.',
      'timeline.2019.2': 'تعيين المنسقين الجهويين لضمان تنسيق أمثل على المستوى الجهوي.',
      'timeline.2019.3': 'إطلاق منصة الخدمات الإلكترونية للانخراط والخدمات الاجتماعية.',

      'timeline.2020.title': 'التكيّف والرقمنة',
      'timeline.2020.1': 'ملاءمة العرض مع الوضعية الصحية.',
      'timeline.2020.2': 'إطلاق تطبيق FOSAGRI.',
      'timeline.2020.3': 'تعزيز التواصل الرقمي.',

      'timeline.2021.title': 'توسيع المنخرطين وقروض اجتماعية جديدة',
      'timeline.2021.1': 'إدماج ONSSA وONCA.',
      'timeline.2021.2': 'إطلاق القروض الاجتماعية ودعم فوائد قروض السكن.',

      'timeline.2022.title': 'افتتاح نادي الفلاحة',
      'timeline.2022.1': 'وضع النادي رهن إشارة FOS-Agri.',
      'timeline.2022.2': 'افتتاح النادي.',
      'timeline.2022.3': 'إطلاق منصة الخدمات الإلكترونية لخدمات النادي.',

      'timeline.2023.title': 'مساعدات وشراكات جديدة',
      'timeline.2023.1': 'اعتماد الصيغة الجديدة للمساعدة على السكن.',
      'timeline.2023.2': 'افتتاح المركز الطبي الجديد.',

      'timeline.2024.title': 'إثراء الخدمات',
      'timeline.2024.1': 'إرساء إطار للحكامة من أجل هيكلة مسارات اتخاذ القرار.',
      'timeline.2024.2': 'إثراء سلة خدمات المساعدة الطبية والنقل الصحي (AMTS).',
      'timeline.2024.3': 'إرساء خدمات جديدة بالمركز الطبي.',

      'timeline.2025.1': 'إثراء عرض التأمين الصحي التكميلي (AMC) بإدراج خيار جديد.',
      'timeline.2025.2': 'إطلاق دوري « Génération Green ».',
      'timeline.2025.3': 'تنظيم مخيم لليافعين لفائدة أبناء المنخرطين.',
      'timeline.2025.4': 'اعتماد دروس الدعم المدرسي عن بعد.',
      'timeline.2025.5': 'إحداث دعم مالي للولوج إلى المنشآت الرياضية التابعة لـ SONARGES.',
      'timeline.2025.6': 'إحداث خدمة جديدة: « المنحة الاجتماعية ».',
      'timeline.2025.7': 'إعادة هيكلة المخطط المديري.',
      'timeline.2025.8': 'تحيين دليل المساطر وخريطة المخاطر.',

      'values.solidarity.title': 'التضامن',
      'values.solidarity.desc': 'العمل الجماعي في خدمة أسرة FOS-Agri ومستفيديها.',
      'values.proximity.title': 'القُرب',
      'values.proximity.desc': 'الإنصات إلى المنخرطين في كل التراب الوطني عبر منسقينا الجهويين.',
      'values.commitment.title': 'الالتزام',
      'values.commitment.desc': 'التزام دائم بالجودة والموثوقية والأثر الاجتماعي لخدماتنا.',
      'values.innovation.title': 'الابتكار',
      'values.innovation.desc': 'تحديث مستمر للخدمات والأدوات من أجل خدمة أفضل.',
      'values.transparency.title': 'الشفافية',
      'values.transparency.desc': 'حكامة واضحة وتواصل منفتح مع منخرطينا.',
      'values.excellence.title': 'الامتياز',
      'values.excellence.desc': 'بلوغ أعلى مستويات الخدمة والتدبير ورضى المستفيدين.'
    },

    zgh: {
      'page.title': 'ⴰⵎⵣⵔⵓⵢ, ⵜⴰⵎⴰⵙⵜ ⴷ ⵉⵎⴰⵙⵙⴰⵏ',
      'hero.kicker': 'ⴰⴱⵔⵉⴷ ⵏⵏⵖ',
      'hero.lead': 'ⵙⴳ ⵓⵙⵏⵓⵍⴼⵓ ⵏⵏⵙ, ⵜⵙⵙⵎⵔⵙ FOS-Agri ⵉ ⵜⵉⵙⴷⵎⵜ ⵏ ⵉⵡⴷⴰⵏ ⵏ ⵜⴼⵍⵍⴰⵃⵜ.',

      'sections.history.tag': 'ⴰⵎⵣⵔⵓⵢ',
      'sections.history.title': 'ⵉⵎⴰⵏⴰⵔⵏ ⵎⵇⵇⵓⵔⵏⵉⵏ ⵏ FOS-Agri',
      'sections.history.intro': 'ⴰⵙⴰⵔⵙⵉⵙ ⵏ ⵜⴼⵔⴽⵉⵡⵉⵏ ⵉⵙⵏⵓⵍⴼⵉⵏ ⵜⴰⵎⵙⵙⵓⵔⵜ.',
      'sections.history.ariaTimeline': 'ⴰⵙⴰⵔⵙⵉⵙ ⴰⵎⵣⵔⵓⵢⴰⵏ ⵏ FOS-Agri',

      'sections.mission.tag': 'ⵜⴰⵎⴰⵙⵜ',
      'sections.mission.title': 'ⵜⴰⵎⴰⵙⵜ ⵏⵏⵖ',
      'sections.mission.paragraph1': "ⵙⴳ ⵓⵙⵏⵓⵍⴼⵓ ⵏⵏⵙ, ⵜⴰⵡⵓⵔⵉ ⵏ FOS-Agri ⵜⴳⴰ ⴰⵙⵖⵓⴷⵓ ⵏ ⵜⵙⴰⴳⴰⵡⵉⵏ ⵏ ⵜⵓⴷⵔⵜ ⴷ ⵜⵡⵓⵔⵉ ⵏ ⵉⵎⵙⵡⵓⵔⵉⵢⵏ ⵏ ⵓⴳⵣⵣⵓⵎ ⵏ ⵜⴼⵍⴰⵃⵜ ⴷ ⵓⵙⵎⵖⵓⵔ ⵏ ⵓⴼⵓⵍⴽⵉ ⵏⵏⵙⵏ.",
      'sections.mission.paragraph2': "ⵜⴰⵡⵓⵔⵉ ⴰⴷ ⵜⵜⵓⵙⵙⵏⵓⵔⵏⵓⵏⵜ ⵙ ⵓⵎⵓⵔⵙ ⴰⵏⵖⴰⵍ ⵏ ⴽⵓⵍⵍⵓ ⵉⵎⵙⵓⵔⴰⵏ ⵏ FOS-Agri ⵙ ⵉⵙ ⵉⴳⵓⵍⵏ ⵉⵏⵎⴰⵍⴰⵏ ⴳⴰⵏ ⴰⵙⴳⵓⵎⵎⵉ ⴰⴷⵙⵍⴰⵏ ⴳ ⵓⵙⵙⵏⵓⵔⵏⵓ ⵏ ⵓⵔⴰⵙⵎⴰⵍ ⴰⵏⴼⴳⴰⵏ.",
      'sections.mission.paragraph3': "ⴰⵙⵏⵓⵍⴼⵓ ⵏ ⵜⵙⴷⴰⵡⵉⵜ ⴰⴷ ⵉⵙⵙⵉⵡⵙ ⴰⴷ ⵢⴰⴼⴽ ⵜⵓⴷⵔⵜ ⵜⴰⵎⴰⵢⵏⵓⵜ ⵉ ⵉⴳⵓⵍⵏ ⵉⵏⵎⴰⵍⴰⵏ ⴷ ⴰⴷ ⵢⴰⵊⵊ ⴰⴳⵣⵣⵓⵎ ⴰⴷ ⵉⵙⴽⵔ ⴰⵙⵓⵔⴼ ⴰⵎⵇⵇⵔⴰⵏ ⴳ ⵓⵙⵏⴼⵍⵓⵍ ⵏ ⵜⵡⵓⵔⵉ ⵜⴰⵏⵎⴰⵍⴰⵏⵜ, ⵙ ⵓⵙⵡⵊⴷ ⵏ ⵜⵙⴰⴳⴰⵡⵉⵏ ⵉⴼⵓⵍⴽⵉⵏ ⵉ ⵓⵙⵎⵖⵓⵔ ⵏ ⵉⵎⵙⵡⵓⵔⵉⵢⵏ.",
      'sections.mission.quote': '« ⵜⴰⵎⵙⵙⵓⵔⵜ ⵉ ⵜⴰⵡⵊⴰ ⵏ ⵜⵎⴰⵡⴰⵙⵜ ⵏ ⵜⴼⵍⵍⴰⵃⵜ. »',

      'sections.values.tag': 'ⵉⵎⴰⵡⵓⵜⵏ ⵉⵙⵙⴰⵙⵏ',
      'sections.values.title': 'ⵜⵉⴳⴰⵡⵜ-ⵏⵏⴻⵖ ⵜⴻⵜⵜⵓⵙⵙⴻⵏⴷ ⵖⴼ ⴽⵕⴰⴹ ⵉⵎⴰⵏⵙⵏ',
      'sections.values.intro': 'ⵉⵎⴰⵡⵓⵜⵏ ⵉ ⵙⵙⵏⴰⵏ ⵜⵉⴳⴰⵡⵜ ⵜⴰⵏⵎⴻⵜⵜⵉⵜ ⵏ FOS-Agri.',

      'timeline.loading': 'ⴰⵙⴰⵍⵉ…',
      'timeline.empty': 'ⵓⵔ ⵍⵍⵉⵏ ⵉⵎⴰⵏⴰⵔⵏ ⴰⵙⵙⴰ.',
      'timeline.error': 'ⵓⵔ ⵉⵣⵎⵉⵔ ⵓⵙⴰⵍⵉ ⵏ ⵓⵙⴰⵔⵙⵉⵙ.',
      'values.loading': 'ⴰⵙⴰⵍⵉ…',
      'values.empty': 'ⵓⵔ ⵍⵍⵉⵏ ⵉⵎⴰⵙⵙⴰⵏ ⴰⵙⵙⴰ.',
      'values.intro.title': 'ⵜⵉⵏⵉⵍⴰ',
      'values.intro.body': 'ⵜⵉⵏⵉⵍⴰ ⴷ ⵉⴳⵔⴰⵏ ⵉⵙⵙⴰⵙⵏ ⵏ ⵜⴷⵍⵙⴰ ⵏ ⵜⵎⵙⵙⵓⴷⵙⵜ, ⵜⴻⵏⵏⴰ ⴷ ⵜⵙⵙⵏⵓⵔⴰ ⵉ ⵜⵉⴳⴰⵡⵉⵏ-ⵏⵏⴻⵖ ⴷ ⵉⵎⵢⴰⵡⴰⵙⵏ-ⵏⵏⴻⵖ.',
      'values.equity.title': 'ⵜⴰⵏⴱⴰⴹⵜ',
      'values.equity.desc': 'ⵜⴰⵏⴱⴰⴹⵜ ⵜⵉⴳⵉ ⴷ ⵜⴰⵎⴰⴳⴷⴰⵍⵜ ⵏ ⵜⴼⵓⵔⵙⵉⵏ ⴷⴻⴳ ⵓⵍⵓⵣⵣⵓⵎ ⵖⵔ ⵜⵉⵏⴼⴰ ⵉ ⵎⴻⵔⵔⴰ ⵉⵎⵓⵏⵏ.',
      'values.service.title': 'ⴰⵙⵙⴰⵙ ⵏ ⵜⵏⴼⴰ',
      'values.service.desc': 'ⵏⴻⵜⵜⵎⵓⵙ ⴰⴷ ⵏⴼⴽ ⵜⴰⵍⵍⴰⵍⵜ ⵜⴰⵎⴻⵙⴱⵕⵉⴷⵜ ⴷ ⵜⴰⵎⴻⵣⴹⴰⵢⵜ, ⵜⴻⴱⴷⴰ ⵙⴳ ⵉⵙⵕⴰ ⵉⵎⵓⵏⵏ.',
      'values.inclusion.title': 'ⵜⴰⵎⴰⵙⵙⵓⵜ',
      'values.inclusion.desc': 'ⴰⴷ ⵏⵙⵃⴻⴱⴱⴻⵜ ⴰⴷ ⵜⵉⵍⵍⵉ ⵜⴰⵎⴰⴳⴷⴰⵍⵜ ⴷⴻⴳ ⵓⵍⵓⵣⵣⵓⵎ ⵖⵔ ⵜⵉⵏⴼⴰ ⵉ ⵎⴻⵔⵔⴰ ⵉⵎⵓⵏⵏ.',

      'timeline.2015_2017.1': 'ⴰⵙⵏⵓⵍⴼⵓ ⵏ FOS-Agri.',
      'timeline.2015_2017.2': 'ⴰⵙⵔⵙ ⵏ ⵉⵎⵙⵙⵓⴳⴰⵍ ⵏ ⵜⵏⴱⴰⴹⵜ.',
      'timeline.2015_2017.3': 'ⴰⵙⵏⵜⵉ ⵏ ⵉⵎⴰⵍⴰⵙⵙⵏ.',
      'timeline.2015_2017.4': 'ⴰⵙⵔⵙ ⵏ ⵉⵎⴰⵙⵙ ⵏ ⵓⵙⵡⵓⴷⴷⵓ.',
      'timeline.2015_2017.5': 'ⴰⵙⵎⵔⵙ ⵏ ⵉⵎⴰⵍⴰⵙⵙⵏ ⵉⵎⵇⵇⵔⴰⵏⵏ ⵏ AMC ⴷ AMTS.',
      'timeline.2015_2017.6': 'ⴰⵙⵔⵙ ⵏ ⵓⵙⵉⵜ ⴰⵍⵉⴽⵜⵔⵓⵏⵉ ⵏ FOS-Agri.',

      'timeline.2018.1': 'ⴰⵏⴰⴷ ⵖⴼ ⵜⵉⵢⵉⵜ ⵏ ⵓⵙⵎⵖⵔ ⵏ ⵓⵎⴹⴰⵏ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ, ⵙ ⵓⵙⴽⵛⵎ ⵏ ⵉⵎⴷⴽⴽⵯⴰⵍⵏ ⴷ ⵉⵎⵙⵡⵓⵔⵉⵢⵏ ⵏ ⵜⵉⵎⵙⵙⵉⵡⵉⵏ ⴷⴷⴰⵡ ⵓⵙⵏⴼⵍ.',

      'timeline.2019.title': 'ⴰⵔⵣⵣⵓ ⴷ ⵜⵎⵏⴰⴹⵜ',
      'timeline.2019.1': 'ⴰⵙⴽⵛⵎ ⵏ ⵉⵎⴷⴽⴽⵯⴰⵍⵏ.',
      'timeline.2019.2': 'ⴰⵙⵙⵓⴷⵙ ⵏ ⵉⵎⵙⵏⴰⵡⵏ ⵉⵎⵏⴰⴹⵏ ⴰⴼⴰⴷ ⴰⴷ ⵉⵍⵉ ⵓⵙⵎⵙⴰⵙⴰ ⵉⴼⵓⵍⴽⵉⵏ ⴳ ⵓⵙⵡⵉⵔ ⴰⵎⵏⴰⴹ.',
      'timeline.2019.3': 'ⴰⵙⵏⵜⵉ ⵏ ⵜⵖⵍⴰⵢⵜ ⵏ ⵉⵎⴰⵍⴰⵙⵙⵏ ⵉⵍⵉⴽⵜⵔⵓⵏⵉⵢⵏ ⵏ ⵓⵎⵓⵏ ⴷ ⵉⵎⴰⵍⴰⵙⵙⵏ ⵉⵏⵎⴰⵍⴰⵏ.',

      'timeline.2020.title': 'ⴰⵎⵙⴰⵙⴰ ⴷ ⵓⵙⴷⴷⵉⵇ ⴰⵎⵓⵟⵟⵓⵏ',
      'timeline.2020.1': 'ⴰⵎⵙⴰⵙⴰ ⵏ ⵓⵙⵓⴼⵖ ⴷ ⵜⵡⴰⵍⵜ ⵜⴰⴷⵓⵙⴰⵏⵜ.',
      'timeline.2020.2': 'ⴰⵙⵏⵜⵉ ⵏ ⵓⵙⵏⵙ FOSAGRI.',
      'timeline.2020.3': 'ⴰⵙⵎⵔⵙ ⵏ ⵓⵎⵢⴰⵡⴰⴹ ⴰⵏⵓⵎⴰⵏ.',

      'timeline.2021.title': 'ⴰⵙⵎⴳⴳⵔ ⴷ ⵉⵏⴹⴹⴰⴹⵏ ⵉⵎⴰⵢⵏⵓⵜⵏ',
      'timeline.2021.1': 'ⴰⵙⴽⵛⵎ ⵏ ONSSA ⴷ ONCA.',
      'timeline.2021.2': 'ⴰⵙⵏⵜⵉ ⵏ ⵉⵔⴹⴰⵍⵏ ⵉⵏⵎⴰⵍⴰⵏ ⴷ ⵓⵎⵓⴷⴷⵓ ⵏ ⵉⵔⴹⴰⵍⵏ ⵏ ⵓⵙⵖⵉⵎ.',

      'timeline.2022.title': 'ⴰⵔⵣⵣⵓ ⵏ ⵓⴽⵍⵓⴱ ⵏ ⵜⴼⵍⵍⴰⵃⵜ',
      'timeline.2022.1': 'ⴰⵙⵙⵓⴼⵖ ⵏ ⴽⵍⵓⴱ ⵖⵔ FOS-Agri.',
      'timeline.2022.2': 'ⴰⵕⵥⵥⵓⵎ ⵏ ⴽⵍⵓⴱ.',
      'timeline.2022.3': 'ⴰⵙⵏⵜⵉ ⵏ ⵜⵖⵍⴰⵢⵜ ⵏ ⵉⵎⴰⵍⴰⵙⵙⵏ ⵉⵍⵉⴽⵜⵔⵓⵏⵉⵢⵏ ⵏ ⴽⵍⵓⴱ.',

      'timeline.2023.title': 'ⵜⴰⵏⴰⴼⵓⵜ ⴷ ⵉⵎⵎⴰⵏⴽⵏ ⵉⵎⴰⵢⵏⵓⵜⵏ',
      'timeline.2023.1': 'ⴰⵙⵔⵙ ⵏ ⵜⵍⵖⴰ ⵜⴰⵎⴰⵢⵏⵓⵜ ⵏ ⵜⵡⵉⵙⵉ ⵏ ⵓⵙⵖⵉⵎ.',
      'timeline.2023.2': 'ⴰⵕⵥⵥⵓⵎ ⵏ ⵓⵎⵔⴽⴰⵣ ⴰⴷⵓⵙⴰⵏ ⴰⵎⴰⵢⵏⵓ.',

      'timeline.2024.title': 'ⴰⵙⵎⵓⵟⵟⵓⵏ ⵏ ⵜⵏⴼⴰⵙ',
      'timeline.2024.1': 'ⴰⵙⵔⵙ ⵏ ⵓⵙⴳⴰ ⵏ ⵜⵏⴱⴰⴹⵜ ⴰⴼⴰⴷ ⴰⴷ ⵜⵜⵓⵙⵎⵓⵜⵜⴳⵏ ⵉⴱⵔⵉⴷⵏ ⵏ ⵜⴳⵜⵜⵓⵔⵉⵡⵉⵏ.',
      'timeline.2024.2': 'ⴰⵙⵎⵓⵟⵟⵓⵏ ⵏ ⵉⵙⴱⵉⵃⵏ ⵏ AMTS.',
      'timeline.2024.3': 'ⴰⵙⵔⵙ ⵏ ⵉⵎⴰⵍⴰⵙⵙⵏ ⵉⵎⴰⵢⵏⵓⵜⵏ ⴳ ⵓⵎⵔⴽⴰⵣ ⴰⴷⵓⵙⴰⵏ.',

      'timeline.2025.1': 'ⴰⵙⵎⵓⵟⵟⵓⵏ ⵏ ⵓⵙⵓⴼⵖ ⵏ AMC ⵙ ⵓⵙⴽⵛⵎ ⵏ ⵓⴼⵔⴰⵏ ⴰⵎⴰⵢⵏⵓ.',
      'timeline.2025.2': 'ⴰⵙⵏⵜⵉ ⵏ ⵓⵎⵙⵓⵏⴳⵎ « Génération Green ».',
      'timeline.2025.3': 'ⴰⵙⵓⴷⵙ ⵏ ⵓⵎⵅⵉⵢⵎ ⵏ ⵉⵎⵥⵥⵢⴰⵏⵏ ⵉ ⵜⴰⵔⵡⴰ ⵏ ⵉⵎⵏⵅⵔⴰⵟⵏ.',
      'timeline.2025.4': 'ⴰⵙⵎⵔⵙ ⵏ ⵜⵖⵓⵔⵉ ⵏ ⵓⵎⵓⴷⴷⵓ ⴰⵙⵍⵎⴰⴷ ⵙ ⵓⴳⴳⵓⴳ.',
      'timeline.2025.5': 'ⴰⵙⵔⵙ ⵏ ⵜⵡⵉⵙⵉ ⵜⴰⴷⵔⵉⵎⵜ ⵉ ⵓⴽⵛⵛⵓⵎ ⵖⵔ ⵉⵙⵓⵔⴰ ⵏ ⵓⴷⴰⴷⴷⵓⵙ ⵏ SONARGES.',
      'timeline.2025.6': 'ⴰⵙⵏⵓⵍⴼⵓ ⵏ ⵜⵏⴼⵍⵉⵜ ⵜⴰⵎⴰⵢⵏⵓⵜ : « ⵜⴰⵎⵓⴷⴰ ⵜⴰⵏⴰⵎⵓⵏⵜ ».',
      'timeline.2025.7': 'ⴰⵙⵎⵓⵜⵜⴳ ⵏ ⵓⵙⵖⵡⵙ ⴰⵎⵏⴰⵖ.',
      'timeline.2025.8': 'ⴰⵙⵎⴰⵢⵏⵓ ⵏ ⵓⴷⵍⵉⵙ ⵏ ⵜⵎⵙⵙⴰⵔⵉⵏ ⴷ ⵜⴽⴰⵕⴹⴰ ⵏ ⵉⵎⵙⵓⴳⴳⵔⵏ.',

      'values.solidarity.title': 'ⵜⵉⵎⵓⵏⵉ',
      'values.solidarity.desc': 'ⴰⵅⴷⴷⴰⵎ ⴰⵙⵎⵓⵏⴰⵏ ⵉ ⵜⴰⵡⵊⴰ FOS-Agri.',
      'values.proximity.title': 'ⴰⵎⵣⵡⴰⵔⵓ',
      'values.proximity.desc': 'ⴰⵙⴼⵍⴷ ⵉ ⵉⵎⵎⵓⵏⵏ ⴳ ⴰⴽⴽⵯ ⴰⵎⵏⴰⴹ.',
      'values.commitment.title': 'ⴰⵎⵎⵉⴽⵙ',
      'values.commitment.desc': 'ⴰⵎⵎⵉⴽⵙ ⵉ ⵜⴰⵙⴽⴰ ⴷ ⵓⵏⴰⴼⵍⵍⴰ ⴰⵏⴰⵎⵓⵏ.',
      'values.innovation.title': 'ⴰⵙⵏⵓⵍⴼⵓ',
      'values.innovation.desc': 'ⴰⵙⵎⴰⵢⵏⵓ ⴰⵎⴰⵔⵙ ⵏ ⵜⵏⴼⴰⵙ ⴷ ⵉⵙⵏⵙⵙⴰⵍ.',
      'values.transparency.title': 'ⵜⴰⵙⴼⵉⴼⵉⵏⵜ',
      'values.transparency.desc': 'ⵜⴰⴳⵓⵔⵉ ⵉⵍⴰⵏ ⴷ ⵓⵎⵢⴰⵡⴰⴹ ⴰⵔⵎⵎⴰⴷ.',
      'values.excellence.title': 'ⴰⵏⴰⴼⵍⵍⴰ',
      'values.excellence.desc': 'ⴰⵏⴰⵎⵎⴰⵙ ⵏ ⵓⵙⵡⵉⵔ ⵉⴼⵍⴰⵏ ⵏ ⵜⵏⴼⴰⵙ ⴷ ⵜⵙⵏⴱⴹⴰⵏⵜ.'
    }
  };

  function t(key, lang) {
    const l = lang || currentLang();
    return (I18N[l] && I18N[l][key]) || I18N[DEFAULT_LANG][key] || key;
  }

  // ============================================================
  // DEFAULT DATA — replace by overriding window.FOSAGRI_TIMELINE_DATA
  // / window.FOSAGRI_VALUES_DATA before this script runs, or by
  // adapting loadTimeline()/loadValues() into fetch() calls.
  //
  // SHAPE (Timeline):
  //   {
  //     id:       string  – stable identifier (used by CMS as primary key)
  //     year:     string  – display label of the badge ("2015")
  //     order:    number  – ascending sort order
  //     isActive: boolean – false => entry is skipped at render time
  //     titleKey: string  – i18n key for the card title (optional)
  //     icon:     string  – Font Awesome class (optional)
  //     items: [{ id, textKey }] – bullet list (textKey resolved via I18N)
  //   }
  //
  // SHAPE (Values):
  //   {
  //     id:      string
  //     order:   number
  //     isActive:boolean
  //     icon:    string  – Font Awesome class
  //     titleKey:string
  //     descKey: string
  //   }
  // ============================================================
  /* Cartes sans titre (2015-2017, 2018, 2020, 2025) : titleKey omis, le gabarit
     n'affiche alors que l'année et la liste. */
  const DEFAULT_TIMELINE = [
    {
      id: '2015-2017', year: '2015-2017', order: 1, isActive: true, icon: 'fa-solid fa-seedling',
      items: [
        { id: '2015-2017-1', textKey: 'timeline.2015_2017.1' },
        { id: '2015-2017-2', textKey: 'timeline.2015_2017.2' },
        { id: '2015-2017-3', textKey: 'timeline.2015_2017.3' },
        { id: '2015-2017-4', textKey: 'timeline.2015_2017.4' },
        { id: '2015-2017-5', textKey: 'timeline.2015_2017.5' },
        { id: '2015-2017-6', textKey: 'timeline.2015_2017.6' }
      ]
    },
    {
      id: '2018', year: '2018', order: 2, isActive: true, icon: 'fa-solid fa-magnifying-glass-chart',
      items: [
        { id: '2018-1', textKey: 'timeline.2018.1' }
      ]
    },
    {
      id: '2019', year: '2019', order: 3, isActive: true, icon: 'fa-solid fa-users-line',
      titleKey: 'timeline.2019.title',
      items: [
        { id: '2019-1', textKey: 'timeline.2019.1' },
        { id: '2019-2', textKey: 'timeline.2019.2' },
        { id: '2019-3', textKey: 'timeline.2019.3' }
      ]
    },
    {
      id: '2020', year: '2020', order: 4, isActive: true, icon: 'fa-solid fa-mobile-screen',
      titleKey: 'timeline.2020.title',
      items: [
        { id: '2020-1', textKey: 'timeline.2020.1' },
        { id: '2020-2', textKey: 'timeline.2020.2' },
        { id: '2020-3', textKey: 'timeline.2020.3' }
      ]
    },
    {
      id: '2021', year: '2021', order: 5, isActive: true, icon: 'fa-solid fa-building-columns',
      titleKey: 'timeline.2021.title',
      items: [
        { id: '2021-1', textKey: 'timeline.2021.1' },
        { id: '2021-2', textKey: 'timeline.2021.2' }
      ]
    },
    {
      id: '2022', year: '2022', order: 6, isActive: true, icon: 'fa-solid fa-mug-saucer',
      titleKey: 'timeline.2022.title',
      items: [
        { id: '2022-1', textKey: 'timeline.2022.1' },
        { id: '2022-2', textKey: 'timeline.2022.2' },
        { id: '2022-3', textKey: 'timeline.2022.3' }
      ]
    },
    {
      id: '2023', year: '2023', order: 7, isActive: true, icon: 'fa-solid fa-house-medical',
      titleKey: 'timeline.2023.title',
      items: [
        { id: '2023-1', textKey: 'timeline.2023.1' },
        { id: '2023-2', textKey: 'timeline.2023.2' }
      ]
    },
    {
      id: '2024', year: '2024', order: 8, isActive: true, icon: 'fa-solid fa-star',
      titleKey: 'timeline.2024.title',
      items: [
        { id: '2024-1', textKey: 'timeline.2024.1' },
        { id: '2024-2', textKey: 'timeline.2024.2' },
        { id: '2024-3', textKey: 'timeline.2024.3' }
      ]
    },
    {
      id: '2025', year: '2025', order: 9, isActive: true, icon: 'fa-solid fa-trophy',
      items: [
        { id: '2025-1', textKey: 'timeline.2025.1' },
        { id: '2025-2', textKey: 'timeline.2025.2' },
        { id: '2025-3', textKey: 'timeline.2025.3' },
        { id: '2025-4', textKey: 'timeline.2025.4' },
        { id: '2025-5', textKey: 'timeline.2025.5' },
        { id: '2025-6', textKey: 'timeline.2025.6' },
        { id: '2025-7', textKey: 'timeline.2025.7' },
        { id: '2025-8', textKey: 'timeline.2025.8' }
      ]
    }
  ];

  const DEFAULT_VALUES = [
    { id: 'equite',    order: 1, isActive: true, icon: 'fa-solid fa-scale-balanced',    titleKey: 'values.equity.title',    descKey: 'values.equity.desc' },
    { id: 'proximite', order: 2, isActive: true, icon: 'fa-solid fa-location-dot',       titleKey: 'values.proximity.title', descKey: 'values.proximity.desc' },
    { id: 'service',   order: 3, isActive: true, icon: 'fa-solid fa-hand-holding-heart', titleKey: 'values.service.title',   descKey: 'values.service.desc' },
    { id: 'inclusion', order: 4, isActive: true, icon: 'fa-solid fa-handshake',          titleKey: 'values.inclusion.title', descKey: 'values.inclusion.desc' }
  ];

  // ----- Data loaders (swap these for real API calls later) -----
  async function loadTimeline() {
    // TODO: dashboard hook — replace with fetch('/api/timeline')
    if (Array.isArray(window.FOSAGRI_TIMELINE_DATA)) return window.FOSAGRI_TIMELINE_DATA;
    return DEFAULT_TIMELINE;
  }
  async function loadValues() {
    // TODO: dashboard hook — replace with fetch('/api/values')
    if (Array.isArray(window.FOSAGRI_VALUES_DATA)) return window.FOSAGRI_VALUES_DATA;
    return DEFAULT_VALUES;
  }

  // ============================================================
  // RENDERERS
  // ============================================================
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function renderTimeline(data, lang) {
    const root = document.getElementById('hmv-timeline');
    if (!root) return;

    if (!Array.isArray(data) || data.length === 0) {
      root.dataset.state = 'empty';
      root.innerHTML = `<li class="hmv-timeline-status" data-hmv-state="empty">${escapeHtml(t('timeline.empty', lang))}</li>`;
      return;
    }

    const active = data
      .filter((e) => e && e.isActive !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    if (active.length === 0) {
      root.dataset.state = 'empty';
      root.innerHTML = `<li class="hmv-timeline-status" data-hmv-state="empty">${escapeHtml(t('timeline.empty', lang))}</li>`;
      return;
    }

    root.dataset.state = 'ready';
    root.innerHTML = active.map((entry, i) => {
      const side = i % 2 === 1 ? ' is-right' : '';
      const items = (entry.items || []).map((it) =>
        `<li>${escapeHtml(t(it.textKey, lang))}</li>`
      ).join('');
      const iconHtml = entry.icon ? `<i class="${escapeHtml(entry.icon)}" aria-hidden="true"></i>` : '';
      const title = entry.titleKey ? `<h3 class="hmv-card-title">${escapeHtml(t(entry.titleKey, lang))}</h3>` : '';

      return `
        <li class="hmv-timeline-item${side}" data-id="${escapeHtml(entry.id)}">
          <article class="hmv-card">
            <span class="hmv-card-year">${iconHtml}<span>${escapeHtml(entry.year)}</span></span>
            ${title}
            ${items ? `<ul class="hmv-card-items">${items}</ul>` : ''}
          </article>
        </li>`;
    }).join('');
  }

  function renderValues(data, lang) {
    const root = document.getElementById('hmv-values');
    if (!root) return;

    if (!Array.isArray(data) || data.length === 0) {
      root.dataset.state = 'empty';
      root.innerHTML = `<p class="hmv-values-status" data-hmv-state="empty">${escapeHtml(t('values.empty', lang))}</p>`;
      return;
    }

    const active = data
      .filter((v) => v && v.isActive !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    if (active.length === 0) {
      root.dataset.state = 'empty';
      root.innerHTML = `<p class="hmv-values-status" data-hmv-state="empty">${escapeHtml(t('values.empty', lang))}</p>`;
      return;
    }

    root.dataset.state = 'ready';
    root.innerHTML = `
      <div class="values-cards">
        <article class="page-card values-intro-card">
          <h3>${escapeHtml(t('values.intro.title', lang))}</h3>
          <p>${escapeHtml(t('values.intro.body', lang))}</p>
        </article>

        <div class="values-timeline" aria-label="${escapeHtml(t('sections.values.title', lang))}">
          ${active.map((v) => `
            <article class="page-card timeline-item" id="${escapeHtml(v.id)}" data-id="${escapeHtml(v.id)}">
              <span class="timeline-dot" aria-hidden="true"></span>
              <span class="value-node-icon" aria-hidden="true"><i class="${escapeHtml(v.icon || 'fa-solid fa-circle')}"></i></span>
              <h3>${escapeHtml(t(v.titleKey, lang))}</h3>
              <p>${escapeHtml(t(v.descKey, lang))}</p>
            </article>
          `).join('')}
        </div>
        <img class="values-line-art" src="line.svg" alt="" aria-hidden="true" />
      </div>`;
  }

  // ----- Static text bound by data-hmv-i18n attributes -----
  function applyStaticText(lang) {
    document.title = `FOS-Agri | ${t('page.title', lang)}`;
    document.querySelectorAll('[data-hmv-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.hmvI18n, lang);
    });
    document.querySelectorAll('[data-hmv-i18n-aria]').forEach((el) => {
      el.setAttribute('aria-label', t(el.dataset.hmvI18nAria, lang));
    });
  }

  // ============================================================
  // INIT
  // ============================================================
  let cachedTimeline = null;
  let cachedValues   = null;

  async function rerender() {
    const lang = currentLang();
    applyStaticText(lang);
    renderTimeline(cachedTimeline, lang);
    renderValues(cachedValues, lang);
  }

  async function init() {
    const lang = currentLang();
    applyStaticText(lang);

    // Initial loads — both stay independent so a slow one doesn't block the other.
    try {
      cachedTimeline = await loadTimeline();
      renderTimeline(cachedTimeline, currentLang());
    } catch (err) {
      const root = document.getElementById('hmv-timeline');
      if (root) {
        root.dataset.state = 'error';
        root.innerHTML = `<li class="hmv-timeline-status" data-hmv-state="error">${escapeHtml(t('timeline.error'))}</li>`;
      }
      console.error('[FOS-Agri] timeline load failed', err);
    }

    try {
      cachedValues = await loadValues();
      renderValues(cachedValues, currentLang());
    } catch (err) {
      const root = document.getElementById('hmv-values');
      if (root) {
        root.dataset.state = 'error';
        root.innerHTML = `<p class="hmv-values-status" data-hmv-state="error">${escapeHtml(t('values.empty'))}</p>`;
      }
      console.error('[FOS-Agri] values load failed', err);
    }

    // React to language changes performed by secondary-pages.js (which
    // toggles <html lang> + <html dir>). MutationObserver keeps this
    // page decoupled from that file's internal API.
    const obs = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.type === 'attributes' && (m.attributeName === 'lang' || m.attributeName === 'dir')) {
          rerender();
          break;
        }
      }
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });

    // Also listen for an explicit cross-script event, if ever dispatched.
    window.addEventListener('fosagri:lang-change', rerender);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public surface for dashboards / debug consoles.
  window.FOSAGRI_HMV = {
    rerender,
    setTimelineData(data) { cachedTimeline = data; rerender(); },
    setValuesData(data)   { cachedValues   = data; rerender(); },
    t
  };
})();
