import { ArrowUpRight } from "lucide-react";
import { WidgetWrapper } from "./widget-wrapper";
import { WidgetHeader } from "./widget-header";
import { WidgetBody } from "./widget-body";
import { useRef } from "react";
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

  return (
    <WidgetWrapper id="recent-expenses">
      <WidgetHeader
        id="recent-expenses"
        title="Recent Expenses"
        icon={ArrowUpRight}
        iconColorClass="text-red-500"
        iconBgClass="bg-red-500/10"
      />

      <WidgetBody id="recent-expenses" ref={containerRef}>
        <ul className="space-y-1 flex-1 overflow-y-auto custom-scrollbar pr-1 pb-2 min-h-0">
          {recentExpenses.map((expense, i) => (
            <li
              key={i}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-bg-subtle transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-bg-base border border-border-subtle flex items-center justify-center shrink-0 group-hover:border-[#5B6AF0]/30 transition-colors">
                  <span className="text-[13px] font-medium text-text-muted">
                    {expense.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-text-primary truncate">
                    {expense.name}
                  </p>
                  <p className="text-[10px] text-text-muted truncate">
                    {expense.category} • {expense.date}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[13px] font-bold text-text-primary">
                  {expense.amount}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </WidgetBody>
    </WidgetWrapper>
  );
}
