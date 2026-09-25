"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Gauge, Cog, ShieldCheck } from "lucide-react";
import type { Car } from "@/types/car";
import { formatKm, formatUsd } from "@/lib/utils";
import { SpecBadge } from "@/components/SpecBadge";

export function CarCard({ car }: { car: Car }) {
  const carData = car as any;

  // جلب رابط الصورة بأمان تام وتوافق مع كافة مسميات الخصائص
  const imgSrc =
    carData.heroImage ||
    (Array.isArray(carData.gallery) && carData.gallery[0]) ||
    (Array.isArray(carData.images) && carData.images[0]) ||
    carData.image_url ||
    "https://picsum.photos/seed/apex-car/800/600";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/car/${car.slug}`}
        className="group block overflow-hidden rounded-xl2 border border-line bg-canvas shadow-card transition-shadow hover:shadow-ambient-lg"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
          <Image
            src={imgSrc}
            alt={`${car.brand} ${car.model}`}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <span className="absolute right-3 top-3 rounded-full bg-canvas/90 px-3 py-1 text-xs font-medium text-ink shadow-card">
            {car.year}
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-ink-soft">{car.brand}</p>
              <h3 className="mt-0.5 text-lg font-semibold leading-snug">
                {car.model}
              </h3>
            </div>
            <p className="whitespace-nowrap text-lg font-bold tracking-tightnum tabular-nums">
              {formatUsd(car.priceUsd)}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <SpecBadge icon={Gauge} label={formatKm(car.mileageKm)} />
            <SpecBadge icon={Cog} label={car.fuelType} />
            <SpecBadge icon={ShieldCheck} label={car.condition} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
