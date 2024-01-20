import { CartItem, ProductType } from './product';

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (product: ProductType) => void;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
};
