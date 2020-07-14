module.exports = {
  // extends: ['stylelint-config-recommended', 'stylelint-plugin-stylus/standard'],
  // rules: {
  //   'at-rule-no-unknown': [
  //     true,
  //     {
  //       ignoreAtRules: [
  //         'tailwind',
  //         'apply',
  //         'variants',
  //         'responsive',
  //         'screen',
  //       ],
  //     },
  //   ],
  //   'declaration-block-trailing-semicolon': null,
  //   'no-descending-specificity': null,
  // },

  extends: ['stylelint-config-recommended'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends', 'tailwind'],
      },
    ],
    'block-no-empty': null,
    'unit-whitelist': ['em', 'rem', 's'],
  },
}
