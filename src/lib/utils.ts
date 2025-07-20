import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Make sure to add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file
// Example:
// VITE_SUPABASE_URL=https://your-project.supabase.co
// VITE_SUPABASE_ANON_KEY=your-anon-key
