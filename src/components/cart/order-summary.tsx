"use client";
import { useCartStore } from "@/providers/cart-store-provider";
import { CartItem } from "@/types/product";
import { calculateTotals, formatPriceToString } from "@/utils/helper-functions";
import { mergeStyles } from "@/utils/style-helpers";
import Link from "next/link";

interface OrderSummaryProps {
  showLinks?: boolean;
  items?: CartItem[] | null;
  styles?: string;
}

export default function OrderSummary({
  showLinks = true,
  items = null,
  styles = "",
}: OrderSummaryProps) {
  const { cart } = useCartStore((state) => state);

  if ((!cart || !cart.length) && !items) return null;

  const itemsList = items || cart;

  const { subtotal, total, delivery, discount } = calculateTotals(itemsList);

  const summaryItems = [
    {
      name: "subtotal",
      value: formatPriceToString(subtotal),
    },
    {
      name: "discount",
      value: `${discount}`,
    },
    {
      name: "delivery fee",
      value: formatPriceToString(delivery),
    },
    {
      name: "total",
      value: formatPriceToString(total),
    },
  ];

  return (
    <div
      className={mergeStyles(
        "col-span-3 md:col-span-1 md:sticky md:top-10 h-fit",
        styles
      )}
    >
      <h3 className="font-bold text-lg md:text-xl capitalize mb-3">
        order summary
      </h3>
      <div className="flex flex-col gap-2 min-h-40">
        {summaryItems.map(({ name, value }) => (
          <div
            key={name}
            className="flex items-center justify-between text-black/80 last:mt-auto last:text-black last:text-xl last:font-bold"
          >
            <h5 className="capitalize">{name}</h5>
            <p>{value}</p>
          </div>
        ))}
      </div>
      {showLinks && (
        <div className="flex items-center gap-2 flex-col text-center  mt-7">
          <Link
            href={"/checkout"}
            className="rounded-md bg-black text-white w-full text-nowrap px-2 py-4 transition-colors duration-200 ease-in-out hover:bg-primary/80"
          >
            Proceed to Checkout
          </Link>
          <Link
            href={"/products"}
            className="rounded-md border border-black w-full py-4 text-nowrap px-2 transition-colors capitalize duration-200 ease-in-out hover:border-primary hover:text-primary"
          >
            continue shopping
          </Link>
        </div>
      )}
    </div>
  );
}

const getDiscount = (price: number, discount: number) => {
  const amount = price - (price * discount) / 100;

  return price - amount;
};
