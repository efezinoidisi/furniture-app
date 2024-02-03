'use client';
import { sendPasswordResetLink, updatePassword } from '@/lib/actions/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from '../shared/form-field';
import { ResetPasswordSchema } from '@/types/schemas';
import toast from 'react-hot-toast';
import DefaultButton from '../buttons/default-button';
import { redirect } from 'next/navigation';

export default function ResetPasswordForm() {
  const initialValues = {
    new_password: '',
    confirm_password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: initialValues,
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      const res = await updatePassword(data.new_password);
      const response = JSON.parse(res);

      if (!response.error) {
        toast.success('password changed!');
        redirect('/');
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
        fieldName='new_password'
        register={register}
        error={errors.new_password}
        placeholder='new password'
        type='password'
      />
      <FormField
        fieldName='confirm_password'
        register={register}
        error={errors.confirm_password}
        placeholder='confirm new password'
        type='password'
      />
      <DefaultButton
        className='capitalize bg-primary text-white py-2 link w-full self-center mt-7'
        type='submit'
      >
        {isSubmitting ? 'saving' : 'save'}
      </DefaultButton>
    </form>
  );
}
