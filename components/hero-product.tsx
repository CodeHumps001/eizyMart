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
    <div className="relative w-full h-[550px] md:h-[650px] rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl">
      {/* THE TRACK: 
          - Keep width at w-full
          - translateX(-100%) works perfectly when children are min-w-full
      */}
      <div
        className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {newProducts.map((product) => (
          <section
            key={product.id}
            className="relative min-w-full flex-shrink-0 h-full flex items-center select-none"
          >
            {/* PRODUCT IMAGE:
                - Use object-contain so it's not "zoomed in"
                - Added md:w-1/2 and right-0 to keep it on the right side on desktop
            */}
            <div className="absolute inset-0 md:left-1/2 z-0 pointer-events-none">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover md:object-right object-center p-6 md:p-12"
                priority
              />
            </div>

            {/* GRADIENT: Ensures text readability regardless of image size */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-1" />

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

      {/* DOTS NAVIGATION */}
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
