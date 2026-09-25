"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function CarGallery({
  images,
  carName,
}: {
  images: any[];
  carName: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, direction: "rtl" });
  const [selected, setSelected] = useState(0);

  // توحيد صيغة الصور سواء كانت نصوصاً مباشرة أو كائنات
  const formattedImages = useMemo(() => {
    if (!Array.isArray(images) || images.length === 0) {
      return [{ url: "https://picsum.photos/seed/apex-car/800/600", label: "صورة السيارة" }];
    }
    return images.map((img: any, idx: number) => {
      if (typeof img === "string") {
        return { url: img, label: `صورة ${idx + 1}` };
      }
      return {
        url: img?.url || img?.image_url || img?.image || "https://picsum.photos/seed/apex-car/800/600",
        label: img?.label || `صورة ${idx + 1}`,
      };
    });
  }, [images]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl2 border border-line bg-surface-2 shadow-card">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {formattedImages.map((img, i) => (
              <div className="embla__slide" key={i}>
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={img.url}
                    alt={`${carName} — ${img.label}`}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="الصورة السابقة"
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute start-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-canvas/90 shadow-card transition-transform hover:scale-105"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="الصورة التالية"
          onClick={() => emblaApi?.scrollNext()}
          className="absolute end-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-canvas/90 shadow-card transition-transform hover:scale-105"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <AnimatePresence mode="wait">
          <motion.span
            key={formattedImages[selected]?.label || selected}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-3 right-3 rounded-full bg-canvas/90 px-3.5 py-1.5 text-xs font-medium shadow-card"
          >
            {formattedImages[selected]?.label}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {formattedImages.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
              selected === i
                ? "scale-[1.03] border-champagne-deep"
                : "border-transparent opacity-80 hover:opacity-100"
            )}
          >
            <Image
              src={img.url}
              alt={img.label}
              fill
              unoptimized
              sizes="120px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
