"use client";

import { Icons } from "@/lib/icons";
import useWishlistStore from "@/stores/wishlist-store";
import Link from "next/link";

export default function WishlistLink() {
  const wishlist = useWishlistStore((state) => state.wishlist);

  const size = wishlist.length;

  return (
    <Link
      href={"/wishlist"}
      className="text-primary rounded-[2rem] px-1 py-2 capitalize relative link group"
      prefetch
    >
      <Icons.heart className="group-hover:fill-white" />
      {size ? (
        <span className="absolute top-0 right-0 rounded-full bg-primary text-center text-white text-xs size-5 flex justify-center items-center">
          {size > 10 ? "10+" : size}
        </span>
      ) : null}
    </Link>
  );
}
