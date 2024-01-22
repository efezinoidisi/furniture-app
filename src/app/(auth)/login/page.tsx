import Login from '@/components/auth/login';
import React from 'react';

export default function page() {
  return (
    <main className='flex flex-col justify-center w-3/4 mx-auto gap-2'>
      <h2 className='text-center text-xl font-bold font-fira-code md:text-2xl'>
        Log in to ZFurniture
      </h2>
      <p className='text-grey-100 text-center text-sm'>
        Enter your details below
      </p>
      <Login />
    </main>
  );
}
