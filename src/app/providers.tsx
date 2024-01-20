import { CartProvider } from '@/components/store/contexts/cart-context';
import React from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
