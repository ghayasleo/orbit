import { Target, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { WidgetWrapper } from "./WidgetWrapper";

const activeGoals = [
  {
    name: "Emergency Fund",
    current: 15000,
    target: 50000,
    color: "bg-emerald-500",
  },
  { name: "New Laptop", current: 30000, target: 80000, color: "bg-blue-500" },
];

export function ActiveGoalsWidget() {
  return (
    <WidgetWrapper id="active-goals">
      <div className="h-full rounded-2xl flex flex-col bg-bg-card border border-border-subtle p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10">
              <Target className="h-4 w-4 text-indigo-500" strokeWidth={2} />
            </div>
            <h3 className="text-[15px] font-semibold text-text-primary font-jakarta">
              Active Goals
            </h3>
          </div>
          <button className="flex items-center gap-0.5 text-xs font-medium text-[#5B6AF0] hover:text-[#4a58e8] transition-colors cursor-pointer shrink-0">
            View All
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <ul className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-1 pb-2 min-h-0">
          {activeGoals.map((goal, i) => (
            <li key={i} className="flex flex-col gap-1.5 cursor-pointer group">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-text-primary group-hover:text-[#5B6AF0] transition-colors line-clamp-1">
                  {goal.name}
                </span>
                <span className="text-xs font-medium text-text-muted shrink-0 ml-2">
                  {Math.round((goal.current / goal.target) * 100)}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-bg-subtle overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    goal.color,
                  )}
                  style={{ width: `${(goal.current / goal.target) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </WidgetWrapper>
  );
}
