// [SHARED/API] - Pure async dashboard layout functions (no React, no hooks)
import { supabase } from './client';

export async function fetchDashboardLayout(userId: string) {
  return supabase
    .from('dashboard_layouts')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
}

export async function saveDashboardLayout(
  userId: string,
  payload: {
    layout_lg: unknown[];
    layout_md: unknown[];
    layout_sm: unknown[];
    layout_xs: unknown[];
    hidden_widgets: string[];
    collapsed_widgets: string[];
  }
) {
  const record = {
    user_id: userId,
    ...payload,
    updated_at: new Date().toISOString(),
  };

  const { data: existing } = await supabase
    .from('dashboard_layouts')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();

  if (existing) {
    return supabase
      .from('dashboard_layouts')
      .update(record)
      .eq('user_id', userId);
  }
  return supabase.from('dashboard_layouts').insert(record);
}

export async function deleteDashboardLayout(userId: string) {
  return supabase.from('dashboard_layouts').delete().eq('user_id', userId);
}
