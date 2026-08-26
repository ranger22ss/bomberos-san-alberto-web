import { createClient } from '@supabase/supabase-js';

// Estos valores son públicos y están protegidos por las reglas RLS de Supabase.
// Las variables de entorno permiten reemplazarlos sin modificar el código.
const supabaseUrl =
  process.env.REACT_APP_SUPABASE_URL ||
  'https://zstebalplfztlwnezqvp.supabase.co';
const supabaseAnonKey =
  process.env.REACT_APP_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzdGViYWxwbGZ6dGx3bmV6cXZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNzQ2MzgsImV4cCI6MjA3NDc1MDYzOH0.HNHGu-dbX0MN79ykgYmoF7x-tJiD__aA0hz38SwTEQs';

export const supabaseConfigurado = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = supabaseConfigurado
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    })
  : null;
