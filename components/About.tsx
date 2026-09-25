"use client";

import { useSiteData } from "@/components/SiteProvider";

const DEFAULT_STATS = [
  { value: "+9", label: "سنوات خبرة في السوق السوري" },
  { value: "+300", label: "سيارة تم تسليمها لعملائنا" },
  { value: "100%", label: "فحص فني شامل قبل العرض" },
];

export function About() {
  const { sections, statistics } = useSiteData();

  // جلب نص نبذة المعرض من اللوحة أو استخدام النص الافتراضي
  const aboutSection = sections?.about || sections?.['about_section'];
  const aboutText =
    aboutSection?.content ||
    "أبيكس كارز معرض متخصص بالسيارات الفاخرة في دمشق، نختار كل سيارة بعناية فائقة ونخضعها لفحص فني دقيق قبل عرضها، لنقدّم لعملائنا تجربة اقتناء مبنية على الثقة والشفافية الكاملة.";

  // جلب الإحصائيات من اللوحة أو استخدام القيم الافتراضية
  const displayStats =
    statistics && statistics.length > 0
      ? statistics.map((s: any) => ({
          value: s.metric_value || s.value,
          label: s.label,
        }))
      : DEFAULT_STATS;

  return (
    <section id="about" className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <p className="text-2xl font-medium leading-[1.6] text-ink sm:text-[1.7rem] whitespace-pre-line">
            {aboutText}
          </p>

          <div className="flex flex-col divide-y divide-line border-t border-line lg:border-t-0 lg:border-e lg:border-line lg:ps-10 lg:pt-0">
            {displayStats.map((s, idx) => (
              <div
                key={s.label || idx}
                className="flex items-baseline gap-4 py-5 first:pt-0 lg:first:pt-5"
              >
                <span className="text-3xl font-bold tracking-tightnum text-champagne-deep">
                  {s.value}
                </span>
                <span className="text-sm text-ink-soft">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
