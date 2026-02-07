"use client";
import { useCart } from "@/store/cartStore";
import { X, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const cart = useCart((state) => state.cart);
  const totalPrice = useCart((state) => state.getTotalPrice());
  const updateQuantity = useCart((state) => state.updateQuantity);
  const clearCart = useCart((state) => state.clearCart);

  // 1. FIX THE BUG: Calculate total quantity of all items, not just unique product length
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const modalClasses = isOpen ? "translate-x-0" : "translate-x-full";

  const handleCheckout = () => {
    // Navigate to checkout page or trigger checkout process
    onClose();
    // Example: Router.push('/checkout');
  };

  return (
    <>
      {/* Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[110] backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Modal */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-[120] transform transition-transform duration-500 ease-in-out ${modalClasses}`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h2 className="text-2xl font-black text-gray-900">
              Your Cart ({totalQuantity}) {/* Use totalQuantity here */}
            </h2>
            <div className="flex items-center gap-4">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors uppercase font-bold tracking-wider"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close cart"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Cart Items List (Scrollable Area) */}
          <div className="flex-grow overflow-y-auto space-y-6 pr-2">
            {cart.length === 0 ? (
              <div className="text-center mt-10">
                <p className="text-gray-500 mb-4">Your cart is empty 🙁</p>
                <button
                  onClick={onClose}
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-4 last:border-b-0"
                >
                  <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-sm truncate hover:text-orange-600 cursor-pointer">
                      {item.name}
                    </h3>
                    <p className="text-sm font-bold text-orange-600">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls: Added active/hover states for "live" feel */}
                    <div className="flex items-center mt-2 border rounded-md w-fit shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 border-r hover:bg-gray-100 transition-colors active:bg-gray-200 rounded-l-md"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 border-l hover:bg-gray-100 transition-colors active:bg-gray-200 rounded-r-md"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  {/* Total price for this item */}
                  <p className="text-sm font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Button */}
          {cart.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-gray-900">Total:</span>
                <span className="text-3xl font-black text-orange-600">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-zinc-900 hover:bg-orange-600 text-white py-4 rounded-xl font-bold uppercase transition-all shadow-lg active:scale-95 text-sm tracking-widest"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
