const path = require('path');

const f = (filenames, join = ' ') =>
  filenames.map((f) => path.relative(process.cwd(), f)).join(join);

const buildEslintCommand = (filenames) =>
  `npx eslint --max-warnings=0 --fix ${f(filenames)}`;

const buildPrettierCommand = (filenames) => `prettier --write ${f(filenames)}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [
    () => 'tsc --incremental false --noEmit',
    // buildEslintCommand,
    buildPrettierCommand,
  ],
};
