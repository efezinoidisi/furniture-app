'use client';
import {
  useContext,
  createContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
import { cartReducer } from '../reducers';
import { CartContextType } from '@/types/context';
import { CartItem, ProductType } from '@/types/product';
import { CartAction, QuantityAction } from '@/types/reducers';

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const initialCartState: CartItem[] = [];
  const [IsLocalAvailaible, setIsLocalAvailaible] = useState(false);
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  // temporary hack - update state with local storage data on mount;
  useEffect(() => {
    updateCart(JSON.parse(localStorage.getItem('z-cart') ?? '[]'));
    setIsLocalAvailaible(true);
  }, []);

  // temporary hack - update local storage each item the cart changes also prevent initial update on mount when state is empty
  useEffect(() => {
    if (IsLocalAvailaible) {
      updateLocal(cart);
    }
  }, [cart, IsLocalAvailaible]);

  const addToCart = (product: ProductType) => {
    dispatch({
      type: CartAction.ADD_TO_CART,
      payload: product,
    });
  };

  const removeFromCart = (product: ProductType) => {
    dispatch({
      type: CartAction.REMOVE_FROM_CART,
      payload: product,
    });
  };

  const updateCart = (value: CartItem[]) => {
    dispatch({
      type: 'UPDATE_LIST',
      payload: value,
    });
  };

  const increaseItemQuantity = (id: number) => {
    dispatch({
      type: QuantityAction.INCREASE_QUANTITY,
      payload: id,
    });
  };
  const decreaseItemQuantity = (id: number) => {
    dispatch({
      type: QuantityAction.REDUCE_QUANTITY,
      payload: id,
    });
  };

  // global context values
  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default function useCart() {
  return useContext(CartContext) as CartContextType;
}

const updateLocal = (cart: CartItem[]) => {
  window.localStorage.setItem('z-cart', JSON.stringify(cart));
};
