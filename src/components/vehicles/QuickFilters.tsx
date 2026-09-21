'use client';

import React from 'react';
import { SearchFilterState } from '@/types/vehicle';
import { Search, ArrowUpDown, RefreshCcw } from 'lucide-react';

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
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                filters.bodyType === bt.value
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
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
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search make or model..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 shadow-xs"
            />
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 shadow-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="bg-transparent text-slate-800 focus:outline-none cursor-pointer text-xs font-medium"
            >
              <option value="featured" className="bg-white text-slate-800">Featured First</option>
              <option value="price-asc" className="bg-white text-slate-800">Price: Low to High</option>
              <option value="price-desc" className="bg-white text-slate-800">Price: High to Low</option>
              <option value="year-desc" className="bg-white text-slate-800">Newest Year</option>
              <option value="rating" className="bg-white text-slate-800">Highest Rated</option>
            </select>
          </div>

          {/* Reset Button */}
          <button
            onClick={onResetFilters}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
            title="Reset Filters"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200/80 pb-4">
        <div>
          Showing <span className="text-slate-900 font-bold">{totalResults}</span> luxury vehicles matching criteria
        </div>
        <div className="text-[11px] font-mono text-slate-500">
          Mode: <span className="text-slate-900 uppercase font-semibold">{filters.mode}</span>
        </div>
      </div>

    </div>
  );
};
