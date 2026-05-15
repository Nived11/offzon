"use client";

import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";
import SwipeBlocker from "@/components/common/SwipeBlocker";

export default function CustomerHomePage() {
  const banners = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200&h=1600",
    "https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=1200&h=1600",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1200&h=1600",
  ];

  const [currentBanner, setCurrentBanner] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // ലോഡിങ് ഡിലേ ഒഴിവാക്കാൻ

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll(); // പേജ് ലോഡ് ആകുമ്പോൾ തന്നെ കറക്റ്റ് പൊസിഷൻ എടുക്കാൻ
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="w-full relative bg-white">
      
      {/* 1. FIXED PARALLAX BANNER (Perfected Position & Loading Fix) */}
      <section 
        className={`fixed left-0 w-full h-[55vh] md:h-[60vh] z-0 bg-gray-100 will-change-transform ${
          isMounted ? "transition-all duration-300 ease-out" : ""
        } ${
          // ഹെഡർ വലുതായിരിക്കുമ്പോൾ 115px താഴെ, സ്ക്രോൾ ചെയ്യുമ്പോൾ 65px ലേക്ക്!
          isScrolled ? "top-[80px] md:top-[72px]" : "top-[130px] md:top-[80px]"
        }`}
      >
        {banners.map((url, i) => (
          <div
            key={i}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              i === currentBanner ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img src={url} alt={`Banner ${i + 1}`} className="w-full h-full object-cover" />
            
            {/* TOP WHITE GRADIENT */}
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/90 via-white/10 to-transparent z-20 pointer-events-none" />
            
            {/* BOTTOM DARK GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
          </div>
        ))}

        {/* Carousel Dots */}
        <div className="absolute bottom-[10vh] left-0 right-0 z-20 flex justify-center gap-2">
          {banners.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentBanner ? "w-6 bg-white shadow-sm" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. OVERLAPPING FOREGROUND CONTENT (The White Sheet) */}
      {/* ഗ്യാപ്പ് വരാതിരിക്കാൻ കൃത്യമായ അളവ് (mt) കൊടുത്തു */}
      <div className="relative z-10 w-full mt-[calc(55vh)] md:mt-[calc(60vh+65px)]">
        
        {/* വെളുത്ത ബോർഡ് തുടങ്ങുന്നു */}
        <div className="bg-white rounded-t-[20px] md:rounded-t-[40px] pt-8 pb-10 min-h-screen shadow-[0_-20px_50px_rgba(0,0,0,0.15)] relative z-20">
          
          <div className="max-w-7xl mx-auto">
            
            {/* Latest Stories */}
            <section className="px-5 mb-10">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Latest Stories</h2>
              <SwipeBlocker 
                className="flex overflow-x-auto gap-4 pb-2 overscroll-x-contain touch-pan-x [&::-webkit-scrollbar]:hidden" 
                style={{ scrollbarWidth: "none" }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 min-w-fit cursor-pointer hover:scale-105 transition-transform">
                    <div className="w-[72px] h-[72px] md:w-[80px] md:h-[80px] rounded-full p-[2.5px] bg-gradient-to-tr from-primary to-blue-400">
                      <div className="w-full h-full rounded-full border-[2.5px] border-white overflow-hidden bg-gray-100">
                        <img src={`https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150&sig=${i}`} alt="Story" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                ))}
              </SwipeBlocker>
            </section>

            {/* Featured Reels */}
            <section className="px-5 mb-10">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Featured Reels</h2>
              <SwipeBlocker 
                className="flex overflow-x-auto gap-3 md:gap-5 pb-4 overscroll-x-contain touch-pan-x [&::-webkit-scrollbar]:hidden" 
                style={{ scrollbarWidth: "none" }}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
                  <div key={i} className="flex-none w-[110px] md:w-[140px] aspect-[9/16] bg-gray-200 rounded-2xl overflow-hidden relative shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                    <img src={`https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&q=80&w=300&h=533&sig=${i}`} alt="Reel" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/30 flex items-center justify-center backdrop-blur-md">
                        <Play className="w-4 h-4 md:w-5 md:h-5 text-white ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                ))}
              </SwipeBlocker>
            </section>

            {/* Latest Offers Feed */}
            <section className="px-5">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 tracking-tight">Latest Offers</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {[
                  { name: "Urban Style Boutique", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800&h=1000" },
                  { name: "Fresh Bite Supermarket", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800&h=1000" },
                  { name: "Apex Digital Hub", img: "https://images.unsplash.com/photo-1525201548942-d8732f51c7f1?auto=format&fit=crop&q=80&w=800&h=1000" },
                  { name: "Care Clinic & Pharmacy", img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800&h=1000" },
                  { name: "Trendz Footwear", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800&h=1000" },
                  { name: "Glow Beauty Parlour", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800&h=1000" },
                ].map((shop, i) => (
                  <div key={i} className="flex flex-col gap-2.5 group cursor-pointer">
                    <div className="w-full aspect-[4/5] bg-gray-100 rounded-[16px] md:rounded-[20px] overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300 relative border border-gray-50">
                      <img src={shop.img} alt={shop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <p className="font-bold text-gray-800 text-[14px] md:text-[16px] px-1 tracking-tight group-hover:text-primary transition-colors line-clamp-1">
                      {shop.name}
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* OVERSCROLL HIDER: ഏറ്റവും താഴെ എത്തുമ്പോൾ ബാനർ വീണ്ടും കാണാതിരിക്കാൻ */}
          <div className="absolute top-full left-0 w-full h-[10vh] bg-white pointer-events-none" />
          
        </div>
      </div>
    </div>
  );
}