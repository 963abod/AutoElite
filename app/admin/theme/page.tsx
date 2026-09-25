'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface ThemeConfig {
  id?: string;
  primary_color: string;
  secondary_color: string;
  background_color: string;
  text_color: string;
  accent_color: string;
  button_color: string;
}

const DEFAULT_THEME: ThemeConfig = {
  primary_color: '#D4AF37',
  secondary_color: '#1A1A1A',
  background_color: '#0A0A0A',
  text_color: '#FFFFFF',
  accent_color: '#F59E0B',
  button_color: '#D4AF37',
};

export default function ThemeManagerPage() {
  const [theme, setTheme] = useState<ThemeConfig>(DEFAULT_THEME);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // جلب الثيم الحالي من Supabase
  const fetchTheme = async () => {
    setLoading(true);
    const { data } = await supabase.from('theme_settings').select('*').limit(1).single();
    if (data) {
      setTheme(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTheme();
  }, []);

  // حفظ الألوان الجديدة
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');

    try {
      if (theme.id) {
        await supabase.from('theme_settings').update({
          primary_color: theme.primary_color,
          secondary_color: theme.secondary_color,
          background_color: theme.background_color,
          text_color: theme.text_color,
          accent_color: theme.accent_color,
          button_color: theme.button_color,
          updated_at: new Date().toISOString(),
        }).eq('id', theme.id);
      } else {
        const { data } = await supabase.from('theme_settings').insert([theme]).select().single();
        if (data) setTheme(data);
      }

      setSuccessMsg('تم حفظ ألوان الموقع وتطبيقها بنجاح!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      alert('حدث خطأ أثناء الحفظ: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // استعادة الألوان الافتراضية
  const handleReset = () => {
    if (confirm('هل تريد استعادة الألوان الذهبية الأصلية للموقع؟')) {
      setTheme((prev) => ({ ...DEFAULT_THEME, id: prev.id }));
    }
  };

  const colorFields = [
    { key: 'primary_color', label: 'اللون الرئيسي (Primary)', desc: 'لون العناوين والتمييز الذهبي' },
    { key: 'secondary_color', label: 'اللون الثانوي (Cards)', desc: 'لون خلفيات بطاقات السيارات والقوائم' },
    { key: 'background_color', label: 'خلفية الموقع (Background)', desc: 'اللون الأساسي لكامل خلفية الموقع' },
    { key: 'text_color', label: 'لون النصوص (Text)', desc: 'لون النصوص العادية والفقرات' },
    { key: 'button_color', label: 'لون الأزرار (Buttons)', desc: 'لون أزرار الحجز والتواصل' },
    { key: 'accent_color', label: 'لون التمييز الفرعي (Accent)', desc: 'للأيقونات والشارات الخاصة' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#141416] p-4 md:p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-white">هوية وألوان الموقع (Theme)</h2>
          <p className="text-xs text-gray-400 mt-1">
            عدّل ألوان الموقع فوريًا بدون الحاجة لإعادة رفع أو تعديل كود CSS.
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-gray-300 self-start sm:self-auto"
        >
          استعادة الألوان الأصلية
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs text-center">
          {successMsg}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8 text-xs text-[#D4AF37]">جاري تحميل إعدادات الألوان...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* قسم اختيار الألوان */}
          <form onSubmit={handleSave} className="lg:col-span-2 space-y-4">
            <div className="bg-[#141416] border border-white/10 rounded-2xl p-4 md:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {colorFields.map((field) => (
                  <div key={field.key} className="bg-[#0A0A0A] p-3 rounded-xl border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{field.label}</span>
                      <div className="flex items-center gap-2">
                        {/* أداة اختيار اللون باللمس */}
                        <input
                          type="color"
                          value={(theme as any)[field.key]}
                          onChange={(e) =>
                            setTheme({ ...theme, [field.key]: e.target.value })
                          }
                          className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                        />
                        {/* كود اللون بالنص Hex */}
                        <input
                          type="text"
                          value={(theme as any)[field.key]}
                          onChange={(e) =>
                            setTheme({ ...theme, [field.key]: e.target.value })
                          }
                          className="w-20 px-2 py-1 bg-[#141416] border border-white/10 rounded text-[11px] font-mono text-center text-white uppercase"
                        />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-400">{field.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3 bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-bold rounded-xl text-sm transition-all disabled:opacity-50"
                >
                  {saving ? 'جاري الحفظ والتطبيق...' : 'حفظ وتطبيق الألوان على الموقع'}
                </button>
              </div>
            </div>
          </form>

          {/* المعاينة الحية الفورية (Live Preview) */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-400 px-1">معاينة حيّة للشكل:</h3>
            <div
              className="p-5 rounded-2xl border transition-all space-y-4"
              style={{
                backgroundColor: theme.background_color,
                color: theme.text_color,
                borderColor: theme.secondary_color,
              }}
            >
              <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: theme.secondary_color }}>
                <span className="font-bold text-sm" style={{ color: theme.primary_color }}>Apex Cars</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: theme.secondary_color, color: theme.accent_color }}>
                  معاينة مباشرة
                </span>
              </div>

              {/* بطاقة سيارة تجريبية لمعاينة دمج الألوان */}
              <div
                className="p-4 rounded-xl border space-y-3"
                style={{
                  backgroundColor: theme.secondary_color,
                  borderColor: 'rgba(255,255,255,0.05)',
                }}
              >
                <div className="h-24 rounded-lg bg-black/30 flex items-center justify-center text-xs text-gray-400">
                  صورة السيارة
                </div>
                <div>
                  <h4 className="font-bold text-xs" style={{ color: theme.text_color }}>Mercedes-AMG G63</h4>
                  <p className="text-sm font-bold mt-1" style={{ color: theme.primary_color }}>$280,000</p>
                </div>
                <button
                  type="button"
                  className="w-full py-2 rounded-lg text-xs font-bold text-black transition-all"
                  style={{ backgroundColor: theme.button_color }}
                >
                  حجز السيارة
                </button>
              </div>

              <p className="text-[10px] text-center opacity-70">
                هكذا ستظهر الألوان للمستخدمين في الموقع الحقيقي.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
          }
