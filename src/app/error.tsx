'use client';

interface ErrorPageProps {
  error: Error;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return (
    <main>
      <h1>Something went wrong!</h1>
    </main>
  );
}
