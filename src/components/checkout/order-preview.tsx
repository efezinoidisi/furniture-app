'use client';
import { ProductType } from '@/types/product';
import { useCartStore } from '../store/cart-store';
import Image from 'next/image';
import { formatPriceToString } from '@/utils/helper-functions';
import OrderSummary from '../cart/order-summary';

type OrderPreviewProps = {
  product: ProductType | null;
};

export default function OrderPreview({ product }: OrderPreviewProps) {
  const cart = useCartStore((state) => state.cart);

  const previewItems = product ? [{ product, quantity: 1 }] : cart;

  if (!previewItems || !previewItems.length) return null;
  return (
    <div className='md:w-3/4 md:mx-auto'>
      <h3 className='capitalize text-xl font-semibold'>order preview</h3>
      <ul className='grid gap-2 my-5 border-b pb-3'>
        {previewItems.map((item) => (
          <li key={item.product.id} className='flex gap-2 items-center'>
            <Image
              src={item.product.image}
              alt={item.product.name}
              width={200}
              height={200}
              className='border-grey-200/50 border aspect-square w-14 rounded-2xl'
              unoptimized
            />
            <p className='text-grey-400 flex flex-col gap-3'>
              <span className='truncate inline-block font-medium'>
                {item.product.name}
              </span>
              <span>{formatPriceToString(item.product.price)}</span>
            </p>
          </li>
        ))}
      </ul>
      <OrderSummary
        items={product ? previewItems : null}
        styles='md:col-span-1 md:relative'
        showLinks={false}
      />
    </div>
  );
}
