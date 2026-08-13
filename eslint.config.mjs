import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier'

const config = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      '_reference/**',
      'next-env.d.ts',
      'coverage/**',
      'assets/**',
    ],
  },

  ...nextCoreWebVitals,
  ...nextTypeScript,
  prettier,

  {
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
]

export default config
