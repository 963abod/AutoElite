import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SiteProvider } from "@/components/SiteProvider";

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "أبيكس كارز | Apex Cars — قمة الفخامة والسيارات الحديثة في سورية",
  description:
    "معرض أبيكس كارز لسيارات الفخامة في سورية. تشكيلة مختارة من مرسيدس، بي إم دبليو، رينج روفر، بورشه، لكزس وأودي بحالة ممتازة.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={plexArabic.variable}>
      <body className="font-arabic bg-canvas text-ink antialiased">
        <SiteProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SiteProvider>
      </body>
    </html>
  );
}
