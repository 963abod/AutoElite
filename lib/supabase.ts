import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ تنبيه: مفاتيح Supabase غير معرّفة في ملف .env");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
