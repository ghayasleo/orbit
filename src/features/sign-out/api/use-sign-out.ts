// [FEATURES/SIGN-OUT/API] - use-sign-out
import { useMutation } from '@tanstack/react-query';
import { signOut } from '@/shared/api';
import { useUserStore } from '@/entities/user';

export function useSignOut() {
  const clearSession = useUserStore((state) => state.clearSession);

  return useMutation({
    mutationFn: async () => {
      const { error } = await signOut();
      if (error) throw error;
    },
    onSettled: () => {
      clearSession();
    },
  });
}
