// [FEATURES/AUTH-BY-EMAIL/API] - use-sign-up
import { useMutation } from '@tanstack/react-query';
import { signupWithEmail } from '@/shared/api';

export interface SignUpArgs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export function useSignUp() {
  return useMutation({
    mutationFn: async ({ email, password, firstName, lastName }: SignUpArgs) => {
      const { data, error } = await signupWithEmail(email, password, firstName, lastName);
      if (error) throw error;
      return { needsOtp: true, ...data };
    },
  });
}
