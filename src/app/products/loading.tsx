import Top from '@/components/catalogue/top';
import ProductListSkeleton from '@/components/loaders/ProductListSkeleton';

export default function ProductsLoading() {
  return (
    <div className='page-size'>
      <Top />

      <div className='flex justify-end mb-7'>
        <span className='block h-10 w-full md:w-1/3 bg-grey-300 animate-pulse'></span>
      </div>
      <div className='grid md:grid-cols-7 gap-x-10'>
        <div className='hidden md:block h-60 w-full bg-grey-300 md:col-span-2 animate-pulse'></div>
        <ProductListSkeleton className='w-full md:col-span-5' />
      </div>
    </div>
  );
}
