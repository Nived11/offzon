"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Home, Tag, Compass, Bell } from "lucide-react";

export default function CustomerHeader() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Offers", href: "/offers", icon: Tag },
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "Alerts", href: "/alerts", icon: Bell },
  ];

  return (
    <header className="px-5 pt-6 pb-4 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm">
      <Link href="/">
        <h1 className="text-[22px] font-bold text-center md:text-left text-primary tracking-tight whitespace-nowrap cursor-pointer transition-transform hover:scale-105">
          NCity
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

      {/* Modern Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-2 pr-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
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
  );
}