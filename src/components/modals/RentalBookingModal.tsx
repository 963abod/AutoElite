'use client';

import React, { useState } from 'react';
import { Vehicle } from '@/types/vehicle';
import { RENTAL_ADDONS } from '@/data/vehicles';
import { Language, TRANSLATIONS } from '@/data/translations';
import { X, Check, Shield } from 'lucide-react';

interface RentalBookingModalProps {
  vehicle: Vehicle | null;
  pickupDate: string;
  returnDate: string;
  location: string;
  onClose: () => void;
  onConfirmBooking: () => void;
  lang: Language;
}

export const RentalBookingModal: React.FC<RentalBookingModalProps> = ({
  vehicle,
  pickupDate,
  returnDate,
  location,
  onClose,
  onConfirmBooking,
  lang,
}) => {
  if (!vehicle) return null;

  const t = TRANSLATIONS[lang];
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['comprehensive-insurance']);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const addonsTotalDaily = RENTAL_ADDONS.filter((a) => selectedAddons.includes(a.id)).reduce(
    (sum, a) => sum + a.dailyRate,
    0
  );
  const addonsTotal = addonsTotalDaily * days;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-900/40 backdrop-blur-xs animate-in fade-in duration-200">

      <div className="relative w-full max-w-xl bg-[#F8F9FA] border border-neutral-200 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">

        <div className="px-8 py-6 border-b border-neutral-200/80 bg-white flex items-center justify-between sticky top-0 z-20">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block">
              {t.fleetReservation}
            </span>
            <h2 className="text-lg font-normal text-neutral-900 tracking-tight">
              {vehicle.make} {vehicle.model}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-12 text-center space-y-4 my-auto">
            <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-normal text-neutral-900 tracking-tight">{t.reservationConfirmed}</h3>
            <p className="text-xs text-neutral-500 font-light max-w-md mx-auto leading-relaxed">
              {t.confirmedDesc}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto flex-1">

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-neutral-200/80">
              <div className="w-20 h-14 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                <img src={vehicle.image} alt={vehicle.model} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-medium text-neutral-900">{vehicle.make} {vehicle.model}</h4>
                <div className="text-[11px] text-neutral-400 font-light">
                  {location || vehicle.location} · {days} {days === 1 ? t.day : t.days}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-neutral-200/80 text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block mb-1">{t.pickup}</span>
                <span className="text-neutral-900 font-medium">{pickupDate || '2024-10-15'}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block mb-1">{t.return}</span>
                <span className="text-neutral-900 font-medium">{returnDate || '2024-10-18'}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">{t.bespokeAddons}</h4>
              <div className="space-y-2">
                {RENTAL_ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-white border-neutral-900 text-neutral-900'
                          : 'bg-white border-neutral-200/80 text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isChecked ? 'bg-neutral-900 border-neutral-900 text-white' : 'border-neutral-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-neutral-900">{addon.name}</div>
                          <div className="text-[11px] text-neutral-400 font-light">{addon.description}</div>
                        </div>
                      </div>
                      <div className="text-xs font-mono text-neutral-800 shrink-0">
                        +${addon.dailyRate}/day
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600 font-light">
                <span>{t.rate} (${vehicle.rentalPricePerDay} × {days})</span>
                <span className="font-mono text-neutral-900">${baseFare}</span>
              </div>
              {addonsTotal > 0 && (
                <div className="flex justify-between text-neutral-600 font-light">
                  <span>{t.bespokeAddons}</span>
                  <span className="font-mono text-neutral-900">${addonsTotal}</span>
                </div>
              )}
              <div className="border-t border-neutral-100 pt-3 flex justify-between items-center text-sm font-medium text-neutral-900">
                <span>{t.totalRate}</span>
                <span className="text-lg font-mono text-neutral-900">${grandTotal}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{t.confirmReservation}</span>
            </button>

          </form>
        )}

      </div>

    </div>
  );
};
