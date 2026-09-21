'use client';

import React, { useState } from 'react';
import { Vehicle } from '@/types/vehicle';
import { Language, TRANSLATIONS } from '@/data/translations';
import { AVAILABLE_LOCATIONS } from '@/data/vehicles';
import { X, Check } from 'lucide-react';

interface FinanceAndTestDriveModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onSuccess: () => void;
  lang: Language;
}

export const FinanceAndTestDriveModal: React.FC<FinanceAndTestDriveModalProps> = ({
  vehicle,
  onClose,
  onSuccess,
  lang,
}) => {
  if (!vehicle) return null;

  const t = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState<'finance' | 'test-drive'>('finance');

  const [downPayment, setDownPayment] = useState<number>(Math.round(vehicle.purchasePrice * 0.2));
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<number>(4.5);

  const [testDriveDate, setTestDriveDate] = useState<string>('2024-10-20');
  const [timeSlot, setTimeSlot] = useState<string>('14:00 PM');
  const [showroomBranch, setShowroomBranch] = useState<string>(vehicle.location);
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const principal = Math.max(0, vehicle.purchasePrice - downPayment);
  const monthlyInterestRate = interestRate / 100 / 12;
  const monthlyPayment =
    monthlyInterestRate > 0
      ? (principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths))) /
        (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1)
      : principal / loanTermMonths;

  const handleTestDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-900/40 backdrop-blur-xs animate-in fade-in duration-200">

      <div className="relative w-full max-w-xl bg-[#F8F9FA] border border-neutral-200 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">

        <div className="px-8 py-6 border-b border-neutral-200/80 bg-white sticky top-0 z-20 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block">
                {t.privateSalesInquiry}
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

          <div className="grid grid-cols-2 gap-2 bg-neutral-100 p-1 rounded-full border border-neutral-200/80">
            <button
              onClick={() => setActiveTab('finance')}
              className={`py-2 text-xs font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeTab === 'finance'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {t.loanEstimator}
            </button>

            <button
              onClick={() => setActiveTab('test-drive')}
              className={`py-2 text-xs font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeTab === 'test-drive'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {t.bookTestDrive}
            </button>
          </div>
        </div>

        {isSuccess ? (
          <div className="p-12 text-center space-y-4 my-auto">
            <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-normal text-neutral-900 tracking-tight">{t.vipSlotReserved}</h3>
            <p className="text-xs text-neutral-500 font-light max-w-md mx-auto leading-relaxed">
              {t.vipReservedDesc}
            </p>
          </div>
        ) : activeTab === 'finance' ? (
          <div className="p-8 space-y-6 overflow-y-auto flex-1">

            <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block">{t.purchasePrice}</span>
                <div className="text-xl font-medium text-neutral-900 tracking-tight">${vehicle.purchasePrice.toLocaleString()}</div>
              </div>
              <div className="text-[end]">
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block">{t.estMonthly}</span>
                <div className="text-xl font-mono text-neutral-900">${Math.round(monthlyPayment).toLocaleString()} / {t.months}</div>
              </div>
            </div>

            <div className="space-y-5 bg-white p-6 rounded-2xl border border-neutral-200/80">

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-500 font-light">{t.downPayment}</span>
                  <span className="text-neutral-900 font-mono">${downPayment.toLocaleString()} ({Math.round((downPayment / vehicle.purchasePrice) * 100)}%)</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={vehicle.purchasePrice * 0.6}
                  step={1000}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-neutral-900 cursor-pointer h-1 bg-neutral-200 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <span className="text-xs text-neutral-500 font-light block">{t.termLength}</span>
                <div className="grid grid-cols-4 gap-2">
                  {[24, 36, 48, 60].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setLoanTermMonths(term)}
                      className={`py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                        loanTermMonths === term
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      {term} {t.months}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-500 font-light">{t.aprRate}</span>
                  <span className="text-neutral-900 font-mono">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min={2.0}
                  max={10.0}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-neutral-900 cursor-pointer h-1 bg-neutral-200 rounded-lg"
                />
              </div>

            </div>

            <button
              onClick={() => setActiveTab('test-drive')}
              className="w-full py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium uppercase tracking-wider transition-all cursor-pointer"
            >
              {t.proceedToTestDrive}
            </button>

          </div>
        ) : (
          <form onSubmit={handleTestDriveSubmit} className="p-8 space-y-4 overflow-y-auto flex-1">

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block">{t.fullName}</label>
              <input
                type="text"
                required
                placeholder="Lord Alexander Vance"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white border border-neutral-200/80 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block">{t.phoneContact}</label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 019-2834"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-neutral-200/80 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block">{t.showroomHub}</label>
                <select
                  value={showroomBranch}
                  onChange={(e) => setShowroomBranch(e.target.value)}
                  className="w-full bg-white border border-neutral-200/80 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                >
                  {AVAILABLE_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block">{t.preferredDate}</label>
                <input
                  type="date"
                  required
                  value={testDriveDate}
                  onChange={(e) => setTestDriveDate(e.target.value)}
                  className="w-full bg-white border border-neutral-200/80 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block">{t.timeSlot}</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-white border border-neutral-200/80 rounded-xl px-4 py-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
              >
                <option value="10:00 AM">10:00 AM</option>
                <option value="14:00 PM">14:00 PM</option>
                <option value="17:00 PM">17:00 PM</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium uppercase tracking-wider transition-all cursor-pointer mt-4"
            >
              {t.scheduleTestDrive}
            </button>

          </form>
        )}

      </div>

    </div>
  );
};
