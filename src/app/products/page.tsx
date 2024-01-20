import Products from '@/components/catalogue/products';
import Top from '@/components/catalogue/top';
import Ellipsis from '@/components/loaders/ellipsis';
import { Suspense } from 'react';

type PageProps = {
  searchParams: { category?: string; color?: string; price?: string };
};

export default function page() {
  return (
    <main className='page-size relative after:content-[""] after:absolute after:top-[20rem] after:w-40 after:h-32 after:bg-spot-gradient after:blur-3xl after:rounded-full after:-left-32'>
      <Top />
      <Suspense fallback={<Ellipsis />}>
        <Products />
      </Suspense>
    </main>
  );
}
