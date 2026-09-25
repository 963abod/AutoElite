"use client";

import { useMemo, useState } from "react";
import { CARS, PRICE_BOUNDS as DEFAULT_PRICE_BOUNDS, YEAR_BOUNDS as DEFAULT_YEAR_BOUNDS } from "@/lib/data";
import { FilterBar } from "@/components/FilterBar";
import { CarGrid } from "@/components/CarGrid";
import type { CarFilters, Car } from "@/types/car";
import { useSiteData } from "@/components/SiteProvider";

export function CarsExplorer() {
  const { cars: dbCars } = useSiteData();

  // تحويل وتجهيز سيارات Supabase واستخراج الصور بكافة مسمياتها
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

      // 2. فحص مصفوفة الصور إن وجدت
      if (Array.isArray(c.images)) {
        c.images.forEach((img: any) => {
          const url = typeof img === "string" ? img : img?.url || img?.image_url;
          if (url && !extractedImages.includes(url)) extractedImages.push(url);
        });
      }

      // 3. فحص كافة المسميات المباشرة لحقل الصورة
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

      // إذا لم تتوفر أي صورة يتم استخدام صورة افتراضية
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

  // دمج سيارات قاعدة البيانات في مقدمة القائمة
  const allCars = useMemo(() => {
    if (formattedDbCars.length === 0) return CARS;
    return [
      ...formattedDbCars,
      ...CARS.filter(
        (mc) => !formattedDbCars.some((dc) => dc.id === mc.id || dc.slug === mc.slug)
      ),
    ];
  }, [formattedDbCars]);

  const dynamicPriceBounds = useMemo<[number, number]>(() => {
    if (allCars.length === 0) return DEFAULT_PRICE_BOUNDS;
    const prices = allCars.map((c) => c.priceUsd).filter((p) => p > 0);
    if (prices.length === 0) return DEFAULT_PRICE_BOUNDS;
    return [Math.floor(Math.min(...prices) * 0.9), Math.ceil(Math.max(...prices) * 1.1)];
  }, [allCars]);

  const dynamicYearBounds = useMemo<[number, number]>(() => {
    if (allCars.length === 0) return DEFAULT_YEAR_BOUNDS;
    const years = allCars.map((c) => c.year).filter((y) => y > 0);
    if (years.length === 0) return DEFAULT_YEAR_BOUNDS;
    return [Math.min(...years), Math.max(...years)];
  }, [allCars]);

  const [filters, setFilters] = useState<CarFilters>({
    brands: [],
    fuelTypes: [],
    yearRange: [2010, 2030],
    priceRange: [0, 20000000],
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
        filters.priceRange[1] < 20000000 &&
        car.priceUsd > filters.priceRange[1]
      ) {
        return false;
      }
      return true;
    });
  }, [allCars, filters]);

  const activeCount =
    filters.brands.length +
    filters.fuelTypes.length +
    (filters.yearRange[0] !== dynamicYearBounds[0] || filters.yearRange[1] !== dynamicYearBounds[1] ? 1 : 0) +
    (filters.priceRange[0] !== dynamicPriceBounds[0] || filters.priceRange[1] !== dynamicPriceBounds[1] ? 1 : 0);

  function resetFilters() {
    setFilters({
      brands: [],
      fuelTypes: [],
      yearRange: dynamicYearBounds,
      priceRange: dynamicPriceBounds,
    });
  }

  return (
    <section id="listings">
      <FilterBar
        filters={filters}
        onChange={setFilters}
        activeCount={activeCount}
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
