"use client";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react";
import Link from "next/link";

import Cookies from "js-cookie";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setLogin = useUserStore((state) => state.setLogin);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Get our "database" from LocalStorage
    const registeredUsers = JSON.parse(
      localStorage.getItem("eizy_users_db") || "[]",
    );

    // 2. Find the user by email
    const foundUser = registeredUsers.find((u: any) => u.email === email);

    if (!foundUser) {
      alert("No account found with this email. Please register first.");
      return;
    }

    // 3. Check password
    if (foundUser.password !== password) {
      alert("Incorrect password. Please try again.");
      return;
    }

    // 4. If all good, log them in
    setLogin(foundUser.name, foundUser.email);
    Cookies.set("eizy_auth", "true", { expires: 7 });
    router.push("/");
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200 border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black uppercase italic bg-gradient-to-r from-orange-500 to-orange-800 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">
            Login to your eizy account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={18}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-600 outline-none transition-all text-sm font-bold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black uppercase text-gray-400">
                Password
              </label>
              <Link
                href="#"
                className="text-[9px] font-black text-orange-600 hover:underline uppercase"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={18}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-600 outline-none transition-all text-sm font-bold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl hover:bg-orange-600 active:scale-95 transition-all mt-4"
          >
            Sign In <ArrowRight size={16} />
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-100"></span>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-black text-gray-300">
            <span className="bg-white px-4">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all font-bold text-xs">
            <Chrome size={16} /> Google
          </button>
          <button className="flex items-center justify-center gap-2 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all font-bold text-xs">
            <Github size={16} /> Github
          </button>
        </div>

        <p className="text-center mt-10 text-xs font-bold text-gray-400">
          New here?{" "}
          <Link
            href="/auth/register"
            className="text-orange-600 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
