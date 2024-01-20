'use client';

import { Icons } from '@/lib/icons';
import Link from 'next/link';
import useCart from '../store/contexts/cart-context';

export default function CartLink() {
  const { cart } = useCart();
  const isItemInCart = cart?.length > 0;
  return (
    <Link
      href={'/cart'}
      className='text-primary rounded-[2rem] px-1 py-2 capitalize relative'
    >
      <Icons.cart />
      {isItemInCart ? (
        <span className='absolute top-0 right-0 rounded-full bg-primary text-center text-white text-xs size-2'></span>
      ) : null}
    </Link>
  );
}
