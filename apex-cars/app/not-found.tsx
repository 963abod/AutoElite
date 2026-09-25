import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-5 text-center">
      <p className="text-sm font-medium text-champagne-deep">404</p>
      <h1 className="mt-3 text-2xl font-bold">لم نتمكن من إيجاد هذه الصفحة</h1>
      <p className="mt-3 text-sm leading-7 text-ink-soft">
        ربما تم بيع هذه السيارة أو أن الرابط غير صحيح. تصفّح بقية تشكيلتنا من
        السيارات المعروضة حالياً.
      </p>
      <Link
        href="/#listings"
        className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas"
      >
        العودة إلى السيارات
      </Link>
    </div>
  );
}
