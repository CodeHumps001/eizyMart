"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  Chrome,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const setLogin = useUserStore((state) => state.setLogin);
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Get existing users or empty array
    const existingUsers = JSON.parse(
      localStorage.getItem("eizy_users_db") || "[]",
    );

    // 2. Check if email is already taken
    if (existingUsers.find((u: any) => u.email === formData.email)) {
      alert("This email is already registered. Please login.");
      return;
    }

    // 3. Save new user to our "database"
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    localStorage.setItem(
      "eizy_users_db",
      JSON.stringify([...existingUsers, newUser]),
    );

    // 4. Log them in and redirect
    setLogin(formData.name, formData.email);
    Cookies.set("eizy_auth", "true", { expires: 7 });
    router.push("/");
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-6 bg-gray-50 overflow-x-hidden">
      <div className="w-full max-w-md bg-white p-6 md:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200 border border-gray-100 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black uppercase italic bg-gradient-to-r from-orange-500 to-orange-800 bg-clip-text text-transparent">
            Join eizy
          </h1>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
            Create your shopping account
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={18}
              />
              <input
                type="text"
                required
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-600 outline-none transition-all text-sm font-bold"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          {/* Email */}
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
                placeholder="name@company.com"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-600 outline-none transition-all text-sm font-bold"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password Grid for Desktop/Mobile flow */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                  size={18}
                />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-600 outline-none transition-all text-sm font-bold"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                Confirm Password
              </label>
              <div className="relative">
                <ShieldCheck
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                  size={18}
                />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-600 outline-none transition-all text-sm font-bold"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 shadow-xl hover:bg-orange-600 active:scale-95 transition-all mt-4"
          >
            Create Account <ArrowRight size={16} />
          </button>
        </form>

        <p className="text-center mt-8 text-xs font-bold text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-orange-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </main>
  );
}
