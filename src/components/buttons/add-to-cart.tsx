'use client';
import { Icons } from '@/lib/icons';
import { useCartStore } from '@/providers/cart-store-provider';
import { ProductType } from '@/types/product';

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
  const addToCart = useCartStore((state) => state.addToCart);
  const addItemToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addToCart(product);
  };

  return (
    <button
      type='button'
      className={className}
      onClick={addItemToCart}
      aria-label='add to cart'
    >
      {showText ? 'Add to cart' : <Icons.cart size={20} />}
    </button>
  );
}
