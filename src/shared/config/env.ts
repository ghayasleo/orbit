// [SHARED/CONFIG] - Typed environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    'Missing Supabase environment variables. ' +
      'Ensure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are set in your .env file.'
  );
}

export const env = {
  SUPABASE_URL: supabaseUrl as string,
  SUPABASE_PUBLISHABLE_KEY: supabasePublishableKey as string,
  MODE: import.meta.env.MODE as string,
  IS_DEV: import.meta.env.MODE === 'development',
} as const;
