import Image from 'next/image';
import NavLinks from './nav-links';
import Link from 'next/link';
import { Icons } from '@/lib/icons';
import DefaultButton from '../buttons/default-button';
import CartLink from './cart';

export default function MainNav() {
  return (
    <header className='flex justify-between py-10 w-11/12 lg:w-4/5 mx-auto '>
      <div className='flex gap-3 md:gap-7'>
        <DefaultButton className='text-primary lg:hidden'>
          <Icons.menu className='text-2xl' size={40} />
        </DefaultButton>
        <Link href={'/'} className=''>
          <Image
            src={'/assets/images/logo.svg'}
            alt='logo'
            width={40}
            height={40}
            className='w-9'
          />
        </Link>
      </div>
      <NavLinks
        navigationLinks={navigationLinks}
        className='lg:flex gap-x-5 items-center hidden'
        linkStyle='first:text-primary font-bold text-black first:border-b-2 first:border-primary capitalize'
      />
      <div className='flex items-center gap-1 md:gap-3'>
        <Link
          href={'/wishlist'}
          className='text-primary rounded-[2rem] p-2 capitalize '
        >
          <Icons.heart />
        </Link>
        <CartLink />
        <Link
          href={'/login'}
          className='bg-primary text-white rounded-[2rem] px-3 md:px-5 py-2 capitalize'
        >
          login
        </Link>
      </div>
    </header>
  );
}

const navigationLinks: {
  path: string;
  title: string;
}[] = [
  {
    path: '/products',
    title: 'shop now',
  },
  {
    path: '/about',
    title: 'about us',
  },
  {
    path: '/contact',
    title: 'contact us',
  },
  {
    path: '/signup',
    title: 'sign up',
  },
];
