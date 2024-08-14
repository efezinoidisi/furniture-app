import Hero from '@/components/homepage/hero';
import SectionFour from '@/components/homepage/section-four';
import SectionOne from '@/components/homepage/section-one';
import SectionThree from '@/components/homepage/section-three';
import { getAllProducts } from '@/lib/actions/data';

export default async function Home({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  const products = await getAllProducts();

  const type = searchParams.type;
  return (
    <main className='flex flex-col gap-y-10 md:gap-y-16'>
      <Hero />
      <SectionOne products={products || []} type={type || ''} />
      <SectionThree />
      <SectionFour />
    </main>
  );
}
