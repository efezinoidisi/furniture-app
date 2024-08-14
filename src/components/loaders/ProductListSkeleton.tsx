import { mergeStyles } from '@/utils/style-helpers';
import ProductSkeleton from './ProductSkeleton';

export default function ProductListSkeleton({
  className = '',
}: {
  className?: string;
}) {
  const products = Array.from({ length: 10 }, (_, index) => index);

  return (
    <div
      className={mergeStyles(
        'grid gap-x-2 md:gap-x-5 grid-cols-2  gap-y-7 md:gap-y-9 lg:gap-y-12',
        className
      )}
    >
      {products.map((product) => (
        <ProductSkeleton key={product} />
      ))}
    </div>
  );
}
