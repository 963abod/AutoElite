'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-32 border-t border-neutral-200/80 bg-[#F8F9FA] text-neutral-800 text-xs">
      {/* Editorial Value Pillars */}
      <div className="border-b border-neutral-200/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">

          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">01 / Certification</span>
            <h4 className="text-sm font-medium text-neutral-900 tracking-tight">150-Point Technical Audit</h4>
            <p className="text-neutral-500 leading-relaxed">
              Every curated vehicle in our fleet undergoes rigorous mechanical and cosmetic certification to factory standards.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">02 / Concierge</span>
            <h4 className="text-sm font-medium text-neutral-900 tracking-tight">Doorstep Delivery</h4>
            <p className="text-neutral-500 leading-relaxed">
              White-glove private transport directly to your residence, luxury hotel, or private aviation hangar.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">03 / Transparency</span>
            <h4 className="text-sm font-medium text-neutral-900 tracking-tight">Uncompromised Pricing</h4>
            <p className="text-neutral-500 leading-relaxed">
              Transparent rate structures with zero undisclosed fees. Bespoke financing tailored to individual wealth structures.
            </p>
          </div>

        </div>
      </div>

      {/* Main Editorial Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center text-white">
              <span className="text-xs font-serif font-bold">Æ</span>
            </div>
            <span className="text-base font-medium tracking-widest uppercase text-neutral-900">
              Auto<span className="font-light text-neutral-500">Elite</span>
            </span>
          </div>
          <p className="text-neutral-500 leading-relaxed max-w-sm">
            Europe and the Middle East’s premier editorial showroom for curated luxury vehicle rentals, private sales, and automotive concierge.
          </p>
          <div className="pt-4 text-[11px] uppercase tracking-widest text-neutral-400 font-medium">
            Munich · London · Dubai · Zurich · Paris · New York
          </div>
        </div>

        {/* Fleet Navigation */}
        <div className="space-y-3">
          <h5 className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">Rental Fleet</h5>
          <ul className="space-y-2 text-neutral-600">
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Electric Performers</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Exotic Grand Tourers</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Executive SUVs</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Chauffeur Service</a></li>
          </ul>
        </div>

        {/* Sales Navigation */}
        <div className="space-y-3">
          <h5 className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">Private Sales</h5>
          <ul className="space-y-2 text-neutral-600">
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Certified Inventory</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Bespoke Financing</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">VIP Test Drive</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Consignment</a></li>
          </ul>
        </div>

        {/* Private Club Dispatch */}
        <div className="space-y-3">
          <h5 className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">Private Journal</h5>
          <p className="text-neutral-500 leading-relaxed">
            Receive discreet updates on newly acquired inventory and private showroom previews.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="pt-1">
            <div className="flex items-center border-b border-neutral-300 py-1">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="text-neutral-900 hover:text-neutral-600 cursor-pointer p-1"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-neutral-200/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-neutral-400 gap-4 text-[11px] uppercase tracking-wider font-medium">
          <p>© {new Date().getFullYear()} AutoElite Mobility GmbH. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-neutral-800 transition-colors">Privacy</a>
            <a href="#" className="hover:text-neutral-800 transition-colors">Terms</a>
            <a href="#" className="hover:text-neutral-800 transition-colors">Imprint</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
