import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'spot-gradient':
          'linear-gradient(270deg, #C900C1 -7.86%, rgba(201, 0, 193, 0.00) 91.6%)',
      },
      colors: {
        background: '#EEF2FB',
        primary: '#C900C1',
        grey: {
          100: '#6A6D70',
          200: '#78798E',
          300: '#C2C9D3',
          400: '#505050',
        },
        plain: '#E3F0FA',
      },

      blur: {
        main: '180px',
      },
      fontFamily: {
        inter: 'var(--font-inter)',
        roboto: 'var(--font-roboto)',
        'fira-code': 'var(--font-fira-code)',
      },
      borderRadius: {
        sl: '2rem',
      },
    },
  },
  plugins: [],
};
export default config;
