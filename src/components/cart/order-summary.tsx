'use client';
import Link from 'next/link';
import useCart from '../store/contexts/cart-context';

export default function OrderSummary() {
  const { cart } = useCart();

  if (!cart || cart.length === 0) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = cart.reduce(
    (sum, item) =>
      sum + (item?.discount ? getDiscount(item.price, item.discount) : 0),
    0
  );

  const delivery = cart?.length * 50;

  const total = subtotal - discount + delivery;

  const summaryItems = [
    {
      name: 'subtotal',
      value: `$${subtotal}`,
    },
    {
      name: 'discount',
      value: `${discount}`,
    },
    {
      name: 'delivery fee',
      value: `$${delivery}`,
    },
    {
      name: 'total',
      value: `$${total}`,
    },
  ];

  const linkStyles = '';
  return (
    <div className='col-span-3 md:col-span-1 md:sticky md:top-10 h-fit'>
      <h3 className='font-bold text-lg md:text-xl capitalize mb-3'>
        order summary
      </h3>
      <div className='flex flex-col gap-2 min-h-40'>
        {summaryItems.map(({ name, value }) => (
          <div
            key={name}
            className='flex items-center justify-between text-black/50 last:mt-auto last:text-black last:text-xl last:font-bold'
          >
            <h5 className='capitalize'>{name}</h5>
            <p>{value}</p>
          </div>
        ))}
      </div>
      <div className='flex items-center gap-2 flex-col text-center capitalize mt-7'>
        <Link
          href={'/checkout'}
          className='rounded-md bg-black text-white w-full text-nowrap px-2 py-3 transition-colors duration-200 ease-in-out hover:bg-primary/80'
        >
          proceed to checkout
        </Link>
        <Link
          href={'/products'}
          className='rounded-md border border-black w-full py-3 text-nowrap px-2 transition-colors duration-200 ease-in-out hover:border-primary hover:text-primary'
        >
          continue shopping
        </Link>
      </div>
    </div>
  );
}

const getDiscount = (price: number, discount: number) => {
  const amount = price - (price * discount) / 100;

  return price - amount;
};
