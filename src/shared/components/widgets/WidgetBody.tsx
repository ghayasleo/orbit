import { cn } from "@/lib/utils";
import { useDashboard } from "@/shared/context/DashboardContext";
import { ReactNode, forwardRef } from "react";

interface WidgetBodyProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export const WidgetBody = forwardRef<HTMLDivElement, WidgetBodyProps>(
  ({ id, children, className }, ref) => {
    const { collapsedWidgets } = useDashboard();
    const isCollapsed = collapsedWidgets.includes(id);

    return (
      <div
        id={id}
        className={cn(
          "h-full grid grid-rows-[0fr] min-h-0 transition-all duration-300 ease-in-out",
          !isCollapsed && "grid-rows-[1fr]",
        )}
      >
        <div ref={ref} className={cn("overflow-hidden", className)}>
          {children}
        </div>
      </div>
    );
  },
);

WidgetBody.displayName = "WidgetBody";
