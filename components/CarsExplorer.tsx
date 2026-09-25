"use client";

import { useMemo, useState } from "react";
import { CARS, PRICE_BOUNDS, YEAR_BOUNDS } from "@/lib/data";
import { FilterBar } from "@/components/FilterBar";
import { CarGrid } from "@/components/CarGrid";
import type { CarFilters, Car } from "@/types/car";
import { useSiteData } from "@/components/SiteProvider";

const DEFAULT_FILTERS: CarFilters = {
  brands: [],
  fuelTypes: [],
  yearRange: YEAR_BOUNDS,
  priceRange: PRICE_BOUNDS,
};

export function CarsExplorer() {
  const { cars: dbCars } = useSiteData();
  const [filters, setFilters] = useState<CarFilters>(DEFAULT_FILTERS);

  // تحويل وتجهيز سيارات Supabase مع ملء كافة خصائص Car المطلوبة
  const formattedDbCars = useMemo<Car[]>(() => {
    if (!dbCars || dbCars.length === 0) return [];

    return dbCars.map((c: any) => {
      const imgs: string[] = [];
      if (Array.isArray(c.car_images) && c.car_images.length > 0) {
        const sorted = [...c.car_images].sort(
          (a, b) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0)
        );
        sorted.forEach((img: any) => {
          if (img.image_url) imgs.push(img.image_url);
        });
      }
      if (c.image_url && !imgs.includes(c.image_url)) {
        imgs.unshift(c.image_url);
      }
      if (imgs.length === 0) {
        imgs.push("https://picsum.photos/seed/apex-car/800/600");
      }

      const primaryImg = imgs[0];

      return ({
        id: c.id?.toString() || Math.random().toString(),
        slug: c.slug || `car-${c.id}`,
        name: c.name || `${c.brand || ""} ${c.model || ""}`.trim() || "سيارة فاخرة",
        brand: c.brand || "أخرى",
        model: c.model || "",
        year: Number(c.year) || 2024,
        priceUsd: Number(c.price_usd ?? c.priceUsd ?? 0),
        mileageKm: Number(c.mileage_km ?? c.mileageKm ?? 0),
        fuelType: c.fuel_type || c.fuelType || "بنزين",
        transmission: c.transmission || "أوتوماتيك",
        horsepower: Number(c.horsepower) || 400,
        exteriorColor: c.exterior_color || c.exteriorColor || c.color || "أسود",
        interiorColor: c.interior_color || c.interiorColor || "جلد فاخر",
        color: c.exterior_color || c.color || "أسود",
        condition: c.condition || "مستعمل بحالة ممتازة",
        plateStatus: c.plate_status || c.plateStatus || "لوحات نظامية",
        heroImage: primaryImg,
        gallery: imgs,
        images: imgs,
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
        car.priceUsd < filters.priceRange[0] ||
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
    (filters.yearRange[0] !== YEAR_BOUNDS[0] || filters.yearRange[1] !== YEAR_BOUNDS[1] ? 1 : 0) +
    (filters.priceRange[0] !== PRICE_BOUNDS[0] || filters.priceRange[1] !== PRICE_BOUNDS[1] ? 1 : 0);

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
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
