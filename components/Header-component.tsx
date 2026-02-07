"use client";
import { useCart } from "@/store/cartStore";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CartModal from "./cart-modal";
// Assuming you created CartModal.tsx in a 'components' folder

export default function HeaderComponent() {
  const [showMenu, setShowMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // State to control modal visibility

  // Calculate total items for the badge
  const totalItems = useCart((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0),
  );

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

          {/* Shopping Cart Button - Opens the modal */}
          <button
            onClick={() => setIsCartOpen(true)} // Added onClick handler
            className="relative cursor-pointer group hover:scale-110 transition-transform"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-orange-600 transition-colors" />
            {/* Show badge only if items are in the cart */}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          <User className="w-6 h-6 text-gray-700 cursor-pointer hover:text-orange-600 transition-colors hidden sm:block" />

          <Link href="/shop" className="hidden md:block">
            <button className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 transition-all rounded-xl text-white font-semibold text-sm shadow-md active:scale-95">
              Shop now
            </button>
          </Link>

          {/* Mobile Toggle Button */}
          <button
            aria-label="Toggle menu"
            className="md:hidden text-gray-800 p-1 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {/* ... (mobile menu JSX remains the same) ... */}
        <div
          className={`
            absolute top-[calc(100%+10px)] left-0 w-full
            bg-white/95 backdrop-blur-lg shadow-xl rounded-2xl p-6 flex flex-col gap-4 md:hidden
            border border-gray-100 origin-top
            transform transition-all duration-300 ease-out
            ${showMenu ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
          `}
        >
          <Link
            href="/products"
            onClick={() => setShowMenu(false)}
            className="text-gray-700 font-semibold hover:text-orange-600 py-2 border-b border-gray-50"
          >
            All Products
          </Link>
          <Link href="/shop" onClick={() => setShowMenu(false)}>
            <button className="w-full py-3 bg-orange-600 text-white rounded-xl font-bold shadow-orange-200 shadow-lg">
              Shop Now
            </button>
          </Link>
        </div>
      </header>

      {/* RENDER THE CART MODAL HERE */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

// NOTE: Ensure you have created the file components/CartModal.tsx with the code provided in the previous response.
