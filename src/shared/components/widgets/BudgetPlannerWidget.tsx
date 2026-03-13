import { Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { WidgetWrapper } from "./WidgetWrapper";
import { WidgetHeader } from "./WidgetHeader";
import { WidgetBody } from "./WidgetBody";

export function BudgetPlannerWidget() {
  const budgetItems = [
    { label: "Groceries", spent: 12000, total: 15000, color: "bg-emerald-500" },
    { label: "Utilities", spent: 8000, total: 10000, color: "bg-emerald-500" },
    { label: "Rent", spent: 30000, total: 30000, color: "bg-red-500" },
    {
      label: "Entertainment",
      spent: 7000,
      total: 10000,
      color: "bg-amber-500",
    },
    { label: "Transport", spent: 5000, total: 8000, color: "bg-emerald-500" },
  ];

  return (
    <WidgetWrapper id="budget">
      <WidgetHeader
        id="budget"
        title="Budget Planner"
        icon={Wallet}
        iconColorClass="text-emerald-500"
        iconBgClass="bg-emerald-500/10"
      />

      <WidgetBody id="budget">
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            {budgetItems.map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-[13px]">
                  <span className="font-medium text-text-primary">
                    {item.label}
                  </span>
                  <span className="text-text-muted">
                    <span className="text-text-primary font-bold">
                      {"\u20A8"} {item.spent.toLocaleString()}
                    </span>{" "}
                    / {"\u20A8"} {item.total.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-bg-subtle overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      item.color,
                    )}
                    style={{ width: `${(item.spent / item.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 mt-auto border-t border-border-subtle/50 flex items-center justify-between">
            <span className="text-xs text-text-muted font-medium">
              Total Budget Left
            </span>
            <span className="text-sm font-bold text-emerald-500">
              {"\u20A8"} 12,300
            </span>
          </div>
        </div>
      </WidgetBody>
    </WidgetWrapper>
  );
}
