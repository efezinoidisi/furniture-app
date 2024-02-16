'use client';

import SessionProvider from '@/components/store/contexts/session-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
