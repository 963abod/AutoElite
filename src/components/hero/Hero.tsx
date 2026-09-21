'use client';

import React from 'react';
import { PlatformMode, SearchFilterState } from '@/types/vehicle';
import { Language, TRANSLATIONS } from '@/data/translations';
import { SearchWidget } from './SearchWidget';

interface HeroProps {
  mode: PlatformMode;
  onModeChange: (mode: PlatformMode) => void;
  filters: SearchFilterState;
  onFilterChange: (filters: Partial<SearchFilterState>) => void;
  onSearchSubmit: () => void;
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({
  mode,
  filters,
  onFilterChange,
  onSearchSubmit,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 bg-[#F8F9FA] text-neutral-900 border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-12">

        {/* Micro Tag */}
        <div className="inline-block">
          <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium border border-neutral-200 px-3.5 py-1.5 rounded-full bg-white">
            {mode === 'rent' ? t.heroTagRent : t.heroTagBuy}
          </span>
        </div>

        {/* Confident Editorial Headline */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight text-neutral-900 leading-[1.08] font-sans">
            {t.heroTitleLine1}<br />
            <span className="font-normal text-neutral-900">{t.heroTitleLine2}</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-500 max-w-xl mx-auto font-light leading-relaxed">
            {mode === 'rent' ? t.heroDescRent : t.heroDescBuy}
          </p>
        </div>

        {/* Horizontal Luxury Filter Strip */}
        <div className="max-w-5xl mx-auto pt-4">
          <SearchWidget
            mode={mode}
            filters={filters}
            onFilterChange={onFilterChange}
            onSearchSubmit={onSearchSubmit}
            lang={lang}
          />
        </div>

      </div>
    </section>
  );
};
