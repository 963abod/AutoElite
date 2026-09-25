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
  refreshData: () => Promise<void>;
}

const defaultData: SiteData = {
  settings: null,
  theme: null,
  sections: {},
  statistics: [],
  contact: null,
  heroImages: [],
  cars: [],
  loading: true,
  refreshData: async () => {},
};

const SiteContext = createContext<SiteData>(defaultData);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(defaultData);

  const fetchAllData = async () => {
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

      const sectionsMap = (sectionsData || []).reduce((acc: any, sec: any) => {
        acc[sec.id] = sec;
        return acc;
      }, {});

      setData({
        settings: settings || null,
        theme: theme || null,
        sections: sectionsMap,
        statistics: stats || [],
        contact: contact || null,
        heroImages: heroImages || [],
        cars: cars || [],
        loading: false,
        refreshData: fetchAllData,
      });
    } catch (err) {
      console.error('Error loading CMS data:', err);
      setData((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return <SiteContext.Provider value={data}>{children}</SiteContext.Provider>;
};

export const useSiteData = () => useContext(SiteContext);
