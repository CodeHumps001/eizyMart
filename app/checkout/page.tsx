"use client";
import { useState } from "react";
import { useCart } from "@/store/cartStore";
import {
  Check,
  CreditCard,
  Truck,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Globe,
  Info,
  Store,
  Home,
  PartyPopper,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const STEPS = ["Shipping", "Payment", "Review"];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    zip: "",
    phone: "",
    deliveryMethod: "pickup", // 'pickup' or 'home'
    paymentMethod: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    momoNumber: "",
  });

  const deliveryCosts = {
    pickup: 0,
    home: 15.0,
  };

  const updateFields = (fields: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const next = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handlePlaceOrder = () => {
    setIsSuccess(true);
    // In a real app, send data to API here
  };

  const closeSuccessAndExit = () => {
    clearCart();
    router.push("/");
  };

  const subtotal = getTotalPrice();
  const shippingCost =
    deliveryCosts[formData.deliveryMethod as keyof typeof deliveryCosts];
  const finalTotal = subtotal + shippingCost;

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <ShoppingBag size={64} className="text-gray-200 mb-4" />
        <h2 className="text-2xl font-black uppercase">Cart is empty</h2>
        <Link
          href="/products"
          className="mt-4 bg-orange-600 text-white px-8 py-3 rounded-xl font-bold"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-20 overflow-x-hidden">
      <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
        {/* LEFT: Multi-Step Form */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8 min-w-0">
          {/* Progress Bar */}
          <div className="flex items-center justify-between relative mb-8 px-2 max-w-full">
            {STEPS.map((step, idx) => (
              <div key={step} className="flex flex-col items-center z-10">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs font-black transition-all duration-500 ${
                    idx <= currentStep
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {idx < currentStep ? <Check size={16} /> : idx + 1}
                </div>
                <span className="text-[9px] md:text-[10px] mt-2 font-black uppercase tracking-tighter text-gray-900">
                  {step}
                </span>
              </div>
            ))}
            <div className="absolute top-4 md:top-5 left-0 w-full h-[2px] bg-gray-100 -z-0">
              <div
                className="h-full bg-orange-600 transition-all duration-500"
                style={{
                  width: `${(currentStep / (STEPS.length - 1)) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="bg-white p-5 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50">
            {currentStep === 0 && (
              <ShippingForm
                data={formData}
                update={updateFields}
                costs={deliveryCosts}
              />
            )}
            {currentStep === 1 && (
              <PaymentForm data={formData} update={updateFields} />
            )}
            {currentStep === 2 && (
              <ReviewStep
                data={formData}
                shipping={shippingCost}
                total={finalTotal}
              />
            )}

            <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-50">
              <button
                onClick={back}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${currentStep === 0 ? "invisible" : "text-gray-400"}`}
              >
                <ArrowLeft size={16} /> Back
              </button>

              <button
                onClick={
                  currentStep === STEPS.length - 1 ? handlePlaceOrder : next
                }
                className="bg-zinc-900 hover:bg-orange-600 text-white px-8 md:px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all active:scale-95"
              >
                {currentStep === STEPS.length - 1 ? "Place Order" : "Continue"}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="lg:col-span-1 order-first lg:order-last min-w-0">
          <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 sticky top-24">
            <h3 className="text-lg font-black uppercase mb-6">Summary</h3>
            <div className="space-y-4 max-h-[200px] overflow-y-auto mb-6 pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="relative w-12 h-12 bg-white rounded-lg border p-1 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[11px] truncate uppercase">
                      {item.name}
                    </h4>
                    <p className="text-[9px] text-gray-500 font-bold">
                      QTY: {item.quantity}
                    </p>
                  </div>
                  <p className="font-black text-[11px]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex justify-between text-[11px] font-bold uppercase text-gray-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px] font-bold uppercase text-gray-500">
                <span>Shipping ({formData.deliveryMethod})</span>
                <span className={shippingCost === 0 ? "text-green-600" : ""}>
                  {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-xl font-black pt-4 border-t border-dashed">
                <span>TOTAL</span>
                <span className="text-orange-600">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {isSuccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <PartyPopper size={40} />
            </div>
            <h2 className="text-3xl font-black uppercase italic mb-2 tracking-tighter">
              Order Success!
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Thank you for your purchase. You will receive your delivery soon!
              Check your email for the receipt.
            </p>
            <button
              onClick={closeSuccessAndExit}
              className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-orange-200 active:scale-95 transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

/* ---------------- SUB-COMPONENTS ---------------- */

function ShippingForm({ data, update, costs }: any) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
          <Truck size={20} />
        </div>
        <h2 className="text-xl font-black uppercase tracking-tight">
          Delivery Info
        </h2>
      </div>

      {/* Delivery Method Selection */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => update({ deliveryMethod: "pickup" })}
          className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${data.deliveryMethod === "pickup" ? "border-orange-600 bg-orange-50" : "border-gray-100"}`}
        >
          <Store
            className={
              data.deliveryMethod === "pickup"
                ? "text-orange-600"
                : "text-gray-400"
            }
          />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Pickup ($0)
          </span>
        </button>
        <button
          onClick={() => update({ deliveryMethod: "home" })}
          className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${data.deliveryMethod === "home" ? "border-orange-600 bg-orange-50" : "border-gray-100"}`}
        >
          <Home
            className={
              data.deliveryMethod === "home"
                ? "text-orange-600"
                : "text-gray-400"
            }
          />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Delivery (${costs.home})
          </span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={data.firstName}
          onChange={(e: any) => update({ firstName: e.target.value })}
        />
        <Input
          label="Last Name"
          value={data.lastName}
          onChange={(e: any) => update({ lastName: e.target.value })}
        />
      </div>
      <Input
        label="Email Address"
        type="email"
        value={data.email}
        onChange={(e: any) => update({ email: e.target.value })}
      />

      {data.deliveryMethod === "home" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <Input
            label="Street Address"
            value={data.address}
            onChange={(e: any) => update({ address: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              value={data.city}
              onChange={(e: any) => update({ city: e.target.value })}
            />
            <Input
              label="ZIP"
              value={data.zip}
              onChange={(e: any) => update({ zip: e.target.value })}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function PaymentForm({ data, update }: any) {
  const methods = [
    { id: "card", label: "Card", icon: CreditCard },
    { id: "momo", label: "MoMo", icon: Smartphone },
    { id: "paypal", label: "PayPal", icon: Globe },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black uppercase tracking-tight">
        Payment Method
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {methods.map((m) => (
          <button
            key={m.id}
            onClick={() => update({ paymentMethod: m.id })}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${data.paymentMethod === m.id ? "border-orange-600 bg-orange-50 text-orange-600" : "border-gray-100 text-gray-400"}`}
          >
            <m.icon size={18} className="mb-1" />
            <span className="text-[8px] font-black uppercase tracking-widest text-center">
              {m.label}
            </span>
          </button>
        ))}
      </div>

      {data.paymentMethod === "card" && (
        <div className="space-y-4">
          <Input
            label="Card Number"
            value={data.cardNumber}
            onChange={(e: any) => update({ cardNumber: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expiry"
              placeholder="MM/YY"
              value={data.expiry}
              onChange={(e: any) => update({ expiry: e.target.value })}
            />
            <Input
              label="CVV"
              placeholder="123"
              value={data.cvv}
              onChange={(e: any) => update({ cvv: e.target.value })}
            />
          </div>
        </div>
      )}

      {data.paymentMethod === "momo" && (
        <Input
          label="MoMo Number"
          placeholder="024 XXX XXXX"
          value={data.momoNumber}
          onChange={(e: any) => update({ momoNumber: e.target.value })}
        />
      )}
    </div>
  );
}

function ReviewStep({ data, shipping, total }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black uppercase tracking-tight">Confirm</h2>
      <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
        <div>
          <p className="text-[10px] font-black text-orange-600 uppercase mb-1">
            Shipping
          </p>
          <p className="font-bold text-xs">
            {data.firstName} {data.lastName}
          </p>
          <p className="text-[11px] text-gray-500">
            {data.deliveryMethod === "pickup" ? "Self-Pickup" : data.address}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-black text-orange-600 uppercase mb-1">
            Total Due
          </p>
          <p className="font-black text-lg">${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div className="flex flex-col gap-1 w-full min-w-0">
      <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">
        {label}
      </label>
      <input
        className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-orange-600 outline-none transition-all text-xs font-bold"
        {...props}
      />
    </div>
  );
}
