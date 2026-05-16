"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useBusinessAuth } from "@/features/business/auth/hooks/useBusinessAuth";
import { KeyRound, Lock, Loader2, CheckCircle2 } from "lucide-react";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";
  const { resetPassword, loading, error, successMsg } = useBusinessAuth();
  
  const [formData, setFormData] = useState({ email, otp: "", new_password: "" });
  
  // പുതിയ State: സെക്യൂരിറ്റി ചെക്ക് കഴിഞ്ഞോ എന്ന് നോക്കാൻ
  const [isAuthorized, setIsAuthorized] = useState(false);

  // SECURITY GUARD: ഇത് ബ്രൗസറിൽ മാത്രമേ വർക്ക് ചെയ്യൂ
  useEffect(() => {
    const allowedEmail = sessionStorage.getItem("reset_email");
    if (!allowedEmail || allowedEmail !== email) {
      router.replace("/business/login");
    } else {
      setIsAuthorized(true); // പാസ്സ് ഉണ്ടെങ്കിൽ പേജ് കാണിക്കാൻ അനുവാദം കൊടുക്കുന്നു
    }
  }, [email, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetPassword(formData);
  };

  // ചെക്കിങ് കഴിയുന്നതുവരെ പേജ് കാണിക്കരുത് (അല്ലെങ്കിൽ ഒരു ലോഡർ കാണിക്കാം)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white py-10 px-6 shadow-xl rounded-2xl border border-gray-100">
        <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-2">Reset Password</h2>
        <p className="text-sm text-gray-500 text-center mb-8">Enter the OTP sent to your email and your new password.</p>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm font-medium text-center">{error}</div>}
          {successMsg && <div className="text-green-600 bg-green-50 p-3 rounded-lg text-sm font-medium text-center">{successMsg}</div>}
          
          <div className="relative">
            <KeyRound className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input 
              type="text" maxLength={6} placeholder="Enter 6-digit OTP" required 
              onChange={e => setFormData({...formData, otp: e.target.value})} 
              className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none tracking-widest" 
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input 
              type="password" placeholder="New Password" required 
              onChange={e => setFormData({...formData, new_password: e.target.value})} 
              className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" 
            />
          </div>

          <button type="submit" disabled={loading} className="w-full flex justify-center items-center gap-2 py-3 bg-primary hover:bg-blue-800 text-white rounded-xl font-bold transition-all disabled:opacity-70">
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Resetting...</> : <><CheckCircle2 className="w-5 h-5" /> Reset Password</>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordForm() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}