// [FEATURES/FORGOT-PASSWORD/API] - use-reset-password
import { useMutation } from '@tanstack/react-query';
import { updateUserPassword } from '@/shared/api';

export function useResetPassword() {
  return useMutation({
    mutationFn: async (password: string) => {
      const { data, error } = await updateUserPassword(password);
      if (error) throw error;
      return data;
    },
  });
}
