'use client';
import { Icons } from '@/lib/icons';
import DefaultButton from '../buttons/default-button';
import useCart from '../store/contexts/cart-context';

type ProductCountProps = {
  id: number;
};

export default function ProductCount({ id }: ProductCountProps) {
  const { increaseItemQuantity, decreaseItemQuantity, cart } = useCart();

  const product = cart?.find((item) => item.id === id) ?? null;

  const itemInCart = !!product;
  return (
    <div className='flex border border-grey-300 w-fit text-center'>
      <DefaultButton
        className='size-10 flex justify-center items-center text-primary disabled:text-grey-300 disabled:pointer-events-none'
        onClick={() => decreaseItemQuantity(id)}
        disabled={product?.quantity === 1 || !itemInCart}
      >
        <Icons.minus />
      </DefaultButton>
      <span className='border-x border-grey-300 min-w-10 flex justify-center items-center px-2'>
        {product?.quantity ?? 1}
      </span>
      <DefaultButton
        className='size-10 flex justify-center items-center text-primary disabled:text-grey-300 disabled:pointer-events-none'
        onClick={() => increaseItemQuantity(id)}
        disabled={!itemInCart}
      >
        <Icons.plus />
      </DefaultButton>
    </div>
  );
}
