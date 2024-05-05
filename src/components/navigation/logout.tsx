"use client";

import createSupabaseClient from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DefaultButton from "../buttons/default-button";

export default function Logout() {
  const { refresh } = useRouter();

  const logout = () => {
    const supabase = createSupabaseClient();
    supabase.auth
      .signOut()
      .then(() => {
        toast.success("signed out!");
        refresh();
      })
      .catch(() => {
        toast.error("sign out failed!");
      });
  };

  return (
    <DefaultButton
      onClick={logout}
      className="capitalize shadow-md py-3 w-full block text-center text-lg hover:bg-secondary/40 transition-colors duration-200 ease-linear bg-white"
    >
      logout
    </DefaultButton>
  );
}
