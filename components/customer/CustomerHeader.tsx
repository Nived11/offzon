"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Home, Tag, Compass, Bell, MapPin, ChevronDown, MoreVertical, LogIn } from "lucide-react";

export default function CustomerHeader() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Nadapuram");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const locationRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Offers", href: "/offers", icon: Tag },
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "Notifications", href: "/alerts", icon: Bell, badge: 9 },
  ];

  const locations = ["Nadapuram", "Vadakara", "Kozhikode"];
  const activeIndex = navItems.findIndex((item) => item.href === activePath);

  const handleSearchClick = () => {
    setIsSearchFocused(true);
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  };

  const renderThreeDotsMenu = () => (
    <div className="relative">
      <button
        suppressHydrationWarning
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        // മൊബൈലിൽ വൈറ്റ് തീമും, ഡെസ്ക്ടോപ്പിൽ ഗ്രേ തീമും (md:text-gray-700)
        className="p-1.5 md:p-2 text-white md:text-gray-700 bg-white/10 md:bg-gray-100/80 hover:bg-white/20 md:hover:bg-gray-200 rounded-full transition-all cursor-pointer shadow-sm md:shadow-none"
      >
        <MoreVertical className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]" strokeWidth={2.5} />
      </button>

      {isMenuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <Link 
              href="/business" 
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-left text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-primary" />
              Business Login
            </Link>
            <div className="border-t border-gray-50 my-1" />
            <div className="px-4 py-1.5 text-[10px] font-medium text-gray-500 leading-tight">
              Are you a Business owner? Join OFFZON.
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      <header suppressHydrationWarning className="fixed top-0 left-0 right-0 w-full z-50 pointer-events-none">
        
        {/* MOBILE ONLY: Blue 900 Blend Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary/0  md:hidden pointer-events-none h-[110%]" />
        
        {/* DESKTOP ONLY: Normal White Background with Blur */}
        <div className="absolute inset-0 hidden md:block bg-white/95 backdrop-blur-xl border-b border-gray-100/80 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10 pointer-events-auto">
          
          {/* Top Row */}
          <div className="w-full relative flex items-center h-[80px] md:h-[80px] px-4 md:py-4">
            
            <div className={`flex flex-col md:flex-row md:items-center gap-0.5 md:gap-5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] z-[60] absolute md:static top-1/2 -translate-y-1/2 md:translate-y-0
              ${(!isScrolled || isSearchFocused) 
                ? "left-1/2 -translate-x-1/2 items-center md:left-auto md:translate-x-0" 
                : "left-4 translate-x-0 items-start" 
              }
            `}>
              <Link href="/" onClick={() => setActivePath("/")} className="shrink-0">
                {/* മൊബൈലിൽ White, ഡെസ്ക്ടോപ്പിൽ Primary കളർ (md:text-primary) */}
                <h1 className="text-[20px] md:text-[26px] font-extrabold md:font-extrabold font-serif text-white md:text-primary tracking-widest cursor-pointer transition-transform hover:scale-105 leading-none drop-shadow-sm md:drop-shadow-none">
                  OFFZON
                </h1>
              </Link>

              <div className="relative " ref={locationRef}>
                <button 
                  suppressHydrationWarning
                  onClick={() => setIsLocationOpen(!isLocationOpen)}
                  className="flex items-center gap-1 text-blue-200 md:text-gray-500 md:hover:text-primary transition-colors cursor-pointer pt-0.5 md:pt-0"
                >
                  <MapPin className="w-[10px] h-[10px] md:w-[13px] md:h-[13px] text-blue-400 md:text-primary" />
                  <span className="text-[10px] md:text-[13px] font-bold text-white/95 md:text-gray-700">{selectedLocation}</span>
                  <ChevronDown className={`w-3 h-3 text-blue-300 md:text-gray-400 transition-transform duration-200 ${isLocationOpen ? "rotate-180" : ""}`} />
                </button>
                
                {/* ലൊക്കേഷൻ ഡ്രോപ്പ്ഡൗൺ വരുന്ന ഭാഗം മാത്രം മാറ്റുക */}
{isLocationOpen && (
 <div className={`absolute top-full mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-xl z-[60] animate-in fade-in slide-in-from-top-2 duration-200
    ${(!isScrolled || isSearchFocused) ? "left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0" : "left-0"}
  `}>
    {locations.map((loc) => (
      <button
        suppressHydrationWarning
        key={loc}
        onClick={() => {
          setSelectedLocation(loc);
          setIsLocationOpen(false);
        }}
        className={`w-full text-left px-4 py-2.5 text-[13px] font-semibold hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl transition-colors ${
          selectedLocation === loc ? "text-primary bg-blue-50/50" : "text-gray-600"
        }`}
      >
        {loc}
      </button>
    ))}
  </div>
)}
              </div>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-auto px-4 z-10">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-gray-400 group-focus-within:text-primary transition-colors" />
                <input
                  suppressHydrationWarning
                  type="text"
                  placeholder={`Search in ${selectedLocation}...`}
                  className="w-full bg-gray-100/80 text-[14px] font-medium rounded-full py-2.5 pl-10 pr-4 outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400 text-gray-900"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="ml-auto flex items-center gap-2 shrink-0 z-20">
              {/* Mobile Scrolled Search Icon */}
              <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${isScrolled && !isSearchFocused ? "w-8 opacity-100 mr-1" : "w-0 opacity-0"}`}>
                <button 
                  suppressHydrationWarning
                  onClick={handleSearchClick}
                  className="p-1.5 text-white bg-white/10 hover:bg-white/20 rounded-full cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <Search className="w-[18px] h-[18px]" strokeWidth={2.5} />
                </button>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1.5 pr-2">
                {navItems.map((item) => {
                  const isActive = activePath === item.href;
                  return (
                    <Link key={item.name} href={item.href} onClick={() => setActivePath(item.href)}>
                      <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                        isActive ? "bg-primary text-white shadow-sm shadow-primary/30" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                      }`}>
                        <item.icon className="w-[16px] h-[16px]" strokeWidth={isActive ? 2.5 : 2} />
                        {item.name}
                      </div>
                    </Link>
                  );
                })}
              </nav>

              {renderThreeDotsMenu()}
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className={`md:hidden px-4 py-1 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] overflow-hidden ${(!isScrolled || isSearchFocused) ? "max-h-20 opacity-100 pb-2 mt-0" : "max-h-0 opacity-0 pb-0 mt-0"}`}>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-primary group-focus-within:text-blue-900 transition-colors" />
              <input
                ref={searchInputRef}
                suppressHydrationWarning
                type="text"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder={`Search in ${selectedLocation}...`}
                className="w-full bg-white text-[14px] md:text-[16px] font-medium rounded-full py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-500 text-gray-900 shadow-[0_4px_15px_rgba(0,0,0,0.08)] border-none"
              />
            </div>
          </div>

        </div>
      </header>

      {/* Spacer */}
      <div className={`w-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${(!isScrolled || isSearchFocused) ? "h-[110px] md:h-[72px]" : "h-[60px] md:h-[72px]"}`} />

      {/* Sleek Mobile Bottom Navigation with Premium iOS Blur & Running Border */}
      <div className="md:hidden fixed bottom-4 left-2 right-2 z-50 flex justify-center pointer-events-none">
        
        <div className="relative w-full max-w-sm rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] pointer-events-auto bg-white/60 backdrop-blur-xl border border-white/50">
          
          <div 
            className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
            style={{
              padding: "2px",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[conic-gradient(from_0deg,transparent_0%,transparent_80%,#1e3a8a_100%)] animate-[spin_5s_linear_infinite]" />
          </div>
          
          <nav className="relative w-full h-full rounded-full px-1 py-1 flex justify-between items-center z-10">
            
            {activeIndex >= 0 && (
              <div className="absolute inset-y-1 left-1 right-1 z-0 flex pointer-events-none">
                <div
                  className="w-1/4 h-full bg-primary rounded-full transition-transform duration-300 ease-out will-change-transform shadow-md"
                  style={{ transform: `translate3d(${activeIndex * 100}%, 0, 0)` }}
                />
              </div>
            )}

            {navItems.map((item) => {
              const isActive = activePath === item.href;
              return (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className="relative flex-1 flex justify-center z-10"
                  onClick={() => setActivePath(item.href)} 
                >
                  <div
                    className={`flex flex-col items-center justify-center gap-0.5 w-full px-2 py-2 transition-colors duration-300 rounded-full cursor-pointer ${
                      isActive
                        ? "text-white" 
                        : "text-gray-800 hover:text-gray-900"
                    }`}
                  >
                    <div className="relative">
                      <item.icon
                        className="w-[18px] h-[18px] transition-transform duration-300"
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                      {item.badge && (
                        <span className="absolute -top-1.5 -right-2 bg-red-700 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className={`text-[8px] ${isActive ? "font-bold" : "font-medium"}`}>
                      {item.name}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}