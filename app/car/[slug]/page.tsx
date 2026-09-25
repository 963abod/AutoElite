import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";
import { ChevronLeft, Gauge, Cog, ShieldCheck, Palette, Fingerprint, Calendar } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { CARS, getCarBySlug } from "@/lib/data";
import { formatKm, formatUsd } from "@/lib/utils";
import { CarGallery } from "@/components/CarGallery";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CarCard } from "@/components/CarCard";
import type { Car } from "@/types/car";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

function formatCar(c: any): Car {
  const extractedImages: string[] = [];

  if (Array.isArray(c.car_images) && c.car_images.length > 0) {
    const sorted = [...c.car_images].sort(
      (a: any, b: any) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0)
    );
    sorted.forEach((img: any) => {
      const url = typeof img === "string" ? img : img?.image_url || img?.url || img?.image;
      if (url && !extractedImages.includes(url)) extractedImages.push(url);
    });
  }

  if (Array.isArray(c.images)) {
    c.images.forEach((img: any) => {
      const url = typeof img === "string" ? img : img?.url || img?.image_url;
      if (url && !extractedImages.includes(url)) extractedImages.push(url);
    });
  }

  const directFields = [
    c.main_image,
    c.image,
    c.image_url,
    c.cover_image,
    c.thumbnail,
    c.photo,
    c.photo_url,
  ];

  directFields.forEach((field) => {
    if (field && typeof field === "string" && !extractedImages.includes(field)) {
      extractedImages.unshift(field);
    }
  });

  if (extractedImages.length === 0) {
    extractedImages.push("https://picsum.photos/seed/apex-car/800/600");
  }

  const primaryImg = extractedImages[0];
  const price = Number(c.price_usd ?? c.price ?? c.priceUsd ?? 0);
  const year = Number(c.year) || 2024;

  return ({
    id: c.id?.toString() || Math.random().toString(),
    slug: c.slug || `car-${c.id}`,
    name: c.name || `${c.brand || ""} ${c.model || ""}`.trim() || "سيارة فاخرة",
    brand: c.brand || "أخرى",
    model: c.model || "",
    year: year,
    priceUsd: price,
    mileageKm: Number(c.mileage_km ?? c.mileage ?? c.mileageKm ?? 0),
    fuelType: c.fuel_type || c.fuelType || "بنزين",
    transmission: c.transmission || "أوتوماتيك",
    horsepower: Number(c.horsepower) || 400,
    exteriorColor: c.exterior_color || c.color || "أسود",
    interiorColor: c.interior_color || "جلد فاخر",
    color: c.exterior_color || c.color || "أسود",
    condition: c.condition || "مستعمل بحالة ممتازة",
    plateStatus: c.plate_status || "لوحات نظامية",
    heroImage: primaryImg,
    gallery: extractedImages,
    images: extractedImages,
    featured: Boolean(c.is_featured ?? c.isFeatured),
    description: c.description || "",
    specs: c.specs || {},
  } as unknown) as Car;
}

async function getCar(slug: string): Promise<Car | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);

      // البحث بالـ slug
      let { data: carData } = await supabase
        .from("cars")
        .select("*, car_images(*)")
        .eq("slug", slug)
        .maybeSingle();

      // البحث بالـ id إذا كان الرابط يعتمد على معرف السيارة
      if (!carData && slug.startsWith("car-")) {
        const rawId = slug.replace("car-", "");
        const { data: byId } = await supabase
          .from("cars")
          .select("*, car_images(*)")
          .eq("id", rawId)
          .maybeSingle();
        carData = byId;
      }

      if (!carData) {
        const { data: byRawId } = await supabase
          .from("cars")
          .select("*, car_images(*)")
          .eq("id", slug)
          .maybeSingle();
        carData = byRawId;
      }

      if (carData) {
        return formatCar(carData);
      }
    } catch (err) {
      console.error("Supabase car fetch error:", err);
    }
  }

  return getCarBySlug(slug) || null;
}

async function getRelatedCars(currentCar: Car): Promise<Car[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      // جلب سيارات حقيقية أخرى من Supabase باستثناء السيارة الحالية
      let query = supabase
        .from("cars")
        .select("*, car_images(*)")
        .limit(3);

      // استبعاد السيارة الحالية إذا كانت تحمل معرف رقمي أو نصي
      if (currentCar.id && !currentCar.id.includes(".")) {
        query = query.neq("id", currentCar.id);
      }

      const { data } = await query;

      if (data && data.length > 0) {
        return data
          .filter((c: any) => c.slug !== currentCar.slug && c.id?.toString() !== currentCar.id?.toString())
          .map((c) => formatCar(c));
      }
    } catch (err) {
      console.error("Related cars fetch error:", err);
    }
  }

  // عدم استخدام أي بيانات قديمة كبديل إطلاقاً
  return [];
}


export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const car = await getCar(params.slug);
  if (!car) return {};
  return {
    title: `${car.brand} ${car.model} ${car.year} | أبيكس كارز`,
    description: car.description,
  };
}

function getPageUrl(slug: string): string {
  const h = headers();
  const host = h.get("host") ?? "apexcars.sy";
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}/car/${slug}`;
}

export default async function CarDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const car = await getCar(params.slug);
  if (!car) notFound();

  const url = getPageUrl(car.slug);
  const fallbackRelated = await getRelatedCars(car);

  const specs = [
    { icon: Calendar, label: "سنة الصنع", value: `${car.year}` },
    { icon: Gauge, label: "الممشى", value: formatKm(car.mileageKm) },
    { icon: Cog, label: "ناقل الحركة", value: car.transmission },
    { icon: Fingerprint, label: "نوع المحرك", value: car.fuelType },
    { icon: ShieldCheck, label: "الحالة", value: car.condition },
    { icon: Palette, label: "اللون", value: car.color },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-ink-soft">
        <Link href="/" className="hover:text-ink">الرئيسية</Link>
        <ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
        <Link href="/#listings" className="hover:text-ink">السيارات</Link>
        <ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
        <span className="text-ink">{car.brand} {car.model}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <CarGallery images={car.gallery} carName={`${car.brand} ${car.model}`} />

        <div>
          <p className="text-sm text-champagne-deep">{car.brand}</p>
          <h1 className="mt-1 text-3xl font-bold leading-snug sm:text-4xl">
            {car.model}
          </h1>
          <p className="mt-3 text-sm text-ink-soft">{car.plateStatus}</p>

          <p className="mt-6 text-3xl font-bold tracking-tightnum tabular-nums">
            {formatUsd(car.priceUsd)}
          </p>

          <div className="mt-8">
            <WhatsAppButton car={car} url={url} />
          </div>

          <dl className="mt-8 divide-y divide-line border-t border-line">
            {specs.map((s) => (
              <div key={s.label} className="flex items-center justify-between py-3.5">
                <dt className="flex items-center gap-2 text-sm text-ink-soft">
                  <s.icon className="h-4 w-4 text-champagne-deep" strokeWidth={1.5} />
                  {s.label}
                </dt>
                <dd className="text-sm font-medium text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-sm leading-8 text-ink-soft">
            {car.description}
          </p>
        </div>
      </div>

      {fallbackRelated.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 text-xl font-semibold">سيارات مشابهة</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {fallbackRelated.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
