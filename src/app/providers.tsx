'use client';
import { CartProvider } from '@/components/store/contexts/cart-context';
import SessionProvider from '@/components/store/contexts/session-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
}
