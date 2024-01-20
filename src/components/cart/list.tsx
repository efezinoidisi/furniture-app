'use client';
import React from 'react';
import useCart from '../store/contexts/cart-context';
import Cart from './cart';

export default function List() {
  const { cart } = useCart();
  return (
    <div className='col-span-3 md:col-span-2'>
      <h3></h3>
      <div className='grid  gap-6'>
        {cart?.map((item) => (
          <Cart key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
