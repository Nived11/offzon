"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBusinessAuth } from "@/features/business/auth/hooks/useBusinessAuth";
import { MapPin, Store, User, Mail, Phone, Lock, Loader2, ArrowRight } from "lucide-react";

export default function RegisterForm() {
  const { register, loading, error } = useBusinessAuth();
  const [formData, setFormData] = useState({
    owner_name: "", business_name: "", email: "", phone_number: "", password: "", location: ""
  });

  const locations = ["Nadapuram", "Vadakara", "Kozhikode"]; 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <Store className="w-7 h-7 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900 tracking-tight">
          Register your Business
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100 sm:px-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <div className="text-red-600 bg-red-50 p-3 rounded-lg text-sm font-medium text-center">{error}</div>}
            
            <div className="relative">
              <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input type="text" placeholder="Owner Name" required onChange={e => setFormData({...formData, owner_name: e.target.value})} className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
            </div>
            
            <div className="relative">
              <Store className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input type="text" placeholder="Business Name" required onChange={e => setFormData({...formData, business_name: e.target.value})} className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input type="email" placeholder="Email Address" required onChange={e => setFormData({...formData, email: e.target.value})} className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input type="tel" placeholder="Phone Number" required onChange={e => setFormData({...formData, phone_number: e.target.value})} className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input type="password" placeholder="Password" required onChange={e => setFormData({...formData, password: e.target.value})} className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
            </div>

            <div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <select 
                  required 
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary appearance-none bg-white outline-none text-gray-700"
                >
                  <option value="">Select Location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full flex justify-center items-center gap-2 py-3 bg-primary hover:bg-blue-800 text-white rounded-xl font-bold transition-all disabled:opacity-70 mt-2">
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Registering...</> : <><ArrowRight className="w-5 h-5" /> Create Account</>}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Already have an account? </span>
            <Link href="/business/login" className="font-bold text-primary hover:underline">Log in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}