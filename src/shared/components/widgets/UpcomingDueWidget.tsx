import { Calendar, ChevronRight } from "lucide-react";
import { WidgetWrapper } from "./WidgetWrapper";

const upcomingDue = [
  { name: "Netflix", date: "Mar 12", amount: "\u20A8 1,500" },
  { name: "Car loan EMI", date: "Mar 15", amount: "\u20A8 22,000" },
];

export function UpcomingDueWidget() {
  return (
    <WidgetWrapper id="upcoming-due">
      <div className="h-full rounded-2xl flex flex-col bg-bg-card dark:bg-zinc-900 border border-border-subtle p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
              <Calendar className="h-4 w-4 text-blue-500" strokeWidth={2} />
            </div>
            <h3 className="text-[15px] font-semibold text-text-primary font-jakarta">
              Upcoming Due
            </h3>
          </div>
          <button className="flex items-center gap-0.5 text-xs font-medium text-[#5B6AF0] hover:text-[#4a58e8] transition-colors cursor-pointer shrink-0">
            View All
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <ul className="space-y-1 flex-1 overflow-y-auto custom-scrollbar pr-1 pb-2 min-h-0">
          {upcomingDue.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-bg-subtle transition-colors cursor-pointer"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-subtle shrink-0">
                <Calendar
                  className="h-4 w-4 text-text-muted"
                  strokeWidth={1.8}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {item.name}
                </p>
                <p className="text-xs text-text-muted">{item.date}</p>
              </div>
              <span className="text-sm font-semibold text-red-500 shrink-0 ml-2">
                {item.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </WidgetWrapper>
  );
}
