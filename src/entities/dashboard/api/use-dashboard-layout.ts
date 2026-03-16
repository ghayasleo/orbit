import { useQuery } from '@tanstack/react-query';
import { fetchDashboardLayout } from '@/shared/api';
import { QUERY_KEYS } from '@/shared/config';

export function useDashboardLayout(userId: string | undefined) {
  return useQuery({
    queryKey: QUERY_KEYS.dashboardLayout(userId),
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await fetchDashboardLayout(userId);
      if (error && error.code !== 'PGRST116') {
        console.error('Error loading layout:', error);
        return null;
      }
      return data;
    },
    enabled: !!userId,
    staleTime: Infinity,
  });
}
