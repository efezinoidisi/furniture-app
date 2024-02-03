'use server';

import { SignInSchema, SignUpSchema } from '@/types/schemas';
import { z } from 'zod';
import createSupabaseServerClient from '../supabase/server';

export async function signUpWithEmailAndPassword(
  data: z.infer<typeof SignUpSchema>
) {
  const supabase = await createSupabaseServerClient();

  const res = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        user_name: data.username,
      },
    },
  });

  return JSON.stringify(res);
}

export async function signInWithEmailAndPassword(
  data: z.infer<typeof SignInSchema>
) {
  const supabase = await createSupabaseServerClient();
  const res = await supabase.auth.signInWithPassword(data);

  return JSON.stringify(res);
}

export async function sendPasswordResetLink(email: string) {
  const supabase = await createSupabaseServerClient();
  const res = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.URL}/reset-password`,
  });

  return JSON.stringify(res);
}
export async function updatePassword(password: string) {
  const supabase = await createSupabaseServerClient();
  const res = await supabase.auth.updateUser({ password });

  return JSON.stringify(res);
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();
}
