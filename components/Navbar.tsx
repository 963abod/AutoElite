"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";
import { useSiteData } from "@/components/SiteProvider";

export function Navbar() {
  const { settings, contact } = useSiteData();

  // جلب اسم المعرض من الإعدادات أو استخدام الافتراضي
  const siteNameAr = settings?.site_title_ar || settings?.site_name_ar || "أبيكس كارز";
  const siteNameEn = settings?.site_title_en || settings?.site_name_en || "Apex Cars";

  // توليد رابط الواتساب الديناميكي من رقم التواصل في لوحة التحكم
  const whatsappNumber = contact?.whatsapp_number || contact?.phone_number;
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
        "مرحباً، أود الاستفسار عن السيارات المعروضة في أبيكس كارز."
      )}`
    : buildGeneralWhatsAppLink();

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-lg font-bold tracking-tight sm:text-xl">
            {siteNameAr}
          </span>
          <span className="text-xs text-ink-soft">{siteNameEn}</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          <Link href="/#listings" className="transition-colors hover:text-ink">
            السيارات
          </Link>
          <Link href="/#about" className="transition-colors hover:text-ink">
            من نحن
          </Link>
          <Link href="/#contact" className="transition-colors hover:text-ink">
            تواصل معنا
          </Link>
        </nav>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-xs font-medium text-canvas shadow-card transition-transform hover:scale-[1.03] active:scale-[0.98] sm:text-sm"
        >
          <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
          <span className="hidden sm:inline">تواصل واتساب</span>
        </a>
      </div>
    </header>
  );
}
