"use client";

import React from "react";
import { Play, Utensils, Shirt, HeartPulse, GraduationCap, Briefcase } from "lucide-react";
import SwipeBlocker from "@/components/common/SwipeBlocker";

export default function CustomerHomePage() {
  const categories = [
    { name: "Food", icon: Utensils },
    { name: "Fashion", icon: Shirt },
    { name: "Healthcare", icon: HeartPulse },
    { name: "Education", icon: GraduationCap },
    { name: "Services", icon: Briefcase },
  ];

  return (
    <div className="pb-24 md:pb-0 selection:bg-indigo-100">
      {/* Banners */}
      <section className="mt-6 md:mt-8">
        <SwipeBlocker 
          className="flex overflow-x-auto px-5 gap-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {[
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200&h=450",
            "https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=1200&h=450",
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1200&h=450",
          ].map((url, i) => (
            <div key={i} className="flex-none w-[90%] md:w-[70%] lg:w-[60%] aspect-[21/9] md:aspect-[21/7] bg-gray-200 rounded-2xl snap-center overflow-hidden relative shadow-sm">
              <img src={url} alt={`Banner ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </SwipeBlocker>
      </section>

      {/* Categories */}
      <section className="mt-8 md:mt-12 px-5">
        <SwipeBlocker 
          className="flex overflow-x-auto gap-6 md:gap-10 md:justify-center [&::-webkit-scrollbar]:hidden" 
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((cat, i) => (
            <div key={i} className="flex flex-col items-center gap-2.5 min-w-fit cursor-pointer group">
              <div className="w-[58px] h-[58px] md:w-[70px] md:h-[70px] bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 group-hover:border-primary group-hover:shadow-md transition-all">
                <cat.icon className="w-6 h-6 md:w-7 md:h-7 text-gray-800 group-hover:text-primary transition-colors" strokeWidth={1.5} />
              </div>
              <span className="text-[13px] md:text-[14px] font-medium text-gray-600 group-hover:text-gray-900">
                {cat.name}
              </span>
            </div>
          ))}
        </SwipeBlocker>
      </section>

      {/* Stories & Reels Row */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8 md:mt-12">
        <section className="bg-white py-5 border-y border-gray-100 shadow-sm lg:w-1/3 lg:border-none lg:bg-transparent lg:shadow-none lg:py-0">
          <h2 className="px-5 text-lg font-bold text-gray-900 mb-4 hidden lg:block">Latest Stories</h2>
          <SwipeBlocker 
            className="flex overflow-x-auto px-5 gap-4 [&::-webkit-scrollbar]:hidden" 
            style={{ scrollbarWidth: "none" }}
          >
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 min-w-fit cursor-pointer hover:scale-105 transition-transform">
                <div className="w-[68px] h-[68px] md:w-[76px] md:h-[76px] rounded-full p-[2px] bg-gradient-to-tr from-gray-300 to-gray-400">
                  <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-gray-100">
                    <img src={`https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150&sig=${i}`} alt="Story" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </SwipeBlocker>
        </section>

        <section className="lg:w-2/3">
          <h2 className="px-5 text-lg font-bold text-gray-900 mb-4 hidden lg:block">Featured Reels</h2>
          <SwipeBlocker 
            className="flex overflow-x-auto px-5 gap-3 md:gap-5 [&::-webkit-scrollbar]:hidden" 
            style={{ scrollbarWidth: "none" }}
          >
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex-none w-[110px] md:w-[140px] aspect-[9/16] bg-gray-200 rounded-[14px] overflow-hidden relative shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                <img src={`https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&q=80&w=300&h=533&sig=${i}`} alt="Reel" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors">
                  <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-white/30 flex items-center justify-center backdrop-blur-md">
                    <Play className="w-4 h-4 md:w-5 md:h-5 text-white ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </div>
            ))}
          </SwipeBlocker>
        </section>
      </div>

      {/* Latest Offers Feed */}
      <section className="mt-8 md:mt-16 px-5 pb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 tracking-tight">Latest Offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            { name: "Urban Style Boutique", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800&h=1000" },
            { name: "Fresh Bite Supermarket", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800&h=1000" },
            { name: "Apex Digital Hub", img: "https://images.unsplash.com/photo-1525201548942-d8732f51c7f1?auto=format&fit=crop&q=80&w=800&h=1000" },
            { name: "Care Clinic & Pharmacy", img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800&h=1000" },
          ].map((shop, i) => (
            <div key={i} className="flex flex-col gap-3.5 group cursor-pointer">
              <div className="w-full aspect-[4/5] bg-gray-200 rounded-[20px] overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300">
                <img src={shop.img} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <p className="font-bold text-gray-900 text-[16px] md:text-[18px] px-1 tracking-tight group-hover:text-primary transition-colors">
                {shop.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}