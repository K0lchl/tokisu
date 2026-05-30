import { createClient } from '@supabase/supabase-js';

// Vite環境では import.meta.env を使用します
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || import.meta.env?.NEXT_PUBLIC_SUPABASE_URL || 'https://frypwcrixvyiunrzouzf.supabase.co';
const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || import.meta.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase environment variables are missing.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
