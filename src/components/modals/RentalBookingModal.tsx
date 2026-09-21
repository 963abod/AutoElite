'use client';

import React, { useState } from 'react';
import { Vehicle } from '@/types/vehicle';
import { RENTAL_ADDONS } from '@/data/vehicles';
import { X, Calendar, MapPin, ShieldCheck, Check, DollarSign, CreditCard, ArrowRight, CheckCircle2 } from 'lucide-react';

interface RentalBookingModalProps {
  vehicle: Vehicle | null;
  pickupDate: string;
  returnDate: string;
  location: string;
  onClose: () => void;
  onConfirmBooking: () => void;
}

export const RentalBookingModal: React.FC<RentalBookingModalProps> = ({
  vehicle,
  pickupDate,
  returnDate,
  location,
  onClose,
  onConfirmBooking,
}) => {
  if (!vehicle) return null;

  const [selectedAddons, setSelectedAddons] = useState<string[]>(['comprehensive-insurance']);
  const [isSuccess, setIsSuccess] = useState(false);

  // Calculate Days
  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 1;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const days = calculateDays();
  const baseFare = vehicle.rentalPricePerDay * days;

  // Addons total
  const addonsTotalDaily = RENTAL_ADDONS.filter((a) => selectedAddons.includes(a.id)).reduce(
    (sum, a) => sum + a.dailyRate,
    0
  );
  const addonsTotal = addonsTotalDaily * days;

  const refundableDeposit = 500;
  const grandTotal = baseFare + addonsTotal;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onConfirmBooking();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">

      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-950/50 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-sans">Reserve {vehicle.make} {vehicle.model}</h2>
              <p className="text-xs text-gray-400">Instant reservation breakdown & add-ons</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close rental booking modal"
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* Success Screen */
          <div className="p-12 text-center space-y-4 my-auto">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white">Reservation Confirmed!</h3>
            <p className="text-xs text-gray-300 max-w-md mx-auto">
              Your luxury booking for <span className="text-white font-semibold">{vehicle.make} {vehicle.model}</span> at <span className="text-blue-400">{location || vehicle.location}</span> is locked in. Detailed confirmation dispatched to your email.
            </p>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">

            {/* Vehicle Summary Box */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/60 border border-white/10">
              <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-white/10">
                <img src={vehicle.image} alt={vehicle.model} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{vehicle.make} {vehicle.model}</h4>
                <div className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-blue-400" /> {location || vehicle.location}</span>
                  <span>•</span>
                  <span className="font-mono text-cyan-400">{days} {days === 1 ? 'Day' : 'Days'}</span>
                </div>
              </div>
            </div>

            {/* Dates & Location Details */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/40 p-4 rounded-2xl border border-white/5">
              <div>
                <span className="text-gray-400 uppercase tracking-wider block text-[10px] mb-0.5">Pickup Date</span>
                <span className="text-white font-mono font-bold">{pickupDate || '2024-10-15'}</span>
              </div>
              <div>
                <span className="text-gray-400 uppercase tracking-wider block text-[10px] mb-0.5">Return Date</span>
                <span className="text-white font-mono font-bold">{returnDate || '2024-10-18'}</span>
              </div>
            </div>

            {/* Optional Add-ons Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Tailored Rental Add-ons</h4>
              <div className="space-y-2">
                {RENTAL_ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-blue-600/15 border-blue-500/50 text-white'
                          : 'bg-slate-950/40 border-white/5 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                            isChecked ? 'bg-blue-600 border-blue-400 text-white' : 'border-white/20'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">{addon.name}</div>
                          <div className="text-[11px] text-gray-400">{addon.description}</div>
                        </div>
                      </div>
                      <div className="text-xs font-mono font-bold text-blue-400 shrink-0">
                        +${addon.dailyRate}/day
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Transparent Fare Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Base Fare (${vehicle.rentalPricePerDay}/day × {days} days)</span>
                <span className="font-mono">${baseFare}</span>
              </div>
              {addonsTotal > 0 && (
                <div className="flex justify-between text-gray-300">
                  <span>Selected Protection & Add-ons</span>
                  <span className="font-mono">${addonsTotal}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-400 text-[11px]">
                <span>Refundable Security Deposit (Held on card)</span>
                <span className="font-mono">${refundableDeposit}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between items-center text-sm font-bold text-white">
                <span>Grand Total</span>
                <span className="text-xl font-mono text-cyan-400">${grandTotal}</span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <CreditCard className="w-4 h-4" />
              <span>Confirm & Reserve Fleet</span>
            </button>

          </form>
        )}

      </div>

    </div>
  );
};
