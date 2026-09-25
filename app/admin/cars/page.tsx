'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Car {
  id: string;
  name: string;
  brand: string;
  price: number;
  year: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  condition: string;
  description: string;
  features: string[];
  is_featured: boolean;
  is_active: boolean;
  main_image: string;
  car_images?: { id: string; image_url: string }[];
}

export default function CarsManagerPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  // حقول النموذج
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [mileage, setMileage] = useState<number | ''>('');
  const [fuelType, setFuelType] = useState('بنزين');
  const [transmission, setTransmission] = useState('أوتوماتيك');
  const [condition, setCondition] = useState('مستعمل بحالة الوكالة');
  const [description, setDescription] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [mainImageUrl, setMainImageUrl] = useState('');
  const [uploadingMain, setUploadingMain] = useState(false);

  // صور المعرض الإضافية
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // جلب السيارات من Supabase
  const fetchCars = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*, car_images(*)')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setCars(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // فتح نافذة الإضافة
  const handleAddNew = () => {
    setEditingCar(null);
    setName('');
    setBrand('');
    setPrice('');
    setYear(new Date().getFullYear());
    setMileage('');
    setFuelType('بنزين');
    setTransmission('أوتوماتيك');
    setCondition('مستعمل بحالة الوكالة');
    setDescription('');
    setFeaturesInput('');
    setIsFeatured(false);
    setIsActive(true);
    setMainImageUrl('');
    setGalleryImages([]);
    setModalOpen(true);
  };

  // فتح نافذة التعديل
  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setName(car.name);
    setBrand(car.brand);
    setPrice(car.price);
    setYear(car.year);
    setMileage(car.mileage);
    setFuelType(car.fuel_type);
    setTransmission(car.transmission);
    setCondition(car.condition);
    setDescription(car.description || '');
    setFeaturesInput((car.features || []).join(', '));
    setIsFeatured(car.is_featured);
    setIsActive(car.is_active);
    setMainImageUrl(car.main_image);
    setGalleryImages((car.car_images || []).map((img) => img.image_url));
    setModalOpen(true);
  };

  // رفع الصورة الرئيسية
  const handleUploadMainImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingMain(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `main-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('car-media')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('car-media').getPublicUrl(fileName);
      setMainImageUrl(data.publicUrl);
    } catch (error) {
      alert('فشل رفع الصورة، يرجى المحاولة ثانية');
    } finally {
      setUploadingMain(false);
    }
  };

  // رفع صور المعرض الإضافية
  const handleUploadGalleryImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingGallery(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `gallery-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
        const { error } = await supabase.storage.from('car-media').upload(fileName, file);
        if (!error) {
          const { data } = supabase.storage.from('car-media').getPublicUrl(fileName);
          uploadedUrls.push(data.publicUrl);
        }
      }
      setGalleryImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err) {
      alert('حدث خطأ أثناء رفع بعض الصور');
    } finally {
      setUploadingGallery(false);
    }
  };

  // حفظ السيارة (إضافة أو تعديل)
  const handleSaveCar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mainImageUrl) {
      alert('يرجى رفع الصورة الرئيسية للسيارة');
      return;
    }

    setSaving(true);
    const parsedFeatures = featuresInput
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    const carPayload = {
      name,
      brand,
      price: Number(price),
      year: Number(year),
      mileage: Number(mileage),
      fuel_type: fuelType,
      transmission,
      condition,
      description,
      features: parsedFeatures,
      is_featured: isFeatured,
      is_active: isActive,
      main_image: mainImageUrl,
    };

    try {
      let carId = editingCar?.id;

      if (editingCar) {
        // تحديث السيارة
        const { error } = await supabase.from('cars').update(carPayload).eq('id', editingCar.id);
        if (error) throw error;
      } else {
        // إضافة سيارة جديدة
        const { data, error } = await supabase.from('cars').insert([carPayload]).select().single();
        if (error) throw error;
        carId = data.id;
      }

      // مزامنة صور المعرض
      if (carId) {
        await supabase.from('car_images').delete().eq('car_id', carId);
        if (galleryImages.length > 0) {
          const imagesPayload = galleryImages.map((url, idx) => ({
            car_id: carId,
            image_url: url,
            display_order: idx + 1,
          }));
          await supabase.from('car_images').insert(imagesPayload);
        }
      }

      setModalOpen(false);
      await fetchCars();
    } catch (err: any) {
      alert('حدث خطأ أثناء الحفظ: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // حذف سيارة
  const handleDeleteCar = async (id: string) => {
    if (!confirm('هل أنت متأكد من رغبتك بحذف هذه السيارة نهائياً؟')) return;
    try {
      const { error } = await supabase.from('cars').delete().eq('id', id);
      if (error) throw error;
      setCars(cars.filter((c) => c.id !== id));
    } catch (err: any) {
      alert('فشل الحذف: ' + err.message);
    }
  };

  // تبديل حالة الظهور
  const toggleActive = async (car: Car) => {
    const updated = !car.is_active;
    const { error } = await supabase.from('cars').update({ is_active: updated }).eq('id', car.id);
    if (!error) {
      setCars(cars.map((c) => (c.id === car.id ? { ...c, is_active: updated } : c)));
    }
  };

  // تبديل حالة السيارة المميزة
  const toggleFeatured = async (car: Car) => {
    const updated = !car.is_featured;
    const { error } = await supabase.from('cars').update({ is_featured: updated }).eq('id', car.id);
    if (!error) {
      setCars(cars.map((c) => (c.id === car.id ? { ...c, is_featured: updated } : c)));
    }
  };

  return (
    <div className="space-y-6">
      {/* الترويسة وزر الإضافة */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141416] p-4 md:p-6 rounded-2xl border border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white">إدارة أسطول السيارات</h2>
          <p className="text-xs text-gray-400 mt-1">
            إضافة وتعديل السيارات، الصور، الأسعار، والمواصفات
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 transition-all text-sm"
        >
          <span>+</span> إضافة سيارة جديدة
        </button>
      </div>

      {/* عرض قائمة السيارات */}
      {loading ? (
        <div className="text-center py-12 text-[#D4AF37]">جاري تحميل قائمة السيارات...</div>
      ) : cars.length === 0 ? (
        <div className="text-center py-12 bg-[#141416] rounded-2xl border border-white/5 text-gray-400 text-sm">
          لا توجد سيارات مضافة بعد. اضغط على زر "إضافة سيارة جديدة" لإضافة أول سيارة.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map((car) => (
            <div
              key={car.id}
              className={`bg-[#141416] border rounded-2xl overflow-hidden flex flex-col transition-all ${
                !car.is_active ? 'border-white/5 opacity-60' : 'border-white/10 hover:border-[#D4AF37]/50'
              }`}
            >
              {/* صورة السيارة مع شارات الحالة */}
              <div className="relative aspect-[16/10] bg-black/40">
                <img
                  src={car.main_image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1.5">
                  {car.is_featured && (
                    <span className="bg-[#D4AF37] text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                      مميزة ★
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow ${
                      car.is_active ? 'bg-emerald-500/80 text-white' : 'bg-red-500/80 text-white'
                    }`}
                  >
                    {car.is_active ? 'ظاهرة' : 'مخفية'}
                  </span>
                </div>
              </div>

              {/* التفاصيل السريعة */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-gray-400 font-semibold">{car.brand}</div>
                  <h3 className="font-bold text-white text-base mt-0.5">{car.name}</h3>
                  <div className="text-lg font-bold text-[#D4AF37] mt-2">
                    ${Number(car.price).toLocaleString()}
                  </div>
                  <div className="grid grid-cols-3 gap-1 mt-3 pt-3 border-t border-white/5 text-[11px] text-gray-400">
                    <div>سنة: {car.year}</div>
                    <div>كم: {Number(car.mileage).toLocaleString()}</div>
                    <div>{car.fuel_type}</div>
                  </div>
                </div>

                {/* أزرار الإجراءات السريعة */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-1 text-xs">
                  <div className="flex gap-1">
                    <button
                      onClick={() => toggleActive(car)}
                      title="إخفاء/إظهار"
                      className="px-2.5 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-gray-300"
                    >
                      {car.is_active ? 'إخفاء' : 'إظهار'}
                    </button>
                    <button
                      onClick={() => toggleFeatured(car)}
                      title="تمييز"
                      className={`px-2.5 py-1.5 rounded-lg border text-xs ${
                        car.is_featured
                          ? 'border-[#D4AF37]/50 text-[#D4AF37] bg-[#D4AF37]/10'
                          : 'border-white/10 text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      ★
                    </button>
                  </div>

                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(car)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDeleteCar(car.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* نافذة الإضافة والتعديل المخصصة للموبايل والكمبيوتر */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#141416] w-full max-w-2xl max-h-[92vh] sm:rounded-2xl rounded-t-2xl border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
            {/* عنوان النافذة */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#141416] z-10">
              <h3 className="font-bold text-white text-base">
                {editingCar ? 'تعديل بيانات السيارة' : 'إضافة سيارة جديدة'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400"
              >
                ✕
              </button>
            </div>

            {/* النموذج */}
            <form onSubmit={handleSaveCar} className="p-4 md:p-6 overflow-y-auto space-y-4">
              {/* الصورة الرئيسية */}
              <div>
                <label className="block text-xs text-gray-300 font-semibold mb-2">
                  الصورة الرئيسية للسيارة (مطلوبة)
                </label>
                <div className="flex items-center gap-4">
                  {mainImageUrl ? (
                    <div className="relative w-28 h-20 rounded-xl overflow-hidden border border-white/10">
                      <img src={mainImageUrl} alt="preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setMainImageUrl('')}
                        className="absolute top-1 right-1 bg-black/70 text-red-400 p-1 rounded-full text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ) : null}
                  <label className="cursor-pointer bg-[#0A0A0A] border border-dashed border-white/20 hover:border-[#D4AF37] px-4 py-3 rounded-xl text-xs text-gray-400 text-center flex-1">
                    {uploadingMain ? 'جاري الرفع...' : 'اضغط لاختيار صورة من هاتفك'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadMainImage}
                      className="hidden"
                      disabled={uploadingMain}
                    />
                  </label>
                </div>
              </div>

              {/* الاسم والماركة */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-300 mb-1">اسم السيارة والموديل</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: Mercedes-AMG G63"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 mb-1">الماركة (الشركة المصنعة)</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: Mercedes-Benz"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* السعر والسنة والكيلومترات */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-300 mb-1">السعر ($)</label>
                  <input
                    type="number"
                    required
                    placeholder="250000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 mb-1">سنة الصنع</label>
                  <input
                    type="number"
                    required
                    placeholder="2024"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 mb-1">الممشى (كم)</label>
                  <input
                    type="number"
                    required
                    placeholder="15000"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* الوقود وناقل الحركة والحالة */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-300 mb-1">نوع الوقود</label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="بنزين">بنزين</option>
                    <option value="هايبرد">هايبرد</option>
                    <option value="كهرباء بالكامل">كهرباء بالكامل</option>
                    <option value="ديزل">ديزل</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-300 mb-1">ناقل الحركة</label>
                  <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="أوتوماتيك">أوتوماتيك</option>
                    <option value="يدوي">يدوي</option>
                    <option value="ثنائي التعشيق (DCT)">ثنائي التعشيق (DCT)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-300 mb-1">الحالة</label>
                  <input
                    type="text"
                    placeholder="جديدة أصفار / مستعمل وكالة"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* المواصفات والخيارات */}
              <div>
                <label className="block text-xs text-gray-300 mb-1">
                  المواصفات والمميزات (افصل بينها بفاصلة ,)
                </label>
                <input
                  type="text"
                  placeholder="مثال: فتحة سقف بانوراما, تبريد وتسخين مقاعد, رادار تفاعلي, نظام صوتي Burmester"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* الوصف الكامل */}
              <div>
                <label className="block text-xs text-gray-300 mb-1">الوصف التفصيلي</label>
                <textarea
                  rows={3}
                  placeholder="اكتب وصفاً جذاباً للسيارة وحالتها والصيانة..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                ></textarea>
              </div>

              {/* صور المعرض الإضافية */}
              <div>
                <label className="block text-xs text-gray-300 font-semibold mb-2">
                  صور المعرض الإضافية للسيارة
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {galleryImages.map((imgUrl, i) => (
                    <div key={i} className="relative w-20 h-16 rounded-lg overflow-hidden border border-white/10">
                      <img src={imgUrl} alt="gallery" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setGalleryImages(galleryImages.filter((_, idx) => idx !== i))}
                        className="absolute top-0.5 right-0.5 bg-black/80 text-red-400 p-0.5 rounded-full text-[10px]"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <label className="cursor-pointer block bg-[#0A0A0A] border border-dashed border-white/20 hover:border-[#D4AF37] px-4 py-2.5 rounded-xl text-xs text-gray-400 text-center">
                  {uploadingGallery ? 'جاري رفع الصور...' : '+ رفع صور إضافية للمعرض'}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleUploadGalleryImages}
                    className="hidden"
                    disabled={uploadingGallery}
                  />
                </label>
              </div>

              {/* خيارات التمييز والظهور */}
              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 accent-[#D4AF37] rounded"
                  />
                  <span>تمييز السيارة (تظهر في قسم المميزة)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 rounded"
                  />
                  <span>نشر السيارة على الموقع</span>
                </label>
              </div>

              {/* زر الحفظ */}
              <div className="pt-4 border-t border-white/10 flex gap-2">
                <button
                  type="submit"
                  disabled={saving || uploadingMain || uploadingGallery}
                  className="flex-1 py-3 bg-[#D4AF37] hover:bg-[#c49f2e] text-black font-bold rounded-xl text-sm transition-all disabled:opacity-50"
                >
                  {saving ? 'جاري الحفظ...' : editingCar ? 'تحديث بيانات السيارة' : 'حفظ السيارة'}
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-sm"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
