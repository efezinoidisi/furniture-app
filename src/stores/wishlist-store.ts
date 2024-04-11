import createSupabaseClient from "@/lib/supabase/client";
import { ProductType, WishlistType } from "@/types/product";
import { toast } from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type WishlistState = {
  wishlist: WishlistType[];
};

type WishlistActions = {
  addToWishlist: (product: ProductType) => void;
  setWishlist: (list: WishlistType[]) => void;
  removeFromWishlist: (id: string) => void;
};

type WishlistStoreType = WishlistState & WishlistActions;

const useWishlistStore = create<WishlistStoreType>()(
  persist(
    (set, get) => ({
      wishlist: [],
      addToWishlist: async (product) => {
        const prevState = get().wishlist;

        const isProductInWishlist = !!prevState.find(
          (item) => item.product.id === product.id
        );

        if (isProductInWishlist) return;

        set((state) => ({ wishlist: [...state.wishlist, { product }] }));

        toast.success(`${product.name} added to wishlist`);

        const supabase = createSupabaseClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user?.id) {
          try {
            await supabase.from("wishlist").upsert({
              product_id: product.id,
              user_id: user.id,
            });
          } catch (error) {
            set({ wishlist: prevState });
            toast.error("please try again!");
          }
        }
      },
      setWishlist: (list) => {
        set({ wishlist: list });
      },
      removeFromWishlist: async (id) => {
        const prevState = get().wishlist;

        const updatedWishlist = prevState.filter(
          (item) => item.product.id !== id
        );
        set({ wishlist: updatedWishlist });
        const supabase = createSupabaseClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user?.id) {
          try {
            await supabase.from("wishlist").delete().eq("product_id", id);
          } catch (error) {
            set({ wishlist: prevState });
            // toast.error("please try again!");
          }
        }
      },
    }),
    {
      name: "z-wishlist",

      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useWishlistStore;
