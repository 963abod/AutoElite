"use client";

import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { useSiteData } from "@/components/SiteProvider";

export function Footer() {
  const { settings, contact, sections } = useSiteData();

  const siteTitle = settings?.site_title_ar || settings?.site_name_ar || "أبيكس كارز";
  const siteDesc =
    sections?.footer?.content ||
    settings?.site_description_ar ||
    settings?.meta_description ||
    "قمة الفخامة والسيارات الحديثة في سورية. تشكيلة مختارة بعناية من أرقى الماركات العالمية.";
  const address = contact?.address_ar || contact?.address || "دمشق، سورية";
  const phone = contact?.phone_number || contact?.phone || "+963 99 123 4567";

  return (
    <footer id="contact" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="text-lg font-bold">{siteTitle}</p>
            <p className="mt-2 max-w-xs text-sm leading-7 text-ink-soft whitespace-pre-line">
              {siteDesc}
            </p>
          </div>

          <div className="text-sm text-ink-soft">
            <p className="mb-3 font-medium text-ink">روابط سريعة</p>
            <ul className="space-y-2">
              <li>
                <Link href="/#listings" className="transition-colors hover:text-ink">
                  السيارات المعروضة
                </Link>
              </li>
              <li>
                <Link href="/#about" className="transition-colors hover:text-ink">
                  من نحن
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-sm text-ink-soft">
            <p className="mb-3 font-medium text-ink">معلومات التواصل</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-champagne-deep" strokeWidth={1.5} />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-champagne-deep" strokeWidth={1.5} />
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                  dir="ltr"
                  className="transition-colors hover:text-ink"
                >
                  {phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-ink-soft sm:flex-row">
          <p>© {new Date().getFullYear()} {siteTitle}. جميع الحقوق محفوظة.</p>
          <p>
            تصميم وتطوير بواسطة{" "}
            <a
              href="https://aboudweb.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-champagne-deep underline decoration-champagne/50 underline-offset-4 transition-colors hover:text-ink"
            >
              Aboud Web
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
