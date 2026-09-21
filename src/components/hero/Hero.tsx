'use client';

import React from 'react';
import { PlatformMode, SearchFilterState } from '@/types/vehicle';
import { SearchWidget } from './SearchWidget';

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
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 bg-[#F8F9FA] text-neutral-900 border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-12">

        {/* Micro Category Tag */}
        <div className="inline-block">
          <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium border border-neutral-200 px-3.5 py-1.5 rounded-full bg-white">
            {mode === 'rent' ? 'Curated Short-Term & Monthly Fleet' : 'Certified Executive Sales Gallery'}
          </span>
        </div>

        {/* Confident Editorial Headline & Subtitle */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight text-neutral-900 leading-[1.08] font-sans">
            Curated Performance.<br />
            <span className="font-normal text-neutral-900">Uncompromised Elegance.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-500 max-w-xl mx-auto font-light leading-relaxed">
            {mode === 'rent'
              ? 'An elite editorial collection of high-performance automobiles available for direct delivery across Europe and the Middle East.'
              : 'Direct access to certified pre-owned supercars, executive saloons, and electric grand tourers.'}
          </p>
        </div>

        {/* Horizontal Luxury Integrated Filter Strip */}
        <div className="max-w-5xl mx-auto pt-4">
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
