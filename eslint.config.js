import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['build/', '.react-router/', '.wrangler/', 'worker-configuration.d.ts'],
  },
  js.configs.recommended,
  {
    files: ['scripts/**/*.mjs', 'lib/**/*.ts', 'vite.config.ts', 'react-router.config.ts'],
    languageOptions: {
      globals: { console: 'readonly', process: 'readonly' },
    },
  },
  ...tseslint.configs.recommended,
  reactHooks.configs.flat['recommended-latest'],
  prettier,
);
