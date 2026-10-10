import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createBrowserClient(
  supabaseUrl || 'https://missing-supabase-configuration.invalid',
  supabaseAnonKey || 'missing-supabase-anon-key',
)
