"use client";

import useWishlistStore from "@/stores/wishlist-store";
import Image from "next/image";
import DefaultButton from "../buttons/default-button";

export default function WishList() {
  const wishlist = useWishlistStore((state) => state.wishlist);
  console.log(wishlist);
  return (
    <ul>
      {wishlist?.map(({ product }) => (
        <li key={product.id}>
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={500}
            unoptimized
            className=""
          />
          <h3>{product.name}</h3>

          <DefaultButton>remove</DefaultButton>
        </li>
      ))}
    </ul>
  );
}
