'use client';

import React from 'react';
import { Vehicle } from '@/types/vehicle';
import { Language, TRANSLATIONS } from '@/data/translations';
import { X, Layers } from 'lucide-react';

interface ComparisonTrayProps {
  vehicles: Vehicle[];
  onRemoveVehicle: (id: string) => void;
  onClearAll: () => void;
  onCompareNow: () => void;
  lang: Language;
}

export const ComparisonTray: React.FC<ComparisonTrayProps> = ({
  vehicles,
  onRemoveVehicle,
  onClearAll,
  onCompareNow,
  lang,
}) => {
  if (vehicles.length === 0) return null;

  const t = TRANSLATIONS[lang];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4 animate-in slide-in-from-bottom-8 duration-300">
      <div className="bg-neutral-900 text-white rounded-full p-2.5 px-6 shadow-2xl flex items-center justify-between gap-4 border border-neutral-800">

        <div className="flex items-center gap-3 shrink-0">
          <Layers className="w-4 h-4 text-neutral-400" />
          <span className="text-xs font-medium uppercase tracking-wider">
            {t.comparing} <span className="font-mono text-neutral-300">({vehicles.length}/3)</span>
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto py-0.5">
          {vehicles.map((v) => (
            <div
              key={v.id}
              className="relative group w-16 h-10 rounded-lg overflow-hidden bg-neutral-800 shrink-0 border border-neutral-700"
            >
              <img src={v.image} alt={v.model} className="w-full h-full object-cover" />
              <button
                onClick={() => onRemoveVehicle(v.id)}
                aria-label={`Remove ${v.model}`}
                className="absolute inset-0 bg-neutral-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onClearAll}
            className="text-[11px] uppercase tracking-wider text-neutral-400 hover:text-white transition-colors px-2 cursor-pointer"
          >
            {t.clear}
          </button>

          <button
            onClick={onCompareNow}
            className="px-5 py-2 rounded-full bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-medium uppercase tracking-wider transition-all cursor-pointer"
          >
            {t.compareMatrix}
          </button>
        </div>

      </div>
    </div>
  );
};
