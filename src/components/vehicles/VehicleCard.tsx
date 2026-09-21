'use client';

import React from 'react';
import { Vehicle, PlatformMode } from '@/types/vehicle';
import { SpecsBadge } from './SpecsBadge';
import { ShieldCheck, Zap, Star, Eye, Calendar, CheckSquare, Square, ArrowRight, MapPin } from 'lucide-react';

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
    <div className="group glass-card rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">

      {/* Top Image Section */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
        <img
          src={vehicle.image}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {vehicle.badges.map((badge, idx) => (
            <span
              key={idx}
              className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md backdrop-blur-md border ${
                badge.type === 'instant'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : badge.type === 'electric'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                  : badge.type === 'hybrid'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-slate-900/60 text-gray-200 border-white/10'
              }`}
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
          className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-medium backdrop-blur-md border transition-all flex items-center gap-1.5 z-10 ${
            isCompared
              ? 'bg-blue-600 text-white border-blue-400'
              : 'bg-slate-900/80 text-gray-300 border-white/15 hover:border-white/30'
          }`}
        >
          {isCompared ? <CheckSquare className="w-3.5 h-3.5 text-white" /> : <Square className="w-3.5 h-3.5" />}
          <span>Compare</span>
        </button>

        {/* Location Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-gray-300 bg-slate-950/70 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
          <MapPin className="w-3 h-3 text-blue-400" />
          <span>{vehicle.location}</span>
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-mono font-bold text-amber-400 bg-slate-950/70 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{vehicle.rating}</span>
          <span className="text-[10px] text-gray-400 font-normal">({vehicle.reviewCount})</span>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">

        <div>
          {/* Make, Year & Trim */}
          <div className="flex items-center justify-between text-xs text-gray-400 font-mono mb-1">
            <span>{vehicle.make} • {vehicle.year}</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-gray-300 border border-white/5">{vehicle.bodyType}</span>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
            {vehicle.model}
          </h3>
          <p className="text-xs text-gray-400 line-clamp-1">{vehicle.trim}</p>
        </div>

        {/* Quick Spec Badges */}
        <SpecsBadge spec={vehicle.specs} compact />

        {/* Dynamic Pricing Block */}
        <div className="pt-3 border-t border-white/10 flex items-end justify-between">
          {mode === 'rent' ? (
            <div>
              <div className="text-2xl font-extrabold text-white font-mono">
                ${vehicle.rentalPricePerDay}
                <span className="text-xs font-normal text-gray-400 font-sans"> / day</span>
              </div>
              {rentalDays > 1 && (
                <div className="text-[11px] font-mono text-cyan-400 mt-0.5">
                  Est. Total: ${totalRentalPrice.toLocaleString()} ({rentalDays} days)
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="text-2xl font-extrabold text-white font-mono">
                ${vehicle.purchasePrice.toLocaleString()}
              </div>
              <div className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block mt-0.5">
                From ${vehicle.estMonthlyLoan}/mo
              </div>
            </div>
          )}
        </div>

        {/* Dual Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={() => onSelectVehicle(vehicle)}
            className="w-full py-2.5 rounded-xl bg-slate-900 border border-white/15 text-gray-200 hover:text-white hover:bg-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          <button
            onClick={() => onPrimaryAction(vehicle)}
            className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all ${
              mode === 'rent'
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/30'
            }`}
          >
            <span>{mode === 'rent' ? 'Reserve' : 'Test Drive'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
