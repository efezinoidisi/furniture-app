"use client";

import { Icons } from "@/lib/icons";
import useWishlistStore from "@/stores/wishlist-store";
import { ProductType } from "@/types/product";

type AddToWishlistProps = {
  product: ProductType;
};

export default function AddToWishlist({ product }: AddToWishlistProps) {
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  return (
    <button
      type="button"
      aria-label="add to wishlist"
      className="absolute top-2 right-2 bg-grey-300/50 p-1 rounded-full z-10"
      onClick={() => addToWishlist(product)}
    >
      <Icons.heart className="text-primary" />
    </button>
  );
}
