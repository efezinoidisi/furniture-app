'use client';

import Image from 'next/image';
import { useState } from 'react';
import DefaultButton from '../buttons/default-button';
import Link from 'next/link';

export default function SectionOne() {
  const [currentCategory, setCurrentCategory] = useState('');

  const filteredProducts = products.filter((product) =>
    product.label.includes(currentCategory)
  );

  const toggleCategory = (value: string) => {
    setCurrentCategory(value);
  };

  return (
    <section className='relative after:content-[""] after:absolute after:top-96 bg-fixed after:w-16 after:h-32 after:bg-spot-gradient after:blur-2xl after: after:-right-0 after:-z-10 page-size lg:after:-right-20'>
      <h2 className='capitalize text-xl md:text-3xl lg:text-5xl font-bold   text-center text-pretty md:text-nowrap md:text-left'>
        stylish collection of
        <span className='bg-[url("/assets/images/arrow2.svg")] bg-no-repeat bg-right bg-cover'>
          {' '}
          Furniture
        </span>
      </h2>
      <p className='text-grey-100 text-base md:text-lg lg:text-xl leading-7 lg:leading-8 my-3 text-center md:text-left text-pretty'>
        Stay updated with our informative and engaging blog posts about modern
        Furniture and Fashion on the industry
      </p>
      <ul className='flex gap-5 overflow-x-scroll hide-scrollbar my-10 md:overflow-x-clip md:flex-wrap'>
        {categories.map((category) => {
          const active = category.value === currentCategory;
          return (
            <li
              key={category.name}
              role='button'
              className={`${
                active
                  ? 'bg-opacity-100 text-white'
                  : 'bg-opacity-[0.15] text-black'
              } bg-black rounded-sl px-3 py-1 cursor-pointer capitalize text-sm md:text-base lg:text-lg  md:px-5 text-nowrap`}
              onClick={() => toggleCategory(category.value)}
            >
              {category.name}
            </li>
          );
        })}
        <li className='bg-black rounded-sl px-3 py-1 bg-opacity-[0.15] text-black capitalize text-sm md:text-base lg:text-lg md:px-5'>
          <Link href={''}>more</Link>
        </li>
      </ul>
      <div className='grid gap-x-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-7 md:gap-y-9 lg:gap-y-12'>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className='min-h-[16rem] md:min-h-max flex flex-col justify-between'
          >
            <div className='w-full h-40 relative'>
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={500}
                className='object-cover object-center aspect-square w-full h-full rounded-2xl'
                unoptimized
              />
              {product.new ? (
                <span className='absolute top-1 left-1 py-1 px-2 md:px-3 lg:px-5 rounded-xl bg-plain'>
                  new
                </span>
              ) : null}
            </div>
            <div className=' flex flex-col gap-2'>
              <h4 className='capitalize truncate text-grey-200 text-[0.8rem] text-lg'>
                {product.name}
              </h4>
              <div className='flex gap-2 items-center'>
                {product.colors.map((item) => {
                  return (
                    <span
                      key={item}
                      className='size-2 rounded-full'
                      style={{ backgroundColor: item }}
                    ></span>
                  );
                })}
              </div>
              <div className='flex items-center justify-between font-bold'>
                <p className=' text-md md:text-lg lg:text-xl'>{`$${product.price}.00`}</p>
                <DefaultButton className='bg-[#D4DCFB] text-black px-1 py-2 rounded-2xl md:px-2 text-sm md:text-md lg:text-lg'>
                  Add to Cart
                </DefaultButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const categories = [
  {
    name: 'all furniture',
    value: '',
  },
  {
    name: 'bedroom',
    value: 'bedroom',
  },
  {
    name: 'living room',
    value: 'living room',
  },
  {
    name: 'home office',
    value: 'home office',
  },
  {
    name: 'dining table',
    value: 'dining table',
  },
];

const products = [
  {
    id: 0,
    name: 'stylish soft chair',
    image: '/assets/images/stylish-sot-chair.png',
    price: '20',
    label: 'bedroom dining table',
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    new: false,
  },
  {
    id: 1,
    name: 'modern soft chair',
    image: '/assets/images/modern-soft-chair2.png',
    price: '40',
    label: 'living room home office',
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    new: false,
  },
  {
    id: 2,
    name: 'comfortable soft chair',
    image: '/assets/images/comfortable-soft-chair.png',
    price: '40',
    label: 'bedroom home office',
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    new: true,
  },
  {
    id: 3,
    name: 'new soft chair',
    image: '/assets/images/new-soft-chair.png',
    price: '20',
    label: 'living room dining table',
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    new: false,
  },
  {
    id: 4,
    name: 'new light soft chair',
    image: '/assets/images/red-cushion.png',
    price: '80',
    label: 'living room',
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    new: true,
  },
  {
    id: 5,
    name: 'modern soft chair',
    image: '/assets/images/modern-soft-chair.png',
    price: '32',
    label: 'living room',
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    new: false,
  },
  {
    id: 6,
    name: 'old modern soft chair',
    image: '/assets/images/old-modern-soft-chair.png',
    price: '70',
    label: 'living room',
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    new: true,
  },
  {
    id: 7,
    name: 'stylish soft chair',
    image: '/assets/images/stlish-soft-chair.png',
    price: '20',
    label: 'living room',
    colors: ['#A2F78C', '#ABD1E7', '#CCABE7', '#E7ABD2'],
    new: false,
  },
];
