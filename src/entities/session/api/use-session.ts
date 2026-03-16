// [ENTITIES/SESSION/API] - use-session
import { useQuery } from '@tanstack/react-query';
import { getSession } from '@/shared/api';
import { useUserStore } from '@/entities/user';
import { useEffect } from 'react';

export function useSession() {
  const setUser = useUserStore((state) => state.setUser);
  const setInitialized = useUserStore((state) => state.setInitialized);

  const query = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data, error } = await getSession();
      if (error) throw error;
      return data.session;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (query.isSuccess) {
      setUser(query.data?.user ?? null, query.data ?? null);
      setInitialized(true);
    } else if (query.isError) {
      setUser(null, null);
      setInitialized(true);
    }
  }, [query.data, query.isSuccess, query.isError, setUser, setInitialized]);

  return query;
}
