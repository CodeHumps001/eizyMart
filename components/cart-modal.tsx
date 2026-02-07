"use client";

import { useCart } from "@/store/cartStore";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // 1. Import useRouter

export default function CartModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter(); // 2. Initialize router
  const { cart, setQuantity, removeFromCart, clearCart, getTotalPrice } =
    useCart();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = getTotalPrice();

  const modalClasses = isOpen ? "translate-x-0" : "translate-x-full";

  // 3. Updated Checkout Handler
  const handleCheckout = () => {
    if (cart.length === 0) return;
    onClose(); // Close modal first for a clean transition
    router.push("/checkout"); // Navigate to your multi-form checkout page
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[110] backdrop-blur-sm transition-opacity duration-500"
          onClick={onClose}
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-[400px] bg-white shadow-2xl z-[120]
        transform transition-transform duration-500 ease-in-out ${modalClasses}`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-orange-600" size={20} />
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                Your Cart ({totalQuantity})
              </h2>
            </div>

            <div className="flex items-center gap-4">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[10px] text-gray-400 hover:text-red-500 uppercase font-black tracking-widest transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-50 transition-all"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto space-y-6 pr-2 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="bg-gray-50 p-6 rounded-full mb-4">
                  <ShoppingBag size={40} className="text-gray-300" />
                </div>
                <p className="text-gray-500 font-medium mb-6">
                  Your cart is currently empty.
                </p>
                <button
                  onClick={onClose}
                  className="w-full bg-zinc-900 text-white px-6 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-orange-600 transition-all shadow-lg active:scale-95"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b border-gray-50 pb-6 group"
                >
                  {/* Image */}
                  <div className="relative w-20 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-3 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-grow min-w-0">
                    <h3 className="font-bold text-sm text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm font-black text-orange-600 mt-1">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center mt-3 bg-gray-50 rounded-xl w-fit border border-gray-100">
                      <button
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:text-orange-600 transition-colors"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="px-2 text-xs font-black w-8 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:text-orange-600 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Item Total + Remove */}
                  <div className="flex flex-col items-end justify-between h-24 py-1">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                    <p className="text-sm font-black text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="mt-auto pt-8 border-t border-gray-100">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
                    Subtotal
                  </p>
                  <span className="text-sm text-gray-500 italic">
                    Shipping calculated at checkout
                  </span>
                </div>
                <span className="text-3xl font-black text-gray-900 tracking-tighter">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-zinc-900 hover:bg-orange-600 text-white py-5 rounded-[1.25rem] font-bold uppercase text-xs tracking-[0.2em] transition-all active:scale-95 shadow-xl shadow-zinc-200 flex items-center justify-center gap-3"
              >
                Secure Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
