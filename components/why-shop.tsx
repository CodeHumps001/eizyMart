"use client";
import { Truck, ShieldCheck, RefreshCw, Headset } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-8 h-8 text-orange-600" />,
    title: "Free Delivery",
    description: "Free shipping on all orders over $50. No hidden fees.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-orange-600" />,
    title: "Secure Payments",
    description: "100% payment protection. Your data is always encrypted.",
  },
  {
    icon: <RefreshCw className="w-8 h-8 text-orange-600" />,
    title: "Easy Returns",
    description:
      "Not satisfied? Return your item within 30 days, no questions asked.",
  },
];

export default function WhyShopWithUs() {
  return (
    <section className="px-6 md:px-20 py-20 bg-white">
      {/* Section Header */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-gray-900">
          Why Shop With <span className="text-orange-600">Eizy Mart</span>
        </h2>
        <div className="h-1.5 w-24 bg-orange-600 mx-auto rounded-full" />
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group flex flex-col items-center text-center p-8 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-2xl hover:shadow-orange-100 transition-all duration-500"
          >
            {/* Icon Wrapper */}
            <div className="mb-6 p-5 bg-white rounded-2xl shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
              {feature.icon}
            </div>

            {/* Text Content */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
              {feature.title}
            </h3>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-[250px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
