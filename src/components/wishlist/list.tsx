"use client";

import useWishlistStore from "@/stores/wishlist-store";
import { ProductType } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import DefaultButton from "../buttons/default-button";

export default function WishList() {
  const [wishlist, removeFromWishlist] = useWishlistStore((state) => [
    state.wishlist,
    state.removeFromWishlist,
  ]);

  if (wishlist && wishlist.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-3 px-5">
        <h2 className="text-lg">No items in wishlist</h2>

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
    <ul className="grid grid-cols-2 gap-x-2 gap-y-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-x-4 w-5/6 mx-auto">
      {wishlist?.map(({ product }) => (
        <WishlistItem
          key={product.id}
          {...product}
          removeFromWishlist={removeFromWishlist}
        />
      ))}
    </ul>
  );
}

type WishlistItemProps = ProductType & {
  removeFromWishlist: (id: string) => void;
};

const WishlistItem = ({
  id,
  image,
  name,
  removeFromWishlist,
  discount,
}: WishlistItemProps) => {
  return (
    <li className="relative overflow-hidden">
      <Image
        src={image}
        alt={name}
        width={400}
        height={500}
        unoptimized
        className="rounded-t"
      />
      {discount ? (
        <span className="absolute top-0 right-0 px-2 z-10 bg-red-500 text-white rounded-tr">{`-${discount}%`}</span>
      ) : null}
      <DefaultButton
        className="bg-red-400 w-full capitalize py-1 text-white"
        onClick={() => removeFromWishlist(id)}
      >
        remove
      </DefaultButton>

      <h3 className="truncate mt-1">
        <Link
          href={`/products/${id}`}
          className="transition-all duration-200 ease-in-out hover:underline hover:text-purple-600"
        >
          {name}
        </Link>
      </h3>
    </li>
  );
};
