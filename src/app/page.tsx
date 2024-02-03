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
  const supabase = await createSupabaseServerClient();

  // const user = await supabase.auth.getUser();
  // console.log(user.data?.user.user_metadata);
  return (
    <main className='flex flex-col gap-y-10 md:gap-y-16'>
      <Hero />
      <Suspense fallback={<Ellipsis />}>
        <SectionOne
          categories={categories}
          products={products as ProductType[]}
        />
      </Suspense>
      <SectionThree />
      <SectionFour />
    </main>
  );
}
