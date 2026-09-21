'use client';

import React, { useState, useMemo } from 'react';
import { PlatformMode, SearchFilterState, Vehicle } from '@/types/vehicle';
import { MOCK_VEHICLES } from '@/data/vehicles';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/hero/Hero';
import { VehicleGrid } from '@/components/vehicles/VehicleGrid';
import { VehicleDetailsModal } from '@/components/modals/VehicleDetailsModal';
import { ComparisonTray } from '@/components/comparison/ComparisonTray';
import { ComparisonModal } from '@/components/comparison/ComparisonModal';
import { RentalBookingModal } from '@/components/modals/RentalBookingModal';
import { FinanceAndTestDriveModal } from '@/components/modals/FinanceAndTestDriveModal';
const DEFAULT_FILTERS: SearchFilterState = {
  mode: 'rent',
  searchQuery: '',
  bodyType: 'All',
  priceRange: [0, 350000],
  fuelType: 'All',
  transmission: 'All',
  location: 'All Locations',
  pickupDate: '2024-10-15',
  returnDate: '2024-10-18',
  yearRange: [2022, 2024],
  maxMileage: 100000,
  sortBy: 'featured',
};

export default function AutoElitePlatform() {
  const [mode, setMode] = useState<PlatformMode>('rent');
  const [selectedLocation, setSelectedLocation] = useState<string>('All Locations');
  const [filters, setFilters] = useState<SearchFilterState>(DEFAULT_FILTERS);

  // Active Modals & Selected Vehicles
  const [selectedVehicleForDetails, setSelectedVehicleForDetails] = useState<Vehicle | null>(null);
  const [comparedVehicles, setComparedVehicles] = useState<Vehicle[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  // Transaction Modals
  const [rentalModalVehicle, setRentalModalVehicle] = useState<Vehicle | null>(null);
  const [salesModalVehicle, setSalesModalVehicle] = useState<Vehicle | null>(null);

  // Filter Handler
  const handleFilterChange = (updated: Partial<SearchFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleModeChange = (newMode: PlatformMode) => {
    setMode(newMode);
    setFilters((prev) => ({ ...prev, mode: newMode }));
  };

  const handleResetFilters = () => {
    setFilters({ ...DEFAULT_FILTERS, mode });
  };

  // Comparison Handlers
  const handleToggleCompare = (vehicle: Vehicle) => {
    setComparedVehicles((prev) => {
      const exists = prev.some((v) => v.id === vehicle.id);
      if (exists) {
        return prev.filter((v) => v.id !== vehicle.id);
      } else {
        if (prev.length >= 3) return prev; // Limit to 3 cars
        return [...prev, vehicle];
      }
    });
  };

  const handleRemoveCompare = (id: string) => {
    setComparedVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  const handleClearCompare = () => {
    setComparedVehicles([]);
  };

  // Primary Action Trigger (Reserve or Test Drive)
  const handlePrimaryVehicleAction = (vehicle: Vehicle) => {
    if (mode === 'rent') {
      setRentalModalVehicle(vehicle);
    } else {
      setSalesModalVehicle(vehicle);
    }
  };

  // Dynamic Filtering Logic
  const filteredVehicles = useMemo(() => {
    return MOCK_VEHICLES.filter((v) => {
      // Search query filter
      if (
        filters.searchQuery &&
        !`${v.make} ${v.model} ${v.trim}`.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Body Type filter
      if (filters.bodyType !== 'All' && v.bodyType !== filters.bodyType) {
        return false;
      }

      // Location filter
      if (
        selectedLocation !== 'All Locations' &&
        filters.location !== 'All Locations' &&
        v.location !== selectedLocation &&
        v.location !== filters.location
      ) {
        return false;
      }

      // Price filter based on Mode
      if (mode === 'rent') {
        if (v.rentalPricePerDay > filters.priceRange[1] && filters.priceRange[1] < 300000) {
          // If range slider was adjusted in buy mode, don't overly restrict rent unless explicitly adjusted
        }
      } else {
        if (v.purchasePrice > filters.priceRange[1]) {
          return false;
        }
      }

      // Year range filter
      if (v.year < filters.yearRange[0]) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') {
        return mode === 'rent'
          ? a.rentalPricePerDay - b.rentalPricePerDay
          : a.purchasePrice - b.purchasePrice;
      }
      if (filters.sortBy === 'price-desc') {
        return mode === 'rent'
          ? b.rentalPricePerDay - a.rentalPricePerDay
          : b.purchasePrice - a.purchasePrice;
      }
      if (filters.sortBy === 'year-desc') {
        return b.year - a.year;
      }
      if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0; // featured default
    });
  }, [mode, filters, selectedLocation]);

  const handleScrollToGrid = () => {
    const el = document.getElementById('inventory-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">

      {/* Top Navbar Header */}
      <Navbar
        mode={mode}
        onModeChange={handleModeChange}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        comparedCount={comparedVehicles.length}
        onOpenCompare={() => setIsCompareModalOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1">

        {/* Hero Banner with Switcher & Search Bar */}
        <Hero
          mode={mode}
          onModeChange={handleModeChange}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearchSubmit={handleScrollToGrid}
        />

        {/* Live Inventory Grid */}
        <VehicleGrid
          vehicles={filteredVehicles}
          mode={mode}
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          comparedVehicles={comparedVehicles}
          onToggleCompare={handleToggleCompare}
          onSelectVehicle={(v) => setSelectedVehicleForDetails(v)}
          onPrimaryAction={handlePrimaryVehicleAction}
        />

      </main>

      {/* Footer */}
      <Footer />

      {/* Comparison Bottom Floating Tray */}
      <ComparisonTray
        vehicles={comparedVehicles}
        onRemoveVehicle={handleRemoveCompare}
        onClearAll={handleClearCompare}
        onCompareNow={() => setIsCompareModalOpen(true)}
      />

      {/* Comparison Modal */}
      {isCompareModalOpen && (
        <ComparisonModal
          vehicles={comparedVehicles}
          mode={mode}
          onClose={() => setIsCompareModalOpen(false)}
          onSelectVehicleForAction={handlePrimaryVehicleAction}
          onRemoveVehicle={handleRemoveCompare}
        />
      )}

      {/* Vehicle Details Modal */}
      {selectedVehicleForDetails && (
        <VehicleDetailsModal
          vehicle={selectedVehicleForDetails}
          mode={mode}
          onClose={() => setSelectedVehicleForDetails(null)}
          onBookNow={handlePrimaryVehicleAction}
        />
      )}

      {/* Rental Reservation Drawer / Modal */}
      {rentalModalVehicle && (
        <RentalBookingModal
          vehicle={rentalModalVehicle}
          pickupDate={filters.pickupDate}
          returnDate={filters.returnDate}
          location={selectedLocation !== 'All Locations' ? selectedLocation : filters.location}
          onClose={() => setRentalModalVehicle(null)}
          onConfirmBooking={() => setRentalModalVehicle(null)}
        />
      )}

      {/* Sales Finance & Test Drive Drawer / Modal */}
      {salesModalVehicle && (
        <FinanceAndTestDriveModal
          vehicle={salesModalVehicle}
          onClose={() => setSalesModalVehicle(null)}
          onSuccess={() => setSalesModalVehicle(null)}
        />
      )}

    </div>
  );
}
