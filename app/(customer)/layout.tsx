import CustomerHeader from "@/components/customer/CustomerHeader";
import CustomerFooter from "@/components/customer/CustomerFooter";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-gray-50 relative overflow-x-hidden flex flex-col">
      <CustomerHeader />
      
      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full">
        {children}
      </main>

      <CustomerFooter />
    </div>
  );
}