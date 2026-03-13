import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/shared/stores/use-auth-store";
import { toast } from "sonner";

// Use a custom interface to avoid react-grid-layout type definition issues
export interface Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  moved?: boolean;
  static?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
}

export interface DashboardLayouts {
  lg: Layout[];
  md: Layout[];
  sm: Layout[];
  xs: Layout[];
}

interface DashboardContextType {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  layouts: DashboardLayouts;
  setLayouts: (layouts: DashboardLayouts) => void;
  hiddenWidgets: string[];
  collapsedWidgets: string[];
  addWidget: (id: string) => void;
  removeWidget: (id: string) => void;
  toggleCollapse: (id: string) => void;
  saveLayout: () => void;
  resetToDefault: () => void;
  cancelChanges: () => void;
  isLoading: boolean;
}

const defaultLayouts: DashboardLayouts = {
  lg: [
    { i: "hero", x: 0, y: 0, w: 12, h: 2, static: true },
    { i: "habits", x: 0, y: 2, w: 8, h: 2, minW: 3, minH: 2 },
    { i: "priority-tasks", x: 8, y: 2, w: 4, h: 6, minW: 3, minH: 2 },
    { i: "budget", x: 0, y: 6, w: 4, h: 4, minW: 3, minH: 2 },
    { i: "active-goals", x: 4, y: 6, w: 4, h: 4, minW: 3, minH: 2 },
    { i: "recent-expenses", x: 0, y: 10, w: 8, h: 4, minW: 3, minH: 2 },
    { i: "upcoming-due", x: 8, y: 10, w: 4, h: 4, minW: 3, minH: 2 },
  ],
  md: [
    { i: "hero", x: 0, y: 0, w: 10, h: 2, static: true },
    { i: "habits", x: 0, y: 2, w: 6, h: 2, minW: 3, minH: 2 },
    { i: "priority-tasks", x: 6, y: 2, w: 4, h: 6, minW: 3, minH: 2 },
    { i: "budget", x: 0, y: 6, w: 3, h: 4, minW: 3, minH: 2 },
    { i: "active-goals", x: 3, y: 6, w: 3, h: 4, minW: 3, minH: 2 },
    { i: "recent-expenses", x: 0, y: 10, w: 6, h: 4, minW: 3, minH: 2 },
    { i: "upcoming-due", x: 6, y: 10, w: 4, h: 4, minW: 3, minH: 2 },
  ],
  sm: [
    { i: "hero", x: 0, y: 0, w: 6, h: 2, static: true },
    { i: "habits", x: 0, y: 2, w: 6, h: 2, minW: 3, minH: 2 },
    { i: "priority-tasks", x: 0, y: 6, w: 6, h: 6, minW: 3, minH: 2 },
    { i: "budget", x: 0, y: 12, w: 3, h: 4, minW: 3, minH: 2 },
    { i: "active-goals", x: 3, y: 12, w: 3, h: 4, minW: 3, minH: 2 },
    { i: "recent-expenses", x: 0, y: 16, w: 6, h: 4, minW: 3, minH: 2 },
    { i: "upcoming-due", x: 0, y: 20, w: 6, h: 4, minW: 3, minH: 2 },
  ],
  xs: [
    { i: "hero", x: 0, y: 0, w: 4, h: 2, static: true },
    { i: "habits", x: 0, y: 2, w: 4, h: 2, minW: 3, minH: 2 },
    { i: "priority-tasks", x: 0, y: 6, w: 4, h: 6, minW: 3, minH: 2 },
    { i: "budget", x: 0, y: 12, w: 4, h: 4, minW: 3, minH: 2 },
    { i: "active-goals", x: 0, y: 16, w: 4, h: 4, minW: 3, minH: 2 },
    { i: "recent-expenses", x: 0, y: 20, w: 4, h: 4, minW: 3, minH: 2 },
    { i: "upcoming-due", x: 0, y: 24, w: 4, h: 4, minW: 3, minH: 2 },
  ],
};

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { user } = useAuthStore();

  const queryClient = useQueryClient();

  const [isEditMode, setIsEditMode] = useState(false);
  const [layouts, setLayouts] = useState<DashboardLayouts>(defaultLayouts);
  const [hiddenWidgets, setHiddenWidgets] = useState<string[]>([]);
  const [collapsedWidgets, setCollapsedWidgets] = useState<string[]>([]);

  // Fetch from Supabase
  const { data: savedData, isLoading } = useQuery({
    queryKey: ["dashboard-layout", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from("dashboard_layouts")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.error("Error loading layout:", error);
        return null;
      }
      return data;
    },
    enabled: !!user?.id,
    staleTime: Infinity,
  });

  const savedLayouts: DashboardLayouts = {
    lg: (savedData.layout_lg as Layout[]) || defaultLayouts.lg,
    md: (savedData.layout_md as Layout[]) || defaultLayouts.md,
    sm: (savedData.layout_sm as Layout[]) || defaultLayouts.sm,
    xs: (savedData.layout_xs as Layout[]) || defaultLayouts.xs,
  };
  const savedCollapsedIds = savedData.collapsed_widgets || [];
  const savedHiddenWidgets = savedData.hidden_widgets || [];

  // Apply fetched data
  useEffect(() => {
    // If we have saved data, apply it.
    // If savedData is null and isLoading is false, we keep the defaultLayouts already in state.
    if (savedData) {
      // Ensure isResizable matches collapsed state
      (Object.keys(savedLayouts) as Array<keyof DashboardLayouts>).forEach(
        (bp) => {
          savedLayouts[bp] = savedLayouts[bp].map((l) => ({
            ...l,
            isResizable: !savedCollapsedIds.includes(l.i),
          }));
        },
      );

      // Only set if changed to avoid unnecessary re-renders
      setLayouts(savedLayouts);
      setHiddenWidgets(savedData.hidden_widgets || []);
      setCollapsedWidgets(savedCollapsedIds);
    } else if (savedData === null && !isLoading) {
      // If we already have defaultLayouts, this might be redundant,
      // but ensures consistency if defaultLayouts changed elsewhere.
      // However, we can skip if layouts is already defaultLayouts.
      // For now, just ensuring it's not updating if not needed.
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
      console.log("Saving dashboard layout...", { pl, ph, pcl });
      if (!user?.id) throw new Error("No user ID found for saving layout");

      const payload = {
        user_id: user.id,
        layout_lg: pl.lg,
        layout_md: pl.md,
        layout_sm: pl.sm,
        layout_xs: pl.xs,
        hidden_widgets: ph,
        collapsed_widgets: pcl,
        updated_at: new Date().toISOString(),
      };

      // Check if record exists
      const { data: existing } = await supabase
        .from("dashboard_layouts")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      let result;
      if (existing) {
        // Update
        result = await supabase
          .from("dashboard_layouts")
          .update(payload)
          .eq("user_id", user.id);
      } else {
        // Insert
        result = await supabase.from("dashboard_layouts").insert(payload);
      }

      const { error } = result;

      if (error) {
        console.error("Supabase operation error:", error);
        throw error;
      }
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard-layout", user?.id],
      });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to save layout.", {
        description: "Your changes may not persist.",
        action: {
          label: "Retry",
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
    console.log("saveLayout triggered", {
      layouts,
      hiddenWidgets,
      collapsedWidgets,
    });
    saveMutation.mutate({
      pl: layouts,
      ph: hiddenWidgets,
      pcl: collapsedWidgets,
    });
  }, [layouts, hiddenWidgets, collapsedWidgets, saveMutation]);

  const removeWidget = useCallback((id: string) => {
    if (id === "hero") return; // cannot remove hero
    setHiddenWidgets((prev) => [...new Set([...prev, id])]);
    // Note: react-grid-layout handles reflowing automatically when an item is removed from children,
    // but updating the state ensures it's removed from layout structures if we manually filter or save.
    // We'll filter it out directly when rendering the generic layout map, but it's good practice to keep layout sync.
    setLayouts((prev) => ({
      lg: prev.lg.filter((w) => w.i !== id),
      md: prev.md.filter((w) => w.i !== id),
      sm: prev.sm.filter((w) => w.i !== id),
      xs: prev.xs.filter((w) => w.i !== id),
    }));
  }, []);

  const addWidget = useCallback((id: string) => {
    setHiddenWidgets((prev) => prev.filter((wId) => wId !== id));

    // We use functional updates or refer to the current state.
    // To keep the callback stable, we can use a functional update for layouts too.
    setLayouts((prev) => {
      // Add to layouts at the bottom
      const newY = Math.max(...prev.lg.map((l) => l.y + l.h), 0);
      const newLg = { i: id, x: 0, y: newY, w: 4, h: 4, minW: 3, minH: 2 };
      const newMd = { i: id, x: 0, y: newY, w: 4, h: 4, minW: 3, minH: 2 };
      const newSm = { i: id, x: 0, y: newY, w: 3, h: 4, minW: 3, minH: 2 };
      const newXs = { i: id, x: 0, y: newY, w: 4, h: 4, minW: 3, minH: 2 };

      // Apply specific default sizes based on component type
      if (id === "habits" || id === "subscriptions") {
        newLg.w = id === "habits" ? 8 : 4;
        newLg.h = id === "habits" ? 2 : 4;
      } else if (id === "budget" || id === "loans") {
        newLg.w = 4;
        newLg.h = 4;
      } else if (
        id === "active-goals" ||
        id === "reminders" ||
        id === "priority-tasks" ||
        id === "recent-expenses" ||
        id === "upcoming-due" ||
        id === "events" ||
        id === "notes"
      ) {
        newLg.w = id === "recent-expenses" || id === "priority-tasks" ? 8 : 4;
        newLg.h = 4;
      } else if (id === "ai-chat") {
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
        isCollapsing ? [...prev, id] : prev.filter((wId) => wId !== id),
      );

      setTimeout(() => {
        setLayouts((prev) => {
          const newLayouts = { ...prev };
          (Object.keys(newLayouts) as Array<keyof DashboardLayouts>).forEach(
            (bp) => {
              newLayouts[bp] = newLayouts[bp].map((l) => {
                if (l.i === id) {
                  if (isCollapsing) {
                    return { ...l, h: 1, minH: 1, isResizable: false };
                  } else {
                    return { ...l, h: 4, minH: 2, isResizable: true }; // Default restore height
                  }
                }
                return l;
              });
            },
          );
          return newLayouts;
        });
      }, 300);
    },
    [collapsedWidgets],
  ); // collapsedWidgets is a dependency because isCollapsing depends on it

  const resetMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id) return;
      await supabase.from("dashboard_layouts").delete().eq("user_id", user.id);
    },
    onSuccess: () => {
      setLayouts(defaultLayouts);
      setHiddenWidgets([]);
      queryClient.invalidateQueries({
        queryKey: ["dashboard-layout", user?.id],
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
      saveLayout,
      resetToDefault,
      cancelChanges,
      isLoading,
    ],
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
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
