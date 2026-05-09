"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Tag, Compass, Bell } from "lucide-react";

export default function CustomerFooter() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Offers", href: "/offers", icon: Tag },
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "Alerts", href: "/alerts", icon: Bell },
  ];

  return (
    <>
      <footer className="w-full text-center py-8 text-gray-500 text-sm hidden md:block bg-gray-50 border-t border-gray-200">
        &copy; {new Date().getFullYear()} Nadapuram City. All rights reserved.
      </footer>

      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-100 px-7 pt-3 pb-6 z-40 shadow-[0_-4px_20px_-15px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <button suppressHydrationWarning className={`flex flex-col items-center gap-1.5 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-900'}`}>
                  <item.icon className="w-[22px] h-[22px]" strokeWidth={isActive ? 2.5 : 2} />
                  <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{item.name}</span>
                </button>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}