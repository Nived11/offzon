import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap", 
});

export const metadata: Metadata = {
  title: "OFFZON",
  description: "Discover Local Offers Nearby",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning 
      className="antialiased"
    >
      <body className={`${inter.className} min-h-screen bg-gray-200 text-gray-900 flex justify-center`}>
        {children}
      </body>
    </html>
  );
}