// [ENTITIES/DASHBOARD] - Dashboard layout Zustand store + TanStack Query hooks
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchDashboardLayout,
  saveDashboardLayout,
  deleteDashboardLayout,
} from '@/shared/api';
import { QUERY_KEYS } from '@/shared/config';
import { useUserStore } from '@/entities/user';
import { toast } from 'sonner';
import type { Layout, DashboardLayouts } from './types';

const defaultLayouts: DashboardLayouts = {
  lg: [
    { i: 'hero', x: 0, y: 0, w: 12, h: 2, static: true },
    { i: 'habits', x: 0, y: 2, w: 8, h: 2, minW: 3, minH: 2 },
    { i: 'priority-tasks', x: 8, y: 2, w: 4, h: 6, minW: 3, minH: 2 },
    { i: 'budget', x: 0, y: 6, w: 4, h: 4, minW: 3, minH: 2 },
    { i: 'active-goals', x: 4, y: 6, w: 4, h: 4, minW: 3, minH: 2 },
    { i: 'recent-expenses', x: 0, y: 10, w: 8, h: 4, minW: 3, minH: 2 },
    { i: 'upcoming-due', x: 8, y: 10, w: 4, h: 4, minW: 3, minH: 2 },
  ],
  md: [
    { i: 'hero', x: 0, y: 0, w: 10, h: 2, static: true },
    { i: 'habits', x: 0, y: 2, w: 6, h: 2, minW: 3, minH: 2 },
    { i: 'priority-tasks', x: 6, y: 2, w: 4, h: 6, minW: 3, minH: 2 },
    { i: 'budget', x: 0, y: 6, w: 3, h: 4, minW: 3, minH: 2 },
    { i: 'active-goals', x: 3, y: 6, w: 3, h: 4, minW: 3, minH: 2 },
    { i: 'recent-expenses', x: 0, y: 10, w: 6, h: 4, minW: 3, minH: 2 },
    { i: 'upcoming-due', x: 6, y: 10, w: 4, h: 4, minW: 3, minH: 2 },
  ],
  sm: [
    { i: 'hero', x: 0, y: 0, w: 6, h: 2, static: true },
    { i: 'habits', x: 0, y: 2, w: 6, h: 2, minW: 3, minH: 2 },
    { i: 'priority-tasks', x: 0, y: 6, w: 6, h: 6, minW: 3, minH: 2 },
    { i: 'budget', x: 0, y: 12, w: 3, h: 4, minW: 3, minH: 2 },
    { i: 'active-goals', x: 3, y: 12, w: 3, h: 4, minW: 3, minH: 2 },
    { i: 'recent-expenses', x: 0, y: 16, w: 6, h: 4, minW: 3, minH: 2 },
    { i: 'upcoming-due', x: 0, y: 20, w: 6, h: 4, minW: 3, minH: 2 },
  ],
  xs: [
    { i: 'hero', x: 0, y: 0, w: 4, h: 2, static: true },
    { i: 'habits', x: 0, y: 2, w: 4, h: 2, minW: 3, minH: 2 },
    { i: 'priority-tasks', x: 0, y: 6, w: 4, h: 6, minW: 3, minH: 2 },
    { i: 'budget', x: 0, y: 12, w: 4, h: 4, minW: 3, minH: 2 },
    { i: 'active-goals', x: 0, y: 16, w: 4, h: 4, minW: 3, minH: 2 },
    { i: 'recent-expenses', x: 0, y: 20, w: 4, h: 4, minW: 3, minH: 2 },
    { i: 'upcoming-due', x: 0, y: 24, w: 4, h: 4, minW: 3, minH: 2 },
  ],
};

interface DashboardContextType {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  layouts: DashboardLayouts;
  setLayouts: React.Dispatch<React.SetStateAction<DashboardLayouts>>;
  hiddenWidgets: string[];
  collapsedWidgets: string[];
  addWidget: (id: string) => void;
  removeWidget: (id: string) => void;
  toggleCollapse: (id: string) => void;
  toggleTempCollapse: (id: string) => void;
  saveLayout: () => void;
  resetToDefault: () => void;
  cancelChanges: () => void;
  isLoading: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const [isEditMode, setIsEditMode] = useState(false);
  const [layouts, setLayouts] = useState<DashboardLayouts>(defaultLayouts);
  const [hiddenWidgets, setHiddenWidgets] = useState<string[]>([]);
  const [collapsedWidgets, setCollapsedWidgets] = useState<string[]>([]);

