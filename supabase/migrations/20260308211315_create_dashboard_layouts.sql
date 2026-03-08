CREATE TABLE IF NOT EXISTS public.dashboard_layouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  layout_lg JSONB,
  layout_md JSONB,
  layout_sm JSONB,
  layout_xs JSONB,
  hidden_widgets JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT dashboard_layouts_user_id_key UNIQUE (user_id)
);

CREATE INDEX IF NOT EXISTS dashboard_layouts_user_id_idx ON public.dashboard_layouts (user_id);

ALTER TABLE public.dashboard_layouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select their own dashboard layout"
  ON public.dashboard_layouts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert and update their own dashboard layout"
  ON public.dashboard_layouts FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_dashboard_layouts_updated_at ON public.dashboard_layouts;
CREATE TRIGGER update_dashboard_layouts_updated_at
  BEFORE UPDATE ON public.dashboard_layouts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
