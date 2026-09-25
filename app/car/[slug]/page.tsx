import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";
import { ChevronLeft, Gauge, Cog, ShieldCheck, Palette, Fingerprint, Calendar } from "lucide-react";
import { CARS, getCarBySlug } from "@/lib/data";
import { formatKm, formatUsd } from "@/lib/utils";
import { CarGallery } from "@/components/CarGallery";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CarCard } from "@/components/CarCard";

export function generateStaticParams() {
  return CARS.map((car) => ({ slug: car.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const car = getCarBySlug(params.slug);
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

export default function CarDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const car = getCarBySlug(params.slug);
  if (!car) notFound();

  const url = getPageUrl(car.slug);
  const related = CARS.filter((c) => c.brand === car.brand && c.id !== car.id).slice(0, 3);
  const fallbackRelated = related.length > 0 ? related : CARS.filter((c) => c.id !== car.id).slice(0, 3);

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
