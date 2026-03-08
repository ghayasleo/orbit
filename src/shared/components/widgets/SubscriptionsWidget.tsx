import { RefreshCw, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { WidgetWrapper } from "./WidgetWrapper";

const subscriptions = [
  {
    name: "Netflix",
    date: "Renews in 2 days",
    cost: "\u20A8 1,500",
    urgent: true,
  },
  {
    name: "Spotify",
    date: "Renews in 5 days",
    cost: "\u20A8 300",
    urgent: true,
  },
  {
    name: "Adobe Creative Cloud",
    date: "Renews in 15 days",
    cost: "\u20A8 4,200",
    urgent: false,
  },
  {
    name: "GitHub Copilot",
    date: "Renews in 24 days",
    cost: "\u20A8 2,800",
    urgent: false,
  },
];

export function SubscriptionsWidget() {
  return (
    <WidgetWrapper id="subscriptions">
      <div className="h-full rounded-2xl flex flex-col bg-bg-card border border-border-subtle p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/10">
              <RefreshCw className="h-4 w-4 text-pink-500" strokeWidth={2} />
            </div>
            <h3 className="text-[15px] font-semibold text-text-primary font-jakarta">
              Subscriptions
            </h3>
          </div>
          <button className="flex items-center gap-0.5 text-xs font-medium text-[#5B6AF0] hover:text-[#4a58e8] transition-colors cursor-pointer shrink-0">
            View All
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <ul className="space-y-2 sm:space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1 pb-1 min-h-0">
          {subscriptions.map((sub, i) => (
            <li
              key={i}
              className={cn(
                "flex items-center justify-between rounded-xl px-3 py-2 border transition-colors cursor-pointer group",
                sub.urgent
                  ? "bg-amber-500/5 border-amber-500/20 hover:bg-amber-500/10"
                  : "bg-transparent border-transparent hover:bg-bg-subtle hover:border-border-subtle",
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-8 w-8 rounded-full bg-bg-subtle flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-text-secondary">
                    {sub.name[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {sub.name}
                  </p>
                  <p
                    className={cn(
                      "text-xs truncate",
                      sub.urgent
                        ? "text-amber-600 dark:text-amber-500 font-medium"
                        : "text-text-muted",
                    )}
                  >
                    {sub.date}
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold text-text-muted ml-3 shrink-0">
                {sub.cost}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </WidgetWrapper>
  );
}
