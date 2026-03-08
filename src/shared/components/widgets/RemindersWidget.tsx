import { Bell, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { WidgetWrapper } from "./WidgetWrapper";

const reminders = [
  { title: "Doctor Appointment", time: "In 2 hours", isOverdue: false },
  { title: "Submit Tax Form", time: "Overdue", isOverdue: true },
  { title: "Call Mom", time: "Tomorrow", isOverdue: false },
];

export function RemindersWidget() {
  return (
    <WidgetWrapper id="reminders">
      <div className="h-full rounded-2xl flex flex-col bg-bg-card border border-border-subtle p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
              <Bell className="h-4 w-4 text-amber-500" strokeWidth={2} />
            </div>
            <h3 className="text-[15px] font-semibold text-text-primary font-jakarta">
              Reminders
            </h3>
          </div>
          <button className="flex items-center gap-0.5 text-xs font-medium text-[#5B6AF0] hover:text-[#4a58e8] transition-colors cursor-pointer shrink-0">
            View All
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <ul className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-1 pb-1">
          {reminders.map((reminder, i) => (
            <li
              key={i}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary group-hover:text-[#5B6AF0] transition-colors truncate">
                  {reminder.title}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <span
                  className={cn(
                    "text-xs font-medium",
                    reminder.isOverdue ? "text-red-500" : "text-text-muted",
                  )}
                >
                  {reminder.time}
                </span>
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full shrink-0",
                    reminder.isOverdue
                      ? "bg-red-50 text-red-500 dark:bg-red-500/10"
                      : "bg-bg-subtle text-text-muted",
                  )}
                >
                  <Bell className="h-3 w-3" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </WidgetWrapper>
  );
}
