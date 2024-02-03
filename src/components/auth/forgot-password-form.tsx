'use client';
import DefaultButton from '../buttons/default-button';
import { sendPasswordResetLink } from '@/lib/actions/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from '../shared/form-field';
import { ForgotPasswordSchema } from '@/types/schemas';
import toast from 'react-hot-toast';

export default function ForgotPasswordForm() {
  const initialValues = {
    email: '',
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: initialValues,
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      const res = await sendPasswordResetLink(data.email);
      const response = JSON.parse(res);
      if (!response.error) {
        toast.success('please check your email for reset link');
        reset(initialValues);
      } else {
        toast.error(response.error.message);
      }
    } catch (error) {
      toast.error('An error occurred');
    }
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
      <DefaultButton
        className='capitalize bg-primary text-white py-2 link w-full self-center mt-7 focus:outline-none hover:outline-none'
        type='submit'
      >
        {isSubmitting ? 'sending...' : 'send reset link'}{' '}
      </DefaultButton>
    </form>
  );
}
