(function () {
  'use strict';

  const SUPPORTED = ['fr', 'ar', 'zgh'];
  const DEFAULT_LANG = 'fr';

  function currentLang() {
    const htmlLang = document.documentElement.lang;
    if (SUPPORTED.includes(htmlLang)) return htmlLang;
    const stored = localStorage.getItem('fosagri-lang');
    return SUPPORTED.includes(stored) ? stored : DEFAULT_LANG;
  }

  const I18N = {
    fr: {
      title: 'FOS-Agri | La Fondation',
      description: "Découvrez la Fondation FOS-Agri, sa mission sociale, ses valeurs, son histoire et sa gouvernance.",
      'hero.kicker': 'Fondation pour la Promotion des Œuvres Sociales',
      'hero.title': "Une Fondation proche du personnel du Département de l'Agriculture",
      'hero.body': "FOS-Agri accompagne les adhérents et leurs familles à travers une action sociale structurée, solidaire et orientée vers le service.",
      'hero.primary': 'Découvrir notre mission',
      'hero.secondary': 'Voir la gouvernance',
      'path.tag': 'Comprendre la Fondation',
      'path.title': 'Les rubriques institutionnelles',
      'path.body': "Accédez aux messages officiels, à l'histoire, aux valeurs et aux instances de gouvernance de FOS-Agri.",
      'cards.minister.title': 'Mot du Ministre',
      'cards.minister.body': "La vision institutionnelle portée par le Ministère pour renforcer l'action sociale au profit des agents.",
      'cards.minister.link': 'Lire le mot du Ministre',
      'cards.president.title': 'Mot du Président',
      'cards.president.body': "Un message sur la proximité, la modernisation des services et l'engagement envers les adhérents.",
      'cards.president.link': 'Lire le mot du Président',
      'cards.history.title': 'Histoire, mission et valeurs',
      'cards.history.body': "Les étapes clés de FOS-Agri, sa mission sociale et les valeurs qui orientent son action quotidienne.",
      'cards.history.link': "Explorer l'histoire et les valeurs",
      'cards.governance.title': 'Gouvernance',
      'cards.governance.body': 'Les instances de pilotage, les comités et les règles qui encadrent le fonctionnement de la Fondation.',
      'cards.governance.link': 'Découvrir la gouvernance',
    },

    ar: {
      title: 'FOS-Agri | المؤسسة',
      description: 'تعرفوا على مؤسسة FOS-Agri، مهمتها الاجتماعية، قيمها، تاريخها وحكامتها.',
      'hero.kicker': 'مؤسسة النهوض بالأعمال الاجتماعية',
      'hero.title': 'مؤسسة قريبة من موظفي قطاع الفلاحة',
      'hero.body': 'تواكب FOS-Agri المنخرطين وأسرهم عبر عمل اجتماعي منظم، تضامني وموجه نحو الخدمة.',
      'hero.primary': 'اكتشاف مهمتنا',
      'hero.secondary': 'عرض الحكامة',
      'path.tag': 'فهم المؤسسة',
      'path.title': 'الروابط المؤسساتية',
      'path.body': 'ولوج الرسائل الرسمية والتاريخ والقيم وهيئات الحكامة الخاصة بمؤسسة FOS-Agri.',
      'cards.minister.title': 'كلمة الوزير',
      'cards.minister.body': 'الرؤية المؤسساتية التي تحملها الوزارة لتعزيز العمل الاجتماعي لفائدة الموظفين.',
      'cards.minister.link': 'قراءة كلمة الوزير',
      'cards.president.title': 'كلمة الرئيس',
      'cards.president.body': 'رسالة حول القرب وتحديث الخدمات والالتزام تجاه المنخرطين.',
      'cards.president.link': 'قراءة كلمة الرئيس',
      'cards.history.title': 'التاريخ، المهمة والقيم',
      'cards.history.body': 'المحطات الأساسية للمؤسسة، مهمتها الاجتماعية والقيم التي توجه عملها اليومي.',
      'cards.history.link': 'استكشاف التاريخ والقيم',
      'cards.governance.title': 'الحكامة',
      'cards.governance.body': 'هيئات القيادة واللجان والقواعد التي تؤطر عمل المؤسسة.',
      'cards.governance.link': 'اكتشاف الحكامة',
    },

    zgh: {
      title: 'FOS-Agri | ⵜⴰⵎⵙⵙⵓⵔⵜ',
      description: 'ⵙⵙⵏⴰⵜ ⵜⴰⵎⵙⵙⵓⵔⵜ FOS-Agri, ⵜⴰⵎⴰⵡⵉⵜ ⵏⵏⵙ, ⵜⵉⵏⵉⵍⴰ, ⴰⵎⵣⵔⵓⵢ ⴷ ⵜⴰⴳⵓⵔⵉ.',
      'hero.kicker': 'ⵜⴰⵎⵙⵙⵓⵔⵜ ⵏ ⵜⵏⵀⵓⵔⵜ ⵙ ⵡⵓⵎⴰⵍ',
      'hero.title': 'ⵜⴰⵙⴷⴰⵡⵉⵜ ⵉⵇⵔⴱⵏ ⵙ ⵉⵎⵙⵡⵓⵔⵉⵢⵏ ⵏ ⵓⴳⵣⵣⵓⵎ ⵏ ⵜⴼⵍⴰⵃⵜ',
      'hero.body': 'FOS-Agri ⵜⵙⵎⵓⵏ ⵉⵎⵏⵖⵔⴰⵟⵏ ⴷ ⵜⵡⴰⵊⴰⵡⵉⵏ ⵏⵙⵏ ⵙ ⵓⵎⴰⵍ ⴰⵎⴰⴷⴰⵏ, ⴰⵎⵙⵙⵓⵔ ⴷ ⴰⵎⵙⴰⵡⴰⵍ.',
      'hero.primary': 'ⵙⵙⵏ ⵜⴰⵎⴰⵡⵉⵜ ⵏⵏⵖ',
      'hero.secondary': 'ⵥⵕ ⵜⴰⴳⵓⵔⵉ',
      'path.tag': 'ⵙⵙⵏ ⵜⴰⵎⵙⵙⵓⵔⵜ',
      'path.title': 'ⵜⵉⵔⵎⴰⴷ ⵜⵉⵎⵙⵙⵓⵔⵉⵏ',
      'path.body': 'ⴽⵛⵎⴰⵜ ⵖⵔ ⵉⵡⴰⵍⵏ ⵉⵎⵙⵙⵓⵔⵉⵏ, ⴰⵎⵣⵔⵓⵢ, ⵜⵉⵏⵉⵍⴰ ⴷ ⵉⵎⴰⵙⵙⵏ ⵏ ⵜⴰⴳⵓⵔⵉ ⵏ FOS-Agri.',
      'cards.minister.title': 'ⴰⵡⴰⵍ ⵏ ⵓⵎⵉⵏⵉⵙⵜⵔ',
      'cards.minister.body': 'ⵜⵉⵣⵉ ⵜⴰⵎⵙⵙⵓⵔⵜ ⵏ ⵜⴰⵎⴰⵣⴰⵔⵜ ⵉ ⵓⵙⵙⵉⵙⵏ ⵏ ⵓⵎⴰⵍ ⴰⵎⴰⴷⴰⵏ.',
      'cards.minister.link': 'ⵖⵔ ⴰⵡⴰⵍ ⵏ ⵓⵎⵉⵏⵉⵙⵜⵔ',
      'cards.president.title': 'ⴰⵡⴰⵍ ⵏ ⵓⵙⵍⵡⴰⵢ',
      'cards.president.body': 'ⴰⵡⴰⵍ ⵅⴼ ⵓⵣⵉⵟ, ⴰⵙⵎⴰⵢⵏⵓ ⵏ ⵜⵉⵏⴼⴰⵙ ⴷ ⵓⵣⴷⴰⵢ ⴷ ⵉⵎⵏⵖⵔⴰⵟⵏ.',
      'cards.president.link': 'ⵖⵔ ⴰⵡⴰⵍ ⵏ ⵓⵙⵍⵡⴰⵢ',
      'cards.history.title': 'ⴰⵎⵣⵔⵓⵢ, ⵜⴰⵎⴰⵡⵉⵜ ⴷ ⵜⵉⵏⵉⵍⴰ',
      'cards.history.body': 'ⵉⵎⵏⵣⴰⵢⵏ ⵉⵙⵎⵓⵏⵏ, ⵜⴰⵎⴰⵡⵉⵜ ⴰⵎⴰⴷⴰⵏⵜ ⴷ ⵜⵉⵏⵉⵍⴰ ⵉⵜⵜⴰⵡⵉⵏ ⴰⵎⴰⵍ ⵏⵏⵙ.',
      'cards.history.link': 'ⵙⵙⵏ ⴰⵎⵣⵔⵓⵢ ⴷ ⵜⵉⵏⵉⵍⴰ',
      'cards.governance.title': 'ⵜⴰⴳⵓⵔⵉ',
      'cards.governance.body': 'ⵉⵎⴰⵙⵙⵏ ⵏ ⵓⵙⵏⴼⵍ, ⵉⴽⵓⵎⵉⵜⵏ ⴷ ⵉⵍⵓⴳⵏ ⵉⵙⵙⵓⴷⴷⵓⵏ ⵜⴰⵎⵙⵙⵓⵔⵜ.',
      'cards.governance.link': 'ⵙⵙⵏ ⵜⴰⴳⵓⵔⵉ',
    }
  };

  function t(key, lang) {
    const active = lang || currentLang();
    return (I18N[active] && I18N[active][key]) || I18N[DEFAULT_LANG][key] || key;
  }

  function applyLanguage() {
    const lang = currentLang();
    document.title = t('title', lang);
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', t('description', lang));
    document.querySelectorAll('[data-foundation-i18n]').forEach((node) => {
      node.textContent = t(node.dataset.foundationI18n, lang);
    });
  }

  function init() {
    applyLanguage();
    const observer = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.type === 'attributes' && (m.attributeName === 'lang' || m.attributeName === 'dir'))) {
        applyLanguage();
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
    window.addEventListener('fosagri:lang-change', applyLanguage);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
