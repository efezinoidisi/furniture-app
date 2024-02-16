'use client';
import { CartItem } from '@/types/product';
import { useRef } from 'react';
import { useCartStore } from '../store/cart-store';

export default function InitCart({ cart }: { cart: CartItem[] }) {
  const initRef = useRef<boolean>(false);
  const setCart = useCartStore((state) => state.setCart);

  if (!initRef.current) {
    setCart(cart);
    initRef.current = true;
  }
  return null;
}
