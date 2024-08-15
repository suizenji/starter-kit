import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

/*
// TODO: msw2と連携する
// https://storybook.js.org/blog/build-a-nextjs-app-with-rsc-msw-storybook/
// npm i -D msw-storybook-addon
import { initialize, mswLoader } from 'msw-storybook-addon';
initialize({ onUnhandledRequest: 'warn' });
preview.loaders = [mswLoader];
require('../mocks/db').seed();
*/

export default preview;
