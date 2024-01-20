import BreadCrump from '@/components/breadcrumb/breadcrump';
import AddToCart from '@/components/buttons/add-to-cart';
import Back from '@/components/buttons/back';
import DefaultButton from '@/components/buttons/default-button';
import Colors from '@/components/product/colors';
import ProductCount from '@/components/product/product-count';
import Share from '@/components/product/share';
import { ALL_PRODUCTS } from '@/constants/data';
import { Icons } from '@/lib/icons';
import { getProduct } from '@/utils/helper-functions';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: {
    productId: string;
  };
};

export default function page(props: Props) {
  const { params } = props;

  const { productId } = params;

  const product = getProduct(+productId, ALL_PRODUCTS) ?? null;

  if (!product) {
    throw new Error('product not found');
  }
  const breadCrump = [
    {
      path: '/products',
      title: 'all products',
    },
    {
      path: 'product',
      title: product.name,
    },
  ];

  const discountedPrice = product.discount
    ? product.price - product.price * (product?.discount / 100)
    : product.price;
  return (
    <main className='page-size flex flex-col gap-y-3 md:gap-y-5 lg:gap-y-7 mt-7 pb-10'>
      <Back />
      <h2 className='sr-only'>product details</h2>
      <BreadCrump items={breadCrump} />
      <div className='flex items-center gap-5 text-grey-100'>
        <DefaultButton className='flex items-center gap-1 text-black capitalize'>
          <Icons.bookmark className='bg-[#DFE7EB] p-2 rounded-full' size={40} />{' '}
          save
        </DefaultButton>
        <Share />
      </div>

      <section className='grid md:grid-cols-2 gap-10'>
        <div className='w-full h-full relative'>
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={750}
            className='object-cover object-center aspect-square w-full h-full rounded-2xl'
            unoptimized
          />
        </div>

        <div className='flex flex-col justify-center gap-3'>
          <h3 className='capitalize font-bold text-2xl md:text-3xl lg:text-[2rem] font-fira-code'>
            {product.name}
          </h3>
          <p className='text-sm md:text-base leading-7 text-[#5e5d6c8e]'>
            {product.description}
          </p>
          <p className='flex gap-5 py-3 items-center'>
            <span className='font-bold self-center text-2xl md:text-3xl lg:text-4xl'>{`$${discountedPrice?.toFixed(
              2
            )}`}</span>
            <span
              className={`${
                product?.discount ? 'line-through' : ''
              } self-start text-grey-100 text-base`}
            >{`$${product.price?.toFixed(2)}`}</span>
            {product?.discount ? (
              <span className='bg-primary text-white rounded-full px-2 py-3 ml-auto'>{`-${product.discount}%`}</span>
            ) : null}
          </p>
          <span
            className={`self-end px-2 py-1 rounded-3xl capitalize bg-[#DBDEE4] ${
              product.inStock ? 'text-[#0DB03A]' : 'text-pink-600'
            }`}
          >
            {product.inStock ? 'in stock' : 'sold out'}
          </span>
          <Colors colors={product.colors} />
          <ProductCount id={product.id} />
          <div className='flex items-center gap-5'>
            <AddToCart
              product={product}
              className='bg-black border border-black hover:bg-inherit text-white hover:text-inherit px-6 py-2 capitalize w-full'
            />
            <Link
              href={'/checkout'}
              className='px-6 py-2 capitalize border border-black w-full hover:bg-primary/60 hover:text-white hover:border-0  text-center'
            >
              buy now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
