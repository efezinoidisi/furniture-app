import Products from '@/components/catalogue/products';
import Top from '@/components/catalogue/top';
import Ellipsis from '@/components/loaders/ellipsis';
import { getAllProducts } from '@/lib/actions/data';
import { Suspense } from 'react';

export default async function page() {
  const products = await getAllProducts();

  return (
    <main className='page-size relative after:content-[""] after:absolute after:top-[20rem] after:w-40 after:h-32 after:bg-spot-gradient after:blur-3xl after:rounded-full after:-left-32'>
      <Top />
      <Suspense fallback={<Ellipsis />}>
        <Products products={products} />
      </Suspense>
    </main>
  );
}
