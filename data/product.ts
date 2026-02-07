export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: "watches" | "headphones" | "speakers" | "accessories";
  image: string;
  images?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewsCount: number;
  stock: number;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Smart Fitness Watch",
    slug: "smart-fitness-watch",
    description:
      "Track your daily activities, heart rate, sleep, and workouts with this sleek smart fitness watch.",
    price: 899,
    oldPrice: 1099,
    category: "watches",
    image: "/smart-w.jpg",
    images: ["/products/watch-1.png", "/products/watch-2.png"],
    isNew: true,
    isFeatured: true,
    rating: 4.6,
    reviewsCount: 128,
    stock: 24,
  },
  {
    id: "p2",
    name: "Wireless Headphones",
    slug: "wireless-headphones",
    description:
      "Premium wireless headphones with deep bass, noise isolation, and all-day comfort.",
    price: 599,
    oldPrice: 749,
    category: "headphones",
    image: "/products/headphones-1.png",
    isFeatured: false,
    rating: 4.4,
    reviewsCount: 86,
    stock: 40,
  },
  {
    id: "p3",
    name: "Portable Bluetooth Speaker",
    slug: "portable-bluetooth-speaker",
    description:
      "Compact and powerful Bluetooth speaker with crystal-clear sound and long battery life.",
    price: 499,
    category: "speakers",
    image: "/bluetooth-p.jpg",
    rating: 4.3,
    reviewsCount: 64,
    stock: 32,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "p4",
    name: "Noise Cancelling Headset",
    slug: "noise-cancelling-headset",
    description:
      "Over-ear noise cancelling headset perfect for music, work, and travel.",
    price: 799,
    oldPrice: 999,
    category: "headphones",
    image: "/headphone.jpg",
    rating: 4.7,
    reviewsCount: 102,
    stock: 18,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "p5",
    name: "Smart Watch Pro",
    slug: "smart-watch-pro",
    description:
      "Advanced smart watch with AMOLED display, GPS, and health monitoring features.",
    price: 1199,
    category: "watches",
    image: "/smart-pro.jpg",
    isNew: true,
    rating: 4.8,
    reviewsCount: 56,
    stock: 15,
    isFeatured: true,
  },
];
