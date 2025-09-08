import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface CraftRecord {
  id: string;
  title: string;
  image_url: string;
  craft_type?: string;
  user_input: string;
  word_count: number;
  created_at: string;
  user_id?: string;
}

export interface CollectionStats {
  total_crafts: number;
  total_words: number;
  crafts_by_type: { [key: string]: number };
}
