import { calculateDiscount } from '@/utils/helper-functions';

type ProductPriceProps = {
  price: number;
  discount: number;
};

export default function ProductPrice({ price, discount }: ProductPriceProps) {
  const convertToDecimal = (num: number) => num.toFixed(2);

  const discountedPrice = calculateDiscount(price, discount);

  return (
    <p className='flex gap-5 py-3 items-center'>
      <span className='font-bold self-center text-lg lg:text-xl'>{`$${convertToDecimal(
        discountedPrice
      )}`}</span>
      {discount ? (
        <span
          className={`line-through self-start text-grey-100 text-sm`}
        >{`$${convertToDecimal(price)}`}</span>
      ) : null}
      {discount ? (
        <span className='bg-primary text-white rounded-full px-2 py-3 ml-auto'>{`-${discount}%`}</span>
      ) : null}
    </p>
  );
}
