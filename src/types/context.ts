import { CartItem, ProductType } from "./product";

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (product: ProductType) => void;
  increaseItemQuantity: (id: string) => void;
  decreaseItemQuantity: (id: string) => void;
  totalItemsInCart: () => number;
  clearCart: () => void;
};

export type SessionContextType = {
  isSignedIn: boolean;
};
