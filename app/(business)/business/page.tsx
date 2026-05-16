"use client";

import React from "react";
import Link from "next/link";
import { Store, TrendingUp, Users, ArrowRight, Megaphone } from "lucide-react";

export default function BusinessMainPage() {
  return (
    <div className="min-h-screen max-w-full  bg-white font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-100 blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-blue-100 blur-3xl opacity-50" />

       <div className="relative max-w-full mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-primary text-sm font-bold uppercase tracking-wide">
            <Store className="w-4 h-4" />
            <span>OFFZON Business</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Grow Your Business <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
              Locally & Digitally
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 leading-relaxed">
            Join thousands of local businesses on OFFZON. Reach more customers, promote your daily offers, and increase your sales seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/business/register" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-primary hover:bg-blue-800 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95"
            >
              Create Free Account <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link 
              href="/business/login" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl transition-all active:scale-95"
            >
              Login to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Features / Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why partner with us?</h2>
          <p className="mt-2 text-gray-500 text-sm md:text-base">Everything you need to manage your store online.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-primary rounded-2xl flex items-center justify-center mb-6">
              <Megaphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Publish Daily Offers</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Let people in your area know about your special discounts and new arrivals instantly.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Reach Local Customers</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your store gets visibility among thousands of active users searching for local products.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Boost Footfall & Sales</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Convert digital views into physical store visits and watch your revenue grow.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Simple Step Section */}
      <section className="py-12 bg-gray-900 mt-8 rounded-t-[40px]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">Start in 3 Simple Steps</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-left md:text-center">
            
            <div className="flex items-center gap-4 md:flex-col">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">1</div>
              <span className="text-gray-300 font-medium">Create Account</span>
            </div>
            
            <div className="hidden md:block w-16 h-[2px] bg-gray-700"></div>
            
            <div className="flex items-center gap-4 md:flex-col">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">2</div>
              <span className="text-gray-300 font-medium">Add Your Shop</span>
            </div>
            
            <div className="hidden md:block w-16 h-[2px] bg-gray-700"></div>
            
            <div className="flex items-center gap-4 md:flex-col">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">3</div>
              <span className="text-gray-300 font-medium">Post Offers</span>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}