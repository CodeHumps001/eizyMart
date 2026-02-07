"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Product, products } from "@/data/product";

export default function Homepage() {
  const newProducts = products.filter((p) => p.isNew);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === newProducts.length - 1 ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [newProducts.length]);

  return (
    <main className="px-3 md:px-20 py-7">
      {/* 1. VIEWPORT: Ensure it is 'w-full' and 'overflow-hidden' */}
      <div className="relative h-[500px] md:h-[600px] w-full rounded-3xl overflow-hidden border shadow-xl">
        {/* 2. THE TRACK: Using 'w-full' here is key */}
        <div
          className="flex h-full w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {newProducts.map((product) => (
            <section
              key={product.id}
              // 3. THE FIX: 'min-w-full' + 'flex-shrink-0'
              // This prevents the slide from squeezing smaller than the screen on mobile
              className="relative min-w-full flex-shrink-0 h-full flex items-center"
            >
              {/* BACKGROUND IMAGE */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/60 md:bg-black/40" />
              </div>

              {/* CONTENT: Left-aligned and padded for mobile */}
              <div className="relative z-10 p-6 md:p-20 text-white w-full">
                <div className="max-w-[280px] sm:max-w-md md:max-w-2xl space-y-4">
                  <span className="text-orange-500 text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
                    New Product
                  </span>
                  <h1 className="text-3xl md:text-7xl font-bold uppercase leading-[1.1] break-words">
                    {product.name}
                  </h1>
                  <p className="text-sm md:text-lg text-gray-300 line-clamp-3">
                    {product.description}
                  </p>
                  <button className="mt-4 bg-orange-500 text-white px-8 py-3 rounded-sm font-bold text-xs tracking-widest hover:bg-orange-400 transition-colors">
                    SEE PRODUCT
                  </button>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* DOTS: Positioned at the bottom center */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {newProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-orange-500" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
