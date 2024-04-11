"use client";

import SessionProvider from "@/components/store/contexts/session-context";
import { CartStoreProvider } from "@/providers/cart-store-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartStoreProvider>
      <SessionProvider>{children}</SessionProvider>
    </CartStoreProvider>
  );
}
