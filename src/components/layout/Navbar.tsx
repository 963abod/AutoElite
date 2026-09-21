'use client';

import React from 'react';
import { PlatformMode } from '@/types/vehicle';
import { AVAILABLE_LOCATIONS } from '@/data/vehicles';
import { Car, MapPin, Phone, ShieldCheck, Sparkles, Key, ShoppingBag } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-amber-500 p-[1px] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Car className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white font-mono">AUTO<span className="text-blue-400">ELITE</span></span>
              <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">Luxury</span>
            </div>
            <p className="text-[11px] text-gray-400 -mt-1 hidden sm:block">Automotive E-Commerce & Fleet</p>
          </div>
        </div>

        {/* Dynamic Mode Switcher Pills */}
        <div className="bg-slate-900/90 p-1 rounded-full border border-white/10 flex items-center shadow-inner">
          <button
            onClick={() => onModeChange('rent')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              mode === 'rent'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/25'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Rent Fleet</span>
          </button>
          <button
            onClick={() => onModeChange('buy')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              mode === 'buy'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/25 font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Buy Inventory</span>
          </button>
        </div>

        {/* Location Selector & Compare Badge */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-xs text-gray-300">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              aria-label="Select showroom location"
              className="bg-transparent text-gray-200 focus:outline-none cursor-pointer pr-2 text-xs font-medium"
            >
              <option value="All Locations" className="bg-slate-900 text-gray-200">All Showrooms</option>
              {AVAILABLE_LOCATIONS.map((loc) => (
                <option key={loc} value={loc} className="bg-slate-900 text-gray-200">
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Comparison Trigger Button */}
          {comparedCount > 0 && (
            <button
              onClick={onOpenCompare}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 text-xs font-semibold transition-colors relative"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Compare</span>
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] flex items-center justify-center font-bold">
                {comparedCount}
              </span>
            </button>
          )}

          <div className="h-6 w-[1px] bg-white/10"></div>

          <a
            href="tel:+18005550199"
            className="flex items-center gap-2 text-xs font-medium text-gray-300 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">24/7 Concierge</div>
              <div className="text-xs font-semibold text-white">+1 (800) 555-AUTO</div>
            </div>
          </a>
        </div>

      </div>
    </header>
  );
};
