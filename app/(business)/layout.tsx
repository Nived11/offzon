"use client";

import React from "react";
import { usePathname } from "next/navigation";
import BusinessSidebar from "@/components/business/BusinessSidebar";
import BusinessHeader from "@/components/business/BusinessHeader";

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const noSidebarRoutes = [
    "/business",
    "/business/login",
    "/business/register",
    "/business/forgot-password",
    "/business/reset-password",
    "/business/verify-otp", 
  ];

  const hideSidebar = noSidebarRoutes.includes(pathname);

  return (
    <div className={`min-h-screen ${hideSidebar ? "bg-white" : "bg-gray-50 flex"}`}>
      
      {!hideSidebar && <BusinessSidebar />}

      <div className={`flex-1 flex flex-col ${!hideSidebar ? "h-screen overflow-hidden" : "w-full"}`}>
        
        {!hideSidebar && <BusinessHeader />}

        {/* 3. Page Content */}
        <main className={`${!hideSidebar ? "flex-1 overflow-y-auto p-6" : "w-full "}`}>
          {children}
        </main>

      </div>
    </div>
  );
}