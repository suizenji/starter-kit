import type { Meta, StoryObj } from '@storybook/react';

import Page from './page';

const meta = {
  title: 'sample',
  component: Page,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

// https://storybook.js.org/blog/build-a-nextjs-app-with-rsc-msw-storybook/
import { handlers } from '@/mocks/handlers';
export const Mocked = {
  parameters: {
    msw: {
      handlers,
    },
  },
};
