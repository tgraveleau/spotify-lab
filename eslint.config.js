// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const configUniverse = require('eslint-config-universe/flat/native')

module.exports = defineConfig([
  expoConfig,
  configUniverse,
  {
    files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'prettier/prettier': 'warn',
      'import/export': 'off',
      'import/namespace': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': [
        'error',
        {
          additionalHooks: '(useAnimatedStyle|useDerivedValue|useAnimatedProps)',
        },
      ],
      'import/order': [
        'warn',
        {
          groups: [['builtin', 'external'], 'internal', 'unknown', ['parent', 'index', 'sibling']],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  {
    ignores: ['dist/*'],
  },
])
