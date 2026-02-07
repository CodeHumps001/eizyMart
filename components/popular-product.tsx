"use client";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, ArrowRight, Heart } from "lucide-react"; // 2. Import the Heart icon
import { products } from "@/data/product";
import { useWishlist } from "@/store/cartStore";

export default function PopularProducts() {
  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <section className="px-4 md:px-20 py-16 bg-gray-50">
      {/* HEADER SECTION - UPDATED WITH GRADIENT */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-orange-400 via-orange-600 to-orange-900 bg-clip-text text-transparent">
            Trending Now
          </h2>
          <p className="text-gray-500 text-xs md:text-sm font-medium tracking-wide uppercase">
            Top-rated picks from our collection
          </p>
        </div>

        <Link
          href="/products"
          className="flex items-center gap-2 text-orange-600 font-bold text-xs md:text-sm hover:text-orange-700 transition-all group"
        >
          EXPLORE ALL
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {/* Grid: 2 columns on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
        {featuredProducts.map((product) => (
          // 3. Inner component to use hook within a map
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

// 4. Create a separate component to use the useWishlist hook properly within the map
const ProductCard = ({ product }: { product: (typeof products)[0] }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isSaved = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent linking to product page when clicking heart
    if (isSaved) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100">
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-square w-full bg-gray-100 overflow-hidden"
      >
        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-lg z-10 transition-colors ${
            isSaved
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-white text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500"
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart size={18} className={isSaved ? "fill-current" : ""} />
        </button>

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* Quick Add Overlay */}
        <button className="absolute bottom-2 right-2 hidden md:flex bg-black text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 hover:bg-orange-600">
          <ShoppingCart size={18} />
        </button>

        {product.isNew && (
          <span className="absolute top-2 left-2 bg-orange-600 text-white text-[8px] md:text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
            New
          </span>
        )}
      </Link>

      {/* Info Section */}
      <div className="p-3 md:p-5 space-y-2 md:space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-orange-500 gap-1">
            <Star size={12} fill="currentColor" />
            <span className="text-[10px] md:text-xs font-bold text-gray-900">
              {product.rating}
            </span>
          </div>
          <span className="text-[9px] md:text-xs text-gray-400 font-medium">
            {product.reviewsCount} REVIEWS
          </span>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors truncate text-sm md:text-lg">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2 md:gap-3">
          <span className="text-base md:text-2xl font-black text-gray-900">
            ${product.price}
          </span>
          {product.oldPrice && (
            <span className="text-[10px] md:text-sm text-gray-400 line-through font-medium">
              ${product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
