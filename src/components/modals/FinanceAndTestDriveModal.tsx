'use client';

import React, { useState } from 'react';
import { Vehicle } from '@/types/vehicle';
import { AVAILABLE_LOCATIONS } from '@/data/vehicles';
import { X, Calculator, Calendar, MapPin, DollarSign, Clock, ShieldCheck, CheckCircle2, User, Phone, Mail } from 'lucide-react';

interface FinanceAndTestDriveModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const FinanceAndTestDriveModal: React.FC<FinanceAndTestDriveModalProps> = ({
  vehicle,
  onClose,
  onSuccess,
}) => {
  if (!vehicle) return null;

  const [activeTab, setActiveTab] = useState<'finance' | 'test-drive'>('finance');

  // Calculator States
  const [downPayment, setDownPayment] = useState<number>(Math.round(vehicle.purchasePrice * 0.2));
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<number>(4.5);

  // Test Drive Form States
  const [testDriveDate, setTestDriveDate] = useState<string>('2024-10-20');
  const [timeSlot, setTimeSlot] = useState<string>('14:00 PM');
  const [showroomBranch, setShowroomBranch] = useState<string>(vehicle.location);
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Loan Calculation Math
  const principal = Math.max(0, vehicle.purchasePrice - downPayment);
  const monthlyInterestRate = interestRate / 100 / 12;
  const monthlyPayment =
    monthlyInterestRate > 0
      ? (principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths))) /
        (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1)
      : principal / loanTermMonths;

  const totalCost = monthlyPayment * loanTermMonths + downPayment;
  const totalInterest = Math.max(0, totalCost - vehicle.purchasePrice);

  const handleTestDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">

      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">

        {/* Modal Header & Tab Toggle */}
        <div className="p-6 border-b border-white/10 bg-slate-950/50 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white font-sans">{vehicle.make} {vehicle.model} ({vehicle.year})</h2>
              <p className="text-xs text-gray-400">Sales Finance & Showroom Test Drive Hub</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close finance and test drive modal"
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('finance')}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'finance'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Auto Loan Calculator</span>
            </button>

            <button
              onClick={() => setActiveTab('test-drive')}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'test-drive'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book VIP Test Drive</span>
            </button>
          </div>
        </div>

        {isSuccess ? (
          /* Success Screen */
          <div className="p-12 text-center space-y-4 my-auto">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white">VIP Slot Dispatched!</h3>
            <p className="text-xs text-gray-300 max-w-md mx-auto">
              Your test drive reservation for <span className="text-white font-semibold">{vehicle.make} {vehicle.model}</span> at <span className="text-amber-400">{showroomBranch}</span> on <span className="text-white font-mono">{testDriveDate}</span> ({timeSlot}) is scheduled.
            </p>
          </div>
        ) : activeTab === 'finance' ? (
          /* FINANCE CALCULATOR TAB */
          <div className="p-6 space-y-6 overflow-y-auto">

            {/* Purchase Price Summary */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Vehicle Listing Price</span>
                <div className="text-2xl font-extrabold text-white font-mono">${vehicle.purchasePrice.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <span className="text-xs text-amber-400 uppercase tracking-wider font-semibold">Estimated Loan</span>
                <div className="text-2xl font-extrabold text-amber-400 font-mono">${Math.round(monthlyPayment).toLocaleString()} / mo</div>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="space-y-5 bg-slate-950/40 p-5 rounded-2xl border border-white/5">

              {/* Down Payment Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-300">Down Payment</span>
                  <span className="text-amber-400 font-mono">${downPayment.toLocaleString()} ({Math.round((downPayment / vehicle.purchasePrice) * 100)}%)</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={vehicle.purchasePrice * 0.6}
                  step={1000}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Loan Term Selection */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-300 block">Loan Duration (Months)</span>
                <div className="grid grid-cols-4 gap-2">
                  {[24, 36, 48, 60].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setLoanTermMonths(term)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                        loanTermMonths === term
                          ? 'bg-amber-500 text-slate-950 border border-amber-400'
                          : 'bg-slate-900 text-gray-400 border border-white/10 hover:text-white'
                      }`}
                    >
                      {term} Mo
                    </button>
                  ))}
                </div>
              </div>

              {/* Interest Rate Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-300">Interest Rate (APR)</span>
                  <span className="text-amber-400 font-mono">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min={2.0}
                  max={10.0}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>

            </div>

            {/* Financial Summary */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950 border border-white/10 text-xs font-mono">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-sans">Total Financed Amount</span>
                <span className="text-white font-bold">${principal.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-sans">Total Estimated Interest</span>
                <span className="text-amber-400 font-bold">${Math.round(totalInterest).toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('test-drive')}
              className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <span>Apply Calculation & Book Test Drive</span>
            </button>

          </div>
        ) : (
          /* BOOK TEST DRIVE TAB */
          <form onSubmit={handleTestDriveSubmit} className="p-6 space-y-4 overflow-y-auto">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-amber-400" /> Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Alexander Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-amber-400" /> Phone Contact
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> Showroom
                </label>
                <select
                  value={showroomBranch}
                  onChange={(e) => setShowroomBranch(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {AVAILABLE_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={testDriveDate}
                  onChange={(e) => setTestDriveDate(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="10:00 AM">10:00 AM Morning</option>
                  <option value="14:00 PM">14:00 PM Afternoon</option>
                  <option value="17:00 PM">17:00 PM Sunset Drive</option>
                </select>
              </div>

            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all mt-4"
            >
              Confirm Showroom VIP Test Drive
            </button>

          </form>
        )}

      </div>

    </div>
  );
};
