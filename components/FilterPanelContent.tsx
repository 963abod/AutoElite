"use client";

import { cn, formatUsd } from "@/lib/utils";
import { RangeSlider } from "@/components/RangeSlider";
import { FUEL_TYPES, PRICE_BOUNDS, YEAR_BOUNDS } from "@/lib/data";
import type { CarFilters, FuelType } from "@/types/car";

export function FilterPanelContent({
  filters,
  onChange,
}: {
  filters: CarFilters;
  onChange: (next: CarFilters) => void;
}) {
  function toggleFuel(fuel: FuelType) {
    const active = filters.fuelTypes.includes(fuel);
    onChange({
      ...filters,
      fuelTypes: active
        ? filters.fuelTypes.filter((f) => f !== fuel)
        : [...filters.fuelTypes, fuel],
    });
  }

  return (
    <div className="w-full space-y-7">
      <div>
        <p className="mb-3 text-sm font-medium text-ink">نوع المحرك</p>
        <div className="flex flex-wrap gap-2">
          {FUEL_TYPES.map((fuel) => {
            const active = filters.fuelTypes.includes(fuel);
            return (
              <button
                key={fuel}
                type="button"
                onClick={() => toggleFuel(fuel)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  active
                    ? "border-champagne-deep bg-champagne-pale text-ink"
                    : "border-line bg-canvas text-ink-soft hover:border-champagne-deep"
                )}
              >
                {fuel}
              </button>
            );
          })}
        </div>
      </div>

      <RangeSlider
        label="سنة الصنع"
        min={YEAR_BOUNDS[0]}
        max={YEAR_BOUNDS[1]}
        step={1}
        value={filters.yearRange}
        onChange={(yearRange) => onChange({ ...filters, yearRange })}
        formatValue={(n) => `${n}`}
      />

      <RangeSlider
        label="نطاق السعر"
        min={PRICE_BOUNDS[0]}
        max={PRICE_BOUNDS[1]}
        step={1000}
        value={filters.priceRange}
        onChange={(priceRange) => onChange({ ...filters, priceRange })}
        formatValue={formatUsd}
      />
    </div>
  );
}
