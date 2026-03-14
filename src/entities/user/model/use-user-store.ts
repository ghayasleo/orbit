// [ENTITIES/USER] - User/auth Zustand store (auth + profile state)
import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';
import {
  getSession,
  onAuthStateChange,
  signOut as authSignOut,
} from '@/shared/api';
import { fetchProfile as fetchProfileService } from '@/shared/api';
import type { Profile } from './types';

interface UserState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  initialized: boolean;
  setUser: (user: User | null, session: Session | null) => void;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
  fetchProfile: (userId: string) => Promise<void>;
  setProfile: (profile: Profile | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  session: null,
  profile: null,
  initialized: false,
  setUser: (user, session) => set({ user, session }),
  setProfile: (profile) => set({ profile }),
  fetchProfile: async (userId: string) => {
    try {
      const { data, error } = await fetchProfileService(userId);
      if (error) throw error;
      set({ profile: (data as Profile) ?? null });
    } catch (error) {
      console.error('Error fetching profile:', error);
      set({ profile: null });
    }
  },
  initialize: async () => {
    try {
      const {
        data: { session },
        error,
      } = await getSession();
      if (error) throw error;
      const user = session?.user ?? null;

      const profileData = user
        ? await fetchProfileService(user.id).then(
            ({ data }) => (data as Profile) ?? null
          )
        : null;

      set({ user, session, profile: profileData, initialized: true });
    } catch (error) {
      console.error('Error getting session:', error);
      set({ user: null, session: null, initialized: true });
    }

    onAuthStateChange(async (event, session) => {
      if (event === 'INITIAL_SESSION') return;

      const user = session?.user ?? null;
      if (user) {
        const { data: profileData } = await fetchProfileService(user.id);
        set({ user, session, profile: (profileData as Profile) ?? null });
      } else {
        set({ user: null, session: null, profile: null });
      }
    });
  },
  signOut: async () => {
    try {
      await authSignOut();
    } catch (err) {
      console.error('SignOut error:', err);
    } finally {
      set({ user: null, session: null, profile: null });
    }
  },
}));
