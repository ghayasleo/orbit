import { useState, forwardRef, HTMLAttributes } from "react";
import { GripVertical, X, ChevronUp, ChevronDown } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface WidgetWrapperProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  isHero?: boolean;
}

export const WidgetWrapper = forwardRef<HTMLDivElement, WidgetWrapperProps>(
  ({ id, children, className, isHero = false, ...props }, ref) => {
    const { isEditMode, removeWidget, toggleCollapse, collapsedWidgets } =
      useDashboard();
    const isCollapsed = collapsedWidgets.includes(id);

    const [showConfirm, setShowConfirm] = useState(false);

    // Cancel confirm if edit mode is toggled off
    if (!isEditMode && showConfirm) {
      setShowConfirm(false);
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative h-full w-full rounded-2xl group transition-shadow @container overflow-hidden",
          isEditMode && "shadow-sm",
          className,
        )}
        {...props}
      >
        <div className="h-full w-full">
          {isHero ? (
            children
          ) : (
            <div className="h-full rounded-2xl flex flex-col bg-bg-card border border-border-subtle p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
              {children}
            </div>
          )}
        </div>

        {/* Edit Mode Overlays */}
        <AnimatePresence>
          {isEditMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "absolute inset-0 pointer-events-none rounded-2xl border-2 border-dashed border-[#5B6AF0]/60 bg-black/10 transition-colors z-10",
                "opacity-100", // Will be shown by Framer Motion
              )}
            >
              {!isHero && (
                <>
                  {/* Drag Handle */}
                  <div
                    className="drag-handle absolute top-2 left-2 p-1.5 rounded-md bg-bg-base/80 backdrop-blur-sm border border-border-subtle shadow-sm cursor-grab active:cursor-grabbing pointer-events-auto hover:bg-bg-subtle transition-colors"
                    aria-label={`Drag to reorder ${id} widget`}
                  >
                    <GripVertical className="h-4 w-4 text-text-muted" />
                  </div>

                  {/* Collapse/Expand Button */}
                  <div className="absolute top-2 right-10 pointer-events-auto z-20">
                    <button
                      onClick={() => toggleCollapse(id)}
                      className="p-1.5 rounded-md bg-bg-base/80 backdrop-blur-sm border border-border-subtle shadow-sm hover:bg-bg-subtle hover:text-[#5B6AF0] text-text-muted transition-all cursor-pointer"
                      aria-label={
                        isCollapsed ? "Expand widget" : "Collapse widget"
                      }
                    >
                      {isCollapsed ? (
                        <ChevronDown className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronUp className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Remove Button */}
                  <div className="absolute top-2 right-2 pointer-events-auto z-20">
                    <AnimatePresence mode="wait">
                      {showConfirm ? (
                        <motion.div
                          key="confirm"
                          initial={{ opacity: 0, scale: 0.9, x: 10 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9, x: 10 }}
                          className="flex items-center gap-2 bg-bg-base/90 backdrop-blur-sm border border-border-subtle shadow-md rounded-lg p-1.5 px-3 text-xs"
                        >
                          <span className="font-medium text-text-primary whitespace-nowrap">
                            Remove?
                          </span>
                          <button
                            onClick={() => removeWidget(id)}
                            className="text-red-500 font-semibold hover:text-red-600 transition-colors"
                          >
                            Yes
                          </button>
                          <span className="text-border-medium">|</span>
                          <button
                            onClick={() => setShowConfirm(false)}
                            className="text-text-muted hover:text-text-primary transition-colors"
                          >
                            Cancel
                          </button>
                        </motion.div>
                      ) : (
                        <motion.button
                          key="remove"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          onClick={() => setShowConfirm(true)}
                          className="p-1.5 rounded-md bg-bg-base/80 backdrop-blur-sm border border-border-subtle shadow-sm hover:bg-red-50 hover:border-red-200 hover:text-red-500 text-text-muted transition-all cursor-pointer"
                          aria-label={`Remove ${id} widget`}
                        >
                          <X className="h-3.5 w-3.5" />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

WidgetWrapper.displayName = "WidgetWrapper";
