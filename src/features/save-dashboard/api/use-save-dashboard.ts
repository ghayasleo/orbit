import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveDashboardLayout } from '@/shared/api';
import { useUserStore } from '@/entities/user';
import { useDashboardStore } from '@/entities/dashboard';
import { toast } from 'sonner';

export function useSaveDashboard() {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  const layouts = useDashboardStore((state) => state.layouts);
  const hiddenWidgets = useDashboardStore((state) => state.hiddenWidgets);
  const collapsedWidgets = useDashboardStore((state) => state.collapsedWidgets);

  return useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User not found');
      
      const payload = {
        layout_lg: layouts.lg as unknown[],
        layout_md: layouts.md as unknown[],
        layout_sm: layouts.sm as unknown[],
        layout_xs: layouts.xs as unknown[],
        hidden_widgets: hiddenWidgets,
        collapsed_widgets: collapsedWidgets,
      };

      const { error } = await saveDashboardLayout(user.id, payload);
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      toast.success('Dashboard layout saved');
      queryClient.invalidateQueries({ queryKey: ['dashboard_layout'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to save dashboard');
    },
  });
}
