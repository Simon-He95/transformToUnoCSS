import simon from '@antfu/eslint-config'

export default simon({
  rules: {
    'no-console': 'off',
    'ts/ban-types': 'off',
    'jsdoc/require-returns-description': 'off',
    'no-new-func': 'off',
    'unicorn/no-new-array': 'off',
    'jsdoc/require-returns-check': 'off',
    'jsdoc/check-param-names': 'off',
    'no-cond-assign': 'off',
    'no-eval': 'off',
    'ts/no-unsafe-function-type': 'off',
    'regexp/optimal-quantifier-concatenation': 'off',
    'regexp/no-misleading-capturing-group': 'off',
    'regexp/no-super-linear-backtracking': 'off',
    'ts/no-unused-expressions': 'off',
    'regexp/no-useless-quantifier': 'off',
    'unused-imports/no-unused-vars': 'off',
    'regexp/no-unused-capturing-group': 'off',
    'regexp/no-obscure-range': 'off',
    'regexp/no-dupe-disjunctions': 'off',
    'regexp/confusing-quantifier': 'off',
    'regexp/no-legacy-features': 'off',
    'ts/no-empty-object-type': 'off',
  },
  ignores: ['**/fixtures', 'test'],
})
