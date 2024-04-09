"use client";
import createSupabaseClient from "@/lib/supabase/client";
import { useCartStore } from "@/providers/cart-store-provider";
import { SessionContextType } from "@/types/context";
import { CartItem } from "@/types/product";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const UserSession = createContext<null | SessionContextType>(null);

export default function SessionProvider({ children }: { children: ReactNode }) {
  const [userSession, setUserSession] = useState(false);
  const isSignedIn = useMemo(() => {
    return !!userSession;
  }, [userSession]);
  const supabase = createSupabaseClient();
  const setCart = useCartStore((state) => state.setCart);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        setUserSession(true);
        supabase
          .from("cart")
          .select(`quantity, product (*)`)
          .then((data) => {
            if (data.data) {
              setCart(data.data as CartItem[]);
            }
          });
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
