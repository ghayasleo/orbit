import { Wallet, ChevronRight, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { WidgetWrapper } from "./WidgetWrapper";

export function BudgetPlannerWidget() {
  const budgetSpent = 72000;
  const budgetTotal = 100000;
  const budgetPercent = Math.round((budgetSpent / budgetTotal) * 100);
  const budgetBarColor =
    budgetPercent >= 90
      ? "bg-red-500"
      : budgetPercent >= 70
        ? "bg-amber-500"
        : "bg-emerald-500";

  const warningText =
    budgetPercent >= 90
      ? "Budget exceeded! Over 90% of your limit has been spent."
      : "Approaching limit - " +
        budgetPercent +
        "% of your monthly budget used.";

  return (
    <WidgetWrapper id="budget">
      <div className="h-full rounded-2xl flex flex-col bg-bg-card border border-border-subtle p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
              <Wallet className="h-4 w-4 text-emerald-500" strokeWidth={2} />
            </div>
            <h3 className="text-[15px] font-semibold text-text-primary font-jakarta">
              Budget Planner
            </h3>
          </div>
          <button className="flex items-center gap-0.5 text-xs font-medium text-[#5B6AF0] hover:text-[#4a58e8] transition-colors cursor-pointer shrink-0">
            View All
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="space-y-3 flex-1 flex flex-col justify-center">
          <div className="h-3 w-full rounded-full bg-bg-subtle overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                budgetBarColor,
              )}
              style={{ width: budgetPercent + "%" }}
            />
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="font-semibold text-text-primary">
              {"\u20A8"} {(budgetSpent / 1000).toFixed(0)}k spent
            </span>
            <span className="text-text-muted">
              of {"\u20A8"} {(budgetTotal / 1000).toFixed(0)}k
            </span>
          </div>
          {budgetPercent >= 70 && (
            <div className="hidden @[height>180px]:flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1.5 mt-auto">
              <AlertTriangle
                className="h-4 w-4 text-amber-500 shrink-0"
                strokeWidth={2}
              />
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400 line-clamp-2">
                {warningText}
              </span>
            </div>
          )}
        </div>
      </div>
    </WidgetWrapper>
  );
}
