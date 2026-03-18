import { LayoutDashboard, Check, Plus, X } from "lucide-react";
import { cn } from "@/shared/lib";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { AddWidgetPanel } from "./add-widget-panel";
import { useSaveDashboard } from "@/features/save-dashboard";
import { useDashboardStore, useDashboardLayout, defaultLayouts } from "@/entities/dashboard";
import type { DashboardLayouts, Layout } from "@/entities/dashboard/model/types";
import { useUserStore } from "@/entities/user";

export function EditModeBar() {
  const { isEditMode, setIsEditMode, setLayouts, setHiddenWidgets, setCollapsedWidgets } = useDashboardStore();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { mutate: saveLayout } = useSaveDashboard();
  
  const user = useUserStore(s => s.user);
  // We use this to restore original layout on cancel
  const { data: savedData } = useDashboardLayout(user?.id);

  const toggleEditMode = () => {
    if (isEditMode) {
      saveLayout();
      setIsPanelOpen(false);
    }
    setIsEditMode(!isEditMode);
  };

  const cancelEditMode = () => {
    if (isEditMode) {
      if (savedData) {
        const savedLayouts: DashboardLayouts = {
          lg: (savedData.layout_lg as Layout[]) || defaultLayouts.lg,
          md: (savedData.layout_md as Layout[]) || defaultLayouts.md,
          sm: (savedData.layout_sm as Layout[]) || defaultLayouts.sm,
          xs: (savedData.layout_xs as Layout[]) || defaultLayouts.xs,
        };
        const savedCollapsedIds = savedData.collapsed_widgets || [];
        const hiddenWidgetsList = savedData.hidden_widgets || [];

        (Object.keys(savedLayouts) as Array<keyof DashboardLayouts>).forEach((bp) => {
          savedLayouts[bp] = savedLayouts[bp].map((l) => ({
            ...l,
            isResizable: !savedCollapsedIds.includes(l.i),
          }));
        });

        setLayouts(savedLayouts);
        setHiddenWidgets(hiddenWidgetsList);
        setCollapsedWidgets(savedCollapsedIds);
      } else {
        // Fallback if no layout was saved
        setLayouts(defaultLayouts);
        setHiddenWidgets([]);
        setCollapsedWidgets([]);
      }
      setIsPanelOpen(false);
    }
    setIsEditMode(!isEditMode);
  };

  return (
    <>
      <div className="flex absolute top-4 right-4 z-10">
        <button
          onClick={cancelEditMode}
          className={cn(
            "flex items-center gap-2 ml-auto mr-4 h-9 px-3 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out origin-right cursor-pointer shrink-0 border",
            isEditMode
              ? "bg-destructive text-destructive-foreground border-transparent hover:opacity-90 shadow-sm scale-100"
              : "scale-0",
          )}
        >
          <X className="h-4 w-4 shrink-0" strokeWidth={2.5} />
          <span className="hidden sm:inline">Cancel</span>
        </button>
        <button
          onClick={toggleEditMode}
          className={cn(
            "grid grid-cols-[16px_1fr] items-center whitespace-pre-wrap gap-2 h-9 px-3 rounded-lg text-sm font-medium transition-all cursor-pointer shrink-0 border backdrop-blur-md",
            isEditMode
              ? "bg-linear-to-r from-[#5B6AF0] to-[#9B6BF2] text-white border-transparent hover:opacity-90 shadow-sm"
              : "bg-white/80 dark:bg-zinc-900/70 border-white/40 dark:border-white/10 text-text-primary hover:bg-white/95 dark:hover:bg-zinc-900/90 shadow-sm",
          )}
        >
          {isEditMode ? (
            <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} />
          ) : (
            <LayoutDashboard className="h-4 w-4 shrink-0" />
          )}
          <span
            className={cn(
              "hidden sm:block transition-all duration-300 ease-in-out [grid-area:1/2]",
              isEditMode ? "opacity-0" : "opacity-100",
            )}
          >
            Edit Dashboard
          </span>
          <span
            className={cn(
              "hidden sm:block transition-all duration-300 ease-in-out [grid-area:1/2]",
              isEditMode ? "opacity-100" : "opacity-0",
            )}
          >
            Done Editing
          </span>
        </button>
      </div>

      {/* Floating Add Button */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:block"
          >
            <button
              onClick={() => setIsPanelOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-br from-[#5B6AF0] to-[#9B6BF2] text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="h-5 w-5" strokeWidth={2.5} />
              Add Widget
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AddWidgetPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </>
  );
}
