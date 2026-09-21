'use client';

import React from 'react';
import { SearchFilterState } from '@/types/vehicle';
import { Language, TRANSLATIONS } from '@/data/translations';
import { Search, ChevronDown, RotateCcw } from 'lucide-react';

interface QuickFiltersProps {
  filters: SearchFilterState;
  onFilterChange: (filters: Partial<SearchFilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
  lang: Language;
}

export const QuickFilters: React.FC<QuickFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  const bodyTypes = [
    { label: t.allModels, value: 'All' },
    { label: t.electricEV, value: 'EV' },
    { label: t.executiveSUV, value: 'SUV' },
    { label: t.coupe, value: 'Coupe' },
    { label: t.sportsCar, value: 'Sports Car' }
  ];

  return (
    <div className="space-y-6 mb-12">

      {/* Category Filter Pills & Search Control */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-200/80">

        {/* Minimalist Category Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 lg:pb-0">
          {bodyTypes.map((bt) => (
            <button
              key={bt.value}
              onClick={() => onFilterChange({ bodyType: bt.value })}
              className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                filters.bodyType === bt.value
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200/80'
              }`}
            >
              {bt.label}
            </button>
          ))}
        </div>

        {/* Quick Search & Sort */}
        <div className="flex items-center gap-3">

          {/* Quick Search Box */}
          <div className="relative flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute ltr:left-3.5 rtl:right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.filterModel}
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full bg-white border border-neutral-200/80 rounded-full ltr:pl-9 ltr:pr-4 rtl:pr-9 rtl:pl-4 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex items-center bg-white border border-neutral-200/80 rounded-full px-4 py-2 text-xs font-medium text-neutral-900">
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="bg-transparent focus:outline-none cursor-pointer pe-5 appearance-none text-xs"
            >
              <option value="featured">{t.featuredFirst}</option>
              <option value="price-asc">{t.priceLowHigh}</option>
              <option value="price-desc">{t.priceHighLow}</option>
              <option value="year-desc">{t.newestGen}</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute ltr:right-3 rtl:left-3 pointer-events-none" />
          </div>

          {/* Reset Filters */}
          <button
            onClick={onResetFilters}
            aria-label="Reset all filters"
            className="p-2 rounded-full bg-white border border-neutral-200/80 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
            title="Reset Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-neutral-400 font-medium">
        <div>
          {t.showing} <span className="text-neutral-900 font-bold">{totalResults}</span> {t.curatedVehicles}
        </div>
        <div>
          {t.portfolioMode}: <span className="text-neutral-900 font-semibold">{filters.mode === 'rent' ? t.rental : t.sales}</span>
        </div>
      </div>

    </div>
  );
};
