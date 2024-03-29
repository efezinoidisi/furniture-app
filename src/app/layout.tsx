import type { Metadata } from 'next';
import { inter, roboto, firaCode } from './fonts';
import './globals.css';
import MainNav from '@/components/navigation/main-nav';
import Footer from '@/components/footer/footer';
import Providers from './providers';
import { Toaster } from 'react-hot-toast';
import { getCart } from '@/lib/actions/data';
import InitCart from '@/components/state/init-cart';

export const metadata: Metadata = {
  title: 'ZFurniture',
  description:
    'Transform your living spaces with ZFurniture. Explore our online catalog today and elevate your home with furniture that reflects your style and personality. Start your journey to a more stylish and comfortable living with ZFurniture.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = await getCart();

  return (
    <html lang='en'>
      <body
        className={`${inter.variable} ${roboto.variable} ${firaCode.variable} font-roboto bg-background overflow-x-clip relative after:content-[""] after:absolute after:top-0  after:size-[9rem] md:after:size-[13rem] after:bg-spot-gradient after:blur-3xl after:rounded-[20rem] after:right-0 after:-z-10`}
      >
        <Providers>
          <InitCart cart={cart as []} />
          <MainNav />
          {children}
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
