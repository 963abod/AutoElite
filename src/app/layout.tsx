import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoElite | Dual-Purpose Luxury Automotive Sales & Rentals",
  description: "Experience world-class luxury vehicles for rent or purchase. Verified inspection, instant booking, and dynamic auto finance calculator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#090d16] text-gray-100 selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
