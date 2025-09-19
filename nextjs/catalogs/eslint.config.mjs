import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['{app,components,hooks}/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/crud/queries*'],
              message: 'Imports not going through a facade are prohibited.',
            },
            {
              group: ['@/crud/commands*'],
              message: 'Imports not going through a facade are prohibited.',
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
