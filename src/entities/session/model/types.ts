// [ENTITIES/SESSION] - Auth session types
import type { Session, User } from '@supabase/supabase-js';

export type { Session, User };

export interface AuthState {
  user: User | null;
  session: Session | null;
  initialized: boolean;
}
