import { useEffect } from 'react';
import { useUserStore } from '@/entities/user';
import { useDashboardLayout } from '../api/use-dashboard-layout';
import { useDashboardStore } from './use-dashboard-store';
import { defaultLayouts } from './default-layouts';
import type { DashboardLayouts } from './types';

export function useInitDashboard() {
  const user = useUserStore((state) => state.user);
  const { data: savedData, isLoading } = useDashboardLayout(user?.id);
  
  const setLayouts = useDashboardStore((state) => state.setLayouts);
  const setHiddenWidgets = useDashboardStore((state) => state.setHiddenWidgets);
  const setCollapsedWidgets = useDashboardStore((state) => state.setCollapsedWidgets);

  useEffect(() => {
    if (savedData && !isLoading) {
      const savedLayouts: DashboardLayouts = {
        lg: (savedData.layout_lg) || defaultLayouts.lg,
        md: (savedData.layout_md) || defaultLayouts.md,
        sm: (savedData.layout_sm) || defaultLayouts.sm,
        xs: (savedData.layout_xs) || defaultLayouts.xs,
      };
      const savedCollapsedIds = savedData.collapsed_widgets || [];
      const hiddenWidgets = savedData.hidden_widgets || [];

      (Object.keys(savedLayouts) as Array<keyof DashboardLayouts>).forEach((bp) => {
        savedLayouts[bp] = savedLayouts[bp].map((l) => ({
          ...l,
          isResizable: !savedCollapsedIds.includes(l.i),
        }));
      });

      setLayouts(savedLayouts);
      setHiddenWidgets(hiddenWidgets);
      setCollapsedWidgets(savedCollapsedIds);
    }
  }, [savedData, isLoading, setLayouts, setHiddenWidgets, setCollapsedWidgets]);

  return { isLoading };
}
