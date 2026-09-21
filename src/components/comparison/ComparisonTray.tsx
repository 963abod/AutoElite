'use client';

import React from 'react';
import { Vehicle } from '@/types/vehicle';
import { X, Sparkles, Scale, Trash2 } from 'lucide-react';

interface ComparisonTrayProps {
  vehicles: Vehicle[];
  onRemoveVehicle: (id: string) => void;
  onClearAll: () => void;
  onCompareNow: () => void;
}

export const ComparisonTray: React.FC<ComparisonTrayProps> = ({
  vehicles,
  onRemoveVehicle,
  onClearAll,
  onCompareNow,
}) => {
  if (vehicles.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-4xl px-4 animate-in slide-in-from-bottom-6 duration-300">
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Left Title & Counter */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
            <Scale className="w-5 h-5 text-slate-700" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <span>Compare Vehicles</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-white font-extrabold">
                {vehicles.length} / 3
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Side-by-side specs and pricing matrix</p>
          </div>
        </div>

        {/* Middle Thumbnails */}
        <div className="flex items-center gap-3 overflow-x-auto py-1">
          {vehicles.map((v) => (
            <div
              key={v.id}
              className="relative group w-28 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0"
            >
              <img src={v.image} alt={v.model} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => onRemoveVehicle(v.id)}
                  aria-label={`Remove ${v.model} from comparison`}
                  className="p-1 rounded-full bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-[10px] text-white px-1 truncate font-mono">
                {v.model}
              </div>
            </div>
          ))}
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onClearAll}
            className="p-2 text-xs text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={onCompareNow}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Compare Now</span>
          </button>
        </div>

      </div>
    </div>
  );
};
