'use client';

import React from 'react';
import { Car, ShieldCheck, Award, Clock, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-24 bg-slate-100 border-t border-slate-200 text-slate-600 text-sm">
      {/* Value Proposition Highlights */}
      <div className="border-b border-slate-200 py-12 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-slate-700" />
            </div>
            <div>
              <h4 className="text-slate-900 font-semibold text-base mb-1">150-Point Inspection</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every vehicle in our sales and rental fleet undergoes rigorous mechanical and cosmetic certification.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-slate-700" />
            </div>
            <div>
              <h4 className="text-slate-900 font-semibold text-base mb-1">Tailored Concierge & Delivery</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                White-glove doorstep delivery to hotel, residence, or airport anywhere across major hubs.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-slate-700" />
            </div>
            <div>
              <h4 className="text-slate-900 font-semibold text-base mb-1">Flexible Financing & Rates</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Transparent daily rates with no hidden fees, plus competitive auto loan rates from 3.9% APR.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 font-mono">AUTO<span className="text-slate-600">ELITE</span></span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
            AutoElite is Europe and Middle East’s premier dual-purpose platform for luxury vehicle rentals, sales, and bespoke automotive concierge services.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="text-xs text-slate-500">Global Hubs:</span>
            <span className="text-xs font-semibold text-slate-700">Dubai • Munich • London • New York • Paris</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-slate-900 font-semibold text-sm mb-4">Rental Fleet</h5>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Luxury SUVs</a></li>
            <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Electric Performers</a></li>
            <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Exotic Supercars</a></li>
            <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Chauffeur Service</a></li>
            <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Long-Term Subscriptions</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-slate-900 font-semibold text-sm mb-4">Sales & Finance</h5>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Certified Pre-Owned</a></li>
            <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Auto Loan Calculator</a></li>
            <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Trade-In Valuation</a></li>
            <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Book a Test Drive</a></li>
            <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Consignment Program</a></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h5 className="text-slate-900 font-semibold text-sm mb-4">Private Club</h5>
          <p className="text-xs text-slate-500 mb-3">
            Subscribe for exclusive access to newly arrived inventory and private drive events.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 pr-9"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="absolute right-1 top-1 bottom-1 px-2.5 bg-slate-900 rounded-md flex items-center justify-center hover:bg-slate-800 transition-colors text-white cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-slate-200 py-6 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AutoElite Mobility Solutions GmbH. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
