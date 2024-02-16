'use client';
import { ProductType } from '@/types/product';
import { useCartStore } from '../store/cart-store';

type OrderPreviewProps = {
  product: ProductType | null;
};

export default function OrderPreview({ product }: OrderPreviewProps) {
  const cart = useCartStore((state) => state.cart);
  if (!cart || cart.length === 0) return null;
  const previewItems = product ? [product] : cart;
  return (
    <ul className='md:w-3/4 md:mx-auto'>
      <p>order preview</p>
    </ul>
  );
}
