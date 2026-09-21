'use client';

import React from 'react';
import { Language, TRANSLATIONS } from '@/data/translations';
import { ArrowUpRight, ArrowUpLeft } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="mt-32 border-t border-neutral-200/80 bg-[#F8F9FA] text-neutral-800 text-xs">

      {/* Editorial Value Pillars */}
      <div className="border-b border-neutral-200/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">

          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">{t.value01Title}</span>
            <h4 className="text-sm font-medium text-neutral-900 tracking-tight">{t.value01Heading}</h4>
            <p className="text-neutral-500 leading-relaxed font-light">
              {t.value01Desc}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">{t.value02Title}</span>
            <h4 className="text-sm font-medium text-neutral-900 tracking-tight">{t.value02Heading}</h4>
            <p className="text-neutral-500 leading-relaxed font-light">
              {t.value02Desc}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">{t.value03Title}</span>
            <h4 className="text-sm font-medium text-neutral-900 tracking-tight">{t.value03Heading}</h4>
            <p className="text-neutral-500 leading-relaxed font-light">
              {t.value03Desc}
            </p>
          </div>

        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

        {/* Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center text-white">
              <span className="text-xs font-serif font-bold">Æ</span>
            </div>
            <span className="text-base font-medium tracking-widest uppercase text-neutral-900">
              {t.brandName}
            </span>
          </div>
          <p className="text-neutral-500 leading-relaxed max-w-sm font-light">
            {t.aboutDesc}
          </p>
          <div className="pt-4 text-[11px] uppercase tracking-widest text-neutral-400 font-medium">
            ميونيخ · لندن · دبي · زوريخ · باريس · نيويورك
          </div>
        </div>

        {/* Fleet Navigation */}
        <div className="space-y-3">
          <h5 className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">{t.rentalFleet}</h5>
          <ul className="space-y-2 text-neutral-600 font-light">
            <li><a href="#" className="hover:text-neutral-900 transition-colors">{t.electricEV}</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">{t.coupe}</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">{t.executiveSUV}</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">{t.sportsCar}</a></li>
          </ul>
        </div>

        {/* Sales Navigation */}
        <div className="space-y-3">
          <h5 className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">{t.privateSales}</h5>
          <ul className="space-y-2 text-neutral-600 font-light">
            <li><a href="#" className="hover:text-neutral-900 transition-colors">{t.curatedVehicles}</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">{t.loanEstimator}</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">{t.bookTestDrive}</a></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="space-y-3">
          <h5 className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">{t.journalTitle}</h5>
          <p className="text-neutral-500 leading-relaxed font-light">
            {t.journalDesc}
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="pt-1">
            <div className="flex items-center border-b border-neutral-300 py-1">
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                className="w-full bg-transparent text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="text-neutral-900 hover:text-neutral-600 cursor-pointer p-1"
              >
                {lang === 'ar' ? <ArrowUpLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-neutral-200/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-neutral-400 gap-4 text-[11px] uppercase tracking-wider font-medium">
          <p>© {new Date().getFullYear()} {t.brandName}. {t.rights}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neutral-800 transition-colors">{t.privacy}</a>
            <a href="#" className="hover:text-neutral-800 transition-colors">{t.terms}</a>
            <a href="#" className="hover:text-neutral-800 transition-colors">{t.imprint}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
