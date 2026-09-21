'use client';

import React from 'react';
import { PlatformMode } from '@/types/vehicle';
import { Language, TRANSLATIONS } from '@/data/translations';
import { AVAILABLE_LOCATIONS } from '@/data/vehicles';
import { MapPin, Phone, Layers, Globe } from 'lucide-react';

interface NavbarProps {
  mode: PlatformMode;
  onModeChange: (mode: PlatformMode) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  comparedCount: number;
  onOpenCompare: () => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  mode,
  onModeChange,
  selectedLocation,
  onLocationChange,
  comparedCount,
  onOpenCompare,
  lang,
  onLanguageChange,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8F9FA]/90 backdrop-blur-md border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Brand Mark */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-white transition-transform group-hover:scale-105">
            <span className="text-xs font-serif font-bold tracking-tighter">Æ</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-medium tracking-widest uppercase text-neutral-900 font-sans">
              {t.brandName}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-medium -mt-0.5">
              {t.brandSubtitle}
            </span>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="bg-neutral-200/60 p-1 rounded-full border border-neutral-300/50 flex items-center">
          <button
            onClick={() => onModeChange('rent')}
            className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              mode === 'rent'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {t.rentalFleet}
          </button>
          <button
            onClick={() => onModeChange('buy')}
            className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              mode === 'buy'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {t.privateSales}
          </button>
        </div>

        {/* Options & Language Selector */}
        <div className="hidden md:flex items-center gap-5">

          {/* Language Toggle Button */}
          <button
            onClick={() => onLanguageChange(lang === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200 text-xs font-medium text-neutral-800 hover:border-neutral-900 transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-neutral-400" />
            <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
          </button>

          {/* Location Selector */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 text-xs text-neutral-800">
            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              aria-label="Select showroom location"
              className="bg-transparent text-neutral-900 focus:outline-none cursor-pointer pr-1 text-xs font-medium"
            >
              <option value="All Locations" className="bg-white text-neutral-900">{t.allShowrooms}</option>
              {AVAILABLE_LOCATIONS.map((loc) => (
                <option key={loc} value={loc} className="bg-white text-neutral-900">
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Comparison Trigger */}
          {comparedCount > 0 && (
            <button
              onClick={onOpenCompare}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-medium transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-neutral-300" />
              <span className="uppercase tracking-wider text-[10px]">{t.comparing}</span>
              <span className="w-4 h-4 rounded-full bg-white text-neutral-900 text-[10px] flex items-center justify-center font-bold">
                {comparedCount}
              </span>
            </button>
          )}

          <a
            href="tel:+18005550199"
            className="flex items-center gap-2 text-xs font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-white border border-neutral-200 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 text-neutral-600" />
            </div>
            <span className="hidden lg:inline text-[11px] uppercase tracking-widest text-neutral-500 font-medium">
              {t.conciergeDirect}
            </span>
          </a>

        </div>

      </div>
    </header>
  );
};
