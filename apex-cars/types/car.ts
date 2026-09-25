export type FuelType = "بنزين" | "هايبرد" | "كهرباء";

export type CarCondition = "خالية من الحوادث" | "بحالة الوكالة";

export interface CarAngleImage {
  label: string;
  url: string;
}

export interface Car {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  priceUsd: number;
  mileageKm: number;
  transmission: string;
  fuelType: FuelType;
  condition: CarCondition;
  plateStatus: string;
  color: string;
  description: string;
  heroImage: string;
  gallery: CarAngleImage[];
  featured?: boolean;
}

export interface CarFilters {
  brands: string[];
  fuelTypes: FuelType[];
  yearRange: [number, number];
  priceRange: [number, number];
}
