'use client';

import React from 'react';
import { PlatformMode, SearchFilterState, BodyType } from '@/types/vehicle';
import { AVAILABLE_LOCATIONS } from '@/data/vehicles';
import { MapPin, Calendar, DollarSign, Car, Search, ShieldCheck, ArrowRight, Clock } from 'lucide-react';

interface SearchWidgetProps {
  mode: PlatformMode;
  filters: SearchFilterState;
  onFilterChange: (filters: Partial<SearchFilterState>) => void;
  onSearchSubmit: () => void;
}

export const SearchWidget: React.FC<SearchWidgetProps> = ({
  mode,
  filters,
  onFilterChange,
  onSearchSubmit,
}) => {
  // Calculate rental duration in days
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
    <div className="w-full glass-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl relative z-10 transition-all duration-500">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearchSubmit();
        }}
        className="space-y-6"
      >
        {mode === 'rent' ? (
          /* RENTAL SEARCH FORM */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">

            {/* Pickup & Drop-off Location */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" /> Pickup & Drop-off
              </label>
              <select
                value={filters.location}
                onChange={(e) => onFilterChange({ location: e.target.value })}
                className="w-full bg-slate-900/90 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              >
                <option value="All Locations">All Showroom Hubs</option>
                {AVAILABLE_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Pickup Date */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-400" /> Pickup Date
              </label>
              <input
                type="date"
                value={filters.pickupDate}
                onChange={(e) => onFilterChange({ pickupDate: e.target.value })}
                className="w-full bg-slate-900/90 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Return Date & Duration counter */}
            <div className="space-y-2 relative">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" /> Return Date
                </label>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {rentalDays} {rentalDays === 1 ? 'Day' : 'Days'}
                </span>
              </div>
              <input
                type="date"
                value={filters.returnDate}
                onChange={(e) => onFilterChange({ returnDate: e.target.value })}
                className="w-full bg-slate-900/90 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Submit CTA */}
            <div>
              <button
                type="submit"
                className="w-full h-[46px] bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all duration-300 group"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Explore Rental Fleet</span>
              </button>
            </div>

          </div>
        ) : (
          /* SALES SEARCH FORM */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">

            {/* Body Type Select */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-amber-400" /> Body Type
              </label>
              <select
                value={filters.bodyType}
                onChange={(e) => onFilterChange({ bodyType: e.target.value })}
                className="w-full bg-slate-900/90 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              >
                <option value="All">All Body Styles</option>
                <option value="EV">Electric (EV)</option>
                <option value="SUV">Luxury SUV</option>
                <option value="Coupe">Coupé</option>
                <option value="Sports Car">Sports Car</option>
              </select>
            </div>

            {/* Budget / Price Range */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-amber-400" /> Max Budget
                </label>
                <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
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
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Year Range */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Minimum Year
              </label>
              <select
                value={filters.yearRange[0]}
                onChange={(e) => onFilterChange({ yearRange: [Number(e.target.value), 2024] })}
                className="w-full bg-slate-900/90 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              >
                <option value={2022}>2022 & Newer</option>
                <option value={2023}>2023 & Newer</option>
                <option value={2024}>2024 Latest Models</option>
              </select>
            </div>

            {/* Submit CTA */}
            <div>
              <button
                type="submit"
                className="w-full h-[46px] bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 group"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Search Inventory</span>
              </button>
            </div>

          </div>
        )}

      </form>
    </div>
  );
};
