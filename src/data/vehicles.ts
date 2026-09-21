import { Vehicle, RentalAddon } from '@/types/vehicle';

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'porsche-taycan-gt-2024',
    make: 'Porsche',
    model: 'Taycan Turbo S',
    year: 2024,
    trim: 'Electric Performance Plus',
    bodyType: 'EV',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611821064430-0d40291d0f0d?q=80&w=1200&auto=format&fit=crop'
    ],
    badges: [
      { label: 'Instant Booking', type: 'instant' },
      { label: 'Electric', type: 'electric' },
      { label: 'Verified Inspection', type: 'verified' }
    ],
    specs: {
      engine: 'Dual Permanent Magnet Synchronous',
      power: '750 hp / 560 kW',
      acceleration: '2.8s 0-100 km/h',
      transmission: 'Single-Speed Fixed',
      drivetrain: 'AWD',
      fuelType: 'Electric',
      fuelEconomyOrRange: '480 km range',
      seats: 4,
      topSpeed: '260 km/h'
    },
    rentalPricePerDay: 480,
    purchasePrice: 185000,
    estMonthlyLoan: 2850,
    mileage: 4200,
    description: 'The Porsche Taycan Turbo S seamlessly blends iconic Porsche driving dynamics with futuristic pure-electric performance. Equipped with launch control and dynamic rear-axle steering.',
    features: [
      'Adaptive Air Suspension with PASM',
      'Burmester 3D High-End Surround Sound',
      'Porsche InnoDrive with Adaptive Cruise',
      '18-Way Adaptive Sports Seats',
      'Panoramic Fixed Glass Roof',
      '800V Ultra-Fast DC Charging (270kW)'
    ],
    location: 'Munich Central',
    isAvailableForRent: true,
    isAvailableForSale: true,
    rating: 4.95,
    reviewCount: 42
  },
  {
    id: 'mercedes-amg-gt-2024',
    make: 'Mercedes-AMG',
    model: 'GT 63 S E-Performance',
    year: 2024,
    trim: '4-Door Coupé',
    bodyType: 'Coupe',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop'
    ],
    badges: [
      { label: 'Hybrid', type: 'hybrid' },
      { label: 'Verified Inspection', type: 'verified' }
    ],
    specs: {
      engine: '4.0L V8 Biturbo + Electric Motor',
      power: '843 hp / 620 kW',
      acceleration: '2.9s 0-100 km/h',
      transmission: 'Dual-Clutch',
      drivetrain: 'AWD',
      fuelType: 'Hybrid',
      fuelEconomyOrRange: '7.9 L/100km',
      seats: 4,
      topSpeed: '316 km/h'
    },
    rentalPricePerDay: 520,
    purchasePrice: 198000,
    estMonthlyLoan: 3050,
    mileage: 8500,
    description: 'Affalterbach’s pinnacle high-performance hybrid four-door coupe delivering motorsport technology directly to luxury highways.',
    features: [
      'AMG Ride Control+ Air Suspension',
      'AMG Ceramic High-Performance Brakes',
      'Head-Up Display with AMG Specific Content',
      'Nappa Leather Active Multicontour Seats',
      'Burmester High-End Surround System'
    ],
    location: 'Dubai Downtown',
    isAvailableForRent: true,
    isAvailableForSale: true,
    rating: 4.92,
    reviewCount: 38
  },
  {
    id: 'range-rover-autobiography-2024',
    make: 'Land Rover',
    model: 'Range Rover Autobiography',
    year: 2024,
    trim: 'P530 V8 Long Wheelbase',
    bodyType: 'SUV',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541348263662-e082662d82da?q=80&w=1200&auto=format&fit=crop'
    ],
    badges: [
      { label: 'Instant Booking', type: 'instant' },
      { label: 'Verified Inspection', type: 'verified' },
      { label: 'Featured', type: 'featured' }
    ],
    specs: {
      engine: '4.4L Twin-Turbo V8',
      power: '523 hp / 390 kW',
      acceleration: '4.6s 0-100 km/h',
      transmission: 'Automatic',
      drivetrain: 'AWD',
      fuelType: 'Petrol',
      fuelEconomyOrRange: '11.5 L/100km',
      seats: 5,
      topSpeed: '250 km/h'
    },
    rentalPricePerDay: 590,
    purchasePrice: 172000,
    estMonthlyLoan: 2650,
    mileage: 11200,
    description: 'Unrivaled luxury and off-road supremacy. Executive Class rear seating, active noise cancellation, and effortless V8 power.',
    features: [
      'Executive Rear Class Comfort Seats',
      'Meridian Signature 35-Speaker Audio',
      'All-Wheel Steering',
      '24-Way Heated & Cooled Massage Seats',
      'Pixel LED Headlights with Signature DRL'
    ],
    location: 'London Mayfair',
    isAvailableForRent: true,
    isAvailableForSale: true,
    rating: 4.98,
    reviewCount: 56
  },
  {
    id: 'bmw-i7-xdrive60-2024',
    make: 'BMW',
    model: 'i7 xDrive60',
    year: 2024,
    trim: 'M Sport Excellence Package',
    bodyType: 'EV',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop'
    ],
    badges: [
      { label: 'Electric', type: 'electric' },
      { label: 'Instant Booking', type: 'instant' }
    ],
    specs: {
      engine: 'Dual Fifth-Gen Electric Motors',
      power: '536 hp / 400 kW',
      acceleration: '4.7s 0-100 km/h',
      transmission: 'Single-Speed Fixed',
      drivetrain: 'AWD',
      fuelType: 'Electric',
      fuelEconomyOrRange: '625 km range',
      seats: 5,
      topSpeed: '240 km/h'
    },
    rentalPricePerDay: 410,
    purchasePrice: 139000,
    estMonthlyLoan: 2150,
    mileage: 3100,
    description: 'The redefined luxury sedan experience. Features the revolutionary 31-inch 8K Theater Screen for rear passengers and Interaction Bar.',
    features: [
      '31.3" 8K BMW Theatre Screen',
      'Bowers & Wilkins Diamond Surround Sound',
      'Automatic Comfort Doors',
      'BMW Interaction Bar with Glass Controls',
      'Sky Lounge Panoramic Glass Roof with Light Threads'
    ],
    location: 'Munich Central',
    isAvailableForRent: true,
    isAvailableForSale: true,
    rating: 4.89,
    reviewCount: 29
  },
  {
    id: 'audi-rs-e-tron-gt-2024',
    make: 'Audi',
    model: 'RS e-tron GT',
    year: 2024,
    trim: 'Carbon Vorsprung Edition',
    bodyType: 'EV',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop'
    ],
    badges: [
      { label: 'Electric', type: 'electric' },
      { label: 'Verified Inspection', type: 'verified' }
    ],
    specs: {
      engine: 'Dual e-motors with boost function',
      power: '637 hp / 475 kW',
      acceleration: '3.1s 0-100 km/h',
      transmission: 'Automatic',
      drivetrain: 'AWD',
      fuelType: 'Electric',
      fuelEconomyOrRange: '495 km range',
      seats: 4,
      topSpeed: '250 km/h'
    },
    rentalPricePerDay: 430,
    purchasePrice: 147000,
    estMonthlyLoan: 2280,
    mileage: 6200,
    description: 'Sculpted emotional grand tourer with e-quattro electric all-wheel drive and matrix LED laser headlights.',
    features: [
      'Audi Laser Light Matrix LED Headlights',
      'Bang & Olufsen 3D Sound System',
      'Carbon Fiber Exterior & Interior Pack',
      'Adaptive Air Suspension',
      'All-Wheel Steering'
    ],
    location: 'New York Manhattan',
    isAvailableForRent: true,
    isAvailableForSale: true,
    rating: 4.91,
    reviewCount: 31
  },
  {
    id: 'ferrari-roma-2023',
    make: 'Ferrari',
    model: 'Roma V8',
    year: 2023,
    trim: 'Coupé La Nuova Dolce Vita',
    bodyType: 'Sports Car',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop'
    ],
    badges: [
      { label: 'Featured', type: 'featured' },
      { label: 'Verified Inspection', type: 'verified' }
    ],
    specs: {
      engine: '3.9L Twin-Turbo V8',
      power: '612 hp / 456 kW',
      acceleration: '3.4s 0-100 km/h',
      transmission: 'Dual-Clutch',
      drivetrain: 'RWD',
      fuelType: 'Petrol',
      fuelEconomyOrRange: '11.2 L/100km',
      seats: 2,
      topSpeed: '320 km/h'
    },
    rentalPricePerDay: 750,
    purchasePrice: 245000,
    estMonthlyLoan: 3800,
    mileage: 5100,
    description: 'Timeless Italian design meets modern Ferrari V8 turbo power. A harmonious representation of La Nuova Dolce Vita elegance.',
    features: [
      'Dual Cockpit Digital Layout',
      'Side Slip Control (SSC 6.0)',
      'JBL Professional Audio System',
      'Magneride Dual-Mode Suspension',
      'Carbon Ceramic Braking System'
    ],
    location: 'Dubai Downtown',
    isAvailableForRent: true,
    isAvailableForSale: true,
    rating: 4.97,
    reviewCount: 22
  },
  {
    id: 'aston-martin-dbx707-2024',
    make: 'Aston Martin',
    model: 'DBX707',
    year: 2024,
    trim: 'AMR Performance Edition',
    bodyType: 'SUV',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop'
    ],
    badges: [
      { label: 'Verified Inspection', type: 'verified' },
      { label: 'Instant Booking', type: 'instant' }
    ],
    specs: {
      engine: '4.0L Twin-Turbo V8',
      power: '707 hp / 520 kW',
      acceleration: '3.3s 0-100 km/h',
      transmission: 'Automatic',
      drivetrain: 'AWD',
      fuelType: 'Petrol',
      fuelEconomyOrRange: '13.1 L/100km',
      seats: 5,
      topSpeed: '310 km/h'
    },
    rentalPricePerDay: 680,
    purchasePrice: 238000,
    estMonthlyLoan: 3680,
    mileage: 7800,
    description: 'The world’s most powerful luxury SUV. Uncompromising performance paired with hand-crafted British luxury interior.',
    features: [
      'Wet-Clutch 9-Speed Transmission',
      'Electronic Rear Limited-Slip Differential',
      'Carbon Ceramic Brakes (420mm front)',
      'Sports Exhaust System with Quad Tailpipes',
      'Alcantara & Semi-Aniline Leather Interior'
    ],
    location: 'London Mayfair',
    isAvailableForRent: true,
    isAvailableForSale: true,
    rating: 4.94,
    reviewCount: 19
  },
  {
    id: 'bentley-continental-gt-2024',
    make: 'Bentley',
    model: 'Continental GT Speed',
    year: 2024,
    trim: 'Mulliner W12 Coupe',
    bodyType: 'Coupe',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop'
    ],
    badges: [
      { label: 'Featured', type: 'featured' },
      { label: 'Verified Inspection', type: 'verified' }
    ],
    specs: {
      engine: '6.0L Twin-Turbo W12',
      power: '650 hp / 485 kW',
      acceleration: '3.5s 0-100 km/h',
      transmission: 'Dual-Clutch',
      drivetrain: 'AWD',
      fuelType: 'Petrol',
      fuelEconomyOrRange: '13.7 L/100km',
      seats: 4,
      topSpeed: '335 km/h'
    },
    rentalPricePerDay: 820,
    purchasePrice: 298000,
    estMonthlyLoan: 4600,
    mileage: 2900,
    description: 'The ultimate grand tourer. Exquisite craftmanship, effortless W12 power, and Bentley Dynamic Ride active 48V roll control system.',
    features: [
      'Bentley Rotating Display (3-Sided)',
      'Naim for Bentley 2,200W Audio',
      'Mulliner Diamond Quilting Interior',
      'Electronic All-Wheel Steering',
      'Carbon Ceramic Brake Discs'
    ],
    location: 'New York Manhattan',
    isAvailableForRent: true,
    isAvailableForSale: true,
    rating: 4.99,
    reviewCount: 34
  }
];

export const RENTAL_ADDONS: RentalAddon[] = [
  {
    id: 'comprehensive-insurance',
    name: 'Full Comprehensive Protection',
    description: 'Zero excess deductible coverage including tire, windshield, and underbody damage.',
    dailyRate: 35,
    iconName: 'ShieldCheck'
  },
  {
    id: 'additional-driver',
    name: 'Additional Driver',
    description: 'Register a second qualified driver for maximum journey flexibility.',
    dailyRate: 15,
    iconName: 'Users'
  },
  {
    id: 'child-safety-seat',
    name: 'ISOFIX Child Safety Seat',
    description: 'Premium ergonomic safety seat suitable for toddlers to age 8.',
    dailyRate: 12,
    iconName: 'Baby'
  },
  {
    id: 'wifi-hotspot',
    name: 'Global High-Speed 5G Hotspot',
    description: 'Unlimited high-speed 5G Wi-Fi connectivity for up to 8 devices.',
    dailyRate: 10,
    iconName: 'Wifi'
  }
];

export const AVAILABLE_LOCATIONS = [
  'Dubai Downtown',
  'Munich Central',
  'London Mayfair',
  'New York Manhattan',
  'Paris Champs-Élysées',
  'Zurich Airport'
];
