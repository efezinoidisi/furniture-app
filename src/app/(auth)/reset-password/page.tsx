import ResetPasswordForm from '@/components/auth/reset-password-form';

type Props = {
  searchParams: {
    email: string;
  };
};

export default function page(props: Props) {
  const {
    searchParams: { email },
  } = props;

  return (
    <main className='flex flex-col justify-center w-3/4 mx-auto gap-2'>
      <h2 className='text-center text-xl font-bold font-fira-code md:text-2xl capitalize'>
        reset password
      </h2>
      <p className='text-grey-100 text-center text-sm'>
        Enter your new password below
      </p>
      <ResetPasswordForm />
    </main>
  );
}
