'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Counts {
  cars: number;
  featuredCars: number;
  heroImages: number;
  sections: number;
}

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Counts>({
    cars: 0,
    featuredCars: 0,
    heroImages: 0,
    sections: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [
          { count: carsCount },
          { count: featCount },
          { count: heroCount },
          { count: secCount }
        ] = await Promise.all([
          supabase.from('cars').select('*', { count: 'exact', head: true }),
          supabase.from('cars').select('*', { count: 'exact', head: true }).eq('is_featured', true),
          supabase.from('hero_images').select('*', { count: 'exact', head: true }),
          supabase.from('site_sections').select('*', { count: 'exact', head: true })
        ]);

        setCounts({
          cars: carsCount || 0,
          featuredCars: featCount || 0,
          heroImages: heroCount || 0,
          sections: secCount || 0,
        });
      } catch (err) {
        console.error('Error fetching dashboard counts:', err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const sectionsList = [
    {
      title: 'إدارة السيارات',
      desc: 'إضافة وتعديل وحذف السيارات، رفع الصور، والمواصفات',
      path: '/admin/cars',
      countLabel: `${counts.cars} سيارة مسجلة`,
      color: 'border-amber-500/30',
      badge: `${counts.featuredCars} مميزة`,
    },
    {
      title: 'صور الـ Hero العشوائية',
      desc: 'التحكم بالصور الخلفية للواجهة الرئيسية وتفعيلها',
      path: '/admin/hero',
      countLabel: `${counts.heroImages} صورة متوفرة`,
      color: 'border-blue-500/30',
    },
    {
      title: 'أقسام ونصوص الموقع',
      desc: 'تعديل نصوص About، الخدمات، العناوين، والأزرار',
      path: '/admin/content',
      countLabel: `${counts.sections} أقسام قابلة للتحكم`,
      color: 'border-emerald-500/30',
    },
    {
      title: 'الأرقام والإحصائيات',
      desc: 'تعديل سنوات الخبرة، عدد السيارات المسلمة، ونسب الفحص',
      path: '/admin/stats',
      countLabel: 'التحكم الفوري بالأرقام',
      color: 'border-purple-500/30',
    },
    {
      title: 'بيانات التواصل',
      desc: 'أرقام الهواتف، واتساب، العنوان، ومواقع التواصل',
      path: '/admin/contact',
      countLabel: 'معلومات الاتصال المباشر',
      color: 'border-pink-500/30',
    },
    {
      title: 'هوية وألوان الموقع (Theme)',
      desc: 'تغيير ألوان الخلفية، الأزرار، واللون الذهبي الرئيسي',
      path: '/admin/theme',
      countLabel: 'تغيير الألوان ديناميكياً',
      color: 'border-[#D4AF37]/40',
    },
    {
      title: 'الإعدادات العامة والـ SEO',
      desc: 'الشعار، عنوان الموقع، وصف محركات البحث وخريطة غوغل',
      path: '/admin/settings',
      countLabel: 'إعدادات الموقع الأساسية',
      color: 'border-gray-500/30',
    },
  ];

  return (
    <div className="space-y-6">
      {/* الترويسة العلوية */}
      <div className="bg-gradient-to-r from-[#141416] to-[#1c1c20] border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
          أهلاً بك في لوحة تحكم <span className="text-[#D4AF37]">Apex Cars</span>
        </h2>
        <p className="text-sm text-gray-400">
          تحكّم بكامل محتوى المعرض، السيارات، الأسعار، والنصوص والصور مباشرة من هاتفك.
        </p>
      </div>

      {/* العدادات السريعة */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#141416] border border-white/5 p-4 rounded-xl">
          <p className="text-xs text-gray-400">إجمالي السيارات</p>
          <p className="text-2xl font-bold text-[#D4AF37] mt-1">
            {loading ? '...' : counts.cars}
          </p>
        </div>
        <div className="bg-[#141416] border border-white/5 p-4 rounded-xl">
          <p className="text-xs text-gray-400">السيارات المميزة</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {loading ? '...' : counts.featuredCars}
          </p>
        </div>
        <div className="bg-[#141416] border border-white/5 p-4 rounded-xl">
          <p className="text-xs text-gray-400">صور Hero</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">
            {loading ? '...' : counts.heroImages}
          </p>
        </div>
        <div className="bg-[#141416] border border-white/5 p-4 rounded-xl">
          <p className="text-xs text-gray-400">الأقسام المتحكم بها</p>
          <p className="text-2xl font-bold text-purple-400 mt-1">
            {loading ? '...' : counts.sections}
          </p>
        </div>
      </div>

      {/* قائمة أقسام اللوحة */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sectionsList.map((item, idx) => (
          <Link
            key={idx}
            href={item.path}
            className={`group block bg-[#141416] border ${item.color} p-5 rounded-2xl hover:bg-[#1a1a1e] transition-all relative overflow-hidden`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-white text-base group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                  {item.title}
                  {item.badge && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </h3>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <span className="text-gray-500 group-hover:text-white transition-colors text-lg pr-2">
                ←
              </span>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
              <span>{loading ? 'جاري التحميل...' : item.countLabel}</span>
              <span className="text-[#D4AF37] font-semibold text-[11px] group-hover:underline">
                إدارة الآن
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
