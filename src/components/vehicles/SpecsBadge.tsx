'use client';

import React from 'react';
import { VehicleSpec } from '@/types/vehicle';

interface SpecsBadgeProps {
  spec: VehicleSpec;
  compact?: boolean;
}

export const SpecsBadge: React.FC<SpecsBadgeProps> = ({ spec }) => {
  // Extract power number (e.g. "750 hp / 560 kW" -> "750 HP") or power string
  const formattedPower = spec.power.split('/')[0].trim().toUpperCase();

  return (
    <div className="text-xs text-neutral-500 font-light flex items-center gap-2 tracking-wide font-sans">
      <span>{formattedPower}</span>
      <span className="text-neutral-300">·</span>
      <span>{spec.acceleration}</span>
      <span className="text-neutral-300">·</span>
      <span className="truncate max-w-[120px]">{spec.transmission}</span>
    </div>
  );
};
