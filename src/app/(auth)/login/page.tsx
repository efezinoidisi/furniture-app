import Login from '@/components/auth/login';
import React from 'react';

export default function page() {
  return (
    <main className='flex flex-col justify-center w-3/4 mx-auto'>
      <h2 className=''>Log in to ZFurniture</h2>
      <p className='text-grey-100'>Enter your details below</p>
      <Login />
    </main>
  );
}
