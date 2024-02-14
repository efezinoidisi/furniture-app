import { ProductType } from '@/types/product';
import Product from '../product/product';
import CarouselWrapper from './carousel-wrap';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCarousel({
  products,
}: {
  products: ProductType[];
}) {
  return (
    <CarouselWrapper>
      {products.map((product) => (
        <li
          key={product.id}
          className='min-w-40 relative inline-block snap-mandatory snap-x scroll-p-6'
        >
          <Link
            href={`/products/${product.id}`}
            className='block h-full  w-full group'
          >
            <div className='w-full h-56 relative rounded-t-2xl overflow-hidden'>
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={500}
                className='object-cover object-center aspect-square w-full h-full  group-hover:scale-125 transition-transform duration-500 ease-in-out'
                unoptimized
              />
            </div>

            <div className='absolute bottom-0 bg-black/50 w-full text-white p-2 rounded-b-2xl'>
              <h4 className='truncate capitalize font-bold'>{product.name}</h4>
              <p>${product.price}</p>
            </div>
          </Link>
        </li>
      ))}
    </CarouselWrapper>
  );
}
