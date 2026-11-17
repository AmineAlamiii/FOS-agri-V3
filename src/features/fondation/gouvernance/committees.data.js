/** Comités de gouvernance : clés de traduction + présentation (couleur, icône). */
export const COMMITTEES = [
  {
    id: 'comite-directeur',
    number: '01',
    order: 1,
    isActive: true,
    titleKey: 'governance.committees.director.title',
    introKey: 'governance.committees.director.compositionIntro',
    compositionKeys: [
      'governance.committees.director.composition.president',
      'governance.committees.director.composition.departmentRepresentatives',
      'governance.committees.director.composition.unions',
      'governance.committees.director.composition.financeRepresentative',
      'governance.committees.director.composition.publicInstitutions'
    ],
    responsibilityIntroKey: 'governance.committees.director.responsibilityIntro',
    responsibilityKeys: [
      'governance.committees.director.responsibilities.internalRules',
      'governance.committees.director.responsibilities.staffStatus',
      'governance.committees.director.responsibilities.programBudget',
      'governance.committees.director.responsibilities.contributionScale',
      'governance.committees.director.responsibilities.conventions'
    ],
    colorVariant: 'gold',
    icon: 'users'
  },
  {
    id: 'comite-executif',
    number: '02',
    order: 2,
    isActive: true,
    titleKey: 'governance.committees.executive.title',
    introKey: 'governance.committees.executive.compositionIntro',
    compositionKeys: [
      'governance.committees.executive.composition.presidency',
      'governance.committees.executive.composition.secretaryGeneral',
      'governance.committees.executive.composition.adminFinance',
      'governance.committees.executive.composition.services',
      'governance.committees.executive.composition.members'
    ],
    responsibilityIntroKey: 'governance.committees.executive.responsibilityIntro',
    responsibilityKeys: [
      'governance.committees.executive.responsibilities.programs',
      'governance.committees.executive.responsibilities.tools',
      'governance.committees.executive.responsibilities.implementation'
    ],
    colorVariant: 'teal',
    icon: 'briefcase'
  },
  {
    id: 'comite-audit',
    number: '03',
    order: 3,
    isActive: true,
    titleKey: 'governance.committees.audit.title',
    introKey: 'governance.committees.audit.compositionIntro',
    compositionKeys: [
      'governance.committees.audit.composition.budgetDirectorate',
      'governance.committees.audit.composition.financialDirectorate',
      'governance.committees.audit.composition.legalAffairs',
      'governance.committees.audit.composition.humanResources',
      'governance.committees.audit.composition.informationSystems',
      'governance.committees.audit.composition.auditor'
    ],
    responsibilityIntroKey: 'governance.committees.audit.responsibilityIntro',
    responsibilityKeys: [
      'governance.committees.audit.responsibilities.followup',
      'governance.committees.audit.responsibilities.control'
    ],
    colorVariant: 'neutral',
    icon: 'shield-halved'
  }
];

export const COMMITTEE_ICONS = {
  users: 'fa-solid fa-users',
  briefcase: 'fa-solid fa-briefcase',
  'shield-halved': 'fa-solid fa-shield-halved'
};
