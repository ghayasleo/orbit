// [SHARED/API] - Pure async profile functions (no React, no hooks)
import { supabase } from './client';

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  profile_image: string | null;
  created_at: string;
  updated_at: string;
}

export async function fetchProfile(userId: string) {
  return supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
}

export async function updateProfile(
  userId: string,
  data: {
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string | null;
  }
) {
  return supabase.from('profiles').upsert({ id: userId, ...data });
}

export async function uploadAvatar(userId: string, file: File) {
  const ext = file.name.split('.').pop();
  const filePath = `${userId}/${userId}-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
  return data.publicUrl;
}
