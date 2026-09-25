import type { Car } from "@/types/car";
import { formatKm, formatUsd } from "@/lib/utils";

// TODO: استبدل هذا الرقم برقم واتساب المعرض الفعلي (بصيغة دولية بدون + أو أصفار)
export const SHOWROOM_WHATSAPP_NUMBER = "963991234567";

export function buildCarInquiryMessage(car: Car, url: string): string {
  const carName = `${car.brand} ${car.model} ${car.year}`;

  return `مرحبا يعطيكم العافية، عم اتواصل معكم من موقع أبيكس كارز بخصوص سيارة ${carName} المعروضة عندكم:
- السعر: ${formatUsd(car.priceUsd)}
- سنة الصنع: ${car.year}
- الممشى: ${formatKm(car.mileageKm)}
- رابط السيارة: ${url}
حابب اعرف تفاصيل أكتر اذا لسا متوفرة، وكيف طريقة المعاينة بالمعرض؟ شكراً إلكن!`;
}

export function buildCarWhatsAppLink(car: Car, url: string): string {
  const message = buildCarInquiryMessage(car, url);
  return `https://wa.me/${SHOWROOM_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralWhatsAppLink(): string {
  const message = "مرحبا يعطيكم العافية، عم اتواصل معكم من موقع أبيكس كارز، حابب استفسر عن السيارات المتوفرة عندكم.";
  return `https://wa.me/${SHOWROOM_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
