import {
  X,
  Flame,
  CheckSquare,
  PieChart,
  Target,
  Receipt,
  Calendar,
  Bell,
  Landmark,
  RefreshCw,
  NotebookPen,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import { useDashboard } from "../context/DashboardContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AddWidgetPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABLE_WIDGETS = [
  {
    id: "habits",
    name: "Habit Streaks",
    icon: Flame,
    color: "text-[#8B5CF6]",
    bg: "bg-[#8B5CF6]/10",
    desc: "Today's habits with streak rings",
  },
  {
    id: "priority-tasks",
    name: "Priority Tasks",
    icon: CheckSquare,
    color: "text-[#3B82F6]",
    bg: "bg-[#3B82F6]/10",
    desc: "High priority tasks due today",
  },
  {
    id: "budget",
    name: "Budget Planner",
    icon: PieChart,
    color: "text-[#06B6D4]",
    bg: "bg-[#06B6D4]/10",
    desc: "Monthly budget vs spending",
  },
  {
    id: "active-goals",
    name: "Active Goals",
    icon: Target,
    color: "text-[#84CC16]",
    bg: "bg-[#84CC16]/10",
    desc: "Goals with progress bars",
  },
  {
    id: "recent-expenses",
    name: "Recent Expenses",
    icon: Receipt,
    color: "text-[#10B981]",
    bg: "bg-[#10B981]/10",
    desc: "Latest expense entries",
  },
  {
    id: "upcoming-due",
    name: "Upcoming Due",
    icon: Calendar,
    color: "text-[#F43F5E]",
    bg: "bg-[#F43F5E]/10",
    desc: "Loans, EMIs, subscriptions due soon",
  },
  {
    id: "reminders",
    name: "Reminders",
    icon: Bell,
    color: "text-[#F59E0B]",
    bg: "bg-[#F59E0B]/10",
    desc: "Next upcoming reminders",
  },
  {
    id: "loans",
    name: "Loans Overview",
    icon: Landmark,
    color: "text-[#F43F5E]",
    bg: "bg-[#F43F5E]/10",
    desc: "Outstanding borrowed and lent",
  },
  {
    id: "subscriptions",
    name: "Subscriptions",
    icon: RefreshCw,
    color: "text-[#EC4899]",
    bg: "bg-[#EC4899]/10",
    desc: "Renewals due this month",
  },
  {
    id: "notes",
    name: "Notes",
    icon: NotebookPen,
    color: "text-[#F97316]",
    bg: "bg-[#F97316]/10",
    desc: "Recent notes and quick capture",
  },
  {
    id: "events",
    name: "Events",
    icon: CalendarDays,
    color: "text-[#5B6AF0]",
    bg: "bg-[#5B6AF0]/10",
    desc: "Upcoming calendar events",
  },
  {
    id: "ai-chat",
    name: "AI Assistant",
    icon: Sparkles,
    color: "text-white",
    bg: "bg-linear-to-br from-[#5B6AF0] to-[#9B6BF2]",
    desc: "Quick AI chat for actions",
  },
];

export function AddWidgetPanel({ isOpen, onClose }: AddWidgetPanelProps) {
  const { layouts, addWidget, hiddenWidgets, resetToDefault } = useDashboard();
  const panelRef = useRef<HTMLDivElement>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Focus trap / escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
        setShowResetConfirm(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // prevent background scroll on mobile
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Determine if a widget is currently on the dashboard
  // It's on the dashboard if it's in layouts.lg AND NOT in hiddenWidgets
  const isWidgetAdded = (id: string) => {
    const inLayout = layouts.lg.some((item) => item.i === id);
    const inHidden = hiddenWidgets.includes(id);
    return inLayout && !inHidden;
  };

  const handleReset = () => {
    if (showResetConfirm) {
      resetToDefault();
      setShowResetConfirm(false);
      onClose();
    } else {
      setShowResetConfirm(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (mobile mostly, but good for focus trapping) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            initial={{ x: 360, opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 h-dvh w-full md:w-[360px] bg-bg-card border-l border-border-subtle shadow-2xl z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-widget-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border-subtle shrink-0">
              <div>
                <h2
                  id="add-widget-title"
                  className="text-lg font-semibold text-text-primary font-jakarta"
                >
                  Add Widgets
                </h2>
                <p className="text-xs text-text-muted mt-0.5">
                  Choose widgets to add to your dashboard
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-bg-subtle text-text-muted hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-[#5B6AF0]"
                aria-label="Close add widget panel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4">
              {AVAILABLE_WIDGETS.map((widget) => {
                const added = isWidgetAdded(widget.id);
                return (
                  <div key={widget.id} className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl shrink-0",
                        widget.bg,
                      )}
                    >
                      <widget.icon
                        className={cn("h-5 w-5", widget.color)}
                        strokeWidth={2}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-text-primary truncate">
                        {widget.name}
                      </p>
                      <p className="text-xs text-text-muted truncate">
                        {widget.desc}
                      </p>
                    </div>
                    <div className="shrink-0 ml-2">
                      {added ? (
                        <span className="flex items-center justify-center h-8 px-3 rounded-lg bg-bg-subtle text-text-muted text-xs font-medium border border-transparent">
                          Added
                        </span>
                      ) : (
                        <button
                          onClick={() => addWidget(widget.id)}
                          className="flex items-center justify-center h-8 px-4 rounded-lg bg-[#5B6AF0]/10 text-[#5B6AF0] hover:bg-[#5B6AF0]/20 hover:text-[#4a58e8] text-xs font-semibold transition-colors cursor-pointer"
                        >
                          + Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer / Reset Default */}
            <div className="p-4 border-t border-border-subtle shrink-0 bg-bg-base">
              <div className="flex flex-col items-center justify-center text-center">
                {showResetConfirm ? (
                  <div className="flex flex-col gap-2 w-full animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-xs font-medium text-red-500 bg-red-50 dark:bg-red-500/10 p-2 rounded-md">
                      Reset your dashboard layout to the default? This cannot be
                      undone.
                    </p>
                    <div className="flex gap-2 w-full">
                      <button
                        onClick={handleReset}
                        className="flex-1 py-1.5 text-xs font-semibold bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      >
                        Yes, Reset
                      </button>
                      <button
                        onClick={() => setShowResetConfirm(false)}
                        className="flex-1 py-1.5 text-xs font-medium bg-bg-subtle text-text-primary rounded-md hover:bg-bg-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleReset}
                    className="text-xs text-text-muted hover:text-red-500 underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Reset to Default Layout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
