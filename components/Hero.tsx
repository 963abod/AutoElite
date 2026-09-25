"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useSiteData } from "@/components/SiteProvider";
import { useEffect, useState } from "react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  const { sections, heroImages, cars } = useSiteData();

  // ذاكرة فورية لحفظ واسترجاع صورة المعرض وعدد السيارات فوراً عند عمل Refresh
  const [cachedImg, setCachedImg] = useState<string>("");
  const [cachedCount, setCachedCount] = useState<number | null>(null);

  useEffect(() => {
    const savedImg = localStorage.getItem("apex_cached_hero");
    if (savedImg) setCachedImg(savedImg);

    const savedCount = localStorage.getItem("apex_cached_car_count");
    if (savedCount) setCachedCount(Number(savedCount));
  }, []);

  useEffect(() => {
    if (heroImages && heroImages.length > 0 && heroImages[0]?.image_url) {
      setCachedImg(heroImages[0].image_url);
      localStorage.setItem("apex_cached_hero", heroImages[0].image_url);
    }
  }, [heroImages]);

  useEffect(() => {
    if (cars && Array.isArray(cars) && cars.length > 0) {
      setCachedCount(cars.length);
      localStorage.setItem("apex_cached_car_count", cars.length.toString());
    }
  }, [cars]);

  // نصوص قسم الهيرو
  const heroSection = sections?.hero || sections?.["hero_section"];
  const badgeText = heroSection?.subtitle || "معرض سيارات فاخرة — دمشق";
  const mainTitle = heroSection?.title || "قمة الفخامة والسيارات\nالحديثة في سورية";
  const description =
    heroSection?.content ||
    "نوفر لكم تشكيلة مختارة من أرقى السيارات الفاخرة، مفحوصة بعناية ومضمونة الحالة، مع تجربة معاينة واقتناء تليق بتوقعاتكم.";

  // استخدام الصورة الجديدة المرفوعة أو المخزنة محلياً، وحذف صورة البحر القديمة نهائياً
  const activeHeroImg =
    (heroImages && heroImages.length > 0 && heroImages[0]?.image_url) ||
    cachedImg;

  const displayCount =
    (cars && cars.length > 0 ? cars.length : null) ??
    cachedCount ??
    null;

  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-xl"
        >
          <motion.p
            variants={item}
            className="mb-5 text-sm font-medium text-champagne-deep"
          >
            {badgeText}
          </motion.p>

          <motion.h1
            variants={item}
            className="text-4xl font-bold leading-[1.15] sm:text-5xl lg:text-[3.3rem] whitespace-pre-line"
          >
            {mainTitle}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-md text-base leading-8 text-ink-soft whitespace-pre-line"
          >
            {description}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex items-center gap-4">
            <a
              href="#listings"
              className="group flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-canvas shadow-ambient transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              تصفح السيارات
              <ArrowLeft
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                strokeWidth={1.5}
              />
            </a>
            {displayCount !== null && (
              <span className="text-sm text-ink-soft">
                {`+${displayCount}`} سيارة متوفرة حالياً
              </span>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/3] overflow-hidden rounded-xl2 border border-line bg-surface-2 shadow-ambient-lg lg:-ms-6"
        >
          {activeHeroImg ? (
            <Image
              src={activeHeroImg}
              alt="معرض أبيكس كارز"
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full animate-pulse bg-surface-2" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/15 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
