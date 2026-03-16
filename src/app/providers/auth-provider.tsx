import { useEffect } from "react";
import { onAuthStateChange } from "@/shared/api";
import { useUserStore, useCurrentUser } from "@/entities/user";
import { useSession } from "@/entities/session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Trigger initial session fetch so query runs
  useSession();
  
  // Trigger profile fetch when user changes
  useCurrentUser();

  const setUser = useUserStore((state) => state.setUser);
  const setInitialized = useUserStore((state) => state.setInitialized);

  useEffect(() => {
    const {
      data: { subscription },
    } = onAuthStateChange(async (event, session) => {
      if (
        event === "SIGNED_IN" ||
        event === "TOKEN_REFRESHED" ||
        event === "USER_UPDATED"
      ) {
        setUser(session?.user ?? null, session ?? null);
      } else if (event === "SIGNED_OUT") {
        setUser(null, null);
      }
      // Ensure we mark init after an event if it was somehow skipped, 
      // but useSession inside already does that mostly.
      setInitialized(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setInitialized]);

  return <>{children}</>;
}
