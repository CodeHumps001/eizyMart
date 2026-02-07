"use client";
import { products } from "@/data/product";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Star, ShoppingBag, ArrowLeft, RefreshCw, Truck } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/store/cartStore";
import PopularProducts from "@/components/popular-product";

export default function ProductPage() {
  const { slug } = useParams();
  const addToCart = useCart((state) => state.addToCart);

  const product = products.find((p) => p.slug === slug);

  if (!product)
    return <div className="p-20 text-center">Product not found.</div>;

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-8 py-10 md:py-20">
      {/* Back Link */}
      <Link
        href="/products" // Link back to the main products list
        className="flex items-center gap-2 text-gray-500 hover:text-orange-600 mb-10 transition-colors font-medium text-sm"
      >
        <ArrowLeft size={18} /> Back to Shop
      </Link>

      {/* Main Product Layout */}
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left: Product Image & Details */}
        <div className="flex flex-col gap-8">
          <div className="relative aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              // Removed heavy padding, keeping it subtle
              className="object-contain p-6 md:p-10"
            />
          </div>

          {/* Added a subtle trust builder section */}
          <div className="flex justify-around bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-orange-600" />
              <span className="text-xs font-semibold text-gray-600">
                Free Delivery
              </span>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-orange-600" />
              <span className="text-xs font-semibold text-gray-600">
                30-day Returns
              </span>
            </div>
          </div>
        </div>

        {/* Right: Product Details & CTA */}
        <div className="space-y-8 sticky top-20">
          {" "}
          {/* Sticky ensures details follow scroll */}
          {/* Title and Rating */}
          <div className="space-y-4">
            <span className="text-gray-400 font-bold tracking-[0.2em] uppercase text-xs">
              {product.category}
            </span>

            <h1 className="text-4xl md:text-5xl font-black uppercase text-gray-900 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4">
              <div className="flex items-center text-orange-500 gap-1 bg-orange-50 px-3 py-1 rounded-full">
                <Star size={16} fill="currentColor" />
                <span className="font-bold text-sm text-gray-900">
                  {product.rating}
                </span>
              </div>
              <span className="text-gray-400 text-sm">
                {product.reviewsCount} Customer Reviews
              </span>
            </div>
          </div>
          {/* Description */}
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-lg">
            {product.description}
          </p>
          {/* Pricing and Stock */}
          <div className="space-y-3">
            <p className="text-4xl font-black text-gray-900">
              ${product.price}
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through ml-3 font-medium">
                  ${product.oldPrice}
                </span>
              )}
            </p>
            <p
              className={`text-sm font-bold uppercase ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
            >
              {product.stock > 0
                ? `In Stock (${product.stock} units)`
                : "Out of Stock"}
            </p>
          </div>
          {/* CTA Button */}
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-zinc-900 hover:bg-orange-600 text-white px-12 py-4 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 text-sm"
          >
            Add to Cart
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
      {/* Add Related Products section here later */}
      <PopularProducts />
    </main>
  );
}
