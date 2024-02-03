'use client';

import createSupabaseClient from '@/lib/supabase/client';
// import { logout } from '@/lib/actions/auth';
import DefaultButton from '../buttons/default-button';
import toast from 'react-hot-toast';

export default function Logout() {
  const logout = () => {
    const supabase = createSupabaseClient();
    supabase.auth
      .signOut()
      .then(() => {
        toast.success('signed out!');
      })
      .catch(() => {
        toast.error('failed!');
      });
  };

  return (
    <DefaultButton
      onClick={logout}
      className='bg-primary text-white rounded-[2rem] px-3 md:px-5 py-2 capitalize link hover:bg-white hover:text-primary border border-primary'
    >
      logout
    </DefaultButton>
  );
}
