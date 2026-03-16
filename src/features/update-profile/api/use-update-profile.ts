// [FEATURES/UPDATE-PROFILE/API] - use-update-profile
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '@/shared/api';
import { useUserStore } from '@/entities/user';

export interface UpdateProfileArgs {
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string | null;
}

export function useUpdateProfile() {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileArgs) => {
      if (!user?.id) throw new Error('Not authenticated');
      const { error } = await updateProfile(user.id, data);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
  });
}
