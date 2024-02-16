import Login from '@/components/auth/login';
// import { readUserSession } from '@/lib/actions/user';
import { redirectIfSession } from '@/lib/actions/user';
import Link from 'next/link';
// import { redirect } from 'next/navigation';

type LoginPageProps = {
  searchParams: { from?: string };
};

export default async function LoginPage(props: LoginPageProps) {
  const {
    searchParams: { from = '/' },
  } = props;

  await redirectIfSession(from);

  return (
    <main className='flex flex-col justify-center w-3/4 mx-auto gap-2'>
      <h2 className='text-center text-xl font-bold font-fira-code md:text-2xl'>
        Log in to ZFurniture
      </h2>
      <p className='text-grey-100 text-center text-sm'>
        Don&#39;t have an account?{' '}
        <Link href={'/signup'} className='underline text-blue-500'>
          register
        </Link>
      </p>
      <Login />
    </main>
  );
}
