import { categories } from "@/constants/data";

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
