'use client';

import React from 'react';
import { PlatformMode, SearchFilterState } from '@/types/vehicle';
import { SearchWidget } from './SearchWidget';
import { Key, ShoppingBag, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  mode: PlatformMode;
  onModeChange: (mode: PlatformMode) => void;
  filters: SearchFilterState;
  onFilterChange: (filters: Partial<SearchFilterState>) => void;
  onSearchSubmit: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  mode,
  onModeChange,
  filters,
  onFilterChange,
  onSearchSubmit,
}) => {
  return (
    <section className="relative pt-10 pb-16 overflow-hidden bg-gradient-to-b from-slate-100/80 via-slate-50 to-[#F8F9FA]">
      {/* Background Soft Ambient Gradient Overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-100/40 via-indigo-50/50 to-slate-200/40 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* Centered Smooth Pill Switcher ("Buy | Rent") */}
        <div className="inline-flex items-center p-1.5 rounded-full bg-slate-200/70 border border-slate-300/80 shadow-inner backdrop-blur-md mb-8">
          <button
            onClick={() => onModeChange('rent')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
              mode === 'rent'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Key className="w-4 h-4 text-slate-700" />
            <span>Rent a Car</span>
          </button>
          <button
            onClick={() => onModeChange('buy')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
              mode === 'buy'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-slate-700" />
            <span>Buy a Car</span>
          </button>
        </div>

        {/* Dynamic Hero Titles */}
        <div className="max-w-3xl mx-auto space-y-4 mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {mode === 'rent' ? (
              <>
                Drive World-Class Luxury. <br />
                <span className="text-slate-700">
                  Instant European Fleet Rental.
                </span>
              </>
            ) : (
              <>
                Own Unrivaled Performance. <br />
                <span className="text-slate-700">
                  Certified Executive Inventory.
                </span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
            {mode === 'rent'
              ? 'Select from elite electric performance, exotic supercars, and full-size luxury SUVs with transparent daily rates and white-glove doorstep delivery.'
              : 'Browse certified luxury vehicles inspected across 150 points. Flexible auto-financing calculator with custom terms and showroom test drive dispatch.'}
          </p>

          {/* Key Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-slate-700">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
              <span className="font-medium">Zero Excess Insurance</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
              <span className="font-medium">150-Point Certified Inspection</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs">
              <Zap className="w-3.5 h-3.5 text-slate-600" />
              <span className="font-medium">Instant Confirmation</span>
            </div>
          </div>
        </div>

        {/* Floating Filter Box */}
        <div className="max-w-5xl mx-auto">
          <SearchWidget
            mode={mode}
            filters={filters}
            onFilterChange={onFilterChange}
            onSearchSubmit={onSearchSubmit}
          />
        </div>

      </div>
    </section>
  );
};
