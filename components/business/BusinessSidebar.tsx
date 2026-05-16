"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ImagePlus, Settings, LogOut } from "lucide-react";

export default function BusinessSidebar() {
  const pathname = usePathname(); // ആക്റ്റീവ് ലിങ്ക് കണ്ടുപിടിക്കാൻ

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col shadow-sm h-screen sticky top-0 shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 shrink-0">
        <span className="text-xl font-black text-primary tracking-tight">OFFZON Business</span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <Link 
          href="/business/dashboard" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/business/dashboard' ? 'bg-blue-50 text-primary' : 'text-gray-700 hover:bg-blue-50 hover:text-primary'}`}
        >
          <LayoutDashboard className="w-5 h-5" /> Dashboard
        </Link>
        <Link 
          href="/business/posters-add" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/business/posters-add' ? 'bg-blue-50 text-primary' : 'text-gray-700 hover:bg-blue-50 hover:text-primary'}`}
        >
          <ImagePlus className="w-5 h-5" /> Add Posters
        </Link>
        <Link 
          href="/business/settings" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/business/settings' ? 'bg-blue-50 text-primary' : 'text-gray-700 hover:bg-blue-50 hover:text-primary'}`}
        >
          <Settings className="w-5 h-5" /> Settings
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-200 shrink-0">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors">
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    </aside>
  );
}