"use client";

import { usePathname } from "next/navigation";
import CustomerHeader from "@/components/customer/CustomerHeader";
import CustomerFooter from "@/components/customer/CustomerFooter";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const noLayoutRoutes = ["/search"];
  const isNoLayoutPage = noLayoutRoutes.includes(pathname);

  if (isNoLayoutPage) {
    return <>{children}</>; 
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 relative flex flex-col">
      <CustomerHeader />
      
      <main className="flex-1 w-full  mt-[130px] md:mt-[80px]">
        {children}
      </main>

      <CustomerFooter />
    </div>
  );
}