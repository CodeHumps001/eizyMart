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

/* ---------------- PRODUCT CARD ---------------- */

const ProductCard = ({ product }: { product: Product }) => {
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { addToCart } = useCart();

  const isSaved = isInWishlist(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden">
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-square bg-gray-100 block"
      >
        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full z-10 shadow-md transition ${
            isSaved
              ? "bg-red-500 text-white"
              : "bg-white text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500"
          }`}
        >
          <Heart size={18} className={isSaved ? "fill-current" : ""} />
        </button>

        {/* Image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* Quick Add */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 hidden md:flex bg-black text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-orange-600"
        >
          <ShoppingCart size={18} />
        </button>

        {product.isNew && (
          <span className="absolute top-2 left-2 bg-orange-600 text-white text-[10px] font-black px-2 py-1 rounded-full">
            NEW
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-orange-500">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-bold text-gray-900">
              {product.rating}
            </span>
          </div>
          <span className="text-xs text-gray-400">
            {product.reviewsCount} reviews
          </span>
        </div>

        <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition truncate">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-lg font-black">${product.price}</span>
          {product.oldPrice && (
            <span className="text-sm line-through text-gray-400">
              ${product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
