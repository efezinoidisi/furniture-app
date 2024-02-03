export type CategoryType = {
  id: string;
  name: string;
};

export type ProductType = {
  id: string;
  name: string;
  image: string;
  price: number;
  category: CategoryType;
  colors: string[];
  promo: string;
  description: string;
  stock: number;
  discount: number;
};

export type CartItem = ProductType & {
  quantity: number;
};
