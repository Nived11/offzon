"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBusinessAuth } from "@/features/business/auth/hooks/useBusinessAuth";
import { Mail, Lock, Loader2, LogIn } from "lucide-react";

export default function LoginForm() {
  const { login, loading, error } = useBusinessAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white py-10 px-6 shadow-xl rounded-2xl border border-gray-100">
        <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-8">Business Login</h2>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm font-medium text-center">{error}</div>}
          
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input type="email" placeholder="Email Address" required onChange={e => setFormData({...formData, email: e.target.value})} className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input type="password" placeholder="Password" required onChange={e => setFormData({...formData, password: e.target.value})} className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
          </div>
          
          <div className="flex justify-end">
            <Link href="/business/forgot-password" className="text-sm text-primary font-medium hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" disabled={loading} className="w-full flex justify-center items-center gap-2 py-3 bg-primary hover:bg-blue-800 text-white rounded-xl font-bold transition-all disabled:opacity-70">
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Logging in...</> : <><LogIn className="w-5 h-5" /> Login</>}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">New to OFFZON? </span>
          <Link href="/business/register" className="font-bold text-primary hover:underline">Register your business</Link>
        </div>
      </div>
    </div>
  );
}