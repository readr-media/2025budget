module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'max-lines': ['error', { max: 500 }],
    'prettier/prettier': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'tailwindcss/classnames-order': 'off',
    'tailwindcss/enforces-shorthand': 'error',
    'tailwindcss/no-unnecessary-arbitrary-value': 'error',
  },
  settings: {
    tailwindcss: {
      config: './tailwind.config.js',
    },
  },
}
