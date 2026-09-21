'use client';

import React from 'react';
import { Vehicle, PlatformMode } from '@/types/vehicle';
import { X, Gauge, Cpu, Fuel, Users, DollarSign } from 'lucide-react';

interface ComparisonModalProps {
  vehicles: Vehicle[];
  mode: PlatformMode;
  onClose: () => void;
  onSelectVehicleForAction: (vehicle: Vehicle) => void;
  onRemoveVehicle: (id: string) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  vehicles,
  mode,
  onClose,
  onSelectVehicleForAction,
  onRemoveVehicle,
}) => {
  if (vehicles.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">

      <div className="relative w-full max-w-6xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">

        {/* Header Bar */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50 sticky top-0 z-20">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-sans">Side-by-Side Vehicle Matrix</h2>
            <p className="text-xs text-slate-500">Comparing specifications, dynamics, and financial options</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close comparison modal"
            className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Table Body */}
        <div className="p-6 overflow-x-auto overflow-y-auto">
          <table className="w-full text-left text-sm text-slate-700 border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 w-1/4">Specification</th>
                {vehicles.map((v) => (
                  <th key={v.id} className="p-4 text-center align-top relative min-w-[220px]">
                    <button
                      onClick={() => onRemoveVehicle(v.id)}
                      aria-label={`Remove ${v.model} from comparison matrix`}
                      className="absolute top-2 right-2 p-1 rounded-full bg-slate-200 hover:bg-red-500 hover:text-white text-slate-500 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="h-32 rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-200">
                      <img src={v.image} alt={v.model} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-xs text-slate-500 font-mono">{v.make} ({v.year})</div>
                    <div className="text-base font-bold text-slate-900 mb-2">{v.model}</div>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectVehicleForAction(v);
                      }}
                      className="w-full py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-xs bg-slate-900 hover:bg-slate-800 text-white cursor-pointer"
                    >
                      {mode === 'rent' ? 'Reserve Now' : 'Book Test Drive'}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {/* Daily Rate / Purchase Price */}
              <tr className="bg-slate-50/60">
                <td className="p-4 font-semibold text-slate-900 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-slate-600" /> Pricing Structure
                </td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center font-mono font-bold text-slate-900">
                    {mode === 'rent' ? (
                      <div>
                        <div className="text-lg text-slate-900">${v.rentalPricePerDay} / day</div>
                        <div className="text-[11px] text-slate-500 font-normal font-sans">Includes Standard Insurance</div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-lg text-slate-900">${v.purchasePrice.toLocaleString()}</div>
                        <div className="text-[11px] text-slate-500 font-normal font-sans">From ${v.estMonthlyLoan}/mo</div>
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Engine / Powertrain */}
              <tr>
                <td className="p-4 text-xs text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-slate-500" /> Engine & Power
                </td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center">
                    <div className="font-semibold text-slate-900">{v.specs.engine}</div>
                    <div className="text-xs font-mono text-slate-600">{v.specs.power}</div>
                  </td>
                ))}
              </tr>

              {/* 0-100 Acceleration */}
              <tr className="bg-slate-50/60">
                <td className="p-4 text-xs text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-slate-500" /> 0-100 km/h Sprint
                </td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center font-mono font-bold text-slate-900 text-base">
                    {v.specs.acceleration}
                  </td>
                ))}
              </tr>

              {/* Transmission & Drivetrain */}
              <tr>
                <td className="p-4 text-xs text-slate-500 uppercase tracking-wider">Transmission & Drivetrain</td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center font-mono text-slate-800">
                    {v.specs.transmission} ({v.specs.drivetrain})
                  </td>
                ))}
              </tr>

              {/* Fuel / Battery Range */}
              <tr className="bg-slate-50/60">
                <td className="p-4 text-xs text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Fuel className="w-4 h-4 text-slate-500" /> Range / Fuel Economy
                </td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center font-mono text-slate-800">
                    {v.specs.fuelEconomyOrRange}
                  </td>
                ))}
              </tr>

              {/* Seating */}
              <tr>
                <td className="p-4 text-xs text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-500" /> Seating Capacity
                </td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center font-mono text-slate-900">
                    {v.specs.seats} Passengers
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
