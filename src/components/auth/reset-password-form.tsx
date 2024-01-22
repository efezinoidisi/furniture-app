'use client';
import { useState } from 'react';
import Input from './input';
import DefaultButton from '../buttons/default-button';

export default function ResetPasswordForm() {
  const initialValues = {
    password: '',
    confirmPassword: '',
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
    <form
      className='flex flex-col gap-y-3 sl:w-3/4 md:w-5/6 sl:mx-auto'
      onSubmit={handleFormSubmit}
    >
      <Input
        id='password'
        placeholder='password'
        value={formData.password}
        handleChange={handleChange}
        label='password'
        type='password'
      />
      <Input
        id='confirmPassword'
        placeholder='confirm password'
        value={formData.confirmPassword}
        handleChange={handleChange}
        label='confirm password'
        type='password'
      />
      <DefaultButton className='capitalize bg-primary text-white py-2 link w-full self-center mt-7'>
        save
      </DefaultButton>
    </form>
  );
}
