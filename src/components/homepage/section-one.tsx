'use client';

import { heroProducts } from '@/constants/data';
import ProductList from '../product/list';
import Category from '../product/category';
import useSearchParams from '../hooks/use-search-params';

export default function SectionOne() {
  const { searchParams, updateSearchParams } = useSearchParams();
  const currentCategory = searchParams.get('type') ?? '';
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
        Furnitures in the industry
      </p>
      <Category
        currentCategory={currentCategory}
        toggleCategory={updateSearchParams}
      />
      <ProductList
        listItems={filteredProducts}
        className='md:grid-cols-3 lg:grid-cols-4'
      />
    </section>
  );
}
