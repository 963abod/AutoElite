'use client';

import React from 'react';
import { VehicleSpec } from '@/types/vehicle';
import { Gauge, Fuel, Users, Cpu } from 'lucide-react';

interface SpecsBadgeProps {
  spec: VehicleSpec;
  compact?: boolean;
}

export const SpecsBadge: React.FC<SpecsBadgeProps> = ({ spec, compact = false }) => {
  return (
    <div className={`grid grid-cols-2 ${compact ? 'gap-2 text-[11px]' : 'gap-2.5 text-xs'}`}>

      {/* Acceleration / Power */}
      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
        <Gauge className="w-3.5 h-3.5 text-slate-500 shrink-0" />
        <span className="font-mono truncate">{spec.acceleration}</span>
      </div>

      {/* Gearbox / Transmission */}
      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
        <Cpu className="w-3.5 h-3.5 text-slate-500 shrink-0" />
        <span className="truncate">{spec.transmission}</span>
      </div>

      {/* Fuel Economy or Range */}
      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
        <Fuel className="w-3.5 h-3.5 text-slate-500 shrink-0" />
        <span className="font-mono truncate">{spec.fuelEconomyOrRange}</span>
      </div>

      {/* Seating */}
      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
        <Users className="w-3.5 h-3.5 text-slate-500 shrink-0" />
        <span>{spec.seats} Seats</span>
      </div>

    </div>
  );
};
