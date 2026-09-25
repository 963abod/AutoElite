"use client";

import { useMemo, useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { CarGrid } from "@/components/CarGrid";
import type { CarFilters, Car } from "@/types/car";
import { useSiteData } from "@/components/SiteProvider";

export function CarsExplorer() {
  const { cars: dbCars } = useSiteData();

  // تحويل وتجهيز سيارات Supabase واستخراج روابط الصور
  const formattedDbCars = useMemo<Car[]>(() => {
    if (!dbCars || dbCars.length === 0) return [];

    return dbCars.map((c: any) => {
      const extractedImages: string[] = [];

      // 1. فحص جدول صور السيارات الفرعي
      if (Array.isArray(c.car_images) && c.car_images.length > 0) {
        c.car_images.forEach((img: any) => {
          const url = typeof img === "string" ? img : img?.image_url || img?.url || img?.image;
          if (url && !extractedImages.includes(url)) extractedImages.push(url);
        });
      }

      // 2. فحص مصفوفة الصور المباشرة
      if (Array.isArray(c.images)) {
        c.images.forEach((img: any) => {
          const url = typeof img === "string" ? img : img?.url || img?.image_url;
          if (url && !extractedImages.includes(url)) extractedImages.push(url);
        });
      }

      // 3. فحص كافة حقول الصور المفردة المحتملة
      const directFields = [
        c.main_image,
        c.image,
        c.image_url,
        c.cover_image,
        c.thumbnail,
        c.photo,
        c.photo_url,
      ];

      directFields.forEach((field) => {
        if (field && typeof field === "string" && !extractedImages.includes(field)) {
          extractedImages.unshift(field);
        }
      });

      if (extractedImages.length === 0) {
        extractedImages.push("https://picsum.photos/seed/apex-car/800/600");
      }

      const primaryImg = extractedImages[0];
      const price = Number(c.price_usd ?? c.price ?? c.priceUsd ?? 0);
      const year = Number(c.year) || 2024;

      return ({
        id: c.id?.toString() || Math.random().toString(),
        slug: c.slug || `car-${c.id}`,
        name: c.name || `${c.brand || ""} ${c.model || ""}`.trim() || "سيارة فاخرة",
        brand: c.brand || "أخرى",
        model: c.model || "",
        year: year,
        priceUsd: price,
        mileageKm: Number(c.mileage_km ?? c.mileage ?? c.mileageKm ?? 0),
        fuelType: c.fuel_type || c.fuelType || "بنزين",
        transmission: c.transmission || "أوتوماتيك",
        horsepower: Number(c.horsepower) || 400,
        exteriorColor: c.exterior_color || c.color || "أسود",
        interiorColor: c.interior_color || "جلد فاخر",
        color: c.exterior_color || c.color || "أسود",
        condition: c.condition || "مستعمل بحالة ممتازة",
        plateStatus: c.plate_status || "لوحات نظامية",
        heroImage: primaryImg,
        gallery: extractedImages,
        images: extractedImages,
        featured: Boolean(c.is_featured ?? c.isFeatured),
        description: c.description || "",
        specs: c.specs || {},
      } as unknown) as Car;
    });
  }, [dbCars]);

  // عرض سياراتك الحقيقية فقط
  const allCars = formattedDbCars;

  const [filters, setFilters] = useState<CarFilters>({
    brands: [],
    fuelTypes: [],
    yearRange: [2000, 2030],
    priceRange: [0, 100000000],
  });

  const filteredCars = useMemo(() => {
    return allCars.filter((car) => {
      if (filters.brands.length > 0 && !filters.brands.includes(car.brand)) {
        return false;
      }
      if (
        filters.fuelTypes.length > 0 &&
        !filters.fuelTypes.includes(car.fuelType)
      ) {
        return false;
      }
      if (car.year < filters.yearRange[0] || car.year > filters.yearRange[1]) {
        return false;
      }
      if (
        filters.priceRange[0] > 0 &&
        car.priceUsd < filters.priceRange[0]
      ) {
        return false;
      }
      if (
        filters.priceRange[1] < 100000000 &&
        car.priceUsd > filters.priceRange[1]
      ) {
        return false;
      }
      return true;
    });
  }, [allCars, filters]);

  function resetFilters() {
    setFilters({
      brands: [],
      fuelTypes: [],
      yearRange: [2000, 2030],
      priceRange: [0, 100000000],
    });
  }

  return (
    <section id="listings">
      <FilterBar
        filters={filters}
        onChange={setFilters}
        activeCount={0}
        onReset={resetFilters}
      />

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">السيارات المعروضة</h2>
          <p className="text-sm text-ink-soft">
            {filteredCars.length} من {allCars.length} سيارة
          </p>
        </div>

        <CarGrid cars={filteredCars} onReset={resetFilters} />
      </div>
    </section>
  );
}
