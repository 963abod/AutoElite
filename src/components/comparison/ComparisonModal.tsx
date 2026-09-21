'use client';

import React from 'react';
import { Vehicle, PlatformMode } from '@/types/vehicle';
import { Language, TRANSLATIONS } from '@/data/translations';
import { X } from 'lucide-react';

interface ComparisonModalProps {
  vehicles: Vehicle[];
  mode: PlatformMode;
  onClose: () => void;
  onSelectVehicleForAction: (vehicle: Vehicle) => void;
  onRemoveVehicle: (id: string) => void;
  lang: Language;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  vehicles,
  mode,
  onClose,
  onSelectVehicleForAction,
  onRemoveVehicle,
  lang,
}) => {
  if (vehicles.length === 0) return null;

  const t = TRANSLATIONS[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-900/40 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">

      <div className="relative w-full max-w-5xl bg-[#F8F9FA] border border-neutral-200 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">

        <div className="px-8 py-6 border-b border-neutral-200/80 bg-white flex items-center justify-between sticky top-0 z-20">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block">
              {t.sideBySide}
            </span>
            <h2 className="text-lg font-normal text-neutral-900 tracking-tight">{t.specificationMatrix}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-8 overflow-x-auto flex-1">
          <table className="w-full text-start text-xs text-neutral-800 border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-neutral-200/80">
                <th className="p-4 text-[10px] uppercase tracking-widest text-neutral-400 font-medium w-1/4 text-start">{t.metric}</th>
                {vehicles.map((v) => (
                  <th key={v.id} className="p-4 text-center align-top relative">
                    <button
                      onClick={() => onRemoveVehicle(v.id)}
                      aria-label={`Remove ${v.model}`}
                      className="absolute top-2 ltr:right-2 rtl:left-2 p-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="aspect-[16/10] rounded-xl overflow-hidden bg-neutral-200 mb-3 border border-neutral-200/80">
                      <img src={v.image} alt={v.model} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">{v.make}</div>
                    <div className="text-sm font-normal text-neutral-900 mb-3">{v.model}</div>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectVehicleForAction(v);
                      }}
                      className="w-full py-2 rounded-full text-xs font-medium uppercase tracking-wider bg-neutral-900 hover:bg-neutral-800 text-white transition-all cursor-pointer"
                    >
                      {mode === 'rent' ? t.reserve : t.inquire}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-200/60 bg-white">

              <tr>
                <td className="p-4 text-[10px] uppercase tracking-widest text-neutral-400 font-medium text-start">{t.pricing}</td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center font-medium text-neutral-900 text-sm">
                    {mode === 'rent' ? (
                      <>${v.rentalPricePerDay} <span className="text-xs font-light text-neutral-400">{t.perDay}</span></>
                    ) : (
                      <>${v.purchasePrice.toLocaleString()}</>
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 text-[10px] uppercase tracking-widest text-neutral-400 font-medium text-start">{t.acceleration}</td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center text-neutral-900 font-medium">
                    {v.specs.acceleration}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 text-[10px] uppercase tracking-widest text-neutral-400 font-medium text-start">{t.powertrainPower}</td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center text-neutral-800 font-light">
                    {v.specs.power}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 text-[10px] uppercase tracking-widest text-neutral-400 font-medium text-start">{t.transmission}</td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center text-neutral-800 font-light">
                    {v.specs.transmission} ({v.specs.drivetrain})
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 text-[10px] uppercase tracking-widest text-neutral-400 font-medium text-start">{t.rangeEconomy}</td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center text-neutral-800 font-light">
                    {v.specs.fuelEconomyOrRange}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 text-[10px] uppercase tracking-widest text-neutral-400 font-medium text-start">{t.seatingCapacity}</td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center text-neutral-800 font-light">
                    {v.specs.seats} {t.passengers}
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
