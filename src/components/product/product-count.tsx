"use client";
import { Icons } from "@/lib/icons";
import DefaultButton from "../buttons/default-button";

import { useCartStore } from "@/providers/cart-store-provider";

type ProductCountProps = {
  id: string;
  stock: number;
};

export default function ProductCount({ id, stock }: ProductCountProps) {
  const [increaseItemQuantity, cart, decreaseItemQuantity] = useCartStore(
    (state) => [state.increaseQuantity, state.cart, state.decreaseQuantity]
  );
  const product = cart?.find((item) => item.product.id === id) ?? null;

  const itemInCart = !!product;
  return (
    <div className="flex border border-grey-300 w-fit text-center">
      <DefaultButton
        className="p-1 lg:size-10 flex justify-center items-center text-primary disabled:text-grey-300 disabled:pointer-events-none"
        onClick={() => decreaseItemQuantity(id)}
        disabled={product?.quantity === 1 || !itemInCart}
      >
        <Icons.minus />
      </DefaultButton>
      <span className="border-x border-grey-300 min-w-10 flex justify-center items-center px-2">
        {product?.quantity ?? 1}
      </span>
      <DefaultButton
        className="p-1 lg:size-10 flex justify-center items-center text-primary disabled:text-grey-300 disabled:pointer-events-none"
        onClick={() => increaseItemQuantity(id)}
        disabled={!itemInCart || product.quantity === stock}
      >
        <Icons.plus />
      </DefaultButton>
    </div>
  );
}
