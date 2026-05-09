export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ഭാവിയിൽ Admin Sidebar Component ഇവിടെ വരും */}
      {/* <aside className="w-64 bg-white hidden md:block">Sidebar</aside> */}
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}