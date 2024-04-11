export type CategoryType = {
  id: string;
  name: string;
} | null;

export type ProductType = {
  id: string;
  name: string;
  image: string;
  price: number;
  category?: CategoryType;
  colors: string[] | null;
  promo: string | null;
  description: string | null;
  stock: number;
  discount: number | null;
};

export type CartItem = {
  product: ProductType;
  quantity: number;
};

export type WishlistType = {
  product: ProductType;
};
