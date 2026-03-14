// [SHARED/STORE] - Cross-cutting UI state (sidebar + theme)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface UIState {
  sidebarCollapsed: boolean;
  mobileOpen: boolean;
  theme: Theme;
  toggleCollapsed: () => void;
  setMobileOpen: (open: boolean) => void;
  setTheme: (theme: Theme) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: true,
      mobileOpen: false,
      theme: 'system',
      toggleCollapsed: () =>
        set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setMobileOpen: (open) => set({ mobileOpen: open }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'orbit-ui',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
      }),
    }
  )
);
