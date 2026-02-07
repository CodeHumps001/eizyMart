"use client";
import { useState, useMemo, useRef, useEffect } from "react";
// 1. Import the Heart icon and the new Wishlist store
import {
  Star,
  ShoppingCart,
  SlidersHorizontal,
  X,
  Search,
  Heart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products, Product } from "@/data/product";
import { useWishlist } from "@/store/cartStore";

const allCategories = [
  "All",
  ...Array.from(new Set(products.map((p) => p.category))),
];

// 2. Updated ProductCard component with Wishlist functionality
const ProductCard = ({ product }: { product: Product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isSaved = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating when the heart is clicked
    if (isSaved) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100">
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-square w-full bg-gray-100 overflow-hidden"
      >
        {/* Wishlist Button Overlay */}
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
        <button className="absolute bottom-3 right-3 bg-black text-white p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-orange-600">
          <ShoppingCart size={18} />
        </button>
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            New
          </span>
        )}
      </Link>
      <div className="p-4 space-y-2">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors truncate text-sm md:text-base">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-gray-900">
            ${product.price}
          </span>
          <div className="flex items-center text-orange-500 gap-1">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-bold text-gray-900">
              {product.rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Product Listing Page Component (remains mostly the same) ---

export default function ProductListingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (activeCategory !== "All") {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating-desc":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [activeCategory, searchTerm, sortBy]);

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <h1 className="text-4xl font-black text-gray-900 mb-10">
        Our Collection
      </h1>

      {/* Search Bar (Mobile & Desktop) */}
      <div ref={searchRef} className="mb-8 relative max-w-lg mx-auto md:mx-0">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
          />
        </div>

        {/* Search Suggestions Dropdown */}
        {showSuggestions && searchTerm && (
          <div className="absolute z-10 w-full bg-white shadow-2xl mt-1 rounded-xl border border-gray-200 max-h-60 overflow-y-auto">
            {filteredAndSortedProducts.slice(0, 5).map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="flex items-center p-3 hover:bg-gray-100 border-b last:border-b-0"
                onClick={() => setShowSuggestions(false)}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="object-contain mr-3"
                />
                <span className="text-sm font-medium">{product.name}</span>
              </Link>
            ))}
            {filteredAndSortedProducts.length === 0 && (
              <p className="p-3 text-sm text-gray-500">
                No matching products found.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Categories Tabs */}
      <div className="flex gap-3 mb-8 overflow-x-auto whitespace-nowrap scroll-smooth pb-3">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setSearchTerm("");
            }}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm border ${
              activeCategory === category
                ? "bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-200"
                : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Layout for Products and Filters */}
      <div className="flex gap-10">
        {/* Desktop Filters */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">Filters</h3>
            <div className="space-y-3">
              {allCategories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="categoryFilter"
                    value={cat}
                    checked={activeCategory === cat}
                    onChange={() => setActiveCategory(cat)}
                    className="form-radio text-orange-600 h-4 w-4 focus:ring-orange-500"
                  />
                  <span className="text-gray-600 capitalize">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile Filters Modal (remains same) */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 bg-white z-50 p-8 md:hidden">
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="absolute top-4 right-4 p-2"
            >
              <X size={24} />
            </button>
            <div className="mt-10 space-y-4">
              <h3 className="text-2xl font-bold">Refine Results</h3>
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setIsMobileFilterOpen(false);
                  }}
                  className="block w-full text-left py-2 border-b capitalize"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Product Grid Area */}
        <section className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-500 font-semibold">
              {filteredAndSortedProducts.length} items found
            </p>

            <div className="flex items-center gap-4">
              {/* Sorting Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Top Rated</option>
              </select>

              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="md:hidden flex items-center gap-2 p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <SlidersHorizontal size={18} /> Filters
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
