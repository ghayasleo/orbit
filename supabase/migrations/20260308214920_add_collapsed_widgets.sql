-- Add collapsed_widgets column to dashboard_layouts
ALTER TABLE public.dashboard_layouts 
ADD COLUMN IF NOT EXISTS collapsed_widgets JSONB DEFAULT '[]'::jsonb;

-- Ensure RLS policies are up to date (already covered by ALL/FOR ALL, but good to be explicit)
-- No changes needed to policies as they use user_id comparison.
