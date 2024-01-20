import { ProductType } from '@/types/product';

export function getProduct(id: number, list: ProductType[]) {
  return list.find((product) => product.id === id);
}
