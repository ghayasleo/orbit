// [ENTITIES/USER] - User/auth Zustand store (auth + profile state)
import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';
import type { Profile } from './types';

interface UserState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  initialized: boolean;
  setUser: (user: User | null, session: Session | null) => void;
  setProfile: (profile: Profile | null) => void;
  setInitialized: (initialized: boolean) => void;
  clearSession: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  session: null,
  profile: null,
  initialized: false,
  setUser: (user, session) => set({ user, session }),
  setProfile: (profile) => set({ profile }),
  setInitialized: (initialized) => set({ initialized }),
  clearSession: () => set({ user: null, session: null, profile: null, initialized: true }),
}));
