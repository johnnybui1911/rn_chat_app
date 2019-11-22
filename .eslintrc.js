module.exports = {
  root: true,
  extends: '@react-native-community',
  env: {
    es6: true,
    browser: true,
    node: true,
    commonjs: true,
    mocha: true
  },
  rules: {
    'no-const-assign': 'warn',
    'no-this-before-super': 'warn',
    'no-undef': 'warn',
    'no-unreachable': 'warn',
    'no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
    ],
    'constructor-super': 'warn',
    'valid-typeof': 'warn',
    'no-console': 'off',
    semi: ['off', 'always'],
    'no-extra-semi': 'error',
    quotes: ['warn', 'single', { allowTemplateLiterals: true }],
    'react/prop-types': [0],
    'react/display-name': [0],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-inline-styles': 2
  },
  settings: {
    polyfills: ['promises'],
    flowtype: {
      onlyFilesWithFlowAnnotation: false
    }
  }
}
