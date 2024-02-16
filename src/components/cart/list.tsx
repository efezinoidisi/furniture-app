'use client';

import Cart from './cart';
import Link from 'next/link';
import DefaultButton from '../buttons/default-button';
import { useCartStore } from '../store/cart-store';

export default function List() {
  const [cart, clearCart] = useCartStore((state) => [
    state.cart,
    state.clearCart,
  ]);

  const sizeOfcart = cart.length;

  if (sizeOfcart === 0) {
    return (
      <div className='col-span-full min-h-[50vh] flex flex-col items-center gap-6 capitalize justify-center relative after:content-[""] after:absolute after:top-1/2 after:w-40 after:h-32 after:bg-spot-gradient after:blur-3xl after:rounded-full after:-left-32'>
        <p>your cart is currently empty</p>
        <Link
          href={'/products'}
          className='rounded-md bg-grey-300 text-nowrap py-2 px-4 w-fit text-black link hover:bg-primary/50  hover:text-white'
        >
          explore the shop
        </Link>
      </div>
    );
  }
  return (
    <div className='col-span-3 md:col-span-2 flex flex-col'>
      <DefaultButton
        className='w-fit border self-end my-3 px-3 py-2 bg-grey-300/70 hover:text-primary transition-colors ease-in-out duration-200'
        onClick={clearCart}
      >
        clear all items
      </DefaultButton>
      <div className='grid  gap-6'>
        {cart?.map((item) => (
          <Cart key={item.product?.id} {...item} />
        ))}
      </div>
    </div>
  );
}
