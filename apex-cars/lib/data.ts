import type { Car } from "@/types/car";

const ANGLES = [
  "الواجهة الأمامية",
  "الخلفية",
  "الجانب",
  "المقصورة والكونسول",
  "الجنوط",
  "المحرك",
] as const;

function gallery(seed: string) {
  return ANGLES.map((label, i) => ({
    label,
    url: `https://picsum.photos/seed/${seed}-${i}/1200/800`,
  }));
}

export const CARS: Car[] = [
  {
    id: "1",
    slug: "range-rover-defender-110-2024",
    brand: "Range Rover",
    model: "Defender 110 P400",
    year: 2024,
    priceUsd: 145000,
    mileageKm: 4200,
    transmission: "أوتوماتيك 8 سرعات",
    fuelType: "بنزين",
    condition: "بحالة الوكالة",
    plateStatus: "لوحات خصوصي - دمشق",
    color: "أخضر جافا الغامق",
    description:
      "دفندر 110 بموديل 2024 بحالة الوكالة تقريباً، فحص كامل بدون أي ملاحظات، فل أوبشن مع فتحة بانوراما وكاميرات 360 ونظام تعليق هوائي قابل للتعديل. مثالية لعشاق الطابع البريطاني الأصيل مع الفخامة العصرية.",
    heroImage: "https://picsum.photos/seed/defender110-0/1600/1000",
    gallery: gallery("defender110"),
    featured: true,
  },
  {
    id: "2",
    slug: "mercedes-g63-amg-2023",
    brand: "Mercedes-Benz",
    model: "G63 AMG",
    year: 2023,
    priceUsd: 265000,
    mileageKm: 9800,
    transmission: "أوتوماتيك 9 سرعات",
    fuelType: "بنزين",
    condition: "خالية من الحوادث",
    plateStatus: "لوحات ترانزيت قابلة للتحويل",
    color: "أسود أوبسيديان",
    description:
      "الجيب الأسطورة G63 AMG، محرك V8 تيربو بقوة 585 حصان، صوت عادم AMG الرياضي، مقصورة جلد Nappa كاملة مع تكييف مقاعد وتدليك. سيارة نادرة ومطلوبة بشدة في السوق السوري.",
    heroImage: "https://picsum.photos/seed/g63amg-0/1600/1000",
    gallery: gallery("g63amg"),
    featured: true,
  },
  {
    id: "3",
    slug: "porsche-cayenne-gts-2023",
    brand: "Porsche",
    model: "Cayenne GTS",
    year: 2023,
    priceUsd: 118000,
    mileageKm: 15600,
    transmission: "أوتوماتيك Tiptronic S",
    fuelType: "بنزين",
    condition: "خالية من الحوادث",
    plateStatus: "لوحات خصوصي - دمشق",
    color: "رمادي كوارتز",
    description:
      "كايين GTS بمحرك V8 تيربو، تعليق هوائي رياضي وفرامل PSCB الحمراء، مقصورة رياضية فاخرة بلمسات ألكنتارا. توازن مثالي بين الأداء الرياضي والراحة اليومية.",
    heroImage: "https://picsum.photos/seed/cayennegts-0/1600/1000",
    gallery: gallery("cayennegts"),
  },
  {
    id: "4",
    slug: "bmw-750le-xdrive-2024",
    brand: "BMW",
    model: "750Le xDrive",
    year: 2024,
    priceUsd: 132000,
    mileageKm: 3100,
    transmission: "أوتوماتيك 8 سرعات",
    fuelType: "هايبرد",
    condition: "بحالة الوكالة",
    plateStatus: "لوحات خصوصي - دمشق",
    color: "أزرق سوفرين",
    description:
      "السلسلة السابعة الجديدة كلياً بنظام هجين قابل للشحن، صالة قيادة مسرحية مع شاشة BMW Theatre الخلفية، أداء هادئ وفعالية عالية باستهلاك وقود منخفض جداً للفئة.",
    heroImage: "https://picsum.photos/seed/bmw750le-0/1600/1000",
    gallery: gallery("bmw750le"),
  },
  {
    id: "5",
    slug: "audi-rsq8-2023",
    brand: "Audi",
    model: "RS Q8",
    year: 2023,
    priceUsd: 135000,
    mileageKm: 12300,
    transmission: "أوتوماتيك Tiptronic",
    fuelType: "بنزين",
    condition: "خالية من الحوادث",
    plateStatus: "لوحات ترانزيت قابلة للتحويل",
    color: "أخضر جافا",
    description:
      "RS Q8 بمحرك V8 تيربو 600 حصان، نظام دفع كوترو رباعي وتعليق هوائي رياضي فعال، مثالية لمن يبحث عن هوية رياضية جريئة داخل جسم SUV فاخر وعملي.",
    heroImage: "https://picsum.photos/seed/rsq8-0/1600/1000",
    gallery: gallery("rsq8"),
  },
  {
    id: "6",
    slug: "lexus-lx600-2024",
    brand: "Lexus",
    model: "LX 600",
    year: 2024,
    priceUsd: 155000,
    mileageKm: 5400,
    transmission: "أوتوماتيك 10 سرعات",
    fuelType: "بنزين",
    condition: "بحالة الوكالة",
    plateStatus: "لوحات خصوصي - دمشق",
    color: "أبيض لؤلؤي",
    description:
      "LX 600 بفخامة يابانية هادئة وموثوقية عالية، مقصورة تتسع لثلاث صفوف مع تجهيزات فل أوبشن ونظام دفع رباعي متعدد الأوضاع يناسب كل الطرق. خيار ممتاز للعائلات الباحثة عن الفخامة العملية.",
    heroImage: "https://picsum.photos/seed/lx600-0/1600/1000",
    gallery: gallery("lx600"),
  },
  {
    id: "7",
    slug: "mercedes-eqs580-2024",
    brand: "Mercedes-Benz",
    model: "EQS 580",
    year: 2024,
    priceUsd: 142000,
    mileageKm: 2600,
    transmission: "أوتوماتيك سرعة واحدة (كهربائي)",
    fuelType: "كهرباء",
    condition: "بحالة الوكالة",
    plateStatus: "لوحات خصوصي - دمشق",
    color: "أسود عالي اللمعان",
    description:
      "EQS 580 السيارة الرائدة كهربائياً من مرسيدس، مدى قيادة يتجاوز 600 كم بشحنة واحدة، شاشة Hyperscreen المنحنية الكاملة، وهدوء داخلي استثنائي. مستقبل الفخامة حاضر اليوم.",
    heroImage: "https://picsum.photos/seed/eqs580-0/1600/1000",
    gallery: gallery("eqs580"),
    featured: true,
  },
  {
    id: "8",
    slug: "bmw-x7-m60i-2024",
    brand: "BMW",
    model: "X7 M60i",
    year: 2024,
    priceUsd: 128000,
    mileageKm: 6700,
    transmission: "أوتوماتيك 8 سرعات",
    fuelType: "بنزين",
    condition: "خالية من الحوادث",
    plateStatus: "لوحات خصوصي - دمشق",
    color: "رمادي فيلا",
    description:
      "X7 M60i بمحرك V8 توين تيربو، مقصورة سبعة مقاعد بفخامة كاملة وإضاءة أجواء بـ 32 لون، نظام صوت Bowers & Wilkins. القامة الرائدة في فئة الـ SUV الفاخرة كبيرة الحجم.",
    heroImage: "https://picsum.photos/seed/x7m60i-0/1600/1000",
    gallery: gallery("x7m60i"),
  },
  {
    id: "9",
    slug: "porsche-911-carrera-s-2023",
    brand: "Porsche",
    model: "911 Carrera S",
    year: 2023,
    priceUsd: 175000,
    mileageKm: 8100,
    transmission: "أوتوماتيك PDK",
    fuelType: "بنزين",
    condition: "خالية من الحوادث",
    plateStatus: "لوحات ترانزيت قابلة للتحويل",
    color: "أحمر غوردون الفاقع",
    description:
      "911 كاريرا S، الأيقونة الرياضية الخالدة من بورشه بمحرك سداسي مسطح توين تيربو، هيكل خفيف ومقصورة مصممة حول السائق. سيارة تُقتنى وتُستمتع بها في آن واحد.",
    heroImage: "https://picsum.photos/seed/911carreras-0/1600/1000",
    gallery: gallery("911carreras"),
  },
  {
    id: "10",
    slug: "range-rover-sport-sv-2024",
    brand: "Range Rover",
    model: "Sport SV",
    year: 2024,
    priceUsd: 198000,
    mileageKm: 3900,
    transmission: "أوتوماتيك 8 سرعات",
    fuelType: "بنزين",
    condition: "بحالة الوكالة",
    plateStatus: "لوحات خصوصي - دمشق",
    color: "أزرق بورتوفينو",
    description:
      "رينج روفر سبورت SV، النسخة الأداءية الأقوى على الإطلاق بمحرك V8 660 حصان، تعليق Dynamic Response Pro النشط، ومزيج فريد بين الفخامة البريطانية والأداء الفائق.",
    heroImage: "https://picsum.photos/seed/rrsportsv-0/1600/1000",
    gallery: gallery("rrsportsv"),
    featured: true,
  },
];

export const BRANDS = Array.from(new Set(CARS.map((c) => c.brand)));
export const FUEL_TYPES = Array.from(new Set(CARS.map((c) => c.fuelType)));

export const PRICE_BOUNDS: [number, number] = [
  Math.min(...CARS.map((c) => c.priceUsd)),
  Math.max(...CARS.map((c) => c.priceUsd)),
];

export const YEAR_BOUNDS: [number, number] = [2022, 2026];

export function getCarBySlug(slug: string): Car | undefined {
  return CARS.find((c) => c.slug === slug);
}
