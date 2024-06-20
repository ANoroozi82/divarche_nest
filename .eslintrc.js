module.exports = {
  parser: '@typescript-eslint/parser',  // پیکربندی پارسر برای پشتیبانی از TypeScript
  extends: [
    'eslint:recommended',  // استفاده از تنظیمات پیش‌فرض ESLint
    'plugin:@typescript-eslint/recommended',  // استفاده از تنظیمات توصیه‌شده برای TypeScript
    'plugin:import/errors',  // پیکربندی import برای خطاها
    'plugin:import/warnings',  // پیکربندی import برای هشدارها
    'plugin:import/typescript',  // پیکربندی import برای پشتیبانی از TypeScript
  ],
  plugins: ['@typescript-eslint', 'import'],  // استفاده از پلاگین‌های TypeScript و import
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'indent': ['error', 2],  // تنظیم فاصله تب به ۲ فاصله
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/order': [
      'error',
      {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
