'use client';

import React from 'react';
import { Vehicle, PlatformMode, SearchFilterState } from '@/types/vehicle';
import { VehicleCard } from './VehicleCard';
import { QuickFilters } from './QuickFilters';
import { RotateCcw } from 'lucide-react';

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
    <section id="inventory-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Quick Filters Component */}
      <QuickFilters
        filters={filters}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
        totalResults={vehicles.length}
      />

      {/* Grid of Vehicle Cards (Spacious 2/3 Column Grid with generous gap-8 to gap-12) */}
      {vehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
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
        <div className="bg-white rounded-3xl p-16 text-center max-w-lg mx-auto border border-neutral-200/80 space-y-6">
          <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-neutral-900 tracking-tight">No Matching Vehicles</h3>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
              No portfolio vehicles match your current search constraints. Try expanding your price parameter or body style selection.
            </p>
          </div>
          <button
            onClick={onResetFilters}
            className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer"
          >
            Reset Criteria
          </button>
        </div>
      )}

    </section>
  );
};
