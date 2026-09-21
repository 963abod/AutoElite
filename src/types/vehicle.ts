export type PlatformMode = 'rent' | 'buy';

export type BodyType = 'SUV' | 'Sedan' | 'Coupe' | 'EV' | 'Convertible' | 'Sports Car';

export type FuelType = 'Electric' | 'Hybrid' | 'Petrol' | 'Diesel';

export type TransmissionType = 'Automatic' | 'Single-Speed Fixed' | 'Dual-Clutch' | 'Manual';

export interface VehicleSpec {
  engine: string;
  power: string; // e.g., "670 hp" or "450 kW"
  acceleration: string; // e.g., "3.1s 0-100 km/h"
  transmission: TransmissionType;
  drivetrain: 'AWD' | 'RWD' | 'FWD';
  fuelType: FuelType;
  fuelEconomyOrRange: string; // e.g., "620 km range" or "9.2 L/100km"
  seats: number;
  topSpeed: string; // e.g., "280 km/h"
}

export interface VehicleBadge {
  label: string;
  type: 'instant' | 'verified' | 'hybrid' | 'electric' | 'featured' | 'low-mileage';
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  bodyType: BodyType;
  image: string;
  gallery: string[];
  badges: VehicleBadge[];
  specs: VehicleSpec;

  // Pricing
  rentalPricePerDay: number;
  purchasePrice: number;
  estMonthlyLoan: number; // default calculated estimate e.g. for $0 down / 60mo
  mileage: number; // in km

  // Additional details
  description: string;
  features: string[];
  location: string; // e.g., "Dubai Downtown", "Munich Central", "London Mayfair", "New York Manhattan"
  isAvailableForRent: boolean;
  isAvailableForSale: boolean;
  rating: number;
  reviewCount: number;
}

export interface SearchFilterState {
  mode: PlatformMode;
  searchQuery: string;
  bodyType: string; // 'All' or specific BodyType
  priceRange: [number, number]; // Daily price or Purchase price depending on mode
  fuelType: string;
  transmission: string;
  location: string;
  pickupDate: string;
  returnDate: string;
  yearRange: [number, number];
  maxMileage: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'year-desc' | 'rating';
}

export interface RentalAddon {
  id: string;
  name: string;
  description: string;
  dailyRate: number;
  iconName: string;
}

export interface LoanCalculation {
  downPayment: number;
  loanTermMonths: number;
  interestRate: number; // percentage, e.g., 4.5
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedVehicles?: Vehicle[];
}
