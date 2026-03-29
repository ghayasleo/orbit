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
  const isHydrated = useDashboardStore((state) => state.isHydrated);
  const setIsHydrated = useDashboardStore((state) => state.setIsHydrated);
  const setIsLoading = useDashboardStore((state) => state.setIsLoading);

  useEffect(() => {
    // Background sync of loading status
    setIsLoading(isLoading);

    if (!isLoading && savedData) {
      // Apply layouts immediately if data is ready
      const savedLayouts: DashboardLayouts = {
        lg: savedData.layout_lg || defaultLayouts.lg,
        md: savedData.layout_md || defaultLayouts.md,
        sm: savedData.layout_sm || defaultLayouts.sm,
        xs: savedData.layout_xs || defaultLayouts.xs,
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

      // If already hydrated (cached from previous visit in same session), just finish
      if (isHydrated) return;

      // First time hydration in this session: Wait 1s for stable layout
      const timer = setTimeout(() => {
        setIsHydrated(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [savedData, isLoading, isHydrated, setLayouts, setHiddenWidgets, setCollapsedWidgets, setIsHydrated, setIsLoading]);

  return { isLoading };
}
