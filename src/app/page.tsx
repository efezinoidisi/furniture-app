import Hero from '@/components/homepage/hero';
import SectionFour from '@/components/homepage/section-four';
import SectionOne from '@/components/homepage/section-one';
import SectionThree from '@/components/homepage/section-three';
import Ellipsis from '@/components/loaders/ellipsis';
import createSupabaseServerClient from '@/lib/supabase/server';
import { ProductType } from '@/types/product';
import { getAllProducts, getCategories } from '@/utils/helper-functions';
import { Suspense } from 'react';

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getCategories();
  return (
    <main className='flex flex-col gap-y-10 md:gap-y-16'>
      <Hero />
      <Suspense fallback={<Ellipsis />}>
        <SectionOne
          categories={categories}
          products={products.slice(0, 10) as ProductType[]}
        />
      </Suspense>
      <SectionThree />
      <SectionFour />
    </main>
  );
}
