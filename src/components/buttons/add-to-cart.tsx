'use client';
import { ProductType } from '@/types/product';
import DefaultButton from './default-button';
import useCart from '../store/contexts/cart-context';

type AddToCartProps = {
  product: ProductType;
  className: string;
};

export default function AddToCart({ product, className }: AddToCartProps) {
  const { addToCart, cart, removeFromCart } = useCart();

  const checkCart = (id: number) => {
    const product = cart.find((item) => item.id === id) ?? null;
    return product ? true : false;
  };

  const isItemInCart = checkCart(product.id);

  const addItemToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    isItemInCart ? removeFromCart(product) : addToCart(product);
  };

  return (
    <DefaultButton type='button' className={className} onClick={addItemToCart}>
      {isItemInCart ? 'remove' : 'add to cart'}
    </DefaultButton>
  );
}
