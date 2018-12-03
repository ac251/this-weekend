module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  rules: {
    'no-console': 'warn',
    semi: ['error', 'always'],
  },
  env: {
    browser: true,
    node: true,
  },
};

