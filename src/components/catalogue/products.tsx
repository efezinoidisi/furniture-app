'use client';

import { ALL_PRODUCTS } from '@/constants/data';
import useSearchParams from '../hooks/use-search-params';
import Category from '../product/category';
import Filter from './filter';
import ProductList from '../product/list';

export default function Products() {
  const { searchParams, updateSearchParams } = useSearchParams();

  const category = searchParams.get('category') ?? '';
  const color = searchParams.get('color') ?? '';
  const price = searchParams.get('price') ?? '0';
  const type = searchParams.get('type') ?? '';

  let filteredProducts = ALL_PRODUCTS.filter((product) =>
    product.label.includes(type)
  );

  return (
    <>
      <Category currentCategory={type} toggleCategory={updateSearchParams} />
      <section className='grid md:grid-cols-7 gap-x-10'>
        <Filter className='hidden md:block md:col-span-2 w-full' />
        <ProductList
          listItems={filteredProducts}
          className='md:col-span-5 w-full md:grid-cols-2 lg:grid-cols-3'
        />
      </section>
    </>
  );
}
