"use client";
import { Mail, Send } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for newsletter signup goes here
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <section className="px-4 md:px-20 py-24 bg-white">
      <div className="max-w-4xl mx-auto bg-zinc-900 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
        {/* Background Decorative Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/10 blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
          {/* Icon & Heading */}
          <div className="space-y-3">
            <div className="flex justify-center">
              <div className="p-4 bg-orange-600/10 rounded-2xl border border-orange-500/20 text-orange-500">
                <Mail size={32} strokeWidth={1.5} />
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
              Join the{" "}
              <span className="text-orange-500 text-italic">Inner Circle</span>
            </h2>
            <p className="text-zinc-400 text-sm md:text-lg max-w-md mx-auto font-medium">
              Get early access to new arrivals, member-only deals, and tech
              insights.
            </p>
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col md:flex-row items-center gap-3"
          >
            <div className="relative w-full group">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-800/50 border border-zinc-700 text-white px-6 py-4 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-zinc-500 text-sm md:text-base"
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-orange-900/20"
            >
              Subscribe
              <Send size={16} />
            </button>
          </form>

          {/* Privacy Note */}
          <p className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-widest font-bold">
            No Spam. Just Quality. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
