'use client';
import { Icons } from '@/lib/icons';
import { useState } from 'react';
import DefaultButton from '../buttons/default-button';

type InputProps = {
  label: string;
  type?: string;
  id: string;
  placeholder: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function Input({
  label,
  id,
  placeholder,
  value,
  type = 'text',
  handleChange,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  let inputType = showPassword ? 'text' : type;
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <label htmlFor={id} className='relative'>
      <span className='sr-only'>{label}</span>
      <input
        name={id}
        type={inputType}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className='w-full border-b focus:bg-white border-black/30 py-1 pt-3 focus-within:outline-none focus:border-primary/70 focus:shadow-lg px-3 placeholder:capitalize bg-inherit'
      />
      {type === 'password' ? (
        <DefaultButton
          onClick={toggleShowPassword}
          id='toggle-password-view'
          aria-label='make password visible'
          className='absolute top-1/2 -translate-y-1/2 right-4 text-grey-100'
        >
          {showPassword ? <Icons.eyeClose /> : <Icons.eyeOpen />}
        </DefaultButton>
      ) : null}
    </label>
  );
}
