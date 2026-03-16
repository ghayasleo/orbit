// [FEATURES/VERIFY-OTP/API] - use-verify-otp
import { useMutation } from '@tanstack/react-query';
import { verifyEmailOtp, uploadAvatar, supabase } from '@/shared/api';

export interface VerifyOtpArgs {
  email: string;
  token: string;
  avatarFile?: File | null;
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: async ({ email, token, avatarFile }: VerifyOtpArgs) => {
      const { data, error } = await verifyEmailOtp(email, token);
      if (error) throw error;

      const user = data.user;
      if (user && avatarFile) {
        try {
          const publicUrl = await uploadAvatar(user.id, avatarFile);
          
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ profile_image: publicUrl })
            .eq('id', user.id);

          if (updateError) throw updateError;
        } catch (err) {
          console.error('Error uploading profile image during OTP verification:', err);
        }
      }
      
      return data;
    },
  });
}
