'use client';

import { heroProducts, categories } from '@/constants/data';
import Link from 'next/link';
import ProductList from '../product/list';
import useCategory from '../hooks/useCategory';

export default function SectionOne() {
  const { currentCategory, toggleCategory } = useCategory();

  const filteredProducts = heroProducts.filter((product) =>
    product.label.includes(currentCategory)
  );

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
      <ProductList listItems={filteredProducts} />
    </section>
  );
}
