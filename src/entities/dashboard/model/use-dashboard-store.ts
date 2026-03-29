// [ENTITIES/DASHBOARD/MODEL] - Zustand store
import { create } from 'zustand';
import type { DashboardLayouts } from './types';
import { defaultLayouts } from './default-layouts';

interface DashboardState {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  layouts: DashboardLayouts;
  setLayouts: (layouts: DashboardLayouts | ((prev: DashboardLayouts) => DashboardLayouts)) => void;
  hiddenWidgets: string[];
  setHiddenWidgets: (widgets: string[] | ((prev: string[]) => string[])) => void;
  collapsedWidgets: string[];
  setCollapsedWidgets: (widgets: string[] | ((prev: string[]) => string[])) => void;
  
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  isHydrated: boolean;
  setIsHydrated: (value: boolean) => void;
  
  addWidget: (id: string) => void;
  removeWidget: (id: string) => void;
  toggleCollapse: (id: string) => void;
  toggleTempCollapse: (id: string) => void;
  resetToDefaults: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  isEditMode: false,
  setIsEditMode: (value) => set({ isEditMode: value }),
  layouts: defaultLayouts,
  setLayouts: (layouts) =>
    set((state) => ({
      layouts: typeof layouts === 'function' ? layouts(state.layouts) : layouts,
    })),
  hiddenWidgets: [],
  setHiddenWidgets: (widgets) =>
    set((state) => ({
      hiddenWidgets: typeof widgets === 'function' ? widgets(state.hiddenWidgets) : widgets,
    })),
  collapsedWidgets: [],
  setCollapsedWidgets: (widgets) =>
    set((state) => ({
      collapsedWidgets:
        typeof widgets === 'function' ? widgets(state.collapsedWidgets) : widgets,
    })),

  isLoading: true,
  setIsLoading: (value) => set({ isLoading: value }),
  isHydrated: false,
  setIsHydrated: (value) => set({ isHydrated: value }),

  addWidget: (id) =>
    set((state) => {
      const prev = state.layouts;
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
        newLg.w = id === 'recent-expenses' || id === 'priority-tasks' ? 8 : 4;
        newLg.h = 4;
      } else if (id === 'ai-chat') {
        newLg.w = 6;
        newLg.h = 5;
      }

      return {
        hiddenWidgets: state.hiddenWidgets.filter((wId) => wId !== id),
        layouts: {
          lg: [...prev.lg, newLg],
          md: [...prev.md, newMd],
          sm: [...prev.sm, newSm],
          xs: [...prev.xs, newXs],
        },
      };
    }),

  removeWidget: (id) =>
    set((state) => {
      if (id === 'hero') return state;
      return {
        hiddenWidgets: [...new Set([...state.hiddenWidgets, id])],
        layouts: {
          lg: state.layouts.lg.filter((w) => w.i !== id),
          md: state.layouts.md.filter((w) => w.i !== id),
          sm: state.layouts.sm.filter((w) => w.i !== id),
          xs: state.layouts.xs.filter((w) => w.i !== id),
        },
      };
    }),

  toggleCollapse: (id) =>
    set((state) => {
      const isCollapsing = !state.collapsedWidgets.includes(id);
      const newCollapsedWidgets = isCollapsing
        ? [...state.collapsedWidgets, id]
        : state.collapsedWidgets.filter((wId) => wId !== id);

      const newLayouts = { ...state.layouts };
      (Object.keys(newLayouts) as Array<keyof DashboardLayouts>).forEach((bp) => {
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
      });

      return {
        collapsedWidgets: newCollapsedWidgets,
        layouts: newLayouts,
      };
    }),

  toggleTempCollapse: (id) =>
    set((state) => {
      const newLayouts = { ...state.layouts };
      (Object.keys(newLayouts) as Array<keyof DashboardLayouts>).forEach((bp) => {
        newLayouts[bp] = newLayouts[bp].map((l) => {
          if (l.i === id) {
            const isVisuallyCollapsed =
              l.isOpen === false || (l.isOpen === undefined && state.collapsedWidgets.includes(id));
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
      });
      return { layouts: newLayouts };
    }),

  resetToDefaults: () =>
    set({
      layouts: defaultLayouts,
      hiddenWidgets: [],
      collapsedWidgets: [],
    }),
}));
