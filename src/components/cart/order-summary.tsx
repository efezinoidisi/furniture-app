'use client';
import Link from 'next/link';
import useCart from '../store/contexts/cart-context';

export default function OrderSummary() {
  const { cart } = useCart();

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
    <div className='col-span-3 md:col-span-1'>
      <h3 className='font-bold text-xl md:text-2xl capitalize mb-3'>
        order summary
      </h3>
      <div className='flex flex-col gap-2 min-h-40'>
        {summaryItems.map(({ name, value }) => (
          <div
            key={name}
            className='flex items-center justify-between text-black/50 last:mt-auto last:text-black last:text-2xl last:font-bold'
          >
            <h5 className='capitalize'>{name}</h5>
            <p>{value}</p>
          </div>
        ))}
      </div>
      <div className='flex items-center gap-2 flex-col text-center capitalize mt-7'>
        <Link
          href={''}
          className='rounded-sl bg-black text-white w-full text-nowrap p-2'
        >
          go to checkout
        </Link>
        <Link
          href={''}
          className='rounded-sl border border-black w-full py-2 text-nowrap px-2'
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
