'use client';
import { readUserSession } from '@/lib/actions/user';
import createSupabaseClient from '@/lib/supabase/client';
import { SessionContextType } from '@/types/context';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const UserSession = createContext<null | SessionContextType>(null);

export default function SessionProvider({ children }: { children: ReactNode }) {
  const [userSession, setUserSession] = useState(false);
  const isSignedIn = useMemo(() => {
    return !!userSession;
  }, [userSession]);
  const supabase = createSupabaseClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setUserSession(true);
      } else {
        setUserSession(false);
      }
      // if (event === 'SIGNED_OUT') {
      //
      // }
    });
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const value = {
    isSignedIn,
  };

  return <UserSession.Provider value={value}>{children}</UserSession.Provider>;
}

export function useSession() {
  return useContext(UserSession) as SessionContextType;
}
