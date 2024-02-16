'use client';

import { Icons } from '@/lib/icons';
import Link from 'next/link';
import { useCartStore } from '../store/cart-store';

export default function CartLink() {
  const cart = useCartStore((state) => state.cart);

  const sizeOfCart = cart?.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      href={'/cart'}
      className='text-primary rounded-[2rem] px-1 py-2 capitalize relative link group'
    >
      <Icons.bag className='group-hover:fill-white' />
      {sizeOfCart ? (
        <span className='absolute top-0 right-0 rounded-full bg-primary text-center text-white text-xs size-5 flex justify-center items-center'>
          {sizeOfCart > 10 ? '10+' : sizeOfCart}
        </span>
      ) : null}
    </Link>
  );
}
