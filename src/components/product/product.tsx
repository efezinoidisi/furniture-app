import Image from 'next/image';
import DefaultButton from '../buttons/default-button';
import Link from 'next/link';
import { ProductType } from '@/types/product';
import Colors from './colors';
import AddToCart from '../buttons/add-to-cart';

export default function Product(props: ProductType) {
  const { id, name, image, price, label, colors, promo } = props;
  return (
    <div className='min-h-[16rem] md:min-h-max '>
      <Link
        href={`/products/${id}`}
        className=' flex flex-col justify-between w-full h-full gap-y-2'
      >
        <div className='w-full h-40 relative'>
          <Image
            src={image}
            alt={name}
            width={400}
            height={500}
            className='object-cover object-center aspect-square w-full h-full rounded-2xl'
            unoptimized
          />
          {promo ? (
            <span className='absolute top-1 left-1 py-1 px-2 md:px-3 lg:px-5 rounded-xl bg-plain'>
              {promo}
            </span>
          ) : null}
        </div>
        <div className=' flex flex-col gap-2'>
          <h4 className='capitalize truncate text-grey-200 text-[0.8rem] text-lg'>
            {name}
          </h4>
          <Colors colors={colors} />
          <div className='flex items-center justify-between font-bold'>
            <p className=' text-md md:text-lg lg:text-xl'>{`$${price}.00`}</p>
            <AddToCart
              product={props}
              className='bg-[#D4DCFB] text-black px-1 py-2 rounded-2xl md:px-2 text-sm md:text-base capitalize'
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
