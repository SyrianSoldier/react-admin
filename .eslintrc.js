module.exports = {
  extends: ['react-app', 'react-app/jest', 'airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'default-param-last': 0
  }
}
