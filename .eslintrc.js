module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'react-app',
    'react-app/jest',
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],

  plugins: ['prettier'],
  rules: {
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'default-param-last': 0,
    'import/no-extraneous-dependencies': 0,
    'arrow-body-style': 1,
    '@typescript-eslint/ban-types': 1,
    '@typescript-eslint/no-empty-interface': 1,
    'no-param-reassign': 1
  }
}
