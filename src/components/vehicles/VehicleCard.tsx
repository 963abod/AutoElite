'use client';

import React from 'react';
import { Vehicle, PlatformMode } from '@/types/vehicle';
import { SpecsBadge } from './SpecsBadge';
import { Star, Eye, CheckSquare, Square, ArrowRight, MapPin } from 'lucide-react';

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
  // Rental Total Price Calculation
  const totalRentalPrice = vehicle.rentalPricePerDay * rentalDays;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between">

      {/* Top Image Section */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={vehicle.image}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {vehicle.badges.map((badge, idx) => (
            <span
              key={idx}
              className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-slate-700 border border-slate-200/80 shadow-xs"
            >
              {badge.label}
            </span>
          ))}
        </div>

        {/* Compare Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(vehicle);
          }}
          className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-medium backdrop-blur-md transition-all flex items-center gap-1.5 z-10 cursor-pointer ${
            isCompared
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white/90 text-slate-700 border border-slate-200/80 hover:bg-white'
          }`}
        >
          {isCompared ? <CheckSquare className="w-3.5 h-3.5 text-white" /> : <Square className="w-3.5 h-3.5 text-slate-500" />}
          <span>Compare</span>
        </button>

        {/* Location Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-slate-700 bg-white/90 px-2.5 py-0.5 rounded-md backdrop-blur-md border border-slate-200/80 shadow-xs">
          <MapPin className="w-3 h-3 text-slate-500" />
          <span>{vehicle.location}</span>
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-mono font-bold text-slate-900 bg-white/90 px-2.5 py-0.5 rounded-md backdrop-blur-md border border-slate-200/80 shadow-xs">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{vehicle.rating}</span>
          <span className="text-[10px] text-slate-500 font-normal">({vehicle.reviewCount})</span>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">

        <div>
          {/* Make, Year & Trim */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-1">
            <span>{vehicle.make} • {vehicle.year}</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">{vehicle.bodyType}</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
            {vehicle.model}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-1">{vehicle.trim}</p>
        </div>

        {/* Quick Spec Badges */}
        <SpecsBadge spec={vehicle.specs} compact />

        {/* Dynamic Pricing Block */}
        <div className="pt-3 border-t border-slate-100 flex items-end justify-between">
          {mode === 'rent' ? (
            <div>
              <div className="text-2xl font-extrabold text-slate-900 font-mono">
                ${vehicle.rentalPricePerDay}
                <span className="text-xs font-normal text-slate-500 font-sans"> / day</span>
              </div>
              {rentalDays > 1 && (
                <div className="text-[11px] font-mono text-slate-600 mt-0.5">
                  Est. Total: ${totalRentalPrice.toLocaleString()} ({rentalDays} days)
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="text-2xl font-extrabold text-slate-900 font-mono">
                ${vehicle.purchasePrice.toLocaleString()}
              </div>
              <div className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-block mt-0.5">
                From ${vehicle.estMonthlyLoan}/mo
              </div>
            </div>
          )}
        </div>

        {/* Dual Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={() => onSelectVehicle(vehicle)}
            className="w-full py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Details</span>
          </button>

          <button
            onClick={() => onPrimaryAction(vehicle)}
            className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 bg-[#0B192C] hover:bg-slate-800 text-white shadow-xs transition-all cursor-pointer"
          >
            <span>{mode === 'rent' ? 'Reserve' : 'Test Drive'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
