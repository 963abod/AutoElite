'use client';

import React from 'react';
import { PlatformMode, SearchFilterState } from '@/types/vehicle';
import { SearchWidget } from './SearchWidget';
import { Key, ShoppingBag, ShieldCheck, Zap, Sparkles, CheckCircle2 } from 'lucide-react';

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
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Background Decorative Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* Prominent Pill-Shaped Switcher Header */}
        <div className="inline-flex items-center p-1.5 rounded-full bg-slate-900/90 border border-white/15 shadow-xl backdrop-blur-xl mb-8">
          <button
            onClick={() => onModeChange('rent')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
              mode === 'rent'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Rent a Car</span>
          </button>
          <button
            onClick={() => onModeChange('buy')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
              mode === 'buy'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/30 font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buy a Car</span>
          </button>
        </div>

        {/* Dynamic Hero Titles */}
        <div className="max-w-3xl mx-auto space-y-4 mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {mode === 'rent' ? (
              <>
                Drive World-Class Luxury. <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
                  Instant Rental Booking.
                </span>
              </>
            ) : (
              <>
                Own Unrivaled Performance. <br />
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Verified Executive Fleet.
                </span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-normal">
            {mode === 'rent'
              ? 'Select from elite electric performance, exotic supercars, and full-size luxury SUVs with transparent daily rates and white-glove doorstep delivery.'
              : 'Browse certified luxury vehicles inspected across 150 points. Flexible auto-financing calculator with custom terms and home test drive dispatch.'}
          </p>

          {/* Key Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-gray-300">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Zero Excess Insurance Available</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>150-Point Certified Inspection</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-white/10">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Instant Confirmation</span>
            </div>
          </div>
        </div>

        {/* Embedded Dynamic Reactive Search Widget */}
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
