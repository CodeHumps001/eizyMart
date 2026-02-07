export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isNew: boolean;
  rating: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description:
      "High-quality wireless headphones with noise isolation and long battery life.",
    price: 450,
    category: "Electronics",
    image: "/products/headphones.png",
    isNew: false,
    rating: 4.6,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description:
      "Track your daily activities, heart rate, and sleep with ease.",
    price: 380,
    category: "Electronics",
    image: "/smart-w.jpg",
    isNew: true,
    rating: 4.4,
  },
  {
    id: 3,
    name: "Classic Sneakers",
    description: "Comfortable and stylish sneakers perfect for everyday wear.",
    price: 320,
    category: "Fashion",
    image: "/sneaker.jpg",
    isNew: true,
    rating: 4.5,
  },
  {
    id: 4,
    name: "Leather Crossbody Bag",
    description: "Minimalist leather bag designed for style and convenience.",
    price: 290,
    category: "Fashion",
    image: "/bag.jpg",
    isNew: true,
    rating: 4.3,
  },
  {
    id: 5,
    name: "Portable Power Bank",
    description: "Fast-charging power bank to keep your devices alive all day.",
    price: 180,
    category: "Accessories",
    image: "/products/power-bank.png",
    isNew: false,
    rating: 4.7,
  },
];
