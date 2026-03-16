// [FEATURES/CHANGE-PASSWORD/API] - use-change-password
import { useMutation } from '@tanstack/react-query';
import { updateUserPassword, loginWithEmail } from '@/shared/api';
import { useUserStore } from '@/entities/user';

export interface ChangePasswordArgs {
  currentPassword?: string; // Optional if we just want to reset
  newPassword: string;
}

export function useChangePassword() {
  const user = useUserStore((state) => state.user);

  return useMutation({
    mutationFn: async ({ currentPassword, newPassword }: ChangePasswordArgs) => {
      if (currentPassword && user?.email) {
        // Re-authenticate with current password
        const { error: signInErr } = await loginWithEmail(user.email, currentPassword);
        if (signInErr) throw new Error('Current password is incorrect');
      }

      const { data, error } = await updateUserPassword(newPassword);
      if (error) throw error;
      return data;
    },
  });
}
