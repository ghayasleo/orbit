import { CalendarDays } from "lucide-react";
import { WidgetWrapper } from "./WidgetWrapper";
import { WidgetHeader } from "./WidgetHeader";
import { WidgetBody } from "./WidgetBody";

const events = [
  {
    title: "Team Sync",
    month: "Jan",
    day: "15",
    time: "10:00 AM",
    location: "Office",
  },
  {
    title: "Client Presentation",
    month: "Jan",
    day: "16",
    time: "2:00 PM",
    location: "Zoom",
  },
  {
    title: "Dinner with Sarah",
    month: "Jan",
    day: "17",
    time: "7:30 PM",
    location: "Restaurant",
  },
];

export function EventsWidget() {
  return (
    <WidgetWrapper id="upcoming-events">
      <WidgetHeader
        title="Upcoming Events"
        icon={CalendarDays}
        iconColorClass="text-rose-500"
        iconBgClass="bg-rose-500/10"
      />

      <WidgetBody id="upcoming-events">
        <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-1 pb-2 min-h-0">
          {events.length > 0 ? (
            events.map((event, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer">
                <div className="flex flex-col items-center justify-center h-12 w-12 rounded-xl bg-bg-subtle border border-border-subtle/30 shrink-0 group-hover:bg-[#5B6AF0]/5 group-hover:border-[#5B6AF0]/20 transition-colors">
                  <span className="text-[10px] font-bold text-[#5B6AF0] uppercase">
                    {event.month}
                  </span>
                  <span className="text-lg font-bold text-text-primary">
                    {event.day}
                  </span>
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <h4 className="text-sm font-bold text-text-primary group-hover:text-[#5B6AF0] transition-colors truncate">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-text-muted">
                      {event.time}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-border-medium" />
                    <span className="text-xs text-text-muted truncate">
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
              <CalendarDays className="h-8 w-8 text-text-muted opacity-50" />
              <p className="text-sm text-text-muted">
                No upcoming events this week
              </p>
            </div>
          )}
        </div>
      </WidgetBody>
    </WidgetWrapper>
  );
}
