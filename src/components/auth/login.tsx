'use client';
import DefaultButton from '../buttons/default-button';
import Link from 'next/link';
import { SignInSchema } from '@/types/schemas';
import { z } from 'zod';
import { signInWithEmailAndPassword } from '@/lib/actions/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from '../shared/form-field';
import toast from 'react-hot-toast';
import GoogleAuthBtn from './google-auth-btn';

type LoginFields = z.infer<typeof SignInSchema>;

export default function Login() {
  const initialValues = {
    password: '',
    email: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: initialValues,
  });
  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      const response = await signInWithEmailAndPassword(data);
      const res = JSON.parse(response);
      console.log(res);
      if (res?.error) {
        toast.error(res.error.message);
      } else {
        toast.success('signed in!');
      }
    } catch (error) {}
  });

  return (
    <form
      className='flex flex-col gap-y-3 sl:w-3/4 md:w-5/6 sl:mx-auto'
      onSubmit={handleFormSubmit}
    >
      <FormField
        fieldName='email'
        register={register}
        error={errors.email}
        placeholder='email'
        type='email'
      />
      <FormField
        fieldName='password'
        register={register}
        error={errors.password}
        placeholder='password'
        type='password'
      />
      <Link href={'/forgot-password'} className='self-end text-primary/80'>
        forgot password?
      </Link>
      <DefaultButton className='capitalize bg-primary text-white py-3 link w-full self-center '>
        log in
      </DefaultButton>
      <span className='relative border border-black/50 after:content-["or"] after:absolute after:top-1/2 after:-translate-y-1/2 after:bg-background after:px-2 after:left-1/2 after:-translate-x-1/2 after:w-fit my-4' />
      <div>
        <GoogleAuthBtn />
        <DefaultButton
          className='flex items-center gap-3 border w-full justify-center py-3 text-primary border-primary mt-3 bg-background capitalize'
          type='button'
        >
          test user
        </DefaultButton>
      </div>
    </form>
  );
}
