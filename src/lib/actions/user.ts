'use server';

import { cookies } from 'next/headers';
import createSupabaseServerClient from '../supabase/server';
import { redirect } from 'next/navigation';

export async function readUserSession() {
  const cookieStore = cookies();

  const supabase = await createSupabaseServerClient(cookieStore);

  return supabase.auth.getSession();
}

export async function redirectIfSession(to: string = '/') {
  const { data } = await readUserSession();

  if (data?.session) {
    redirect(to);
  }
}

export async function getUser() {
  try {
    const cookieStore = cookies();

    const supabase = await createSupabaseServerClient(cookieStore);

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) return null;
    return user;
  } catch (error) {
    return null;
  }
}
