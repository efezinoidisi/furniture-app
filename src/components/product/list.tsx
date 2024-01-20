import { ProductType } from '@/types/product';
import Product from './product';
type ProductListProps = {
  listItems: ProductType[];
  className?: string;
};

export default function ProductList({
  listItems,
  className,
}: ProductListProps) {
  return (
    <div
      className={`grid gap-x-5 grid-cols-2  gap-y-7 md:gap-y-9 lg:gap-y-12 ${className}`}
    >
      {listItems.length > 0 ? (
        listItems.map((product) => <Product key={product.id} {...product} />)
      ) : (
        <p className='col-span-full text-center'>no products found...</p>
      )}
    </div>
  );
}
