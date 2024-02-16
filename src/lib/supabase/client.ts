import { Database } from '@/types/supabase';
import { createBrowserClient } from '@supabase/ssr';

export default function createSupabaseClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
