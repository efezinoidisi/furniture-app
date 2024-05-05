import {
  calculateDiscount,
  formatPriceToString,
} from "@/utils/helper-functions";

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
  const discountedPrice = discount ? calculateDiscount(price, discount) : price;

  return (
    <p className="flex gap-5 py-3 items-center">
      <span className="font-bold self-center text-lg lg:text-xl">
        {formatPriceToString(discountedPrice)}
      </span>
      {discount ? (
        <span className={`line-through self-start text-grey-100 text-sm`}>
          {formatPriceToString(price)}
        </span>
      ) : null}
      {discount && showDiscount ? (
        <span className="bg-primary/50 text-white rounded-full px-2 py-3 ml-auto">{`-${discount}%`}</span>
      ) : null}
    </p>
  );
}
