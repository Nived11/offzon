"use client";

export default function CustomerFooter() {
  return (
    <footer className="w-full text-center py-8 px-4 pb-24 sm:pb-0 text-gray-500 text-sm  bg-gray-50 border-t border-gray-200">
      &copy; {new Date().getFullYear()} OFFZON. All rights reserved.
    </footer>
  );
}