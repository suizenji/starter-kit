const path = require('path');

const f = (filenames, join = ' ') =>
  filenames.map((f) => path.relative(process.cwd(), f)).join(join);

const buildEslintCommand = (filenames) =>
  `next lint --file ${f(filenames, '--file')}`;

const buildPrettierCommand = (filenames) => `prettier --write ${f(filenames)}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [
    () => 'tsc --incremental false --noEmit',
    buildEslintCommand,
    buildPrettierCommand,
  ],
};
