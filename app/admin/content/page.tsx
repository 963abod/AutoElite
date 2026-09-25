'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface SectionItem {
  id: string;
  title: string;
  subtitle: string | null;
  content: string | null;
  button_text: string | null;
  button_link: string | null;
  image_url: string | null;
  is_visible: boolean;
}

export default function ContentManagerPage() {
  const [sections, setSections] = useState<SectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<SectionItem>>({});
  const [saving, setSaving] = useState(false);

  // جلب الأقسام من قاعدة البيانات
  const fetchSections = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('site_sections')
      .select('*')
      .order('display_order', { ascending: true });

    if (data) setSections(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSections();
  }, []);

  // بدء تعديل قسم
  const startEdit = (sec: SectionItem) => {
    setEditingId(sec.id);
    setFormData(sec);
  };

  // حفظ التعديلات
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_sections')
        .update({
          title: formData.title,
          subtitle: formData.subtitle,
          content: formData.content,
          button_text: formData.button_text,
          button_link: formData.button_link,
        })
        .eq('id', editingId);

      if (error) throw error;

      setEditingId(null);
      await fetchSections();
    } catch (err: any) {
      alert('حدث خطأ أثناء الحفظ: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // إظهار أو إخفاء القسم من الموقع
  const toggleVisibility = async (sec: SectionItem) => {
    const nextState = !sec.is_visible;
    const { error } = await supabase
      .from('site_sections')
      .update({ is_visible: nextState })
      .eq('id', sec.id);

    if (!error) {
      setSections(sections.map((s) => (s.id === sec.id ? { ...s, is_visible: nextState } : s)));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#141416] p-4 md:p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-bold text-white">إدارة أقسام ونصوص الموقع</h2>
        <p className="text-xs text-gray-400 mt-1">
          تحكّم في عناوين ونصوص وأزرار الأقسام المعروضة على الصفحة الرئيسية.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-8 text-xs text-[#D4AF37]">جاري تحميل الأقسام...</div>
      ) : (
        <div className="space-y-4">
          {sections.map((sec) => {
            const isEditing = editingId === sec.id;

            return (
              <div
                key={sec.id}
                className="bg-[#141416] border border-white/10 rounded-2xl p-4 md:p-6 space-y-4"
              >
                {/* رأس القسم */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-white/5 text-gray-400 px-2 py-0.5 rounded">
                      #{sec.id}
                    </span>
                    <h3 className="font-bold text-white text-base">{sec.title}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleVisibility(sec)}
                      className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${
                        sec.is_visible
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}
                    >
                      {sec.is_visible ? 'ظاهر بالموقع' : 'مخفي'}
                    </button>
                    {!isEditing && (
                      <button
                        onClick={() => startEdit(sec)}
                        className="text-xs px-3 py-1 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 hover:bg-[#D4AF37]/20 font-medium"
                      >
                        تعديل
                      </button>
                    )}
                  </div>
                </div>

                {/* وضع التعديل */}
                {isEditing ? (
                  <form onSubmit={handleSave} className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">العنوان الرئيسي</label>
                      <input
                        type="text"
                        required
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">العنوان الفرعي (Subtitle)</label>
                      <input
                        type="text"
                        value={formData.subtitle || ''}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">نص المحتوى / الوصف</label>
                      <textarea
                        rows={3}
                        value={formData.content || ''}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">نص الزر</label>
                        <input
                          type="text"
                          value={formData.button_text || ''}
                          onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                          className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">رابط الزر (Link)</label>
                        <input
                          type="text"
                          value={formData.button_link || ''}
                          onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
                          placeholder="#cars أو https://..."
                          className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-5 py-2 bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-bold rounded-xl text-xs transition-all disabled:opacity-50"
                      >
                        {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-xs"
                      >
                        إلغاء
                      </button>
                    </div>
                  </form>
                ) : (
                  /* وضع العرض العادي */
                  <div className="text-xs space-y-2 text-gray-300">
                    {sec.subtitle && (
                      <p><span className="text-gray-500">العنوان الفرعي:</span> {sec.subtitle}</p>
                    )}
                    {sec.content && (
                      <p><span className="text-gray-500">المحتوى:</span> {sec.content}</p>
                    )}
                    {sec.button_text && (
                      <p>
                        <span className="text-gray-500">الزر:</span> {sec.button_text} 
                        <span className="text-gray-500 mr-2 font-mono">({sec.button_link})</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
                                  }
                                                        
