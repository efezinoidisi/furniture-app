"use client";
import createSupabaseClient from "@/lib/supabase/client";
import Image from "next/image";
import DefaultButton from "../buttons/default-button";

type GoogleAuthBtnProps = {
  text?: string;
};

export default function GoogleAuthBtn({
  text = "Login with Google",
}: GoogleAuthBtnProps) {
  function signInWithGoogle() {
    const supabase = createSupabaseClient();
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/callback`,
      },
    });
  }

  return (
    <DefaultButton
      onClick={signInWithGoogle}
      className="flex items-center gap-3 border w-full justify-center py-3 bg-charcoal text-white transition-colors duration-200 hover:bg-primary/20"
      type="button"
    >
      <Image
        src={"/assets/icons/google.svg"}
        alt="google icon"
        width={200}
        height={200}
        className="w-6"
      />
      {text}
    </DefaultButton>
  );
}
