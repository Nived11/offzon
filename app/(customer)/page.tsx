"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SwipeBlocker from "@/components/common/SwipeBlocker";

export default function CustomerHomePage() {
  const originalBanners = [
    {
      mobile: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600&h=800",
      desktop: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200&h=450",
    },
    {
      mobile: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600&h=800",
      desktop: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=1200&h=450",
    },
    {
      mobile: "https://images.unsplash.com/photo-1525201548942-d8732f51c7f1?auto=format&fit=crop&q=80&w=600&h=800",
      desktop: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1200&h=450",
    },
  ];

  // REAL INFINITE LOOP TRICK (വെറും 5 ഇമേജുകൾ മാത്രം!)
  // [Last Banner, Banner 1, Banner 2, Banner 3, First Banner]
  const banners = [
    originalBanners[originalBanners.length - 1], 
    ...originalBanners,                          
    originalBanners[0]                           
  ];

  const [activeDot, setActiveDot] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // പേജ് ലോഡ് ആകുമ്പോൾ തന്നെ യഥാർത്ഥ ഒന്നാമത്തെ ബാനറിലേക്ക് (Index 1) മാറ്റുന്നു
  useEffect(() => {
    const initScroll = () => {
      if (scrollRef.current && scrollRef.current.clientWidth > 0) {
        scrollRef.current.scrollTo({ left: scrollRef.current.clientWidth, behavior: "auto" });
      }
    };
    const timeout = setTimeout(initScroll, 100);
    return () => clearTimeout(timeout);
  }, []);

  // ഓട്ടോമാറ്റിക് ആയി ബാനർ മാറാൻ (4 സെക്കൻഡ്)
  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth, behavior: "smooth" });
      }
    }, 4000); 
    return () => clearInterval(timer);
  }, []);

  // സ്വൈപ്പ് ചെയ്യുമ്പോഴും ലൂപ്പ് വർക്ക് ചെയ്യാനുള്ള ലോജിക്
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.clientWidth;
    if (width === 0) return;

    const scrollLeft = scrollRef.current.scrollLeft;
    const index = Math.round(scrollLeft / width);

    // ഡോട്ടുകൾ കറക്റ്റ് ആയി മാറാൻ
    let dotIndex = index - 1;
    if (dotIndex < 0) dotIndex = originalBanners.length - 1;
    if (dotIndex >= originalBanners.length) dotIndex = 0;
    setActiveDot(dotIndex);

    // സ്ക്രോൾ നിന്ന ശേഷം ആരും കാണാതെ ലൂപ്പ് റീസെറ്റ് ചെയ്യുന്നു (Seamless Jump)
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    
    scrollTimeout.current = setTimeout(() => {
      if (!scrollRef.current) return;
      
      // 3ാമത്തെ ബാനറും കഴിഞ്ഞു പോയാൽ വീണ്ടും 1ലേക്ക് ചാടുന്നു
      if (index === banners.length - 1) {
        scrollRef.current.scrollTo({ left: width * 1, behavior: "auto" });
      } 
      // 1ാമത്തെ ബാനറിൽ നിന്ന് പുറകോട്ട് പോയാൽ 3ലേക്ക് ചാടുന്നു
      else if (index === 0) {
        scrollRef.current.scrollTo({ left: width * originalBanners.length, behavior: "auto" });
      }
    }, 250); // സ്വൈപ്പ് സ്നാപ്പിംഗ് തീരാനുള്ള ഒരു ചെറിയ ഡിലേ
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth, behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-white min-h-screen pb-32">
      
      {/* 1. INFINITE SWIPEABLE HERO BANNER */}
      <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[70vh] bg-gray-50 group">
        
        {/* TOP WHITE GRADIENT: മൊബൈലിൽ മാത്രം! ഡെസ്ക്ടോപ്പിൽ (md:hidden) ഇത് കാണില്ല. */}
        <div className="absolute inset-x-0 top-0 h-10 md:hidden bg-gradient-to-b from-white/80 via-white/0 to-transparent z-20 pointer-events-none" />

        <SwipeBlocker className="w-full h-full relative">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex w-full h-full overflow-x-auto snap-x snap-mandatory touch-pan-x [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {banners.map((banner, i) => (
              <div key={i} className="w-full h-full shrink-0 snap-center relative">
                
                <picture className="w-full h-full">
                  <source media="(min-width: 768px)" srcSet={banner.desktop} />
                  <img 
                    src={banner.mobile} 
                    alt={`Offer Banner ${i + 1}`} 
                    loading="lazy" 
                    className="w-full h-full object-cover" 
                  />
                </picture>

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </div>
        </SwipeBlocker>

        {/* LEFT BUTTON */}
        <button 
          suppressHydrationWarning
          onClick={scrollPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all opacity-90 md:opacity-0 md:group-hover:opacity-100 cursor-pointer shadow-sm"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* RIGHT BUTTON */}
        <button 
          suppressHydrationWarning
          onClick={scrollNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all opacity-90 md:opacity-0 md:group-hover:opacity-100 cursor-pointer shadow-sm"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Carousel Dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 pointer-events-none z-20">
          {originalBanners.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeDot ? "w-6 bg-white shadow-sm" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. LATEST OFFERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 mt-8 md:mt-12 ">
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
              <div className="w-full aspect-[4/5] bg-gray-100 rounded-[12px] md:rounded-[20px] overflow-hidden shadow-sm transition-all duration-300 relative border border-gray-50">
                <img src={shop.img} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <p className="font-bold text-gray-800 text-[14px] md:text-[16px] px-1 tracking-tight group-hover:text-primary transition-colors line-clamp-1">
                {shop.name}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}