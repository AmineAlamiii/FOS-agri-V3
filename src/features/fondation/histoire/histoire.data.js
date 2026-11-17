/**
 * Données de la frise chronologique et des valeurs.
 * Chaque entrée référence des clés de traduction (voir histoire.i18n.js).
 * isActive=false masque une entrée ; l'ordre d'affichage suit `order`.
 */
export const TIMELINE = [
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

export const VALUES = [
  { id: 'equite',    order: 1, isActive: true, icon: 'fa-solid fa-scale-balanced',    titleKey: 'values.equity.title',    descKey: 'values.equity.desc' },
  { id: 'proximite', order: 2, isActive: true, icon: 'fa-solid fa-location-dot',       titleKey: 'values.proximity.title', descKey: 'values.proximity.desc' },
  { id: 'service',   order: 3, isActive: true, icon: 'fa-solid fa-hand-holding-heart', titleKey: 'values.service.title',   descKey: 'values.service.desc' },
  { id: 'inclusion', order: 4, isActive: true, icon: 'fa-solid fa-handshake',          titleKey: 'values.inclusion.title', descKey: 'values.inclusion.desc' }
];
