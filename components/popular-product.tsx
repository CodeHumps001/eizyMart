"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, ArrowRight, Heart } from "lucide-react";
import { products, Product } from "@/data/product";
import { useCart } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export default function PopularProducts() {
  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <section className="px-4 md:px-20 py-16 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-black uppercase italic bg-gradient-to-r from-orange-400 via-orange-600 to-orange-900 bg-clip-text text-transparent">
            Trending Now
          </h2>
          <p className="text-gray-500 text-xs md:text-sm uppercase tracking-wide">
            Top-rated picks from our collection
          </p>
        </div>

        <Link
          href="/products"
          className="flex items-center gap-2 text-orange-600 font-bold text-sm group"
        >
          EXPLORE ALL
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- PRODUCT CARD (Mobile Optimized) ---------------- */

const ProductCard = ({ product }: { product: Product }) => {
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { addToCart } = useCart();

  const isSaved = isInWishlist(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent navigating to product page
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent navigating to product page
    addToCart(product);
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden relative">
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-square bg-gray-100 block overflow-hidden"
      >
        {/* Wishlist Button: Always visible on mobile, hover on desktop unless active */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2.5 rounded-full z-20 shadow-md transition-all duration-300 
            ${
              isSaved
                ? "bg-red-500 text-white opacity-100 scale-110"
                : "bg-white text-gray-400 md:opacity-0 md:group-hover:opacity-100 hover:text-red-500 active:scale-90"
            }
          `}
        >
          <Heart size={18} className={isSaved ? "fill-current" : ""} />
        </button>

        {/* Image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 md:p-6 transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* Quick Add: Visible on mobile, hover on desktop */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 flex bg-black text-white p-2.5 rounded-full z-20 shadow-lg transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 hover:bg-orange-600 active:scale-95"
        >
          <ShoppingCart size={18} />
        </button>

        {product.isNew && (
          <span className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
            NEW
          </span>
        )}
      </Link>

      {/* Info Section */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-orange-500">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-bold text-gray-900">
              {product.rating}
            </span>
          </div>
          <span className="text-[10px] text-gray-400 font-medium">
            {product.reviewsCount} REVIEWS
          </span>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition truncate text-sm md:text-base">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-lg font-black text-gray-900">
            ${product.price}
          </span>
          {product.oldPrice && (
            <span className="text-xs line-through text-gray-400 font-medium">
              ${product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
