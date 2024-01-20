'use client';
import { useState } from 'react';
import Input from './input';
import DefaultButton from '../buttons/default-button';
import Link from 'next/link';

export default function Login() {
  const initialValues = {
    password: '',
    email: '',
  };
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form className='flex flex-col gap-y-3' onSubmit={handleFormSubmit}>
      <Input
        id='email'
        placeholder='email'
        value={formData.email}
        handleChange={handleChange}
        label='email'
        type='email'
      />
      <Input
        id='password'
        placeholder='password'
        value={formData.password}
        handleChange={handleChange}
        label='password'
        type='password'
      />
      <Link href={''} className='self-end text-primary/80'>
        forgot password?
      </Link>
      <DefaultButton className='capitalize bg-primary text-white py-2 link w-2/4 self-center mt-7'>
        log in
      </DefaultButton>
    </form>
  );
}
