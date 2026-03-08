import { Responsive, WidthProvider } from "react-grid-layout/legacy";
import { useDashboard } from "../context/DashboardContext";
import type { Layout } from "../context/DashboardContext";
import { HeroBanner } from "./widgets/HeroBanner";
import { HabitStreaksWidget } from "./widgets/HabitStreaksWidget";
import { PriorityTasksWidget } from "./widgets/PriorityTasksWidget";
import { BudgetPlannerWidget } from "./widgets/BudgetPlannerWidget";
import { ActiveGoalsWidget } from "./widgets/ActiveGoalsWidget";
import { RecentExpensesWidget } from "./widgets/RecentExpensesWidget";
import { UpcomingDueWidget } from "./widgets/UpcomingDueWidget";
import { RemindersWidget } from "./widgets/RemindersWidget";
import { LoansOverviewWidget } from "./widgets/LoansOverviewWidget";
import { SubscriptionsWidget } from "./widgets/SubscriptionsWidget";
import { NotesWidget } from "./widgets/NotesWidget";
import { EventsWidget } from "./widgets/EventsWidget";
import { AIAssistantWidget } from "./widgets/AIAssistantWidget";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
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
} from "./widgets/WidgetSkeleton";

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
    isLoading,
  } = useDashboard();
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

  const handleLayoutChange = (_currentLayout: Layout[], allLayouts: any) => {
    // Prevent state updates if unmounted or not really editing layout structure
    if (mounted) {
      setLayouts(allLayouts);
    }
  };

  // Filter out removed widgets from rendering loop only
  const activeWidgets = layouts.lg.filter((w) => !hiddenWidgets.includes(w.i));

  const content = activeWidgets.map((item) => {
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
  });

  return (
    <div className="-mx-4 sm:mx-0 min-h-[500px]">
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-center pb-2 overflow-hidden mx-auto w-full max-w-xl"
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
          resizeHandles={["se"]}
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
