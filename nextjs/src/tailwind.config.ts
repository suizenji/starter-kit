import type { Config } from 'tailwindcss';

// design tokens
const appColors = {
  blue: {
    300: '#0d47a1',
    400: '#0075a2',
  },
  orange: {
    200: '#FFDEA3',
    300: '#fca239',
  },
};

const colorTokens = {
  ...appColors,
  primary: appColors.blue[300],
  secondary: appColors.orange[300],
};

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: ({ theme }) => ({
        app: {
          ...colorTokens,
        },
      }),
    },
  },
  plugins: [],
};
export default config;
