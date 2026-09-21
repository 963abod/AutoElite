'use client';

import React from 'react';
import { PlatformMode, SearchFilterState } from '@/types/vehicle';
import { Language, TRANSLATIONS } from '@/data/translations';
import { AVAILABLE_LOCATIONS } from '@/data/vehicles';
import { Search, ChevronDown } from 'lucide-react';

interface SearchWidgetProps {
  mode: PlatformMode;
  filters: SearchFilterState;
  onFilterChange: (filters: Partial<SearchFilterState>) => void;
  onSearchSubmit: () => void;
  lang: Language;
}

export const SearchWidget: React.FC<SearchWidgetProps> = ({
  mode,
  filters,
  onFilterChange,
  onSearchSubmit,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  const calculateDays = () => {
    if (!filters.pickupDate || !filters.returnDate) return 1;
    const start = new Date(filters.pickupDate);
    const end = new Date(filters.returnDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const rentalDays = calculateDays();

  return (
    <div className="w-full bg-white rounded-full p-2 sm:p-3 border border-neutral-200/80 shadow-xs transition-all duration-300">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearchSubmit();
        }}
        className="w-full"
      >
        {mode === 'rent' ? (
          /* RENTAL FILTER STRIP */
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0 divide-y md:divide-y-0 md:divide-x md:rtl:divide-x-reverse divide-neutral-100">

            {/* Showroom Hub Select */}
            <div className="flex-1 px-4 sm:px-6 py-2 text-start">
              <label className="block text-[10px] uppercase tracking-widest text-neutral-400 font-medium mb-1">
                {t.showroomHub}
              </label>
              <div className="relative flex items-center">
                <select
                  value={filters.location}
                  onChange={(e) => onFilterChange({ location: e.target.value })}
                  className="w-full bg-transparent text-xs font-medium text-neutral-900 focus:outline-none cursor-pointer appearance-none pe-6"
                >
                  <option value="All Locations">{t.allShowrooms}</option>
                  {AVAILABLE_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute ltr:right-0 rtl:left-0 pointer-events-none" />
              </div>
            </div>

            {/* Pickup Date */}
            <div className="flex-1 px-4 sm:px-6 py-2 text-start">
              <label className="block text-[10px] uppercase tracking-widest text-neutral-400 font-medium mb-1">
                {t.pickupDate}
              </label>
              <input
                type="date"
                value={filters.pickupDate}
                onChange={(e) => onFilterChange({ pickupDate: e.target.value })}
                className="w-full bg-transparent text-xs font-medium text-neutral-900 focus:outline-none cursor-pointer"
              />
            </div>

            {/* Return Date */}
            <div className="flex-1 px-4 sm:px-6 py-2 text-start">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
                  {t.returnDate}
                </label>
                <span className="text-[10px] font-mono text-neutral-400">
                  {rentalDays} {rentalDays === 1 ? t.day : t.days}
                </span>
              </div>
              <input
                type="date"
                value={filters.returnDate}
                onChange={(e) => onFilterChange({ returnDate: e.target.value })}
                className="w-full bg-transparent text-xs font-medium text-neutral-900 focus:outline-none cursor-pointer"
              />
            </div>

            {/* Search Button */}
            <div className="px-2 pt-2 md:pt-0">
              <button
                type="submit"
                className="w-full md:w-auto px-7 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{t.exploreFleet}</span>
              </button>
            </div>

          </div>
        ) : (
          /* PRIVATE SALES FILTER STRIP */
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0 divide-y md:divide-y-0 md:divide-x md:rtl:divide-x-reverse divide-neutral-100">

            {/* Body Style */}
            <div className="flex-1 px-4 sm:px-6 py-2 text-start">
              <label className="block text-[10px] uppercase tracking-widest text-neutral-400 font-medium mb-1">
                {t.curatedCategory}
              </label>
              <div className="relative flex items-center">
                <select
                  value={filters.bodyType}
                  onChange={(e) => onFilterChange({ bodyType: e.target.value })}
                  className="w-full bg-transparent text-xs font-medium text-neutral-900 focus:outline-none cursor-pointer appearance-none pe-6"
                >
                  <option value="All">{t.allModels}</option>
                  <option value="EV">{t.electricEV}</option>
                  <option value="SUV">{t.executiveSUV}</option>
                  <option value="Coupe">{t.coupe}</option>
                  <option value="Sports Car">{t.sportsCar}</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute ltr:right-0 rtl:left-0 pointer-events-none" />
              </div>
            </div>

            {/* Max Price Slider */}
            <div className="flex-1 px-4 sm:px-6 py-2 text-start">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
                  {t.maxBudget}
                </label>
                <span className="text-[10px] font-mono font-medium text-neutral-900">
                  ${filters.priceRange[1].toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={100000}
                max={350000}
                step={5000}
                value={filters.priceRange[1]}
                onChange={(e) =>
                  onFilterChange({ priceRange: [filters.priceRange[0], Number(e.target.value)] })
                }
                className="w-full accent-neutral-900 cursor-pointer h-1 bg-neutral-200 rounded-lg"
              />
            </div>

            {/* Minimum Year */}
            <div className="flex-1 px-4 sm:px-6 py-2 text-start">
              <label className="block text-[10px] uppercase tracking-widest text-neutral-400 font-medium mb-1">
                {t.modelYear}
              </label>
              <div className="relative flex items-center">
                <select
                  value={filters.yearRange[0]}
                  onChange={(e) => onFilterChange({ yearRange: [Number(e.target.value), 2024] })}
                  className="w-full bg-transparent text-xs font-medium text-neutral-900 focus:outline-none cursor-pointer appearance-none pe-6"
                >
                  <option value={2022}>2022 {t.newer}</option>
                  <option value={2023}>2023 {t.newer}</option>
                  <option value={2024}>{t.currentGen}</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute ltr:right-0 rtl:left-0 pointer-events-none" />
              </div>
            </div>

            {/* Search Button */}
            <div className="px-2 pt-2 md:pt-0">
              <button
                type="submit"
                className="w-full md:w-auto px-7 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{t.filterInventory}</span>
              </button>
            </div>

          </div>
        )}

      </form>
    </div>
  );
};
