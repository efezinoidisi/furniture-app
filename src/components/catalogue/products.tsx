'use client';

import useSearchParams from '../hooks/use-search-params';

import Filter from './filter';

import ProductList from '../product/list';

import { ProductType } from '@/types/product';
import { useMemo } from 'react';
import Search from './search';

type ProductsProps = {
  products: ProductType[];
};

export default function Products({ products }: ProductsProps) {
  const { searchParams } = useSearchParams(true);

  const category = searchParams.get('category') ?? '';
  const color = searchParams.get('color') ?? '';
  const price = searchParams.get('price') ?? '0-25000';

  const query = searchParams.get('q') ?? '';

  const [minPrice, maxPrice] = price.replaceAll('$', '').split('-');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const includesCategory = product?.category?.name.includes(category);

      const includesColor = color ? product?.colors?.includes(color) : true;

      const isWithinPriceRange =
        product.price >= +minPrice && product.price <= +maxPrice;

      const isProductName = product.name
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());
      return (
        includesCategory && includesColor && isWithinPriceRange && isProductName
      );
    });
  }, [maxPrice, minPrice, products, category, color, query]);

  return (
    <>
      <Search />
      <section className='grid md:grid-cols-7 gap-x-10'>
        <Filter className='hidden md:block md:col-span-2 w-full md:sticky md:top-10 h-fit' />
        <ProductList
          listItems={filteredProducts}
          className='md:col-span-5 w-full md:grid-cols-2 lg:grid-cols-3'
        />
      </section>
    </>
  );
}
