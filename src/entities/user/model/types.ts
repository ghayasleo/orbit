// [ENTITIES/USER] - Profile type
export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  profile_image: string | null;
  created_at: string;
  updated_at: string;
}
