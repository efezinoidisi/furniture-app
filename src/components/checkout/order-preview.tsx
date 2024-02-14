'use client';
import { ProductType } from '@/types/product';
import useCart from '../store/contexts/cart-context';

type OrderPreviewProps = {
  product: ProductType | null;
};

export default function OrderPreview({ product }: OrderPreviewProps) {
  const { cart } = useCart();
  if (!cart || cart.length === 0) return null;
  const previewItems = product ? [product] : cart;
  return (
    <div className='md:w-3/4 md:mx-auto'>
      <p>order preview</p>
    </div>
  );
}
