"use client";

import { Icons } from "@/lib/icons";
import useWishlistStore from "@/stores/wishlist-store";
import { ProductType } from "@/types/product";
import { mergeStyles } from "@/utils/style-helpers";

type AddToWishlistProps = {
  product: ProductType;
  variant?: "save" | "default";
};

export default function AddToWishlist({
  product,
  variant = "default",
}: AddToWishlistProps) {
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  return (
    <button
      type="button"
      aria-label="add to wishlist"
      className={mergeStyles(
        "absolute top-2 right-2 bg-grey-300/50 p-1 rounded-full z-10",
        variant === "save" &&
          "flex static items-center gap-1 text-black capitalize bg-inherit"
      )}
      onClick={() => addToWishlist(product)}
    >
      {variant === "save" ? (
        <>
          <Icons.bookmark className="bg-[#DFE7EB] p-2 rounded-full" size={40} />{" "}
          save
        </>
      ) : (
        <Icons.heart className="text-primary" />
      )}
    </button>
  );
}
