-- Create a new storage bucket 'avatars'
insert into storage.buckets (id, name, public) 
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "Public Access" 
on storage.objects for select 
using ( bucket_id = 'avatars' );

create policy "Authenticated Users can upload"
on storage.objects for insert 
with check ( bucket_id = 'avatars' and auth.role() = 'authenticated' );

create policy "Users can update their own avatars"
on storage.objects for update
using ( bucket_id = 'avatars' and auth.uid() = owner )
with check ( bucket_id = 'avatars' and auth.role() = 'authenticated' );

-- profiles table
create table public.profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  first_name text,
  last_name text,
  email text,
  profile_image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

create policy "Users can delete own profile." on public.profiles
  for delete using (auth.uid() = id);

-- Trigger for updated_at
create extension if not exists moddatetime schema extensions;

create trigger handle_updated_at before update on public.profiles 
  for each row execute procedure moddatetime (updated_at);

-- Trigger to sync auth.users to public.profiles on signup/update
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, first_name, last_name, profile_image)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'profile_image'
  )
  on conflict (id) do update set
    email = excluded.email,
    first_name = excluded.first_name,
    last_name = excluded.last_name,
    profile_image = excluded.profile_image;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created_or_updated
  after insert or update on auth.users
  for each row execute procedure public.handle_new_user();

-- Trigger to sync public.profiles to auth.users on update
create or replace function public.handle_profile_update()
returns trigger as $$
begin
  update auth.users
  set raw_user_meta_data = jsonb_build_object(
    'first_name', new.first_name,
    'last_name', new.last_name,
    'profile_image', new.profile_image
  )
  where id = new.id;
  return new;
end;
$$ language plpgsql security definer;

-- Only trigger this when the profile is actually updated to prevent infinite loops (if the auth trigger updates profile)
-- although the `on conflict do update` in `handle_new_user` will only touch rows if there's a difference, 
-- it's safer to ensure we don't end up in a trigger loop.
create trigger on_profile_updated
  after update on public.profiles
  for each row 
  when (
    old.first_name is distinct from new.first_name or 
    old.last_name is distinct from new.last_name or 
    old.profile_image is distinct from new.profile_image
  )
  execute procedure public.handle_profile_update();
