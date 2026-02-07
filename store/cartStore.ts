import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/product";

// Define what a "Cart Item" looks like (Product + Quantity)
interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, amount: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((item) => item.id === product.id);

        if (existingItem) {
          // If item exists, just increase quantity
          set({
            cart: currentCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          // Add new item with quantity 1
          set({ cart: [...currentCart, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId) =>
        set({ cart: get().cart.filter((item) => item.id !== productId) }),

      updateQuantity: (productId, amount) => {
        const newCart = get().cart.map((item) => {
          if (item.id === productId) {
            const newQty = Math.max(1, item.quantity + amount);
            return { ...item, quantity: newQty };
          }
          return item;
        });
        set({ cart: newCart });
      },

      clearCart: () => set({ cart: [] }),

      getTotalPrice: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    { name: "eizy-mart-storage" }, // This saves the cart to LocalStorage automatically
  ),
);
