import { Activity, ArrowUpRight, ChevronRight } from "lucide-react";
import { WidgetWrapper } from "./WidgetWrapper";
import { useEffect, useRef, useState } from "react";

const recentExpenses = [
  {
    name: "Starbucks",
    category: "Food & Drink",
    date: "Today",
    amount: "\u20A8 850",
  },
  {
    name: "Uber",
    category: "Transport",
    date: "Yesterday",
    amount: "\u20A8 450",
  },
  {
    name: "Amazon",
    category: "Shopping",
    date: "Mar 5",
    amount: "\u20A8 1,200",
  },
  {
    name: "Grocery Store",
    category: "Groceries",
    date: "Mar 4",
    amount: "\u20A8 4,500",
  },
];

export function RecentExpensesWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setIsLarge(entry.contentRect.width > 500);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <WidgetWrapper id="recent-expenses">
      <div
        ref={containerRef}
        className="h-full rounded-2xl flex flex-col bg-bg-card dark:bg-zinc-900 border border-border-subtle p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
      >
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
              <Activity className="h-4 w-4 text-purple-500" strokeWidth={2} />
            </div>
            <h3 className="text-[15px] font-semibold text-text-primary font-jakarta">
              Recent Expenses
            </h3>
          </div>
          <button className="flex items-center gap-0.5 text-xs font-medium text-[#5B6AF0] hover:text-[#4a58e8] transition-colors cursor-pointer shrink-0">
            View All
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <ul
          className={`grid gap-1 sm:gap-2 flex-1 items-start overflow-y-auto custom-scrollbar pr-1 pb-2 min-h-0 content-start ${isLarge ? "grid-cols-2" : "grid-cols-1"}`}
        >
          {recentExpenses.map((expense, i) => (
            <li
              key={i}
              className="flex items-center justify-between rounded-xl px-3 py-3 hover:bg-bg-subtle transition-colors cursor-pointer border border-transparent hover:border-border-subtle"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-subtle shrink-0">
                  <ArrowUpRight
                    className="h-4 w-4 text-red-400"
                    strokeWidth={2}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {expense.name}
                  </p>
                  <p className="text-xs text-text-muted truncate">
                    {expense.category}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 ml-2">
                <span className="block text-sm font-semibold text-text-primary">
                  {expense.amount}
                </span>
                <span className="block text-xs text-text-muted">
                  {expense.date}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </WidgetWrapper>
  );
}
