"use client";
import { useCart } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useUserStore } from "@/store/userStore"; // Import the user store
import { Menu, X, ShoppingCart, User, Heart, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CartModal from "./cart-modal";

export default function HeaderComponent() {
  const [showMenu, setShowMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 1. Hook into all stores
  const totalItems = useCart((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0),
  );
  const wishlistCount = useWishlistStore((state) => state.wishlist.length);
  const { user, logout } = useUserStore(); // Get user state

  return (
    <div className="relative h-20">
      <header className="fixed z-[100] top-4 left-1/2 -translate-x-1/2 w-11/12 md:w-9/12 p-4 flex justify-between items-center rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg transition-all duration-300">
        <Link href="/">
          <div className="flex justify-center items-center gap-1">
            <span className="p-2 bg-gradient-to-tr from-orange-400 to-orange-700 rounded-xl text-white font-semibold text-xs md:text-sm">
              eizy
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Mart
            </h1>
          </div>
        </Link>

        <div className="flex justify-center items-center gap-4 md:gap-6">
          <Link
            href="/products"
            className="hidden md:block text-gray-600 font-medium hover:text-orange-600 transition-colors"
          >
            Products
          </Link>

          <Link
            href="/wishlist"
            className="relative cursor-pointer group hover:scale-110 transition-transform"
          >
            <Heart className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-colors" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative cursor-pointer group hover:scale-110 transition-transform"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-orange-600 transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          {/* 2. AUTHENTICATION UI LOGIC */}
          {user ? (
            <div className="hidden sm:flex items-center gap-3 bg-gray-100/50 pl-3 pr-1 py-1 rounded-full border border-gray-200">
              <span className="text-[10px] font-black uppercase tracking-tight text-gray-900">
                Hi, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                className="p-1.5 bg-white rounded-full text-gray-400 hover:text-red-500 shadow-sm transition-colors"
                title="Logout"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <Link href="/auth/login">
              <User className="w-6 h-6 text-gray-700 cursor-pointer hover:text-orange-600 transition-colors hidden sm:block" />
            </Link>
          )}

          <Link href="/products" className="hidden md:block">
            <button className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 transition-all rounded-xl text-white font-semibold text-sm shadow-md active:scale-95">
              Shop now
            </button>
          </Link>

          <button
            className="md:hidden text-gray-800 p-1 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute top-[calc(100%+10px)] left-0 w-full bg-white/95 backdrop-blur-lg shadow-xl rounded-2xl p-6 flex flex-col gap-4 md:hidden border border-gray-100 origin-top transform transition-all duration-300 ease-out ${showMenu ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
        >
          <Link
            href="/products"
            onClick={() => setShowMenu(false)}
            className="text-gray-700 font-semibold hover:text-orange-600 py-2 border-b border-gray-50"
          >
            All Products
          </Link>
          <Link
            href="/wishlist"
            onClick={() => setShowMenu(false)}
            className="text-gray-700 font-semibold hover:text-red-500 py-2 border-b border-gray-50"
          >
            My Wishlist ({wishlistCount})
          </Link>

          {/* Mobile Auth Link */}
          {user ? (
            <button
              onClick={() => {
                logout();
                setShowMenu(false);
              }}
              className="text-left text-red-500 font-semibold py-2 border-b border-gray-50"
            >
              Logout ({user.name})
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setShowMenu(false)}
              className="text-gray-700 font-semibold hover:text-orange-600 py-2 border-b border-gray-50"
            >
              Login / Register
            </Link>
          )}

          <Link href="/shop" onClick={() => setShowMenu(false)}>
            <button className="w-full py-3 bg-orange-600 text-white rounded-xl font-bold shadow-orange-200 shadow-lg">
              Shop Now
            </button>
          </Link>
        </div>
      </header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
