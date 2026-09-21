'use client';

import React from 'react';
import { PlatformMode } from '@/types/vehicle';
import { AVAILABLE_LOCATIONS } from '@/data/vehicles';
import { Car, MapPin, Phone, Sparkles, Key, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  mode: PlatformMode;
  onModeChange: (mode: PlatformMode) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  comparedCount: number;
  onOpenCompare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  mode,
  onModeChange,
  selectedLocation,
  onLocationChange,
  comparedCount,
  onOpenCompare,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-md text-white">
            <Car className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-slate-900 font-mono">AUTO<span className="text-slate-600">ELITE</span></span>
              <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">Luxury</span>
            </div>
            <p className="text-[11px] text-slate-500 -mt-1 hidden sm:block">European Automotive Showroom</p>
          </div>
        </div>

        {/* Dynamic Mode Switcher Pills */}
        <div className="bg-slate-100/80 p-1 rounded-full border border-slate-200/80 flex items-center shadow-inner">
          <button
            onClick={() => onModeChange('rent')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              mode === 'rent'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Rent Fleet</span>
          </button>
          <button
            onClick={() => onModeChange('buy')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              mode === 'buy'
                ? 'bg-slate-900 text-white shadow-md font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Buy Inventory</span>
          </button>
        </div>

        {/* Location Selector & Compare Badge */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              aria-label="Select showroom location"
              className="bg-transparent text-slate-800 focus:outline-none cursor-pointer pr-2 text-xs font-medium"
            >
              <option value="All Locations" className="bg-white text-slate-800">All Showrooms</option>
              {AVAILABLE_LOCATIONS.map((loc) => (
                <option key={loc} value={loc} className="bg-white text-slate-800">
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Comparison Trigger Button */}
          {comparedCount > 0 && (
            <button
              onClick={onOpenCompare}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-semibold transition-colors relative"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Compare</span>
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] flex items-center justify-center font-bold">
                {comparedCount}
              </span>
            </button>
          )}

          <div className="h-6 w-[1px] bg-slate-200"></div>

          <a
            href="tel:+18005550199"
            className="flex items-center gap-2 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 text-slate-600" />
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">24/7 Concierge</div>
              <div className="text-xs font-semibold text-slate-900">+1 (800) 555-AUTO</div>
            </div>
          </a>
        </div>

      </div>
    </header>
  );
};
