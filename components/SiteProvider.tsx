'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface SiteData {
  settings: any;
  theme: any;
  sections: Record<string, any>;
  statistics: any[];
  contact: any;
  heroImages: any[];
  cars: any[];
  loading: boolean;
}

const defaultData: SiteData = {
  settings: {
    site_name: 'Apex Cars',
    site_title: 'Apex Cars | Luxury & Exotic Dealership',
    meta_description: 'معرض السيارات الفاخرة الرائد',
  },
  theme: {
    primary_color: '#D4AF37',
    secondary_color: '#1A1A1A',
    background_color: '#0A0A0A',
    text_color: '#FFFFFF',
    accent_color: '#F59E0B',
    button_color: '#D4AF37',
  },
  sections: {},
  statistics: [],
  contact: {
    phone: '+963 999 999 999',
    whatsapp: '963999999999',
    email: 'info@apexcars.com',
  },
  heroImages: [],
  cars: [],
  loading: true,
};

const SiteContext = createContext<SiteData>(defaultData);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(defaultData);

  // تطبيق الألوان الديناميكية على صفحة الويب
  const applyTheme = (theme: any) => {
    if (!theme) return;
    const root = document.documentElement;
    if (theme.primary_color) root.style.setProperty('--color-primary', theme.primary_color);
    if (theme.secondary_color) root.style.setProperty('--color-secondary', theme.secondary_color);
    if (theme.background_color) {
      root.style.setProperty('--color-bg', theme.background_color);
      document.body.style.backgroundColor = theme.background_color;
    }
    if (theme.text_color) {
      root.style.setProperty('--color-text', theme.text_color);
      document.body.style.color = theme.text_color;
    }
    if (theme.accent_color) root.style.setProperty('--color-accent', theme.accent_color);
    if (theme.button_color) root.style.setProperty('--color-button', theme.button_color);
  };

  useEffect(() => {
    async function fetchAllData() {
      try {
        const [
          { data: settings },
          { data: theme },
          { data: sectionsData },
          { data: stats },
          { data: contact },
          { data: heroImages },
          { data: cars }
        ] = await Promise.all([
          supabase.from('site_settings').select('*').limit(1).single(),
          supabase.from('theme_settings').select('*').limit(1).single(),
          supabase.from('site_sections').select('*'),
          supabase.from('statistics').select('*').eq('is_active', true).order('display_order', { ascending: true }),
          supabase.from('contact_info').select('*').limit(1).single(),
          supabase.from('hero_images').select('*').eq('is_active', true).order('display_order', { ascending: true }),
          supabase.from('cars').select('*, car_images(*)').eq('is_active', true).order('created_at', { ascending: false })
        ]);

        if (theme) applyTheme(theme);

        const sectionsMap = (sectionsData || []).reduce((acc: any, sec: any) => {
          acc[sec.id] = sec;
          return acc;
        }, {});

        setData({
          settings: settings || defaultData.settings,
          theme: theme || defaultData.theme,
          sections: sectionsMap,
          statistics: stats || [],
          contact: contact || defaultData.contact,
          heroImages: heroImages || [],
          cars: cars || [],
          loading: false,
        });
      } catch (err) {
        console.error('Error loading CMS data:', err);
        setData((prev) => ({ ...prev, loading: false }));
      }
    }

    fetchAllData();
  }, []);

  return <SiteContext.Provider value={data}>{children}</SiteContext.Provider>;
};

export const useSiteData = () => useContext(SiteContext);
