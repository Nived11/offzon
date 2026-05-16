"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBusinessAuth } from "@/features/business/auth/hooks/useBusinessAuth";
import { Mail, Loader2, ArrowRight } from "lucide-react";

export default function ForgotPasswordForm() {
  const { forgotPassword, loading, error } = useBusinessAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgotPassword(email);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white py-10 px-6 shadow-xl rounded-2xl border border-gray-100">
        <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-2">Forgot Password?</h2>
        <p className="text-sm text-gray-500 text-center mb-8">Enter your email to get an OTP to reset your password.</p>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm font-medium text-center">{error}</div>}
          
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input 
              type="email" 
              placeholder="Enter your email" 
              required 
              onChange={e => setEmail(e.target.value)} 
              className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" 
            />
          </div>

          <button type="submit" disabled={loading} className="w-full flex justify-center items-center gap-2 py-3 bg-primary hover:bg-blue-800 text-white rounded-xl font-bold transition-all disabled:opacity-70">
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : <>Send OTP <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link href="/business/login" className="font-bold text-primary hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}