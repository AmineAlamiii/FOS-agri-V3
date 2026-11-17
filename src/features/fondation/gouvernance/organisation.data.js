/**
 * Organigramme de la Fondation.
 * Chaque nœud : id, order, isActive, title/titleAr/titleZgh, name…, colorVariant,
 * supports (encadrés latéraux), children (niveaux), services (sous une direction).
 */
export const ORGANISATION = {
  leadership: [
    {
      id: 'president', order: 1, isActive: true,
      title: 'Président de la FOS',
      titleAr: 'رئيس المؤسسة',
      titleZgh: 'ⴰⵙⵍⵡⴰⵢ ⵏ FOS',
      name: 'M. ADIL EL OUFIR',
      nameAr: 'السيد عادل العوفير',
      nameZgh: 'ADIL EL OUFIR',
      colorVariant: 'gold',
      supports: [
        {
          id: 'committee', order: 1, isActive: true,
          title: 'Comité directeur',
          titleAr: 'اللجنة المديرية',
          titleZgh: 'ⵜⴰⵎⵙⵎⵓⵏⵜ ⵜⴰⵎⵏⵀⴰⴹⵜ',
          colorVariant: 'support',
          icon: 'fa-solid fa-clipboard-list'
        },
        {
          id: 'audit', order: 2, isActive: true,
          title: "Service de l'audit et du contrôle de gestion",
          titleAr: 'مصلحة التدقيق ومراقبة التسيير',
          titleZgh: 'ⴰⵙⵏⵓⴱⴳ ⴷ ⵓⵙⴼⵔⴽ ⵏ ⵜⵎⵀⵍⴰ',
          name: 'Mme NADA MOUNIRI',
          nameAr: 'السيدة ندى منيري',
          nameZgh: 'NADA MOUNIRI',
          colorVariant: 'support',
          icon: 'fa-solid fa-shield-halved'
        }
      ],
      children: [
        {
          id: 'secretary-general', order: 1, isActive: true,
          title: 'Secrétaire générale',
          titleAr: 'الكاتبة العامة',
          titleZgh: 'ⵜⴰⵎⴰⵔⴰⵜ ⵜⴰⵎⴰⵜⴰⵢⵜ',
          name: 'Mme NAJYA AMARA',
          nameAr: 'السيدة نجية عمارة',
          nameZgh: 'NAJYA AMARA',
          colorVariant: 'teal',
          supports: [
            {
              id: 'communication', order: 1, isActive: true,
              title: 'Cheffe de Service de la communication',
              titleAr: 'رئيسة مصلحة التواصل',
              titleZgh: 'ⵜⴰⵎⴰⵙⵜ ⵏ ⵓⵙⵏⵉⵏ ⵏ ⵓⵎⵢⴰⵡⴰⴹ',
              name: 'Mme FAIZA JABIRI',
              nameAr: 'السيدة فائزة جابري',
              nameZgh: 'FAIZA JABIRI',
              colorVariant: 'support',
              icon: 'fa-solid fa-bullhorn'
            }
          ]
        }
      ]
    }
  ],
  directions: [
    {
      id: 'prestations', order: 1, isActive: true,
      title: 'Directrice des prestations',
      titleAr: 'مديرة الخدمات',
      titleZgh: 'ⵜⴰⵎⵙⴼⵔⴰⴽⵜ ⵏ ⵉⵎⵣⵍⴰ',
      managerName: 'Mme SANAE LEHMAMI',
      managerNameAr: 'السيدة سناء الحمامي',
      managerNameZgh: 'SANAE LEHMAMI',
      colorVariant: 'green',
      icon: 'fa-solid fa-hand-holding-heart',
      services: [
        {
          id: 'svc-project-housing', order: 1, isActive: true,
          title: 'Chef de service du projet logement',
          titleAr: 'رئيس مصلحة تتبع مشاريع السكن',
          titleZgh: 'ⴰⵎⴰⵙⴰⵢ ⵏ ⵓⵙⵏⴼⴰⵔ ⵏ ⵜⴷⴷⴰⵔⵜ',
          managerName: 'M. YOUSSEF AKKI',
          managerNameAr: 'السيد يوسف عكي',
          managerNameZgh: 'YOUSSEF AKKI'
        },
        {
          id: 'svc-prevoyance', order: 2, isActive: true,
          title: 'Chef de service de la prévoyance, des aides financières et de l’assistance médicale et sociale',
          titleAr: 'رئيس مصلحة الاحتياط والدعم المالي والمساعدة الصحية والاجتماعية',
          titleZgh: 'ⴰⵎⴰⵙⴰⵢ ⵏ ⵓⴹⵎⴰⵏ ⴷ ⵜⴰⵍⵍⴰⵍⵜ ⵜⴰⵎⵥⵍⴰⵢⵜ ⴷ ⵜⴰⵏⴰⵎⵓⵏⵜ'
        },
        {
          id: 'svc-estivage', order: 3, isActive: true,
          title: "Chef de service de l’estivage, de la culture, de la restauration et des loisirs",
          titleAr: 'رئيس مصلحة الاصطياف والأنشطة والإطعام والترفيه',
          titleZgh: 'ⴰⵎⴰⵙⴰⵢ ⵏ ⵓⵙⵉⵡⴹ ⴷ ⵜⴷⵍⵙⴰ ⴷ ⵓⵙⵓⵔⴼ',
          managerName: 'M. HATIM EL HANCHI',
          managerNameAr: 'السيد حاتم الحنشي',
          managerNameZgh: 'HATIM EL HANCHI'
        }
      ]
    },
    {
      id: 'adherents', order: 2, isActive: true,
      title: 'Directrice des affaires des adhérents',
      titleAr: 'مديرة شؤون المنخرطين',
      titleZgh: 'ⵜⴰⵎⵙⴼⵔⴰⴽⵜ ⵏ ⵓⵎⵓⵔ ⵏ ⵉⵎⵥⵍⴰⵢⵏ',
      managerName: 'Mme HANANE EL KOULALI',
      managerNameAr: 'السيدة حنان الكولالي',
      managerNameZgh: 'HANANE EL KOULALI',
      colorVariant: 'green',
      icon: 'fa-solid fa-users',
      services: [
        {
          id: 'svc-adhesions-contentieux', order: 1, isActive: true,
          title: 'Cheffe de service du suivi des adhésions et du contentieux',
          titleAr: 'رئيسة مصلحة تتبع الانخراطات والمنازعات',
          titleZgh: 'ⵜⴰⵎⴰⵙⴰⵢⵜ ⵏ ⵓⵙⴼⴰⵔ ⵏ ⵓⵙⵏⵓⴱⴳ ⴷ ⵉⵎⵙⵓⴳⴰⵔ',
          managerName: 'Mme SEKAINA EL-MJIDI',
          managerNameAr: 'السيدة سكينة المجيدي',
          managerNameZgh: 'SEKAINA EL-MJIDI'
        },
        {
          id: 'svc-cooperation', order: 2, isActive: true,
          title: 'Cheffe de service de la coopération et du partenariat',
          titleAr: 'رئيسة مصلحة الشراكة والتعاون',
          titleZgh: 'ⵜⴰⵎⴰⵙⴰⵢⵜ ⵏ ⵜⵎⵙⵙⴰⵡⵉⵜ ⴷ ⵓⵎⵛⵛⴰⵔⴽ',
          managerName: 'Mme SOUAD OUAKRIM',
          managerNameAr: 'السيدة سعاد واعكريم',
          managerNameZgh: 'SOUAD OUAKRIM'
        },
        {
          id: 'svc-system-info', order: 3, isActive: true,
          title: "Chef de service du système d’information",
          titleAr: 'رئيس مصلحة نظم المعلومات',
          titleZgh: 'ⴰⵎⴰⵙⴰⵢ ⵏ ⵓⵏⴰⴳⵔⴰⵡ ⵏ ⵉⵙⴼⴽⴰ',
          managerName: 'M. AYOUB EL OTMANI',
          managerNameAr: 'السيد أيوب العثماني',
          managerNameZgh: 'AYOUB EL OTMANI'
        }
      ]
    },
    {
      id: 'admin-finance', order: 3, isActive: true,
      title: 'Directeur administratif et financier',
      titleAr: 'المدير الإداري والمالي',
      titleZgh: 'ⴰⵎⵙⴼⵔⴰⴽ ⴰⴷⴱⵍⴰⵏ ⴷ ⵓⵎⴰⵍⵉ',
      managerName: 'M. ALI KHODARI',
      managerNameAr: 'السيد علي خضاري',
      managerNameZgh: 'ALI KHODARI',
      colorVariant: 'green',
      icon: 'fa-solid fa-building-columns',
      services: [
        {
          id: 'svc-finance', order: 1, isActive: true,
          title: 'Cheffe de service de la gestion financière et de la comptabilité',
          titleAr: 'رئيسة مصلحة التدبير المالي والمحاسبة',
          titleZgh: 'ⵜⴰⵎⴰⵙⴰⵢⵜ ⵏ ⵓⵙⴼⵔⴽ ⴰⵎⴰⵍⵉ ⴷ ⵓⵎⵉⴹⴰⵏ',
          managerName: 'Mme MANAL EL MATLOBI',
          managerNameAr: 'السيدة منال المطلبي',
          managerNameZgh: 'MANAL EL MATLOBI'
        },
        {
          id: 'svc-purchases', order: 2, isActive: true,
          title: 'Chef de service des achats et des moyens généraux',
          titleAr: 'رئيس مصلحة المشتريات والوسائل العامة',
          titleZgh: 'ⴰⵎⴰⵙⴰⵢ ⵏ ⵉⵙⵖⴰⵏ ⴷ ⵉⵎⴰⵙⵙⵏ ⵉⵎⴰⵜⴰⵢⵏ',
          managerName: 'M. YOUSSEF MAMRANI',
          managerNameAr: 'السيد يوسف المراني',
          managerNameZgh: 'YOUSSEF MAMRANI'
        },
        {
          id: 'svc-admin-legal', order: 3, isActive: true,
          title: 'Chef de service de la gestion administrative et juridique',
          titleAr: 'رئيس مصلحة التدبير الإداري والقانوني',
          titleZgh: 'ⴰⵎⴰⵙⴰⵢ ⵏ ⵓⵙⴼⵔⴽ ⴰⴷⴱⵍⴰⵏ ⴷ ⵓⵙⴹⵓⴼ',
          managerName: 'M. AHMED NACIRI',
          managerNameAr: 'السيد أحمد الناصري',
          managerNameZgh: 'AHMED NACIRI'
        }
      ]
    }
  ]
};
