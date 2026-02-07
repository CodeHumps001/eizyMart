"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { products } from "@/data/product";
import { ArrowRight } from "lucide-react"; // Optional icon for flair
import Link from "next/link";
import ShopByCat from "@/components/shop-cart-component";
import HeroProductDisplay from "@/components/hero-product";

const categories = [
  {
    name: "Headphones",
    image: "/headphone.jpg",
    href: "/headphones",
  },
  {
    name: "Speakers",
    image: "/speakers.jpg",
    href: "/speakers",
  },
  {
    name: "Earphones",
    image: "/earphone.jpg",
    href: "/earphones",
  },
];
export default function Homepage() {
  return (
    <main className="px-3 md:px-20 py-7">
      {/* 1. VIEWPORT: Ensure it is 'w-full' and 'overflow-hidden' */}
      <HeroProductDisplay />

      <ShopByCat />
    </main>
  );
}
