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
  const { cart, setQuantity, removeFromCart, clearCart, getTotalPrice } =
    useCart();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = getTotalPrice();

  const modalClasses = isOpen ? "translate-x-0" : "translate-x-full";

  const handleCheckout = () => {
    onClose();
    // router.push("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[110] backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-[120]
        transform transition-transform duration-500 ease-in-out ${modalClasses}`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h2 className="text-2xl font-black text-gray-900">
              Your Cart ({totalQuantity})
            </h2>

            <div className="flex items-center gap-4">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-gray-400 hover:text-red-500 uppercase font-bold tracking-wider"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto space-y-6 pr-2">
            {cart.length === 0 ? (
              <div className="text-center mt-10">
                <p className="text-gray-500 mb-4">Your cart is empty 🙁</p>
                <button
                  onClick={onClose}
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-grow">
                    <h3 className="font-semibold text-sm hover:text-orange-600">
                      {item.name}
                    </h3>
                    <p className="text-sm font-bold text-orange-600">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center mt-2 border rounded-md w-fit">
                      <button
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 border-r hover:bg-gray-100"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="px-3 py-1 text-xs font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 border-l hover:bg-gray-100"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Item Total + Remove */}
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-sm font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-3xl font-black text-orange-600">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-zinc-900 hover:bg-orange-600 text-white py-4 rounded-xl font-bold uppercase transition-all active:scale-95"
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
