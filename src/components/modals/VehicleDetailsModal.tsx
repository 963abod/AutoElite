'use client';

import React, { useState } from 'react';
import { Vehicle, PlatformMode } from '@/types/vehicle';
import { X, Check, Gauge, Cpu, Fuel, ArrowRight } from 'lucide-react';

interface VehicleDetailsModalProps {
  vehicle: Vehicle | null;
  mode: PlatformMode;
  onClose: () => void;
  onBookNow: (vehicle: Vehicle) => void;
}

export const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({
  vehicle,
  mode,
  onClose,
  onBookNow,
}) => {
  if (!vehicle) return null;

  const [activeImage, setActiveImage] = useState(vehicle.image);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">

      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">

        {/* Header Bar */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-200 text-slate-800 font-bold uppercase">
              {vehicle.make}
            </span>
            <h2 className="text-xl font-bold text-slate-900 font-sans">{vehicle.model} ({vehicle.year})</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close vehicle details"
            className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">

          {/* Main Gallery Image & Thumbnails */}
          <div className="space-y-4">
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={activeImage}
                alt={vehicle.model}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {vehicle.badges.map((b, idx) => (
                  <span key={idx} className="text-xs font-semibold px-3 py-1 rounded-md bg-white/90 text-slate-800 border border-slate-200 shadow-xs backdrop-blur-md">
                    {b.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Thumbnail Row */}
            {vehicle.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {vehicle.gallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      activeImage === imgUrl ? 'border-slate-900 ring-2 ring-slate-900/20' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-slate-500" /> Acceleration
              </span>
              <p className="text-sm font-bold text-slate-900 font-mono">{vehicle.specs.acceleration}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-slate-500" /> Powertrain
              </span>
              <p className="text-sm font-bold text-slate-900 font-mono">{vehicle.specs.power}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Fuel className="w-3.5 h-3.5 text-slate-500" /> Range / Econ
              </span>
              <p className="text-sm font-bold text-slate-900 font-mono">{vehicle.specs.fuelEconomyOrRange}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-slate-500" /> Top Speed
              </span>
              <p className="text-sm font-bold text-slate-900 font-mono">{vehicle.specs.topSpeed}</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Vehicle Overview</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{vehicle.description}</p>
          </div>

          {/* Features List */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Key Executive Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {vehicle.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="w-5 h-5 rounded-md bg-slate-200 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-slate-700" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Pricing & CTA Action */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-20">
          <div>
            {mode === 'rent' ? (
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Daily Rental Rate</span>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">
                  ${vehicle.rentalPricePerDay} <span className="text-xs font-normal text-slate-500">/ day</span>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Purchase Price</span>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">
                  ${vehicle.purchasePrice.toLocaleString()}
                </div>
                <div className="text-xs text-slate-600 font-mono">From ${vehicle.estMonthlyLoan}/mo Financing</div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              onClose();
              onBookNow(vehicle);
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 bg-[#0B192C] hover:bg-slate-800 text-white shadow-md transition-all cursor-pointer"
          >
            <span>{mode === 'rent' ? 'Proceed to Reservation' : 'Finance & Test Drive'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
