import { ProductType } from "@/types/product";
import { useEffect, useState } from "react";

export default function useWishlist() {
  const [isClient, setIsClient] = useState(false);

  const [wishlist, setWishlist] = useState<ProductType[]>([]);

  useEffect(() => {
    setIsClient(true);

    setWishlist(JSON.parse(localStorage.getItem("z-wishlist") || "[]"));
  }, []);

  // useEffect(() => {
  // }, [wishlist]);
  console.log(wishlist);

  const addToWishlist = (product: ProductType) => {
    console.log(!!productInWishlist(product.id));
    if (!!productInWishlist(product.id)) return;
    setWishlist((prev) => [...prev, product]);
    localStorage.setItem("z-wishlist", JSON.stringify([...wishlist, product]));
  };

  function productInWishlist(id: string) {
    return wishlist.find((product) => product.id === id);
  }

  return { wishlist, addToWishlist };
}
