'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface SiteSettings {
  id?: string;
  site_name: string;
  site_title: string;
  meta_description: string;
  logo_url: string;
  google_maps_embed_url: string;
}

interface ContactInfo {
  id?: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  working_hours: string;
  instagram: string;
  facebook: string;
}

interface StatItem {
  id: string;
  metric_value: string;
  label: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'stats'>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [message, setMessage] = useState('');

  // البيانات
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: 'Apex Cars',
    site_title: 'Apex Cars | Luxury & Exotic Dealership',
    meta_description: '',
    logo_url: '',
    google_maps_embed_url: '',
  });

  const [contact, setContact] = useState<ContactInfo>({
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    working_hours: '',
    instagram: '',
    facebook: '',
  });

  const [stats, setStats] = useState<StatItem[]>([]);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      const [
        { data: sData },
        { data: cData },
        { data: stData }
      ] = await Promise.all([
        supabase.from('site_settings').select('*').limit(1).single(),
        supabase.from('contact_info').select('*').limit(1).single(),
        supabase.from('statistics').select('*').order('display_order', { ascending: true })
      ]);

      if (sData) setSettings(sData);
      if (cData) setContact(cData);
      if (stData) setStats(stData);
      setLoading(false);
    }
    loadAll();
  }, []);

  // رفع الشعار Logo
  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `logo-${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from('branding-media').upload(fileName, file);
      if (error) throw error;

      const { data } = supabase.storage.from('branding-media').getPublicUrl(fileName);
      setSettings((prev) => ({ ...prev, logo_url: data.publicUrl }));
    } catch (err: any) {
      alert('فشل رفع الشعار: ' + err.message);
    } finally {
      setUploadingLogo(false);
    }
  };

  // حفظ الإعدادات
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      if (activeTab === 'general') {
        if (settings.id) {
          await supabase.from('site_settings').update(settings).eq('id', settings.id);
        } else {
          const { data } = await supabase.from('site_settings').insert([settings]).select().single();
          if (data) setSettings(data);
        }
      } else if (activeTab === 'contact') {
        if (contact.id) {
          await supabase.from('contact_info').update(contact).eq('id', contact.id);
        } else {
          const { data } = await supabase.from('contact_info').insert([contact]).select().single();
          if (data) setContact(data);
        }
      } else if (activeTab === 'stats') {
        for (const item of stats) {
          await supabase.from('statistics').update({
            metric_value: item.metric_value,
            label: item.label
          }).eq('id', item.id);
        }
      }

      setMessage('تم حفظ التعديلات بنجاح!');
      setTimeout(() => setMessage(''), 3500);
    } catch (err: any) {
      alert('حدث خطأ أثناء الحفظ: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#141416] p-4 md:p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-bold text-white">إعدادات الموقع والتواصل والـ SEO</h2>
        <p className="text-xs text-gray-400 mt-1">
          تحكم في معلومات المعرض، أرقام الهواتف، الروابط الاجتماعية، والإحصائيات المعروضة.
        </p>
      </div>

      {message && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs text-center font-bold">
          {message}
        </div>
      )}

      {/* شريط التبويبات العلوي */}
      <div className="flex bg-[#141416] p-1.5 rounded-2xl border border-white/10 gap-1">
        <button
          onClick={() => setActiveTab('general')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'general' ? 'bg-[#D4AF37] text-black shadow' : 'text-gray-400 hover:text-white'
          }`}
        >
          الموقع والـ SEO
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'contact' ? 'bg-[#D4AF37] text-black shadow' : 'text-gray-400 hover:text-white'
          }`}
        >
          بيانات التواصل
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'stats' ? 'bg-[#D4AF37] text-black shadow' : 'text-gray-400 hover:text-white'
          }`}
        >
          الأرقام والإحصائيات
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-xs text-[#D4AF37]">جاري التحميل...</div>
      ) : (
        <form onSubmit={handleSave} className="bg-[#141416] border border-white/10 rounded-2xl p-4 md:p-6 space-y-4">
          {/* تبويب إعدادات الموقع والـ SEO */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">اسم المعرض (Site Name)</label>
                <input
                  type="text"
                  required
                  value={settings.site_name}
                  onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">عنوان الموقع للبحث (Meta Title)</label>
                <input
                  type="text"
                  required
                  value={settings.site_title}
                  onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">وصف محركات البحث (Meta Description)</label>
                <textarea
                  rows={2}
                  value={settings.meta_description}
                  onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-2">شعار المعرض (Logo)</label>
                <div className="flex items-center gap-3">
                  {settings.logo_url && (
                    <div className="w-16 h-16 rounded-xl bg-black border border-white/10 flex items-center justify-center p-2">
                      <img src={settings.logo_url} alt="Logo" className="max-w-full max-h-full object-contain" />
                    </div>
                  )}
                  <label className="cursor-pointer flex-1 bg-[#0A0A0A] border border-dashed border-white/20 hover:border-[#D4AF37] px-4 py-3 rounded-xl text-xs text-gray-400 text-center">
                    {uploadingLogo ? 'جاري رفع الشعار...' : 'اضغط لاختيار وتحديث الشعار'}
                    <input type="file" accept="image/*" onChange={handleUploadLogo} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">رابط تضمين خريطة جوجل (Google Maps Embed URL)</label>
                <input
                  type="text"
                  placeholder="https://www.google.com/maps/embed?..."
                  value={settings.google_maps_embed_url || ''}
                  onChange={(e) => setSettings({ ...settings, google_maps_embed_url: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          )}

          {/* تبويب بيانات التواصل */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">رقم الهاتف للاتصال</label>
                  <input
                    type="text"
                    value={contact.phone || ''}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">رقم الواتساب (بدون مسافات أو إشارة +)</label>
                  <input
                    type="text"
                    placeholder="963999999999"
                    value={contact.whatsapp || ''}
                    onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={contact.email || ''}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">أوقات وساعات الدوام</label>
                  <input
                    type="text"
                    value={contact.working_hours || ''}
                    onChange={(e) => setContact({ ...contact, working_hours: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">عنوان المعرض الفعلي</label>
                <input
                  type="text"
                  value={contact.address || ''}
                  onChange={(e) => setContact({ ...contact, address: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">رابط Instagram</label>
                  <input
                    type="text"
                    value={contact.instagram || ''}
                    onChange={(e) => setContact({ ...contact, instagram: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">رابط Facebook</label>
                  <input
                    type="text"
                    value={contact.facebook || ''}
                    onChange={(e) => setContact({ ...contact, facebook: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* تبويب الأرقام والإحصائيات */}
          {activeTab === 'stats' && (
            <div className="space-y-3">
              <p className="text-xs text-gray-400">تعديل الأرقام والشارات التسويقية الظاهرة في الموقع:</p>
              {stats.map((stat, idx) => (
                <div key={stat.id} className="grid grid-cols-2 gap-3 bg-[#0A0A0A] p-3 rounded-xl border border-white/5">
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">الرقم أو النسبة</label>
                    <input
                      type="text"
                      value={stat.metric_value}
                      onChange={(e) => {
                        const updated = [...stats];
                        updated[idx].metric_value = e.target.value;
                        setStats(updated);
                      }}
                      className="w-full px-3 py-1.5 bg-[#141416] border border-white/10 rounded-lg text-xs font-bold text-[#D4AF37] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">الوصف التوضيحي</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const updated = [...stats];
                        updated[idx].label = e.target.value;
                        setStats(updated);
                      }}
                      className="w-full px-3 py-1.5 bg-[#141416] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-4 border-t border-white/5">
            <button
              type="submit"
              disabled={saving || uploadingLogo}
              className="w-full py-3 bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-bold rounded-xl text-xs transition-all disabled:opacity-50"
            >
              {saving ? 'جاري الحفظ...' : 'حفظ الإعدادات الآن'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
            }
            
