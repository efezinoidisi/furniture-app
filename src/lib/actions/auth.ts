"use server";

import { SignInSchema, SignUpSchema } from "@/types/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import createSupabaseServerClient from "../supabase/server";

export async function signUpWithEmailAndPassword(
  data: z.infer<typeof SignUpSchema>
) {
  const cookieStore = cookies();

  const supabase = await createSupabaseServerClient(cookieStore);

  const res = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        user_name: data.username,
      },
    },
  });

  if (!res.error) {
    revalidatePath("/", "layout");
  }

  return JSON.stringify(res);
}

export async function signInWithEmailAndPassword(
  data: z.infer<typeof SignInSchema>
) {
  const cookieStore = cookies();

  const supabase = await createSupabaseServerClient(cookieStore);
  const res = await supabase.auth.signInWithPassword(data);

  if (!res.error) {
    revalidatePath("/", "layout");
  }
  return JSON.stringify(res);
}

export async function sendPasswordResetLink(email: string) {
  const cookieStore = cookies();

  const supabase = await createSupabaseServerClient(cookieStore);
  const res = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.URL}/reset-password`,
  });

  return JSON.stringify(res);
}
export async function updatePassword(password: string) {
  const cookieStore = cookies();

  const supabase = await createSupabaseServerClient(cookieStore);
  const res = await supabase.auth.updateUser({ password });

  return JSON.stringify(res);
}

export async function logout() {
  const cookieStore = cookies();

  const supabase = await createSupabaseServerClient(cookieStore);
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/", "layout");
}
