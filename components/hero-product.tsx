"use client";
import { products } from "@/data/product";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroProductDisplay() {
  const newProducts = products.filter((p) => p.isNew);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (newProducts.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === newProducts.length - 1 ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [newProducts.length]);

  return (
    // 1. VIEWPORT: overflow-hidden is mandatory here
    <div className="relative w-full h-[550px] md:h-[650px] rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl">
      {/* 2. THE TRACK: 
          - Removed 'w-full' from the inner div to prevent width calculation bugs on mobile 
          - Added 'will-change-transform' for smoother performance on mobile browsers
      */}
      <div
        className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${newProducts.length * 100}%`, // Explicitly set track width based on items
        }}
      >
        {newProducts.map((product) => (
          <section
            key={product.id}
            // 3. THE FIX:
            // - w-full here refers to 1/Nth of the track width (which is 100% of the viewport)
            // - flex-shrink-0 prevents mobile browsers from "squeezing" the slide
            className="relative w-full flex-shrink-0 h-full flex items-center select-none"
          >
            {/* BACKGROUND IMAGE */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover opacity-70"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
            </div>

            {/* CONTENT AREA */}
            <div className="relative z-10 p-8 md:p-24 text-white w-full">
              <div className="max-w-[280px] sm:max-w-md md:max-w-2xl space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-orange-500 text-xs md:text-sm font-bold tracking-[0.4em] uppercase">
                    New Arrival
                  </span>
                </div>

                <h1 className="text-3xl md:text-7xl font-bold uppercase leading-[1.1] break-words">
                  {product.name}
                </h1>

                <p className="text-sm md:text-lg text-gray-300 line-clamp-3 md:line-clamp-none">
                  {product.description}
                </p>

                <div className="flex items-center gap-4">
                  <span className="text-2xl md:text-5xl font-extrabold text-orange-500">
                    ${product.price}
                  </span>
                </div>

                <Link
                  href={`/product/${product.slug}`}
                  className="inline-block pt-2"
                >
                  <button className="bg-orange-600 text-white px-8 py-3 md:px-10 md:py-4 rounded-sm font-bold text-xs tracking-widest hover:bg-orange-500 transition-all uppercase active:scale-95 shadow-lg shadow-orange-900/20">
                    See Product
                  </button>
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* 4. DOTS NAVIGATION */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {newProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? "w-8 bg-orange-500"
                : "w-2 bg-white/20 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
