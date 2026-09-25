"use client";

import { useMemo, useState } from "react";
import { CARS, PRICE_BOUNDS, YEAR_BOUNDS } from "@/lib/data";
import { FilterBar } from "@/components/FilterBar";
import { CarGrid } from "@/components/CarGrid";
import type { CarFilters } from "@/types/car";

const DEFAULT_FILTERS: CarFilters = {
  brands: [],
  fuelTypes: [],
  yearRange: YEAR_BOUNDS,
  priceRange: PRICE_BOUNDS,
};

export function CarsExplorer() {
  const [filters, setFilters] = useState<CarFilters>(DEFAULT_FILTERS);

  const filteredCars = useMemo(() => {
    return CARS.filter((car) => {
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
  }, [filters]);

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
            {filteredCars.length} من {CARS.length} سيارة
          </p>
        </div>

        <CarGrid cars={filteredCars} onReset={resetFilters} />
      </div>
    </section>
  );
}
