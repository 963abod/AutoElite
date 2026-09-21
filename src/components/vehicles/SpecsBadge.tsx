'use client';

import React from 'react';
import { VehicleSpec } from '@/types/vehicle';
import { Gauge, Zap, Fuel, Users, Shield, Cpu } from 'lucide-react';

interface SpecsBadgeProps {
  spec: VehicleSpec;
  compact?: boolean;
}

export const SpecsBadge: React.FC<SpecsBadgeProps> = ({ spec, compact = false }) => {
  return (
    <div className={`grid grid-cols-2 ${compact ? 'gap-2 text-[11px]' : 'gap-2.5 text-xs'}`}>

      {/* Acceleration / Power */}
      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-white/5 text-gray-300">
        <Gauge className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <span className="font-mono truncate">{spec.acceleration}</span>
      </div>

      {/* Gearbox / Transmission */}
      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-white/5 text-gray-300">
        <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span className="truncate">{spec.transmission} ({spec.drivetrain})</span>
      </div>

      {/* Fuel Economy or Range */}
      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-white/5 text-gray-300">
        <Fuel className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="font-mono truncate">{spec.fuelEconomyOrRange}</span>
      </div>

      {/* Seating */}
      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-white/5 text-gray-300">
        <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>{spec.seats} Seats</span>
      </div>

    </div>
  );
};
