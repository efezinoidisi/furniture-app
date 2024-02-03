import SignupForm from '@/components/auth/signup-form';
import { redirectIfSession } from '@/utils/helper-functions';
import Link from 'next/link';

type SignUpProps = {
  searchParams: { from?: string };
};

export default async function SignUpPage(props: SignUpProps) {
  const {
    searchParams: { from = '/' },
  } = props;

  await redirectIfSession(from);
  return (
    <main className='flex flex-col justify-center w-3/4 mx-auto gap-2'>
      <h2 className='text-center text-xl font-bold font-fira-code md:text-2xl'>
        Create an Account
      </h2>
      <p className='text-grey-100 text-center text-sm'>
        Enter your details below
      </p>
      <SignupForm />
      <p className='text-sm text-center mt-5'>
        Already have an account?{' '}
        <Link
          href={'/login'}
          className='self-end border-b border-primary capitalize link  hover:text-primary/90'
        >
          login
        </Link>
      </p>
    </main>
  );
}
