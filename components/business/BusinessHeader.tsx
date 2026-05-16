"use client";

import React from "react";

export default function BusinessHeader() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm shrink-0">
      <div className="font-semibold text-gray-800">Welcome, Shop Owner</div>
      
      {/* പ്രൊഫൈൽ ഐക്കൺ */}
      <div className="w-8 h-8 bg-primary rounded-full text-white flex items-center justify-center font-bold cursor-pointer hover:opacity-90 transition-opacity">
        S
      </div>
    </header>
  );
}