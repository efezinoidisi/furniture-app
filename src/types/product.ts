export type ProductType = {
  id: number;
  name: string;
  image: string;
  price: number;
  label: string;
  colors: string[];
  promo: string;
  description: string;
  inStock: boolean;
  discount?: number;
};

export type CartItem = ProductType & {
  quantity: number;
};
