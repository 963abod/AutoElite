# أبيكس كارز | Apex Cars

معرض سيارات فاخرة افتراضي مبني بـ Next.js (App Router) و TypeScript، بتصميم
دافئ فاخر (Ivory / Champagne) بواجهة عربية RTL بالكامل.

## التشغيل محلياً

```bash
npm install
npm run dev
```

ثم افتح http://localhost:3000

## قبل النشر الفعلي — إعدادات لازم تعدّلها

1. **رقم واتساب المعرض**
   في `lib/whatsapp.ts` عدّل القيمة:
   ```ts
   export const SHOWROOM_WHATSAPP_NUMBER = "963991234567";
   ```
   ضع الرقم الحقيقي بصيغة دولية بدون `+` وبدون صفر في البداية.

2. **صور السيارات**
   كل بيانات السيارات موجودة في `lib/data.ts`. حالياً الصور مولّدة تلقائياً
   من خدمة `picsum.photos` كصور مؤقتة (placeholder) لأنه ما كان في وصول
   لصور حقيقية أثناء التوليد. استبدل `heroImage` وروابط `gallery` بروابط
   صوركم الفعلية (يفضّل رفعها لمجلد `public/cars/` أو أي مزود صور تختاروه)،
   وحدّث `next.config.mjs` (`images.remotePatterns`) إذا غيّرتوا المصدر.

3. **بيانات السيارات ومعلومات التواصل**
   عدّل `lib/data.ts` لإضافة/تعديل السيارات، وعدّل رقم الهاتف والعنوان في
   `components/Footer.tsx`.

## بنية المشروع

- `app/` — الصفحات (الرئيسية + صفحة تفاصيل كل سيارة `app/car/[slug]`)
- `components/` — كل مكونات الواجهة (الفلاتر، البطاقات، المعرض، إلخ)
- `lib/` — بيانات السيارات، أدوات مساعدة، ومولّد رسالة واتساب
- `types/` — أنواع TypeScript المشتركة

## المكتبات الأساسية

Next.js · TypeScript · Tailwind CSS · Framer Motion · Radix UI
(Popover / Dialog / Dropdown Menu / Slider) · vaul · embla-carousel-react ·
lucide-react