  const { data: savedData, isLoading } = useQuery({
    queryKey: QUERY_KEYS.dashboardLayout(user?.id),
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await fetchDashboardLayout(user.id);
      if (error && error.code !== 'PGRST116') {
        console.error('Error loading layout:', error);
        return null;
      }
      return data;
    },
    enabled: !!user?.id,
    staleTime: Infinity,
  });

  const savedLayouts: DashboardLayouts = {
    lg: (savedData?.layout_lg as Layout[]) || defaultLayouts.lg,
    md: (savedData?.layout_md as Layout[]) || defaultLayouts.md,
    sm: (savedData?.layout_sm as Layout[]) || defaultLayouts.sm,
    xs: (savedData?.layout_xs as Layout[]) || defaultLayouts.xs,
  };
  const savedCollapsedIds = savedData?.collapsed_widgets || [];
  const savedHiddenWidgets = savedData?.hidden_widgets || [];

  useEffect(() => {
    if (savedData) {
      (Object.keys(savedLayouts) as Array<keyof DashboardLayouts>).forEach(
        (bp) => {
          savedLayouts[bp] = savedLayouts[bp].map((l) => ({
            ...l,
            isResizable: !savedCollapsedIds.includes(l.i),
          }));
        }
      );
      setLayouts(savedLayouts);
      setHiddenWidgets(savedData.hidden_widgets || []);
      setCollapsedWidgets(savedCollapsedIds);
    }
  }, [savedData, isLoading]);

  const saveMutation = useMutation({
    mutationFn: async ({
      pl,
      ph,
      pcl,
    }: {
      pl: DashboardLayouts;
      ph: string[];
      pcl: string[];
    }) => {
      if (!user?.id) throw new Error('No user ID found for saving layout');
      const { error } = await saveDashboardLayout(user.id, {
        layout_lg: pl.lg,
        layout_md: pl.md,
        layout_sm: pl.sm,
        layout_xs: pl.xs,
        hidden_widgets: ph,
        collapsed_widgets: pcl,
      });
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.dashboardLayout(user?.id),
      });
    },
    onError: (err) => {
      console.error(err);
      toast.error('Failed to save layout.', {
        description: 'Your changes may not persist.',
        action: {
          label: 'Retry',
          onClick: () =>
            saveMutation.mutate({
              pl: layouts,
              ph: hiddenWidgets,
              pcl: collapsedWidgets,
            }),
        },
      });
    },
  });

  const cancelChanges = useCallback(() => {
    setLayouts(savedLayouts);
    setHiddenWidgets(savedHiddenWidgets);
    setCollapsedWidgets(savedCollapsedIds);
  }, [savedLayouts, savedHiddenWidgets, savedCollapsedIds]);

  const saveLayout = useCallback(() => {
    const cleanLayouts = { ...layouts };
    (Object.keys(cleanLayouts) as Array<keyof DashboardLayouts>).forEach(
      (bp) => {
        cleanLayouts[bp] = cleanLayouts[bp].map((l) => {
          if (l.isOpen === false) {
            return {
              ...l,
              h: l.restoreH || 4,
              minH: 2,
              isResizable: true,
              isOpen: true,
            };
          }
          return l;
        });
      }
    );

    saveMutation.mutate({
      pl: cleanLayouts,
      ph: hiddenWidgets,
      pcl: collapsedWidgets,
    });
  }, [layouts, hiddenWidgets, collapsedWidgets, saveMutation]);

  const removeWidget = useCallback((id: string) => {
    if (id === 'hero') return;
    setHiddenWidgets((prev) => [...new Set([...prev, id])]);
    setLayouts((prev) => ({
      lg: prev.lg.filter((w) => w.i !== id),
      md: prev.md.filter((w) => w.i !== id),
      sm: prev.sm.filter((w) => w.i !== id),
      xs: prev.xs.filter((w) => w.i !== id),
    }));
  }, []);

  const addWidget = useCallback((id: string) => {
    setHiddenWidgets((prev) => prev.filter((wId) => wId !== id));
    setLayouts((prev) => {
      const newY = Math.max(...prev.lg.map((l) => l.y + l.h), 0);
      const newLg = { i: id, x: 0, y: newY, w: 4, h: 4, minW: 3, minH: 2 };
      const newMd = { i: id, x: 0, y: newY, w: 4, h: 4, minW: 3, minH: 2 };
      const newSm = { i: id, x: 0, y: newY, w: 3, h: 4, minW: 3, minH: 2 };
      const newXs = { i: id, x: 0, y: newY, w: 4, h: 4, minW: 3, minH: 2 };

      if (id === 'habits' || id === 'subscriptions') {
        newLg.w = id === 'habits' ? 8 : 4;
        newLg.h = id === 'habits' ? 2 : 4;
      } else if (id === 'budget' || id === 'loans') {
        newLg.w = 4;
        newLg.h = 4;
      } else if (
        [
          'active-goals',
          'reminders',
          'priority-tasks',
          'recent-expenses',
          'upcoming-due',
          'events',
          'notes',
        ].includes(id)
      ) {
        newLg.w =
          id === 'recent-expenses' || id === 'priority-tasks' ? 8 : 4;
        newLg.h = 4;
      } else if (id === 'ai-chat') {
        newLg.w = 6;
        newLg.h = 5;
      }

      return {
        lg: [...prev.lg, newLg],
        md: [...prev.md, newMd],
        sm: [...prev.sm, newSm],
        xs: [...prev.xs, newXs],
      };
    });
  }, []);

  const toggleCollapse = useCallback(
    (id: string) => {
      const isCollapsing = !collapsedWidgets.includes(id);
      setCollapsedWidgets((prev) =>
        isCollapsing ? [...prev, id] : prev.filter((wId) => wId !== id)
      );

      setLayouts((prev) => {
        const newLayouts = { ...prev };
        (Object.keys(newLayouts) as Array<keyof DashboardLayouts>).forEach(
          (bp) => {
            newLayouts[bp] = newLayouts[bp].map((l) => {
              if (l.i === id) {
                const { isOpen, ...cleanLayout } = l;
                if (isCollapsing) {
                  return {
                    ...cleanLayout,
                    h: 1,
                    minH: 1,
                    isResizable: false,
                    restoreH: l.h !== 1 ? l.h : l.restoreH,
                  };
                }
                return {
                  ...cleanLayout,
                  h: l.restoreH || 4,
                  minH: 2,
                  isResizable: true,
                };
              }
              return l;
            });
          }
        );
        return newLayouts;
      });
    },
    [collapsedWidgets]
  );

  const toggleTempCollapse = useCallback(
    (id: string) => {
      setLayouts((prev) => {
        const newLayouts = { ...prev };
        (Object.keys(newLayouts) as Array<keyof DashboardLayouts>).forEach(
          (bp) => {
            newLayouts[bp] = newLayouts[bp].map((l) => {
              if (l.i === id) {
                const isVisuallyCollapsed =
                  l.isOpen === false ||
                  (l.isOpen === undefined && collapsedWidgets.includes(id));
                const isCollapsing = !isVisuallyCollapsed;

                if (isCollapsing) {
                  return {
                    ...l,
                    h: 1,
                    minH: 1,
                    isResizable: false,
                    restoreH: l.h !== 1 ? l.h : l.restoreH,
                    isOpen: false,
                  };
                }
                return {
                  ...l,
                  h: l.restoreH || 4,
                  minH: 2,
                  isResizable: true,
                  isOpen: true,
                };
              }
              return l;
            });
          }
        );
        return newLayouts;
      });
    },
    [collapsedWidgets]
  );

  const resetMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id) return;
      await deleteDashboardLayout(user.id);
    },
    onSuccess: () => {
      setLayouts(defaultLayouts);
      setHiddenWidgets([]);
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.dashboardLayout(user?.id),
      });
    },
  });

  const resetToDefault = useCallback(() => {
    resetMutation.mutate();
  }, [resetMutation]);

  const value = useMemo(
    () => ({
      isEditMode,
      setIsEditMode,
      layouts,
      setLayouts,
      hiddenWidgets,
      collapsedWidgets,
      addWidget,
      removeWidget,
      toggleCollapse,
      toggleTempCollapse,
      saveLayout,
      resetToDefault,
      cancelChanges,
      isLoading,
    }),
    [
      isEditMode,
      layouts,
      hiddenWidgets,
      collapsedWidgets,
      addWidget,
      removeWidget,
      toggleCollapse,
      toggleTempCollapse,
      saveLayout,
      resetToDefault,
      cancelChanges,
      isLoading,
    ]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
