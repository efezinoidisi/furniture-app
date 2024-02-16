import { Icons } from '@/lib/icons';
import Image from 'next/image';
import Link from 'next/link';

export default function SectionFour() {
  return (
    <section className='grid md:grid-cols-2 gap-y-4 md:gap-x-7 lg:gap-x-20 relative bg-white px-5 md:px-10 lg:px-28 py-10 place-content-center lg:h-dvh md:py-16'>
      <div className='row-span-2 min-h-[22rem] md:min-h-[30rem] lg:min-h-[35rem]'>
        <Image
          src={'/assets/images/happy-girl.png'}
          alt=''
          width={750}
          height={800}
          unoptimized
          className='rounded-[3rem] object-cover w-full h-full'
        />
      </div>
      <div className='text-center md:text-left flex flex-col row-start-1 md:col-start-2 md:justify-center'>
        <span className='capitalize text-xs lg:text-sm '>customer stories</span>
        <h3 className='capitalize w-fit relative text-center md:text-left text-2xl md:text-[2rem] text-pretty font-bold leading-9 text-primary font-fira-code'>
          Success History of Our Customers
        </h3>

        <div className='grid grid-cols-2 grid-rows-2 gap-y-7 gap-x-10 mt-10'>
          {items.map((item) => (
            <div key={item.text} className='text-grey-100 '>
              <h4 className='lg:text-5xl md:text-4xl font-bold text-2xl'>
                {item.num}
                {item.postfix}
              </h4>
              <p className='text-[0.65rem] md:text-sm lg:text-base py-1 md:py-2 text-nowrap'>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className='col-start-1 md:items-start justify-center  flex md:justify-end pr-5 md:col-start-2'>
        <Link
          href={''}
          className='bg-black text-white px-5 py-2 flex gap-3 capitalize w-fit'
        >
          read more
          <Icons.right />
        </Link>
      </div>
    </section>
  );
}

const items = [
  {
    num: 10,
    postfix: 'x',
    text: 'Increase in productivity',
  },
  {
    num: 300,
    postfix: '%',
    text: 'Return on investment',
  },
  {
    num: 5,
    postfix: 'k+',
    text: 'Happy Customers',
  },
  {
    num: 100,
    postfix: '+',
    text: '5-star reviews',
  },
];
