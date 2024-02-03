'use client';
import toast from 'react-hot-toast';
import DefaultButton from '../buttons/default-button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SignUpSchema } from '@/types/schemas';
import FormField from '../shared/form-field';
import { signUpWithEmailAndPassword } from '@/lib/actions/auth';
import GoogleAuthBtn from './google-auth-btn';

type FormFields = z.infer<typeof SignUpSchema>;

export default function SignupForm() {
  const initialValues = {
    password: '',
    email: '',
    name: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
      // image: '',
      confirmPassword: '',
    },
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      const response = await signUpWithEmailAndPassword(data);
      const res = JSON.parse(response);
      console.log(res);
      if (res?.error?.message) {
        console.log(res.error);
        toast.error(res?.error?.message);
      } else {
        toast.success('signup success');
      }
    } catch (error) {
      toast.error('An error occurred!');
    }
  });

  return (
    <form
      className='flex flex-col gap-y-3 sl:w-3/4 md:w-5/6 sl:mx-auto'
      onSubmit={handleFormSubmit}
    >
      <FormField
        fieldName='username'
        register={register}
        error={errors.username}
        placeholder='username'
        label='username'
        id='username'
      />
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
      <FormField
        fieldName='confirmPassword'
        register={register}
        error={errors.confirmPassword}
        placeholder='confirm password'
        type='password'
      />
      <DefaultButton
        className='capitalize bg-primary text-white py-2 hover:scale-95 w-full self-center mt-7'
        type='submit'
      >
        {isSubmitting ? 'submitting' : 'create account'}
      </DefaultButton>
      <span className='relative border border-black/50 after:content-["or"] after:absolute after:top-1/2 after:-translate-y-1/2 after:bg-background after:px-2 after:left-1/2 after:-translate-x-1/2 after:w-fit my-4' />
      <GoogleAuthBtn text='sign up with google' />
    </form>
  );
}
