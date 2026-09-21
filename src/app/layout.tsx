import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoElite | European Luxury Automotive Showroom & Fleet",
  description: "Experience world-class European luxury vehicles for rent or purchase. Verified inspection, instant booking, and dynamic auto finance calculator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F8F9FA] text-slate-900 selection:bg-slate-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
