'use client';

import React from 'react';
import { SearchFilterState, BodyType } from '@/types/vehicle';
import { Search, SlidersHorizontal, ArrowUpDown, RefreshCcw } from 'lucide-react';

interface QuickFiltersProps {
  filters: SearchFilterState;
  onFilterChange: (filters: Partial<SearchFilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
}

const BODY_TYPES: { label: string; value: string }[] = [
  { label: 'All Models', value: 'All' },
  { label: 'Electric (EV)', value: 'EV' },
  { label: 'Luxury SUV', value: 'SUV' },
  { label: 'Coupé', value: 'Coupe' },
  { label: 'Sports Car', value: 'Sports Car' }
];

export const QuickFilters: React.FC<QuickFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
}) => {
  return (
    <div className="space-y-6 mb-8">

      {/* Category Pills & Top Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {BODY_TYPES.map((bt) => (
            <button
              key={bt.value}
              onClick={() => onFilterChange({ bodyType: bt.value })}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                filters.bodyType === bt.value
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 border border-blue-400/30'
                  : 'bg-slate-900/80 text-gray-400 hover:text-white border border-white/5 hover:border-white/10'
              }`}
            >
              {bt.label}
            </button>
          ))}
        </div>

        {/* Search Input, Sort Dropdown & Reset */}
        <div className="flex flex-wrap items-center gap-3">

          {/* Quick Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search make or model..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-blue-400" />
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="bg-transparent text-gray-200 focus:outline-none cursor-pointer text-xs"
            >
              <option value="featured" className="bg-slate-900 text-gray-200">Featured First</option>
              <option value="price-asc" className="bg-slate-900 text-gray-200">Price: Low to High</option>
              <option value="price-desc" className="bg-slate-900 text-gray-200">Price: High to Low</option>
              <option value="year-desc" className="bg-slate-900 text-gray-200">Newest Year</option>
              <option value="rating" className="bg-slate-900 text-gray-200">Highest Rated</option>
            </select>
          </div>

          {/* Reset Button */}
          <button
            onClick={onResetFilters}
            className="p-2 rounded-xl bg-slate-900/90 border border-white/10 text-gray-400 hover:text-white transition-colors"
            title="Reset Filters"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-gray-400 border-b border-white/5 pb-4">
        <div>
          Showing <span className="text-white font-bold">{totalResults}</span> luxury vehicles matching criteria
        </div>
        <div className="text-[11px] font-mono text-gray-500">
          Mode: <span className="text-blue-400 uppercase font-semibold">{filters.mode}</span>
        </div>
      </div>

    </div>
  );
};
