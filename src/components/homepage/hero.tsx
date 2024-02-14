import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '@/lib/icons';

export default function Hero() {
  return (
    <section className='grid md:grid-cols-2 lg:min-h-[80svh] lg:place-content-center lg:py-10 gap-x-16 overflow-y-clip py-5 relative after:content-[""] after:absolute after:top-96 after:w-40 after:h-32 after:bg-spot-gradient after:blur-3xl after:rounded-full after:-left-32 after:-z-10 page-size'>
      <div className='flex flex-col h-full lg:py-16 items-center text-center xl:text-5xl md:text-start md:pb-20 pb-10'>
        <h1 className=' text-[1.75rem] lg:text-4xl font-bold capitalize  leading-7 md:text-left md:leading-8 lg:text-balance'>
          discover the latest{' '}
          <span className='bg-[url("/assets/images/arrow3.svg")] bg-no-repeat bg-left-bottom'>
            furniture
          </span>{' '}
          trends
        </h1>
        <p className='my-4 lg:mt-10 font-inter text-lg md:text-xl lg"text-2xl leading-7 md:leading-8 lg:leading-9 text-balance'>
          Shop the Latest Furnitures and Stay ahead of the interior design game
        </p>
        <Link
          href={'/products'}
          className='bg-black text-white px-5 py-2 flex gap-3 capitalize w-fit md:self-start text-xl link hover:bg-primary/60 items-center'
        >
          explore more
          <Icons.right />
        </Link>
      </div>
      <div className='grid  place-items-center gap-2 lg:gap-5'>
        {heroImages.map((img) => (
          <div
            key={img}
            className='w-full h-44 lg:h-64 last:col-span-2 relative '
          >
            <Image
              src={img}
              alt=''
              width={500}
              height={500}
              className='w-full h-full object-cover aspect-[2/3] rounded-[2rem] object-center lg:object-left'
              unoptimized
            />
            <span className='absolute top-2 left-4 py-1 px-2 rounded-xl bg-plain'>
              new
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

const heroImages = [
  '/assets/images/chair.png',
  '/assets/images/hero-chair2.png',
  '/assets/images/hero-chair-3.png',
];
