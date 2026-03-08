import { CalendarDays, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { WidgetWrapper } from "./WidgetWrapper";

const events = [
  { title: "Team Sync", date: "Today", time: "10:00 AM", isToday: true },
  {
    title: "Client Presentation",
    date: "Tomorrow",
    time: "2:00 PM",
    isToday: false,
  },
  {
    title: "Dinner with Sarah",
    date: "Friday",
    time: "7:30 PM",
    isToday: false,
  },
];

export function EventsWidget() {
  return (
    <WidgetWrapper id="events">
      <div className="h-full rounded-2xl flex flex-col bg-bg-card border border-border-subtle p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10">
              <CalendarDays
                className="h-4 w-4 text-indigo-500"
                strokeWidth={2}
              />
            </div>
            <h3 className="text-[15px] font-semibold text-text-primary font-jakarta">
              Upcoming Events
            </h3>
          </div>
          <button className="flex items-center gap-0.5 text-xs font-medium text-[#5B6AF0] hover:text-[#4a58e8] transition-colors cursor-pointer shrink-0">
            View All
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {events.length > 0 ? (
          <ul className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-1 pb-2 min-h-0">
            {events.map((evt, i) => (
              <li
                key={i}
                className={cn(
                  "pl-3 flex flex-col cursor-pointer group border-l-[3px]",
                  evt.isToday
                    ? "border-[#5B6AF0]"
                    : "border-border-medium hover:border-text-muted transition-colors",
                )}
              >
                <span className="text-sm font-semibold text-text-primary group-hover:text-[#5B6AF0] transition-colors truncate">
                  {evt.title}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className={cn(
                      "text-xs font-medium",
                      evt.isToday ? "text-[#5B6AF0]" : "text-text-muted",
                    )}
                  >
                    {evt.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border-medium" />
                  <span className="text-xs text-text-muted">{evt.time}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
            <CalendarDays className="h-8 w-8 text-text-muted opacity-50" />
            <p className="text-sm text-text-muted">
              No upcoming events this week
            </p>
            <button className="mt-2 text-xs font-semibold text-[#5B6AF0] hover:text-[#4a58e8] transition-colors cursor-pointer">
              Add Event
            </button>
          </div>
        )}
      </div>
    </WidgetWrapper>
  );
}
