import path from 'node:path';

const f = (filenames, join = ' ') =>
  filenames.map((file) => path.relative(process.cwd(), file)).join(join);

const buildEslintCommand = () => `npm run lint`;

const buildMarkuplintCommand = (filenames) => `markuplint ${f(filenames)}`;

const buildPrettierCommand = (filenames) =>
  `prettier --write ${f(filenames)}`;

const config = {
  '*.{js,jsx,ts,tsx,mjs}': [
    () => 'tsc --incremental false --noEmit',
    buildEslintCommand,
    // buildMarkuplintCommand,
    buildPrettierCommand,
  ],
};

export default config;
