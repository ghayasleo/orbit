// [FEATURES/FORGOT-PASSWORD/API] - use-request-reset
import { useMutation } from '@tanstack/react-query';
import { sendPasswordResetEmail } from '@/shared/api';

export function useRequestReset() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await sendPasswordResetEmail(
        email,
        `${window.location.origin}/reset-password`
      );
      if (error) throw error;
      return data;
    },
  });
}
