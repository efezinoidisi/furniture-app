import { calculateDiscount } from '@/utils/helper-functions';

type ProductPriceProps = {
  price: number;
  discount: number | null;
  showDiscount?: boolean;
};

export default function ProductPrice({
  price,
  discount,
  showDiscount = true,
}: ProductPriceProps) {
  const convertToDecimal = (num: number) => num.toFixed(2);

  const discountedPrice = discount ? calculateDiscount(price, discount) : price;

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
      {discount && showDiscount ? (
        <span className='bg-primary text-white rounded-full px-2 py-3 ml-auto'>{`-${discount}%`}</span>
      ) : null}
    </p>
  );
}
