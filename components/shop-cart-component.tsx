"use client";
import { ArrowRight } from "lucide-react"; // Optional icon for flair
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Headphones",
    image: "/headphone.jpg",
    href: "/",
  },
  {
    name: "Speakers",
    image: "/speakers.jpg",
    href: "/",
  },
  {
    name: "Earphones",
    image: "/earphone.jpg",
    href: "/",
  },
];

export default function ShopByCat() {
  return (
    <section className="px-6 md:px-20 py-20 flex flex-col gap-5">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 space-y-2">
        <h2 className="bg-gradient-to-r from-orange-400 to-orange-900 text-transparent bg-clip-text text-3xl md:text-4xl font-bold uppercase tracking-widest">
          Shop by Category
        </h2>
        <div className="h-1 w-20 bg-orange-500 rounded-full" />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-20 gap-x-8 ">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="group relative bg-gray-100 rounded-2xl p-8 pt-24 flex flex-col items-center transition-all hover:bg-gray-200"
          >
            {/* Image floating above the card */}
            <div className="absolute -top-16 w-40 h-40 drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-contain rounded-4xl"
              />
            </div>

            {/* Category Details */}
            <h3 className="text-gray-900 font-bold uppercase tracking-wider text-lg mt-2">
              {category.name}
            </h3>

            <div className="flex items-center gap-2 mt-4 text-gray-500 font-bold text-sm group-hover:text-orange-600 transition-colors">
              SHOP
              <ArrowRight size={16} className="text-orange-500" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
