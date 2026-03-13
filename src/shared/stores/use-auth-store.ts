import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  profile_image: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthState {
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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  profile: null,
  initialized: false,
  setUser: (user, session) => set({ user, session }),
  setProfile: (profile) => set({ profile }),
  fetchProfile: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      if (error) throw error;
      set({ profile: data ?? null });
    } catch (error) {
      console.error("Error fetching profile:", error);
      set({ profile: null });
    }
  },
  initialize: async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      const user = session?.user ?? null;

      // Fetch profile in parallel with setting user so we can batch into one set()
      const profileData = user
        ? await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle()
            .then(({ data }) => data ?? null)
        : null;

      // Single set() → single re-render instead of two
      set({ user, session, profile: profileData, initialized: true });
    } catch (error) {
      console.error("Error getting session:", error);
      set({ user: null, session: null, initialized: true });
    }

    supabase.auth.onAuthStateChange(async (event, session) => {
      // INITIAL_SESSION fires immediately on subscription — getSession() already
      // handled this above, so skip it to avoid a duplicate render + API call.
      if (event === "INITIAL_SESSION") return;

      const user = session?.user ?? null;
      if (user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();
        set({ user, session, profile: profileData ?? null });
      } else {
        set({ user: null, session: null, profile: null });
      }
    });
  },
  signOut: async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("SignOut error:", err);
    } finally {
      set({ user: null, session: null, profile: null });
    }
  },
}));
