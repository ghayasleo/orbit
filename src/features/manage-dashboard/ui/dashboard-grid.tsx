import { Responsive, WidthProvider } from "react-grid-layout/legacy";
import { useDashboardStore } from "@/entities/dashboard";
import { useInitDashboard } from "@/entities/dashboard/model/use-init-dashboard";
import type { Layout, DashboardLayouts } from "@/entities/dashboard";
import { HeroBanner } from "@/widgets/dashboard-widgets/ui/hero-banner";
import { HabitStreaksWidget } from "@/widgets/dashboard-widgets/ui/habit-streaks-widget";
import { PriorityTasksWidget } from "@/widgets/dashboard-widgets/ui/priority-tasks-widget";
import { BudgetPlannerWidget } from "@/widgets/dashboard-widgets/ui/budget-planner-widget";
import { ActiveGoalsWidget } from "@/widgets/dashboard-widgets/ui/active-goals-widget";
import { RecentExpensesWidget } from "@/widgets/dashboard-widgets/ui/recent-expenses-widget";
import { UpcomingDueWidget } from "@/widgets/dashboard-widgets/ui/upcoming-due-widget";
import { RemindersWidget } from "@/widgets/dashboard-widgets/ui/reminders-widget";
import { LoansOverviewWidget } from "@/widgets/dashboard-widgets/ui/loans-overview-widget";
import { SubscriptionsWidget } from "@/widgets/dashboard-widgets/ui/subscriptions-widget";
import { NotesWidget } from "@/widgets/dashboard-widgets/ui/notes-widget";
import { EventsWidget } from "@/widgets/dashboard-widgets/ui/events-widget";
import { AIAssistantWidget } from "@/widgets/dashboard-widgets/ui/ai-assistant-widget";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useMemo, useCallback } from "react";
import {
  HeroBannerSkeleton,
  HabitStreaksSkeleton,
  PriorityTasksSkeleton,
  BudgetPlannerSkeleton,
  ActiveGoalsSkeleton,
  RecentExpensesSkeleton,
  UpcomingDueSkeleton,
  RemindersSkeleton,
  LoansOverviewSkeleton,
  SubscriptionsSkeleton,
  NotesSkeleton,
  EventsSkeleton,
  AIAssistantSkeleton,
} from "@/widgets/dashboard-widgets/ui/widget-skeleton";

const ResponsiveGridLayout = WidthProvider(Responsive);

const WIDGET_MAP: Record<string, React.FC> = {
  hero: HeroBanner,
  habits: HabitStreaksWidget,
  "priority-tasks": PriorityTasksWidget,
  budget: BudgetPlannerWidget,
  "active-goals": ActiveGoalsWidget,
  "recent-expenses": RecentExpensesWidget,
  "upcoming-due": UpcomingDueWidget,
  reminders: RemindersWidget,
  loans: LoansOverviewWidget,
  subscriptions: SubscriptionsWidget,
  notes: NotesWidget,
  events: EventsWidget,
  "ai-chat": AIAssistantWidget,
};

const SKELETON_MAP: Record<string, React.FC> = {
  hero: HeroBannerSkeleton,
  habits: HabitStreaksSkeleton,
  "priority-tasks": PriorityTasksSkeleton,
  budget: BudgetPlannerSkeleton,
  "active-goals": ActiveGoalsSkeleton,
  "recent-expenses": RecentExpensesSkeleton,
  "upcoming-due": UpcomingDueSkeleton,
  reminders: RemindersSkeleton,
  loans: LoansOverviewSkeleton,
  subscriptions: SubscriptionsSkeleton,
  notes: NotesSkeleton,
  events: EventsSkeleton,
  "ai-chat": AIAssistantSkeleton,
};

export function DashboardGrid() {
  const {
    layouts,
    setLayouts,
    isEditMode,
    hiddenWidgets,
    collapsedWidgets,
  } = useDashboardStore();
  const { isLoading } = useInitDashboard();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [resizing, setResizing] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const handleLayoutChange = useCallback(
    (_currentLayout: Layout[], allLayouts: any) => {
      // Prevent state updates if unmounted or not really editing layout structure
      // Also only update if we are in edit mode to avoid loop-back updates during initialization/hydration
      if (mounted && isEditMode) {
        setLayouts((prev: DashboardLayouts) => {
          const mergedLayouts = { ...allLayouts } as DashboardLayouts;
          (Object.keys(mergedLayouts) as Array<keyof DashboardLayouts>).forEach(
            (bp) => {
              mergedLayouts[bp] = mergedLayouts[bp].map((newItem: any) => {
                // Maintain custom properties like restoreH that react-grid-layout might strip
                const oldItem = prev[bp]?.find(
                  (old: Layout) => old.i === newItem.i,
                );
                return { ...oldItem, ...newItem };
              });
            },
          );
          return mergedLayouts;
        });
      }
    },
    [mounted, isEditMode, setLayouts],
  );

  // Filter out removed widgets from rendering loop only
  const activeWidgets = useMemo(
    () => layouts.lg.filter((w) => !hiddenWidgets.includes(w.i)),
    [layouts.lg, hiddenWidgets],
  );

  const content = useMemo(
    () =>
      activeWidgets.map((item) => {
        const Component = WIDGET_MAP[item.i];
        const SkeletonComponent = SKELETON_MAP[item.i];
        if (!Component) return null;

        return (
          <div key={item.i} className="relative h-full w-full">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={item.i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="h-full w-full"
              >
                {isLoading ? (
                  SkeletonComponent ? (
                    <SkeletonComponent />
                  ) : (
                    <div className="h-full w-full rounded-2xl bg-bg-card animate-pulse" />
                  )
                ) : (
                  <Component />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Resize tooltip text - absolute positioned, shown when resizing */}
            {resizing === item.i && !collapsedWidgets.includes(item.i) && (
              <div className="absolute bottom-6 right-2 bg-text-primary text-bg-base text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg z-50 pointer-events-none">
                {item.w >= 8 ? "Wide" : "Compact"}
              </div>
            )}
          </div>
        );
      }),
    [activeWidgets, isLoading, resizing, collapsedWidgets],
  );

  return (
    <div className="relative -mx-4 sm:mx-0 min-h-[500px]">
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-center overflow-hidden ml-auto w-fit absolute bottom-full right-0 -translate-0.75"
          >
            <p className="text-xs text-text-muted font-medium bg-bg-subtle/50 rounded-full py-1.5 px-4 backdrop-blur-sm shadow-sm inline-block">
              {isMobile
                ? "Hold and drag widgets to reorder"
                : "Drag widgets to rearrange · Resize from corners · Click + to add more"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts as any}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={80}
          margin={[16, 16]}
          containerPadding={[0, 0]}
          isDraggable={isEditMode}
          isResizable={isEditMode && !isMobile}
          draggableHandle=".drag-handle"
          useCSSTransforms={true}
          preventCollision={false}
          resizeHandles={isEditMode ? ["s", "e", "w", "se", "sw"] : []}
          onLayoutChange={handleLayoutChange as any}
          onResizeStart={(_: any, _old: any, newItem: any) =>
            setResizing(newItem.i)
          }
          onResizeStop={() => setResizing(null)}
          measureBeforeMount={false}
          compactType="vertical"
        >
          {content}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
}
