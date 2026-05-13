"use client";

import React from "react";

export default function CustomerFooter() {
  return (
    <footer className="w-full text-center py-8 text-gray-500 text-sm hidden md:block bg-gray-50 border-t border-gray-200">
      &copy; {new Date().getFullYear()} OFFZON. All rights reserved.
    </footer>
  );
}