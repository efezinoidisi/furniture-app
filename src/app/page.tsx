import Hero from '@/components/homepage/hero';
import SectionFour from '@/components/homepage/section-four';
import SectionOne from '@/components/homepage/section-one';
import SectionThree from '@/components/homepage/section-three';

export default function Home() {
  return (
    <main className=''>
      <Hero />
      <SectionOne />
      <SectionThree />
      <SectionFour />
    </main>
  );
}
