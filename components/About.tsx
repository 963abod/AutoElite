export function About() {
  const stats = [
    { value: "+9", label: "سنوات خبرة في السوق السوري" },
    { value: "+300", label: "سيارة تم تسليمها لعملائنا" },
    { value: "100%", label: "فحص فني شامل قبل العرض" },
  ];

  return (
    <section id="about" className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <p className="text-2xl font-medium leading-[1.6] text-ink sm:text-[1.7rem]">
            أبيكس كارز معرض متخصص بالسيارات الفاخرة في دمشق، نختار كل سيارة
            بعناية فائقة ونخضعها لفحص فني دقيق قبل عرضها، لنقدّم لعملائنا
            تجربة اقتناء مبنية على الثقة والشفافية الكاملة.
          </p>

          <div className="flex flex-col divide-y divide-line border-t border-line lg:border-t-0 lg:border-e lg:border-line lg:ps-10 lg:pt-0">
            {stats.map((s) => (
              <div key={s.label} className="flex items-baseline gap-4 py-5 first:pt-0 lg:first:pt-5">
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
