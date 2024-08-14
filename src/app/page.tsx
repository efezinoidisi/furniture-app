import Hero from '@/components/homepage/hero';
import SectionFour from '@/components/homepage/section-four';
import SectionOne from '@/components/homepage/section-one';
import SectionThree from '@/components/homepage/section-three';
import ProductListSkeleton from '@/components/loaders/ProductListSkeleton';
import { Suspense } from 'react';

export default async function Home({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  const type = searchParams.type;
  return (
    <main className='flex flex-col gap-y-10 md:gap-y-16'>
      <Hero />
      <Suspense fallback={<ProductListSkeleton className='page-size' />}>
        <SectionOne type={type || ''} />
      </Suspense>
      <SectionThree />
      <SectionFour />
    </main>
  );
}
