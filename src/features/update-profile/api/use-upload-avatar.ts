// [FEATURES/UPDATE-PROFILE/API] - use-upload-avatar
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadAvatar, supabase } from '@/shared/api';
import { useUserStore } from '@/entities/user';

export function useUploadAvatar() {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      if (!user?.id) throw new Error('Not authenticated');
      const publicUrl = await uploadAvatar(user.id, file);

      const { error } = await supabase
        .from('profiles')
        .update({ profile_image: publicUrl })
        .eq('id', user.id);

      if (error) throw error;
      return publicUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
  });
}
