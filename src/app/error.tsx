'use client';

interface ErrorPageProps {
  error: Error;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return (
    <main className='flex flex-col justify-center items-center gap-6 min-h-[50dvh]'>
      <h1>Something went wrong!</h1>
      {error?.message && <p>{error?.message}</p>}
    </main>
  );
}
