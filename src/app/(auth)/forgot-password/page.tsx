import ForgotPasswordForm from '@/components/auth/forgot-password-form';

export default function page() {
  return (
    <main className='flex flex-col justify-center w-3/4 mx-auto gap-2'>
      <h2 className='text-center text-xl font-bold font-fira-code md:text-2xl capitalize'>
        forgot password
      </h2>
      <p className='text-grey-100 text-center text-sm'>
        Enter your email below to receive the password reset link
      </p>
      <ForgotPasswordForm />
    </main>
  );
}
