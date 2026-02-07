"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function PromoBanner() {
  return (
    // 1. Added 'max-w-7xl mx-auto' to keep it aligned with other sections on ultra-wide screens
    <section className="px-4 md:px-20 py-16 max-w-[1440px] mx-auto w-full">
      {/* MAIN BANNER CARD */}
      <div className="relative w-full min-h-[400px] md:h-[450px] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-zinc-950 shadow-2xl group">
        {/* BACKGROUND IMAGE CONTAINER */}
        <div className="absolute inset-0 z-0 opacity-40 group-hover:scale-105 transition-transform duration-1000">
          <Image
            src="/earphone.jpg"
            alt="Accessories Promo"
            fill
            className="object-cover"
            sizes="100vw"
          />
          {/* GRADIENT OVERLAY: Stronger on the left to ensure text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        {/* CONTENT LAYER: Added flex-grow and proper padding constraints */}
        <div className="relative z-10 h-full w-full flex flex-col justify-center p-8 md:p-20">
          <div className="max-w-2xl space-y-6 md:space-y-8">
            {/* BADGE */}
            <div className="flex items-center gap-2 px-4 py-1.5 bg-orange-600/20 border border-orange-500/30 rounded-full w-fit backdrop-blur-md">
              <Zap size={14} className="text-orange-500 fill-orange-500" />
              <span className="text-[10px] md:text-xs font-black text-orange-400 uppercase tracking-[0.2em]">
                Limited Offer
              </span>
            </div>

            {/* TEXT BLOCK */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-7xl font-black text-white uppercase leading-[0.95] tracking-tighter">
                Up to <span className="text-orange-500">30% OFF</span> <br />
                <span className="text-zinc-400">Accessories</span>
              </h2>
              <p className="text-zinc-400 text-sm md:text-xl font-medium max-w-lg leading-relaxed">
                Upgrade your setup with premium gear. Valid for the next 24
                hours only.
              </p>
            </div>

            {/* CTA BUTTON */}
            <div className="pt-4">
              <Link href="/products?category=accessories">
                <button className="flex items-center gap-3 bg-white text-black px-8 py-4 md:px-12 md:py-5 rounded-2xl font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all shadow-xl active:scale-95 group/btn">
                  Claim Discount
                  <ArrowRight
                    size={20}
                    className="group-hover/btn:translate-x-2 transition-transform"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* DECORATIVE GLOW (Positioned relative to the card edge) */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
      </div>
    </section>
  );
}
