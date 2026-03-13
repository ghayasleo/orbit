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
    const { collapsedWidgets, layouts } = useDashboard();
    
    // Read isOpen flag from any breakpoint (they sync together)
    const layoutItem = layouts?.lg?.find(l => l.i === id) || layouts?.md?.find(l => l.i === id);
    const isVisuallyCollapsed = layoutItem?.isOpen === false || (layoutItem?.isOpen === undefined && collapsedWidgets.includes(id));

    return (
      <div
        id={id}
        className={cn(
          "h-full grid grid-rows-[0fr] min-h-0 transition-all duration-300 ease-in-out",
          !isVisuallyCollapsed && "grid-rows-[1fr]",
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
