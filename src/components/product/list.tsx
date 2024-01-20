import { ProductType } from '@/types/product';
import Product from './product';
type ProductListProps = {
  listItems: ProductType[];
};

export default function ProductList({ listItems }: ProductListProps) {
  return (
    <div className='grid gap-x-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-7 md:gap-y-9 lg:gap-y-12'>
      {listItems.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
}
