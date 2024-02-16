import { categories } from '@/constants/data';

export async function getCategories() {
  return categories;
}

export function calculateDiscount(price: number, discount: number = 0) {
  return discount ? price - price * (discount / 100) : price;
}
