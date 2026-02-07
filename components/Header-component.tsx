"use client";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HeaderComponent() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <header className="sticky top-3 w-11/12 p-5 m-auto flex justify-between items-center  rounded-2xl px-4 py-2 bg-white/5 backdrop-blur-2xl mt-2 border border-white/10 md:w-9/12">
        <div className="flex justify-center items-center gap-1">
          <span className="p-2 bg-linear-240 from-orange-300 to-orange-700 rounded-2xl text-white font-semibold text-sm">
            eizy
          </span>
          <h1 className="text-2xl font-bold text-orange-100">Mart</h1>
        </div>

        <div className="flex justify-center items-center gap-5">
          {/* Desktop Nav */}
          <Link
            href="/products"
            className="hidden md:block text-gray-500 hover:text-orange-500 transition-all"
          >
            Product
          </Link>

          <div className="relative cursor-pointer hover:scale-110 transition-transform">
            <ShoppingCart className="w-7 h-7 text-gray-700" />
            <span className="absolute -top-3 -right-2 bg-orange-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </div>

          <User className="text-gray-700 hover:scale-110 transition-transform" />

          <Link href="/shop" className="hidden md:block">
            <button className="px-7 py-3 bg-orange-600 hover:bg-orange-700 transition-colors rounded-3xl text-white font-semibold shadow-sm hover:shadow-xl">
              Shop now
            </button>
          </Link>

          {/* Mobile Toggle */}
          <button
            aria-label="Toggle menu"
            aria-expanded={showMenu}
            className="md:hidden text-orange-600 p-1"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`
    absolute top-full left-1/2 -translate-x-1/2 w-11/12 mt-2
    bg-white shadow-2xl rounded-2xl p-6 flex flex-col gap-4 md:hidden z-50
    border border-gray-100
    transform transition-all duration-300 ease-out
    ${showMenu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
  `}
      >
        <Link
          href="/products"
          onClick={() => setShowMenu(false)}
          className="text-gray-600 font-medium hover:text-orange-500 border-b pb-2"
        >
          Product
        </Link>
        <Link href="/shop" onClick={() => setShowMenu(false)}>
          <button className="w-full py-3 bg-orange-600 text-white rounded-xl font-semibold">
            Shop now
          </button>
        </Link>
      </div>
    </div>
  );
}
