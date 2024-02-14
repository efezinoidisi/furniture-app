import Image from 'next/image';
import Link from 'next/link';
import { ProductType } from '@/types/product';
import Colors from './colors';
import AddToCart from '../buttons/add-to-cart';
import DefaultButton from '../buttons/default-button';
import { Icons } from '@/lib/icons';

export default function Product(props: ProductType) {
  const { id, name, image, price, colors, promo, discount } = props;

  const formattedPrice = parseFloat(`${price}`).toFixed(2);

  return (
    <li className='min-h-[16rem] md:h-fit group overflow-hidden relative'>
      <DefaultButton className='absolute top-2 right-2 bg-grey-300/50 p-1 rounded-full z-10'>
        <Icons.heart className='text-primary' />
      </DefaultButton>
      {promo ? (
        <span className='absolute top-0 left-0 py-1 px-2 capitalize rounded-xl bg-plain -rotate-[35deg] min-w-[8rem] text-center -ml-8 text-sm z-10'>
          {promo}
        </span>
      ) : null}
      <Link
        href={`/products/${id}`}
        className=' flex flex-col justify-between w-full h-full gap-y-2 border border-grey-300 pb-4 rounded-t-2xl rounded-b-md '
        prefetch={false}
      >
        <div className='w-full h-40 relative rounded-t-2xl overflow-hidden'>
          <Image
            src={image}
            alt={name}
            width={400}
            height={500}
            className='object-cover object-center aspect-square w-full h-full  group-hover:scale-125 transition-transform duration-500 ease-in-out'
            unoptimized
          />

          {discount ? (
            <span className='absolute bottom-0 left-0 px-2 z-10 bg-red-600 text-white'>{`-${discount}%`}</span>
          ) : null}
        </div>
        <div className=' flex flex-col gap-2 px-2'>
          <h4 className='capitalize truncate text-grey-200 text-[0.8rem] text-lg'>
            {name}
          </h4>
          <Colors colors={colors} />
          <div className='flex items-center justify-between font-bold'>
            <p className=' text-lg'>{`$${formattedPrice}`}</p>
            <AddToCart
              product={props}
              className='bg-[#D4DCFB] text-black px-2 py-2 rounded-2xl text-sm text-nowrap hover:bg-black hover:text-white transition-colors duration-200 ease-linear md:px-3'
            />
          </div>
        </div>
      </Link>
    </li>
  );
}
