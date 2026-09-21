'use client';

import React from 'react';
import { Vehicle, PlatformMode, SearchFilterState } from '@/types/vehicle';
import { VehicleCard } from './VehicleCard';
import { QuickFilters } from './QuickFilters';
import { SearchX } from 'lucide-react';

interface VehicleGridProps {
  vehicles: Vehicle[];
  mode: PlatformMode;
  filters: SearchFilterState;
  onFilterChange: (filters: Partial<SearchFilterState>) => void;
  onResetFilters: () => void;
  comparedVehicles: Vehicle[];
  onToggleCompare: (vehicle: Vehicle) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onPrimaryAction: (vehicle: Vehicle) => void;
}

export const VehicleGrid: React.FC<VehicleGridProps> = ({
  vehicles,
  mode,
  filters,
  onFilterChange,
  onResetFilters,
  comparedVehicles,
  onToggleCompare,
  onSelectVehicle,
  onPrimaryAction,
}) => {
  // Calculate rental duration in days for cards
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
    <section id="inventory-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Quick Filters Component */}
      <QuickFilters
        filters={filters}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
        totalResults={vehicles.length}
      />

      {/* Grid of Vehicle Cards */}
      {vehicles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => {
            const isCompared = comparedVehicles.some((v) => v.id === vehicle.id);
            return (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                mode={mode}
                rentalDays={rentalDays}
                isCompared={isCompared}
                onToggleCompare={onToggleCompare}
                onSelectVehicle={onSelectVehicle}
                onPrimaryAction={onPrimaryAction}
              />
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl p-12 text-center max-w-lg mx-auto border border-slate-200 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-500">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No Matching Vehicles Found</h3>
          <p className="text-xs text-slate-500">
            We couldn't find any vehicles matching your search criteria. Try adjusting your price budget, location, or body style filters.
          </p>
          <button
            onClick={onResetFilters}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </section>
  );
};
