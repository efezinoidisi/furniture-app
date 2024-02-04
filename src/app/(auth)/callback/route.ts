import createSupabaseServerClient from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const { searchParams } = requestUrl;

  const code = searchParams.get('code');
  // const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(requestUrl.origin);
    }
  }

  throw new Error('google auth failed!');
}