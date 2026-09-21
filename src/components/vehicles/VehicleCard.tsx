'use client';

import React from 'react';
import { Vehicle, PlatformMode } from '@/types/vehicle';
import { SpecsBadge } from './SpecsBadge';
import { Layers, Check } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  mode: PlatformMode;
  rentalDays?: number;
  isCompared: boolean;
  onToggleCompare: (vehicle: Vehicle) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onPrimaryAction: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  mode,
  rentalDays = 1,
  isCompared,
  onToggleCompare,
  onSelectVehicle,
  onPrimaryAction,
}) => {
  return (
    <div
      onClick={() => onSelectVehicle(vehicle)}
      className="group bg-white border border-neutral-200/80 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-neutral-900 hover:shadow-xl cursor-pointer"
    >

      {/* Cinematic Studio Cut Photo (70-80% visual focal point) */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-100">
        <img
          src={vehicle.image}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Minimalist Compare Icon Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(vehicle);
          }}
          title={isCompared ? "Remove from comparison" : "Add to comparison"}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            isCompared
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'bg-white/80 text-neutral-600 hover:bg-white hover:text-neutral-900 border border-neutral-200'
          }`}
        >
          {isCompared ? <Check className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
        </button>

        {/* Quiet Location Tag */}
        <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-widest text-neutral-600 font-medium bg-white/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-neutral-200/60">
          {vehicle.location}
        </div>
      </div>

      {/* Editorial Content Block */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">

        <div className="space-y-1.5">
          {/* Make & Category */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-neutral-400 font-medium">
            <span>{vehicle.make}</span>
            <span>{vehicle.year}</span>
          </div>

          {/* Model Title */}
          <h3 className="text-xl font-normal text-neutral-900 tracking-tight group-hover:text-neutral-600 transition-colors">
            {vehicle.model}
          </h3>

          {/* Trim */}
          <p className="text-xs text-neutral-400 font-light line-clamp-1">
            {vehicle.trim}
          </p>
        </div>

        {/* Understated 3-Specs Line */}
        <SpecsBadge spec={vehicle.specs} />

        {/* Pricing & Single Elegant Action */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block">
              {mode === 'rent' ? 'Rate' : 'Price'}
            </span>
            <div className="text-lg font-medium text-neutral-900 tracking-tight">
              {mode === 'rent' ? (
                <>
                  ${vehicle.rentalPricePerDay} <span className="text-xs font-light text-neutral-400">/ day</span>
                </>
              ) : (
                <>${vehicle.purchasePrice.toLocaleString()}</>
              )}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrimaryAction(vehicle);
            }}
            className="px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium uppercase tracking-wider transition-all duration-300 shadow-xs cursor-pointer"
          >
            {mode === 'rent' ? 'Reserve' : 'Inquire'}
          </button>
        </div>

      </div>

    </div>
  );
};
