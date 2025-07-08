module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'ajout',      // ajout de nouvelles fonctionnalités
        'correctif',  // correction de bugs
        'docs',       // documentation
        'style',      // formatage, points-virgules manquants, etc.
        'refactor',   // refactorisation du code
        'perf',       // amélioration des performances
        'test',       // ajout de tests
        'build',      // modifications du système de build
        'ci',         // modifications CI
        'revert',     // annulation d'un commit précédent
        'maintenance' // maintenance générale
      ]
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 100],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always']
  },
  helpUrl: 'https://conventional-commits.org/fr/',
  prompt: {
    messages: {
      type: 'Sélectionnez le type de modification que vous apportez :',
      scope: 'Quelle est la portée de cette modification (optionnel) :',
      customScope: 'Indiquez une portée personnalisée :',
      subject: 'Écrivez une description courte et impérative de la modification :\n',
      body: 'Fournissez une description plus détaillée de la modification (optionnel). Utilisez "|" pour les retours à la ligne :\n',
      breaking: 'Listez les BREAKING CHANGES (optionnel). Utilisez "|" pour les retours à la ligne :\n',
      footerPrefixesSelect: 'Sélectionnez les métadonnées que vous souhaitez ajouter :',
      customFooterPrefix: 'Saisissez un préfixe personnalisé :',
      footer: 'Décrivez les problèmes que ce commit ferme :',
      confirmCommit: 'Êtes-vous sûr de vouloir procéder avec le commit ci-dessus ?'
    },
    types: [
      {
        value: 'ajout',
        name: 'ajout:      Ajout d\'une nouvelle fonctionnalité',
        emoji: ':sparkles:'
      },
      {
        value: 'correctif',
        name: 'correctif:  Correction d\'un bug',
        emoji: ':bug:'
      },
      {
        value: 'docs',
        name: 'docs:       Modification de la documentation',
        emoji: ':memo:'
      },
      {
        value: 'style',
        name: 'style:      Modification du style (formatage, etc.)',
        emoji: ':art:'
      },
      {
        value: 'refactor',
        name: 'refactor:   Refactorisation du code',
        emoji: ':recycle:'
      },
      {
        value: 'perf',
        name: 'perf:       Amélioration des performances',
        emoji: ':zap:'
      },
      {
        value: 'test',
        name: 'test:       Ajout ou modification de tests',
        emoji: ':white_check_mark:'
      },
      {
        value: 'build',
        name: 'build:      Modification du système de build',
        emoji: ':package:'
      },
      {
        value: 'ci',
        name: 'ci:         Modification de l\'intégration continue',
        emoji: ':ferris_wheel:'
      },
      {
        value: 'revert',
        name: 'revert:     Annulation d\'un commit précédent',
        emoji: ':rewind:'
      },
      {
        value: 'maintenance',
        name: 'maintenance: Maintenance générale',
        emoji: ':wrench:'
      }
    ],
    useEmoji: true,
    emojiAlign: 'center',
    allowCustomIssuePrefix: false,
    allowEmptyIssuePrefix: false
  }
};
