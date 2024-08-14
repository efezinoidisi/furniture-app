import { Icons } from '@/lib/icons';
import { ProductType } from '@/types/product';
import Link from 'next/link';
import Category from '../product/category';
import ProductList from '../product/list';

type SectionOneProps = {
  products: ProductType[];
  type: string;
};

export default function SectionOne({ products, type }: SectionOneProps) {
  // const { searchParams, updateSearchParams } = useSearchParams();
  const currentCategory = type;
  const filteredProducts = products.filter((product) => {
    return currentCategory
      ? product.category?.name === currentCategory
      : product;
  });

  return (
    <section className='relative after:content-[""] after:absolute after:top-96 bg-fixed after:w-16 after:h-32 after:bg-spot-gradient after:blur-2xl after: after:-right-0 after:-z-10 page-size lg:after:-right-20 flex flex-col'>
      <h2 className='capitalize text-xl md:text-3xl lg:text-5xl font-bold   text-center text-pretty md:text-nowrap'>
        stylish collection of
        <span className='bg-[url("/assets/images/arrow2.svg")] bg-no-repeat bg-right bg-cover'>
          {' '}
          Furniture
        </span>
      </h2>
      <p className='text-grey-100 text-base md:text-lg lg:text-xl leading-7 lg:leading-8 my-3 text-center text-pretty'>
        Shop our amazing collection of luxury furniture and furnish your home in
        style
      </p>
      <Category currentCategory={currentCategory} />
      <ProductList
        listItems={filteredProducts.slice(0, 12)}
        className='md:grid-cols-3 lg:grid-cols-4'
        isClient={false}
      />
      <Link
        href={'/products'}
        className='bg-black text-white px-5 py-2 flex gap-3 capitalize w-fit self-end mt-6'
      >
        shop more
        <Icons.right />
      </Link>
    </section>
  );
}
