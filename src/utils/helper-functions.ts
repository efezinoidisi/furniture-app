import { categories } from "@/constants/data";
import { CartItem } from "@/types/product";

export async function getCategories() {
  return categories;
}

export function calculateDiscount(price: number, discount: number = 0) {
  return discount ? price - price * (discount / 100) : price;
}

export function formatPriceToString(price: number) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

export function dateString(created_at: string) {
  return new Date(created_at).toLocaleDateString("en-us", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function calculateTotals(itemsList: Array<CartItem>) {
  const getDiscount = (price: number, discount: number) => {
    const amount = price - (price * discount) / 100;

    return price - amount;
  };

  const subtotal = itemsList.reduce(
    (sum, item) => sum + item?.product.price * item.quantity,
    0
  );

  const discount = itemsList.reduce(
    (sum, item) =>
      sum +
      item.quantity *
        (item?.product.discount
          ? getDiscount(item.product.price, item.product.discount)
          : 0),
    0
  );

  const delivery = itemsList?.length * 150;

  const total = subtotal - discount + delivery;
  
  return {total,delivery,subtotal,discount}
}
