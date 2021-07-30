module.exports = {
  extends: 'stylelint-config-recommended',
  plugins: ['stylelint-scss'],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
}
