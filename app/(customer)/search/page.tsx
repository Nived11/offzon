"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, Clock, X, TrendingUp } from "lucide-react";

export default function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    const storedSearches = localStorage.getItem("offzon_recent_searches");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  const handleSearchSubmit = (query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    const updatedSearches = [trimmedQuery, ...recentSearches.filter(item => item.toLowerCase() !== trimmedQuery.toLowerCase())].slice(0, 8);
    
    setRecentSearches(updatedSearches);
    localStorage.setItem("offzon_recent_searches", JSON.stringify(updatedSearches));
    setSearchQuery(trimmedQuery);

    console.log("Searching for:", trimmedQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit(searchQuery);
    }
  };

  const handleRemoveRecent = (e: React.MouseEvent, queryToRemove: string) => {
    e.stopPropagation(); 
    const updatedSearches = recentSearches.filter(item => item !== queryToRemove);
    setRecentSearches(updatedSearches);
    localStorage.setItem("offzon_recent_searches", JSON.stringify(updatedSearches));
  };

  const handleClearAll = () => {
    setRecentSearches([]);
    localStorage.removeItem("offzon_recent_searches");
  };

  const trendingSearches = ["Zudio", "Mobiles", "Mens Fashion", "Restaurants", "Pizza"];

  return (
    <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
      
      {/* 1. Search Header (Sticky at top) */}
      <header className="sticky top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 h-[72px] flex items-center">
          
          <div className="flex-1 relative flex items-center bg-gray-100 rounded-full h-[40px] border  border-primary/20 focus-within:border-primary/20 focus-within:ring-2 focus-within:ring-primary/10 transition-all overflow-hidden">
            
            {/* Back Button */}
            <button 
              suppressHydrationWarning
              onClick={() => router.back()} 
              className="pl-4 pr-3 h-full flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Search Input Box */}
            <input
              suppressHydrationWarning
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className="flex-1 w-full bg-transparent text-[14px] font-medium py-2.5 pr-2 outline-none text-gray-900 placeholder:text-gray-500"
            />

            {searchQuery && (
              <button 
                suppressHydrationWarning
                onClick={() => setSearchQuery("")}
                className="pr-4 pl-2 h-full flex items-center text-gray-400 hover:text-gray-600 cursor-pointer shrink-0"
              >
                <X className="w-[18px] h-[18px]" />
              </button>
            )}
          </div>
          
        </div>
      </header>

      {/* 2. Search Content Area */}
      <main className="max-w-7xl mx-auto px-5 pt-6 pb-6">
        
        {searchQuery ? (
          <div className="flex flex-col items-center justify-center pt-10 opacity-70">
            <Search className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">Searching for "{searchQuery}"...</p>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[15px] font-bold text-gray-900">Recent Searches</h2>
                  <button 
                    suppressHydrationWarning 
                    onClick={handleClearAll}
                    className="text-[12px] font-bold text-primary hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-col gap-1">
                  {recentSearches.map((item, i) => (
                    <div 
                      key={i} 
                      onClick={() => handleSearchSubmit(item)}
                      className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0 cursor-pointer group"
                    >
                      <Clock className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors shrink-0" />
                      <span className="text-[14px] font-medium text-gray-700 group-hover:text-primary transition-colors flex-1 text-left">
                        {item}
                      </span>
                      {/* Individual Delete Button */}
                      <button 
                        onClick={(e) => handleRemoveRecent(e, item)}
                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Trending Searches */}
            <section>
              <h2 className="text-[15px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red-500" />
                Trending Now
              </h2>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((item, i) => (
                  <button 
                    suppressHydrationWarning 
                    key={i} 
                    onClick={() => handleSearchSubmit(item)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-[13px] font-semibold text-gray-700 hover:border-primary hover:text-primary hover:bg-blue-50 transition-all cursor-pointer shadow-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>

          </div>
        )}
      </main>

    </div>
  );
}