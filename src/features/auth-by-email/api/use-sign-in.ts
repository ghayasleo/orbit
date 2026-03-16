// [FEATURES/AUTH-BY-EMAIL/API] - use-sign-in
import { useMutation } from '@tanstack/react-query';
import { loginWithEmail, resendSignupOtp } from '@/shared/api';

export function useSignIn() {
  return useMutation({
    mutationFn: async ({ email, password }: Record<'email' | 'password', string>) => {
      const { data, error } = await loginWithEmail(email, password);
      if (error) {
        if (error.message.toLowerCase().includes('email not confirmed')) {
          await resendSignupOtp(email);
          return { needsOtp: true };
        }
        throw error;
      }
      return { needsOtp: false, ...data };
    },
  });
}
