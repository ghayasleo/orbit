// [ENTITIES/USER/API] - use-current-user
import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '@/shared/api';
import { useUserStore } from '../model/use-user-store';
import { useEffect } from 'react';

export function useCurrentUser() {
  const user = useUserStore((state) => state.user);
  const setProfile = useUserStore((state) => state.setProfile);

  const query = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await fetchProfile(user.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (query.isSuccess) {
      setProfile(query.data ?? null);
    } else if (query.isError) {
      setProfile(null);
    }
  }, [query.data, query.isSuccess, query.isError, setProfile]);

  return query;
}
