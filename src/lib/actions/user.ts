'use server';

import createSupabaseServerClient from '../supabase/server';

// import prisma from '../db';

// export async function fetchUser(email: string) {
//   const user = await prisma.user.findUnique({ where: { email } });

//   return user;
// }
export async function readUserSession() {
  const supabase = await createSupabaseServerClient();

  return supabase.auth.getSession();
}