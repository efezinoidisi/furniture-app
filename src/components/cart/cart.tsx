import { CartItem } from '@/types/product';
import Image from 'next/image';
import ProductCount from '../product/product-count';
import DefaultButton from '../buttons/default-button';
import { Icons } from '@/lib/icons';
import ProductPrice from '../shared/product-price';
import { calculateDiscount } from '@/utils/helper-functions';
import { useCartStore } from '../store/cart-store';

export default function Cart(props: CartItem) {
  const { product, quantity } = props;
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  if (!product) return null;
  const { name, image, id, discount, price } = product;

  return (
    <div className='grid grid-cols-3 gap-x-3 px-2 rounded-md border-grey-300 py-3 relative bg-white/90'>
      <Image
        src={image}
        alt={name}
        width={400}
        height={500}
        className='border-grey-200/50 border aspect-square w-20 rounded-2xl'
        unoptimized
      />

      <div>
        <h3 className='truncate capitalize font-bold'>{name}</h3>
        <ProductPrice price={price} discount={discount} showDiscount={false} />
        <ProductCount id={id} />
      </div>
      <div className='flex items-end justify-between flex-col w-full '>
        <DefaultButton
          onClick={() => removeFromCart(product)}
          className='group w-fit'
          id='remove'
          aria-label='remove item from cart'
        >
          <Icons.close className='group-hover:text-primary' />
        </DefaultButton>

        <p className='flex flex-col items-center border px-2 bg-white'>
          <span className='capitalize font-medium'>subtotal</span>

          <span>
            $
            {(discount ? calculateDiscount(price, discount) : price) * quantity}
          </span>
        </p>
      </div>
    </div>
  );
}
