'use client';

import React, { useState } from 'react';
import { Vehicle, PlatformMode } from '@/types/vehicle';
import { X, ArrowRight } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex justify-end bg-neutral-900/40 backdrop-blur-xs animate-in fade-in duration-300">

      {/* Slide-over Drawer / Sheet */}
      <div className="relative w-full max-w-2xl bg-[#F8F9FA] h-full shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-300">

        {/* Drawer Header */}
        <div className="px-8 py-6 border-b border-neutral-200/80 bg-white flex items-center justify-between sticky top-0 z-20">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block">
              {vehicle.make} · {vehicle.year}
            </span>
            <h2 className="text-xl font-normal text-neutral-900 tracking-tight">{vehicle.model}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close vehicle details"
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-8 space-y-8 overflow-y-auto flex-1">

          {/* Studio Gallery Image */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-200 border border-neutral-200/80">
              <img
                src={activeImage}
                alt={vehicle.model}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gallery Thumbnails */}
            {vehicle.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
                {vehicle.gallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border transition-all cursor-pointer shrink-0 ${
                      activeImage === imgUrl ? 'border-neutral-900 ring-1 ring-neutral-900' : 'border-neutral-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Gallery thumbnail ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">Overview</h3>
            <p className="text-sm font-light text-neutral-600 leading-relaxed">{vehicle.description}</p>
          </div>

          {/* Comprehensive Specification Table with Horizontal Dividers */}
          <div className="space-y-3">
            <h3 className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">Technical Specification</h3>

            <div className="bg-white rounded-2xl border border-neutral-200/80 divide-y divide-neutral-100 text-xs text-neutral-800">
              <div className="p-4 flex items-center justify-between">
                <span className="text-neutral-500 font-light">Powertrain & Power</span>
                <span className="font-medium text-neutral-900">{vehicle.specs.power}</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="text-neutral-500 font-light">0-100 km/h Acceleration</span>
                <span className="font-medium text-neutral-900">{vehicle.specs.acceleration}</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="text-neutral-500 font-light">Transmission</span>
                <span className="font-medium text-neutral-900">{vehicle.specs.transmission} ({vehicle.specs.drivetrain})</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="text-neutral-500 font-light">Range / Economy</span>
                <span className="font-medium text-neutral-900">{vehicle.specs.fuelEconomyOrRange}</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="text-neutral-500 font-light">Top Speed</span>
                <span className="font-medium text-neutral-900">{vehicle.specs.topSpeed}</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="text-neutral-500 font-light">Seating Capacity</span>
                <span className="font-medium text-neutral-900">{vehicle.specs.seats} Passengers</span>
              </div>
            </div>
          </div>

          {/* Key Features List */}
          <div className="space-y-3">
            <h3 className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">Equipment & Highlights</h3>
            <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 space-y-3">
              {vehicle.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs text-neutral-700">
                  <span className="text-neutral-400 font-mono">·</span>
                  <span className="font-light">{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Drawer Footer CTA */}
        <div className="px-8 py-5 bg-white border-t border-neutral-200/80 flex items-center justify-between sticky bottom-0 z-20">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block">
              {mode === 'rent' ? 'Daily Rental Rate' : 'Purchase Listing'}
            </span>
            <div className="text-xl font-normal text-neutral-900 tracking-tight">
              {mode === 'rent' ? (
                <>${vehicle.rentalPricePerDay} <span className="text-xs text-neutral-400 font-light">/ day</span></>
              ) : (
                <>${vehicle.purchasePrice.toLocaleString()}</>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookNow(vehicle);
            }}
            className="px-7 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
          >
            <span>{mode === 'rent' ? 'Proceed to Reserve' : 'Request Test Drive'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
