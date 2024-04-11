"use client";

import { useCartStore } from "@/providers/cart-store-provider";
import Image from "next/image";
import Link from "next/link";
import DefaultButton from "../buttons/default-button";
import Cart from "./cart";

export default function List() {
  const [cart, clearCart] = useCartStore((state) => [
    state.cart,
    state.clearCart,
  ]);

  const sizeOfcart = cart.length;

  if (cart && sizeOfcart === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-3 px-5 md:col-span-3">
        <h2 className="text-lg">No items in cart</h2>

        <div className="relative border">
          <Image
            src={"/assets/images/Empty-bro.svg"}
            alt=""
            width={400}
            height={400}
            unoptimized
          />
          <a
            href="https://storyset.com/work"
            className="absolute bottom-0 text-xs right-1 underline hover:text-blue-600"
          >
            Work illustrations by Storyset
          </a>
        </div>
        <Link
          href={"/products"}
          className="bg-black/90 text-white transition-colors duration-200 ease-linear hover:bg-primary/90 py-2 rounded px-6"
        >
          Explore the Shop
        </Link>
      </div>
    );
  }
  return (
    <div className="col-span-3 md:col-span-2 flex flex-col">
      <DefaultButton
        className="w-fit border self-end my-3 px-3 py-2 bg-grey-300/70 hover:text-primary transition-colors ease-in-out duration-200"
        onClick={clearCart}
      >
        clear all items
      </DefaultButton>
      <div className="grid  gap-6">
        {cart?.map((item) => (
          <Cart key={item.product?.id} {...item} />
        ))}
      </div>
    </div>
  );
}
