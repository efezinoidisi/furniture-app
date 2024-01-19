import { Fira_Code, Inter, Roboto } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['700', '500', '400'],
});

export const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  weight: ['700', '600'],
});
