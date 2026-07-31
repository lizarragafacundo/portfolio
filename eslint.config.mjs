import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier'

/**
 * Flat config. `eslint-config-next` v16 ships flat arrays directly, so there is
 * no `FlatCompat` shim here — passing these through eslintrc compatibility
 * crashes on the plugin's circular references.
 */
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
      // Keeps `import type` explicit, so type-only imports are erased at build.
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
