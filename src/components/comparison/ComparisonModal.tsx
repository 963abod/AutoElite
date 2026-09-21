'use client';

import React from 'react';
import { Vehicle, PlatformMode } from '@/types/vehicle';
import { X, Check, Gauge, Cpu, Fuel, Users, Shield, ArrowRight, DollarSign, Calendar } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">

      <div className="relative w-full max-w-6xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">

        {/* Header Bar */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-950/50 sticky top-0 z-20 backdrop-blur-md">
          <div>
            <h2 className="text-xl font-bold text-white font-sans">Side-by-Side Vehicle Matrix</h2>
            <p className="text-xs text-gray-400">Comparing specifications, dynamics, and financial options</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close comparison modal"
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Table Body */}
        <div className="p-6 overflow-x-auto overflow-y-auto">
          <table className="w-full text-left text-sm text-gray-300 border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-400 w-1/4">Specification</th>
                {vehicles.map((v) => (
                  <th key={v.id} className="p-4 text-center align-top relative min-w-[220px]">
                    <button
                      onClick={() => onRemoveVehicle(v.id)}
                      aria-label={`Remove ${v.model} from comparison matrix`}
                      className="absolute top-2 right-2 p-1 rounded-full bg-slate-800 hover:bg-red-500/80 text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="h-32 rounded-xl overflow-hidden bg-slate-950 mb-3 border border-white/10">
                      <img src={v.image} alt={v.model} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-xs text-gray-400 font-mono">{v.make} ({v.year})</div>
                    <div className="text-base font-bold text-white mb-2">{v.model}</div>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectVehicleForAction(v);
                      }}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-md ${
                        mode === 'rent'
                          ? 'bg-blue-600 hover:bg-blue-500 text-white'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                      }`}
                    >
                      {mode === 'rent' ? 'Reserve Now' : 'Book Test Drive'}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">

              {/* Daily Rate / Purchase Price */}
              <tr className="bg-slate-950/40">
                <td className="p-4 font-semibold text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" /> Pricing Structure
                </td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center font-mono font-bold text-white">
                    {mode === 'rent' ? (
                      <div>
                        <div className="text-lg text-emerald-400">${v.rentalPricePerDay} / day</div>
                        <div className="text-[11px] text-gray-400 font-normal font-sans">Includes Standard Insurance</div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-lg text-amber-400">${v.purchasePrice.toLocaleString()}</div>
                        <div className="text-[11px] text-gray-400 font-normal font-sans">From ${v.estMonthlyLoan}/mo</div>
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {/* Engine / Powertrain */}
              <tr>
                <td className="p-4 text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-400" /> Engine & Power
                </td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center">
                    <div className="font-semibold text-white">{v.specs.engine}</div>
                    <div className="text-xs font-mono text-cyan-400">{v.specs.power}</div>
                  </td>
                ))}
              </tr>

              {/* 0-100 Acceleration */}
              <tr className="bg-slate-950/40">
                <td className="p-4 text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-cyan-400" /> 0-100 km/h Sprint
                </td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center font-mono font-bold text-white text-base">
                    {v.specs.acceleration}
                  </td>
                ))}
              </tr>

              {/* Transmission & Drivetrain */}
              <tr>
                <td className="p-4 text-xs text-gray-400 uppercase tracking-wider">Transmission & Drivetrain</td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center font-mono">
                    {v.specs.transmission} ({v.specs.drivetrain})
                  </td>
                ))}
              </tr>

              {/* Fuel / Battery Range */}
              <tr className="bg-slate-950/40">
                <td className="p-4 text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Fuel className="w-4 h-4 text-amber-400" /> Range / Fuel Economy
                </td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center font-mono text-amber-300">
                    {v.specs.fuelEconomyOrRange}
                  </td>
                ))}
              </tr>

              {/* Seating */}
              <tr>
                <td className="p-4 text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" /> Seating Capacity
                </td>
                {vehicles.map((v) => (
                  <td key={v.id} className="p-4 text-center font-mono text-white">
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
