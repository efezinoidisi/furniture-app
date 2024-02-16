'use client';
import createSupabaseClient from '@/lib/supabase/client';
import createSupabaseServerClient from '@/lib/supabase/server';
import { CartItem, ProductType } from '@/types/product';
// import { persist, createJSONStorage } from 'zustand/middleware';

import { create } from 'zustand';
import { useSession } from './contexts/session-context';
import toast from 'react-hot-toast';

export type CartState = {
  cart: CartItem[];
};
export type CartActions = {
  addToCart: (product: ProductType) => void;
  setCart: (list: CartItem[]) => void;
  clearCart: () => void;
  removeFromCart: (product: ProductType) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
};

export type CartStoreType = CartState & CartActions;

export const useCartStore = create<CartStoreType>()((set, get) => ({
  cart: [],
  addToCart: async (product) => {
    // retrieve product from cart cart if it exists
    const cartItem = get().cart.find((item) => item.product.id === product.id);

    // store prev cart state to revert if supabase update fails
    const prevCartState = get().cart;

    // new cart state
    let updatedCart = [];

    // update only quantity of product in cart if the product is already in the cart
    if (cartItem) {
      updatedCart = get().cart.map((item) =>
        item.product.id === product.id
          ? { product: item.product, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [{ product, quantity: 1 }, ...get().cart];
    }
    set({ cart: updatedCart });

    // update supabase data if user is signed in. revert local cart state to previous state if it fails
    const supabase = createSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const updatedProduct = updatedCart.find(
      (item) => item.product.id === product.id
    );
    if (user?.id) {
      try {
        await supabase.from('cart').upsert({
          product_id: product.id,
          quantity: updatedProduct?.quantity,
          user_id: user?.id,
        });
      } catch (error) {
        set({ cart: prevCartState });
        toast.error('please try again!');
      }
    }
  },
  setCart: (list) => {
    set({ cart: list });
  },
  clearCart: async () => {
    // store prev cart state to revert if supabase update fails
    const prevCartState = get().cart;
    set({ cart: [] });
    const supabase = createSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.id) {
      try {
        await supabase.from('cart').delete().eq('user_id', user?.id);
      } catch (error) {
        set({ cart: prevCartState });
        toast.error('please try again!');
      }
    }
  },
  removeFromCart: async (product) => {
    // store prev cart state to revert if supabase update fails
    const prevCartState = get().cart;

    const cart = get().cart.filter((item) => item.product.id !== product.id);

    set({ cart });

    const supabase = createSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.id) {
      try {
        await supabase.from('cart').delete().eq('product_id', product.id);
      } catch (error) {
        set({ cart: prevCartState });
        toast.error('please try again!');
      }
    }
  },
  increaseQuantity: async (id) => {
    // store prev cart state to revert if supabase update fails
    const prevCartState = get().cart;
    set({ cart: [] });
    const supabase = createSupabaseClient();

    const cartItem = prevCartState.find((item) => item.product.id === id);
    const quantity = cartItem?.quantity ? cartItem?.quantity + 1 : 1;

    const newState = prevCartState.map((item) => {
      if (item.product.id === id) {
        return { ...item, quantity };
      }
      return item;
    });

    set({ cart: newState });

    try {
      await supabase.from('cart').update({ quantity }).eq('product_id', id);
    } catch (error) {
      set({ cart: prevCartState });
      toast.error('please try again!');
    }
  },
  decreaseQuantity: async (id) => {
    // store prev cart state to revert if supabase update fails
    const prevCartState = get().cart;
    const cartItem = prevCartState.find((item) => item.product.id === id);
    const quantity = cartItem?.quantity ? cartItem?.quantity - 1 : 1;

    const newState = prevCartState.map((item) => {
      if (item.product.id === id) {
        return { ...item, quantity };
      }
      return item;
    });

    set({ cart: newState });
    const supabase = createSupabaseClient();
    try {
      await supabase.from('cart').update({ quantity }).eq('product_id', id);
    } catch (error) {
      set({ cart: prevCartState });
      toast.error('please try again!');
    }
  },
}));
