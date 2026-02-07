import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/product";

/* ---------------- TYPES ---------------- */

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string | number) => void;
  setQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

/* ---------------- STORE ---------------- */

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      /* ---- ADD TO CART (Fixed Logic) ---- */
      addToCart: (product) => {
        const cart = get().cart;

        // Use String() wrapper to ensure ID types match correctly
        const existingItem = cart.find(
          (item) => String(item.id) === String(product.id),
        );

        if (existingItem) {
          // Prevent exceeding stock limit
          if (existingItem.quantity >= product.stock) return;

          set({
            cart: cart.map((item) =>
              String(item.id) === String(product.id)
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          // Add new item if it doesn't exist
          set({
            cart: [...cart, { ...product, quantity: 1 }],
          });
        }
      },

      /* ---- REMOVE ITEM COMPLETELY ---- */
      removeFromCart: (productId) =>
        set({
          cart: get().cart.filter(
            (item) => String(item.id) !== String(productId),
          ),
        }),

      /* ---- SET QUANTITY (SAFE) ---- */
      setQuantity: (productId, quantity) => {
        const cart = get().cart;

        if (quantity <= 0) {
          set({
            cart: cart.filter((item) => String(item.id) !== String(productId)),
          });
          return;
        }

        set({
          cart: cart.map((item) =>
            String(item.id) === String(productId)
              ? {
                  ...item,
                  quantity: Math.min(quantity, item.stock),
                }
              : item,
          ),
        });
      },

      /* ---- CLEAR CART ---- */
      clearCart: () => set({ cart: [] }),

      /* ---- DERIVED VALUES ---- */
      // Correctly calculates sum of all quantities for the badge
      getTotalItems: () =>
        get().cart.reduce((total, item) => total + item.quantity, 0),

      getTotalPrice: () =>
        get().cart.reduce(
          (total, item) => total + (item.price || 0) * item.quantity,
          0,
        ),
    }),
    {
      name: "eizy-mart-cart", // Key used in LocalStorage
    },
  ),
);
