"use client";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Github, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16 px-6 md:px-20 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* TOP SECTION: Logo and Links */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          {/* Brand Identity */}
          <div className="space-y-6 max-w-sm">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-gradient-to-tr from-orange-400 to-orange-700 rounded-xl text-white font-black text-xs uppercase italic">
                eizy
              </span>
              <h2 className="text-2xl font-black text-white tracking-tighter">
                Mart
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-zinc-500">
              Premium tech and accessories designed for the modern lifestyle.
              Elevate your setup with gear that matters.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="hover:text-orange-500 transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="#"
                className="hover:text-orange-500 transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="hover:text-orange-500 transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="hover:text-orange-500 transition-colors"
              >
                <Github size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 w-full md:w-auto">
            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase text-xs tracking-widest">
                Shop
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/products" className="hover:text-orange-500">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/headphones" className="hover:text-orange-500">
                    Headphones
                  </Link>
                </li>
                <li>
                  <Link href="/watches" className="hover:text-orange-500">
                    Watches
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase text-xs tracking-widest">
                Support
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-orange-500">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4 col-span-2 md:col-span-1">
              <h4 className="text-white font-bold uppercase text-xs tracking-widest">
                Contact
              </h4>
              <Link
                href="mailto:hello@eizymart.com"
                className="flex items-center gap-2 text-sm hover:text-orange-500 transition-colors"
              >
                <Mail size={16} />
                hello@eizymart.com
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Copyright */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
          <p>© {currentYear} EIZY MART. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
