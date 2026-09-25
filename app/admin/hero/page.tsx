'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface HeroImage {
  id: string;
  image_url: string;
  title: string;
  subtitle: string;
  is_active: boolean;
  display_order: number;
}

export default function HeroManagerPage() {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  // جلب الصور من Supabase
  const fetchHeroImages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('hero_images')
      .select('*')
      .order('display_order', { ascending: true });

    if (data) setImages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchHeroImages();
  }, []);

  // رفع وحفظ صورة Hero جديدة
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `hero-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('hero-media')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('hero-media').getPublicUrl(fileName);

      await supabase.from('hero_images').insert([
        {
          image_url: data.publicUrl,
          title: title || '',
          subtitle: subtitle || '',
          is_active: true,
          display_order: images.length + 1,
        },
      ]);

      setTitle('');
      setSubtitle('');
      await fetchHeroImages();
    } catch (err: any) {
      alert('فشل الرفع: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  // تبديل حالة التفعيل / التعطيل
  const toggleActive = async (img: HeroImage) => {
    const nextState = !img.is_active;
    const { error } = await supabase
      .from('hero_images')
      .update({ is_active: nextState })
      .eq('id', img.id);

    if (!error) {
      setImages(images.map((i) => (i.id === img.id ? { ...i, is_active: nextState } : i)));
    }
  };

  // حذف صورة
  const handleDelete = async (id: string) => {
    if (!confirm('هل تريد حذف هذه الصورة من قائمة خلفيات Hero؟')) return;
    const { error } = await supabase.from('hero_images').delete().eq('id', id);
    if (!error) {
      setImages(images.filter((i) => i.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#141416] p-4 md:p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-bold text-white">إدارة صور الواجهة الرئيسية (Hero)</h2>
        <p className="text-xs text-gray-400 mt-1">
          الصور المفعّلة هنا تظهر عشوائياً للزوار كخلفية للواجهة الرئيسية للموقع.
        </p>
      </div>

      {/* قسم إضافة صورة جديدة */}
      <div className="bg-[#141416] p-4 md:p-6 rounded-2xl border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-[#D4AF37]">+ إضافة صورة Hero جديدة</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="عنوان ترويجي على الصورة (اختياري)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          />
          <input
            type="text"
            placeholder="نص فرعي توضيحي (اختياري)"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <label className="cursor-pointer block bg-[#0A0A0A] border-2 border-dashed border-white/15 hover:border-[#D4AF37] p-5 rounded-xl text-center transition-all">
          <span className="text-xs font-semibold text-[#D4AF37] block">
            {uploading ? 'جاري رفع الصورة...' : 'اضغط لاختيار صورة من هاتفك وحفظها'}
          </span>
          <span className="text-[11px] text-gray-400 mt-1 block">يفضل اختيار صور أفقية بدقة عالية</span>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleUploadImage}
            className="hidden"
          />
        </label>
      </div>

      {/* قائمة الصور الحالية */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white">الصور الحالية ({images.length})</h3>

        {loading ? (
          <div className="text-center py-8 text-xs text-[#D4AF37]">جاري تحميل الصور...</div>
        ) : images.length === 0 ? (
          <div className="text-center py-8 bg-[#141416] rounded-xl border border-white/5 text-xs text-gray-400">
            لا توجد أي صور Hero حتى الآن. أضف صورتك الأولى بالأعلى.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
              <div
                key={img.id}
                className={`bg-[#141416] border rounded-2xl overflow-hidden transition-all ${
                  img.is_active ? 'border-white/10' : 'border-red-500/30 opacity-60'
                }`}
              >
                <div className="aspect-video relative bg-black">
                  <img src={img.image_url} alt="hero" className="w-full h-full object-cover" />
                  <span
                    className={`absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full font-bold shadow ${
                      img.is_active ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    {img.is_active ? 'مفعّلة بالعرض' : 'معطّلة'}
                  </span>
                </div>

                <div className="p-3 space-y-2">
                  {img.title && <p className="text-xs font-bold text-white truncate">{img.title}</p>}
                  {img.subtitle && <p className="text-[11px] text-gray-400 truncate">{img.subtitle}</p>}

                  <div className="flex gap-2 pt-2 border-t border-white/5">
                    <button
                      onClick={() => toggleActive(img)}
                      className="flex-1 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-gray-200"
                    >
                      {img.is_active ? 'تعطيل' : 'تفعيل'}
                    </button>
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  }
            
