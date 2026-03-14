import { Bell } from "lucide-react";
import { cn } from "@/shared/lib";
import { WidgetWrapper } from "./widget-wrapper";
import { WidgetHeader } from "./widget-header";
import { WidgetBody } from "./widget-body";

const reminders = [
  {
    text: "Doctor Appointment",
    time: "In 2 hours",
    color: "bg-blue-500",
    isOverdue: false,
  },
  {
    text: "Submit Tax Form",
    time: "Overdue",
    color: "bg-red-500",
    isOverdue: true,
  },
  {
    text: "Call Mom",
    time: "Tomorrow",
    color: "bg-green-500",
    isOverdue: false,
  },
];

export function RemindersWidget() {
  return (
    <WidgetWrapper id="reminders">
      <WidgetHeader
        id="reminders"
        title="Recent Reminders"
        icon={Bell}
        iconColorClass="text-amber-500"
        iconBgClass="bg-amber-500/10"
      />

      <WidgetBody id="reminders">
        <ul className="space-y-1 flex-1 overflow-y-auto custom-scrollbar pr-1 pb-2 min-h-0">
          {reminders.map((reminder, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl px-3 py-3 hover:bg-bg-subtle transition-colors cursor-pointer"
            >
              <div
                className={cn(
                  "h-2 w-2 rounded-full mt-1.5 shrink-0",
                  reminder.color,
                )}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {reminder.text}
                </p>
                <p
                  className={cn(
                    "text-xs truncate",
                    reminder.isOverdue
                      ? "text-red-500 font-medium"
                      : "text-text-muted",
                  )}
                >
                  {reminder.time}
                </p>
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full shrink-0 bg-bg-subtle text-text-muted">
                <Bell className="h-3 w-3" />
              </div>
            </li>
          ))}
        </ul>
      </WidgetBody>
    </WidgetWrapper>
  );
}
