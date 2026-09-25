import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="text-lg font-bold">أبيكس كارز</p>
            <p className="mt-2 max-w-xs text-sm leading-7 text-ink-soft">
              قمة الفخامة والسيارات الحديثة في سورية. تشكيلة مختارة بعناية من
              أرقى الماركات العالمية.
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
                دمشق، سورية
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-champagne-deep" strokeWidth={1.5} />
                <span dir="ltr">+963 99 123 4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-ink-soft sm:flex-row">
          <p>© {new Date().getFullYear()} أبيكس كارز. جميع الحقوق محفوظة.</p>
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
