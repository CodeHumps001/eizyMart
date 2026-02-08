import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie"; // Import js-cookie

interface UserState {
  user: { name: string; email: string } | null;
  setLogin: (name: string, email: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,

      /* ---- SET LOGIN (Store + Cookie) ---- */
      setLogin: (name, email) => {
        // 1. Set the cookie so Middleware can protect routes on the server
        Cookies.set("eizy_auth", "true", { expires: 7 });

        // 2. Update local state
        set({ user: { name, email } });
      },

      /* ---- LOGOUT (Clear Store + Remove Cookie) ---- */
      logout: () => {
        // 1. Remove the cookie to unlock the Middleware gate
        Cookies.remove("eizy_auth");

        // 2. Clear local state
        set({ user: null });
      },
    }),
    {
      name: "eizy-user",
    },
  ),
);
