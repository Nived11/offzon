"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Home, Tag, Compass, Bell } from "lucide-react";

export default function CustomerHeader() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Offers", href: "/offers", icon: Tag },
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "Notifications", href: "/alerts", icon: Bell, badge: 9 },
  ];

  const activeIndex = navItems.findIndex((item) => item.href === activePath);

  return (
    <>
      {/* Top Header */}
      <header className="px-5 pt-6 pb-4 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm">
        <Link href="/" onClick={() => setActivePath("/")}>
          <h1 className="text-[22px] font-bold text-center md:text-left text-primary tracking-tight whitespace-nowrap cursor-pointer transition-transform hover:scale-105">
            OFFZON
          </h1>
        </Link>
        
        <div className="relative w-full md:max-w-lg lg:max-w-2xl group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 group-focus-within:text-primary transition-colors" />
          <input
            suppressHydrationWarning
            type="text"
            placeholder="Search for shops, offers..."
            className="w-full bg-gray-100 text-[15px] rounded-full py-3 pl-11 pr-5 outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:shadow-md transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 pr-2">
          {navItems.map((item) => {
            const isActive = activePath === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setActivePath(item.href)}
              >
                <button 
                  suppressHydrationWarning 
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive 
                      ? "bg-primary text-white shadow-md shadow-primary/30" 
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="w-[18px] h-[18px]" strokeWidth={isActive ? 2.5 : 2} /> 
                  {item.name}
                </button>
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Sleek Mobile Bottom Navigation with Premium iOS Blur & Running Border */}
      <div className="md:hidden fixed bottom-4 left-2 right-2 z-50 flex justify-center pointer-events-none">
        
        {/* --- iOS Glassmorphism Base --- */}
        {/* bg-white/70 ഉം backdrop-blur-xl ഉം കൊടുത്തു */}
        <div className="relative w-full max-w-sm rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] pointer-events-auto bg-white/60 backdrop-blur-xl border border-white/50">
          
          {/* --- PERFECT HOLLOW RUNNING BORDER --- */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
            style={{
              padding: "2px", // ബോർഡറിന്റെ കനം
              // നടുഭാഗം കട്ട് ചെയ്ത് മാറ്റാനുള്ള CSS ട്രിക്ക്:
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[conic-gradient(from_0deg,transparent_0%,transparent_80%,#1e3a8a_100%)] animate-[spin_5s_linear_infinite]" />
          </div>
          
          <nav className="relative w-full h-full rounded-full px-1 py-1 flex justify-between items-center z-10">
            
            {/* Smooth Sliding Background (നിന്റെ bg-blue-900) */}
            {activeIndex >= 0 && (
              <div className="absolute inset-y-1 left-1 right-1 z-0 flex pointer-events-none">
                <div
                  className="w-1/4 h-full bg-blue-900 rounded-full transition-transform duration-300 ease-out will-change-transform shadow-md"
                  style={{ transform: `translate3d(${activeIndex * 100}%, 0, 0)` }}
                />
              </div>
            )}

            {/* Nav Items */}
            {navItems.map((item) => {
              const isActive = activePath === item.href;
              return (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className="relative flex-1 flex justify-center z-10"
                  onClick={() => setActivePath(item.href)} 
                >
                  <button
                    suppressHydrationWarning
                    className={`flex flex-col items-center justify-center gap-0.5 w-full px-2 py-2 transition-colors duration-300 rounded-full ${
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
                  </button>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}