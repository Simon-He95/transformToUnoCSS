// @ts-check
const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
  {
    ignores: [
      // eslint ignore globs here
      'test/**/*',
      'components.d.ts',
    ],
  },
  {
    rules: {
      // overrides
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-vars': 'off',
      'regexp/no-super-linear-backtracking': 'off',
      'regexp/optimal-quantifier-concatenation': 'off',
      'ts/no-empty-object-type': 'off',
      'no-console': 'off',
      'no-restricted-globals': 'off',
      'style/indent-binary-ops': 'off',
    },
  },
)
