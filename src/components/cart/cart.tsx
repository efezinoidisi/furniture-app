import { CartItem } from '@/types/product';
import Image from 'next/image';
import ProductCount from '../product/product-count';
import DefaultButton from '../buttons/default-button';
import { Icons } from '@/lib/icons';
import useCart from '../store/contexts/cart-context';

export default function Cart(props: CartItem) {
  const { name, id, price, discount, image } = props;
  const discountedPrice = discount ? price - price * (discount / 100) : price;
  const { removeFromCart } = useCart();
  return (
    <div className='grid grid-cols-3 gap-x-3 border-b border-grey-300 py-3 relative bg-white'>
      <div className='lg:max-h-40 relative col-span-1 row-span-3 '>
        <Image
          src={image}
          alt={name}
          width={400}
          height={500}
          className='object-cover object-center aspect-square w-full h-full rounded-2xl'
          unoptimized
        />
      </div>
      <div className='col-span-2 md:col-span-1'>
        <h3 className='truncate capitalize font-bold'>{name}</h3>
        <ProductCount id={id} />
      </div>

      <div className='col-start-2 row-start-3 flex items-center justify-between w-full col-span-2 md:justify-start md:gap-7 md:col-start-3 md:flex-col'>
        <p className='flex gap-2 py-3 items-center'>
          <span className='font-bold self-center text-xl md:text-2xl lg:text-3xl'>{`$${discountedPrice?.toFixed(
            2
          )}`}</span>
          <span
            className={`${
              discount ? 'line-through' : ''
            } self-start text-grey-100 text-sm md:text-base`}
          >{`$${price?.toFixed(2)}`}</span>
          {discount ? (
            <span className='bg-primary text-white rounded-full px-2 py-3 ml-auto'>{`-${discount}%`}</span>
          ) : null}
        </p>
        <DefaultButton
          onClick={() => removeFromCart(props)}
          className='group w-fit absolute top-3 right-3'
          id='remove'
          aria-label='remove item from cart'
        >
          <Icons.close className='group-hover:text-primary' />
        </DefaultButton>
      </div>
    </div>
  );
}
