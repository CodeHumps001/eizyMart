import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface UserState {
  user: { name: string; email: string } | null;
  setLogin: (name: string, email: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,

      /* ---- SET LOGIN ---- */
      setLogin: (name, email) => {
        // ADD { path: "/" } HERE
        // This makes the cookie available to the Middleware on /products and /checkout
        Cookies.set("eizy_auth", "true", { expires: 7, path: "/" });

        set({ user: { name, email } });
      },

      /* ---- LOGOUT ---- */
      logout: () => {
        // ADD { path: "/" } HERE TOO
        // You must use the same path to remove it as you did to set it
        Cookies.remove("eizy_auth", { path: "/" });

        set({ user: null });
      },
    }),
    {
      name: "eizy-user",
    },
  ),
);
