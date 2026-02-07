import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  wishlist: string[]; // store ONLY product IDs (cleaner & scalable)
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],

      toggleWishlist: (productId) => {
        const current = get().wishlist;
        const exists = current.includes(productId);

        set({
          wishlist: exists
            ? current.filter((id) => id !== productId)
            : [...current, productId],
        });
      },

      isInWishlist: (productId) => {
        return get().wishlist.includes(productId);
      },

      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: "eizy-mart-wishlist",
    },
  ),
);
