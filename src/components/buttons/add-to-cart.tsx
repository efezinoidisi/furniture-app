'use client';
import { ProductType } from '@/types/product';
import DefaultButton from './default-button';
import useCart from '../store/contexts/cart-context';
import { Icons } from '@/lib/icons';

type AddToCartProps = {
  product: ProductType;
  className: string;
  showText?: boolean;
};

export default function AddToCart({
  product,
  className,
  showText = false,
}: AddToCartProps) {
  const { addToCart, cart } = useCart();

  const addItemToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addToCart(product);
  };

  return (
    <DefaultButton type='button' className={className} onClick={addItemToCart}>
      {showText ? 'Add to cart' : <Icons.cart size={20} />}
    </DefaultButton>
  );
}
