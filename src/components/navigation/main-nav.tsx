'use client';
import Image from 'next/image';
import NavLinks from './nav-links';
import Link from 'next/link';
import { Icons } from '@/lib/icons';
import DefaultButton from '../buttons/default-button';
import CartLink from './cart';
import { useState } from 'react';
import Overlay from '../shared/overlay';
import Logout from './logout';
import { useSession } from '../store/contexts/session-context';

export default function MainNav() {
  const [showMenu, setShowMenu] = useState(false);
  const { isSignedIn } = useSession();

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const navigationLinks: {
    path: string;
    title: string;
    isVisible?: boolean;
  }[] = [
    {
      path: '/products',
      title: 'shop now',
    },
    {
      path: '',
      title: 'about us',
    },
    {
      path: '',
      title: 'contact us',
    },
    {
      path: '/signup',
      title: 'sign up',
      isVisible: !isSignedIn,
    },
  ];

  return (
    <header className='flex justify-between py-10 w-11/12 lg:w-4/5 mx-auto '>
      <div className='flex gap-3 md:gap-7'>
        <DefaultButton
          className='text-primary md:hidden link'
          onClick={toggleMenu}
        >
          <Icons.menu className='text-2xl' size={40} />
        </DefaultButton>
        <Link href={'/'} className='link'>
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
        className='md:flex gap-x-5 items-center hidden'
        linkStyle='first:text-primary font-bold text-black first:border-b-2 first:border-primary capitalize link hover:text-primary/80'
      />
      <div className='flex items-center gap-1 md:gap-3'>
        <Link
          href={'/wishlist'}
          className='text-primary rounded-[2rem] p-2 capitalize link group'
        >
          <Icons.heart className='group-hover:fill-white' />
        </Link>
        <CartLink />
        {isSignedIn ? (
          <Logout />
        ) : (
          <Link
            href={'/login'}
            className='bg-primary text-white rounded-[2rem] px-3 md:px-5 py-2 capitalize link hover:bg-white hover:text-primary border border-primary'
          >
            login
          </Link>
        )}
      </div>

      {showMenu ? (
        <>
          <Overlay handleClick={toggleMenu} />
          <div className='fixed inset-y-0 bg-white-gradient left-0 w-2/4 py-10 px-7 rounded-tr-sl z-[100] md:hidden transition-transform animate-slide-in'>
            <div className='flex items-center justify-between w-full mb-9'>
              {' '}
              <Image
                src={'/assets/images/logo.svg'}
                alt='logo'
                width={40}
                height={40}
                className='w-6'
              />
              <DefaultButton onClick={toggleMenu} className='text-xl'>
                <Icons.close />
              </DefaultButton>
            </div>
            <NavLinks
              navigationLinks={navigationLinks}
              className='flex flex-col gap-y-5 items-start'
              linkStyle='first:text-primary font-bold text-black first:border-b-2 first:border-primary capitalize w-fit hover:text-primary/80'
              handleLinkClick={toggleMenu}
            />
          </div>
        </>
      ) : null}
    </header>
  );
}
