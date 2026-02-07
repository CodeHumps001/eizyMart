"use client";
import { products } from "@/data/product"; // Import your master product list
import { useWishlistStore } from "@/store/wishlistStore";
import { useCart } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowLeft, HeartOff } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlistStore();
  const { addToCart, cart } = useCart();

  // 1. Map the IDs in the wishlist to the actual product objects
  const wishlistItems = products.filter(
    (p) =>
      wishlist.includes(String(p.id)) || wishlist.includes(Number(p.id) as any),
  );

  // 2. Check if item is already in cart to disable button
  const isAlreadyInCart = (id: string | number) =>
    cart.some((item) => String(item.id) === String(id));

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 min-h-[80vh]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-black uppercase text-gray-900 tracking-tight">
            Saved Items
          </h1>
          <p className="text-gray-500 font-medium">
            {wishlistItems.length} products waiting for you
          </p>
        </div>
        <Link
          href="/products"
          className="flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
        >
          <ArrowLeft size={18} /> Continue Shopping
        </Link>
      </div>

      {wishlistItems.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
          <div className="bg-white p-6 rounded-full shadow-sm mb-6">
            <HeartOff size={48} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mb-8 max-w-xs text-center">
            Looks like you haven't saved any favorites yet. Start exploring our
            collection!
          </p>
          <Link href="/products">
            <button className="bg-zinc-900 text-white px-10 py-4 rounded-2xl font-bold uppercase text-sm hover:bg-orange-600 transition-all shadow-lg active:scale-95">
              Browse Products
            </button>
          </Link>
        </div>
      ) : (
        /* Wishlist Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {wishlistItems.map((product) => {
            const inCart = isAlreadyInCart(product.id);

            return (
              <div
                key={product.id}
                className="group bg-white rounded-[2rem] border border-gray-100 p-4 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative"
              >
                {/* Remove Button */}
                <button
                  onClick={() => toggleWishlist(String(product.id))}
                  className="absolute top-6 right-6 z-10 p-2.5 bg-white/90 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 shadow-md transition-all hover:scale-110"
                  title="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </button>

                <Link href={`/products/${product.slug}`}>
                  <div className="relative aspect-square bg-gray-50 rounded-[1.5rem] overflow-hidden mb-5">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                  </div>
                </Link>

                <div className="space-y-2 px-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.15em]">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-gray-900 truncate leading-tight mt-1">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xl font-black text-gray-900">
                    ${product.price}
                  </p>
                </div>

                {/* Add to Cart Button */}
                <button
                  disabled={inCart || product.stock === 0}
                  onClick={() => addToCart(product)}
                  className={`w-full mt-6 py-4 rounded-2xl font-bold uppercase text-[11px] tracking-widest flex items-center justify-center gap-2 transition-all shadow-md ${
                    inCart
                      ? "bg-green-50 text-green-600 border border-green-100 cursor-default"
                      : product.stock === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-zinc-900 text-white hover:bg-orange-600 active:scale-95"
                  }`}
                >
                  {inCart
                    ? "In Your Cart"
                    : product.stock === 0
                      ? "Sold Out"
                      : "Add to Cart"}
                  {!inCart && product.stock > 0 && <ShoppingBag size={14} />}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
