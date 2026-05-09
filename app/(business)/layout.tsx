export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-white relative shadow-md border-x border-gray-100">
      {/* ഭാവിയിൽ Business Top/Bottom Nav ഇവിടെ വരും */}
      <main className="pb-20">
        {children}
      </main>
    </div>
  );
}