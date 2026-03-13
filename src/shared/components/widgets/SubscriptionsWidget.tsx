import { RefreshCw } from "lucide-react";
import { WidgetWrapper } from "./WidgetWrapper";
import { WidgetHeader } from "./WidgetHeader";
import { WidgetBody } from "./WidgetBody";

const subscriptions = [
  {
    name: "Netflix",
    date: "Renews in 2 days",
    amount: "\u20A8 1,500",
  },
  {
    name: "Spotify",
    date: "Renews in 5 days",
    amount: "\u20A8 300",
  },
  {
    name: "Adobe Creative Cloud",
    date: "Renews in 15 days",
    amount: "\u20A8 4,200",
  },
  {
    name: "GitHub Copilot",
    date: "Renews in 24 days",
    amount: "\u20A8 2,800",
  },
];

export function SubscriptionsWidget() {
  return (
    <WidgetWrapper id="subscriptions">
      <WidgetHeader
        title="Subscriptions"
        icon={RefreshCw}
        iconColorClass="text-emerald-500"
        iconBgClass="bg-emerald-500/10"
      />

      <WidgetBody id="subscriptions">
        <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1 pb-2 min-h-0">
          <div className="bg-bg-subtle/30 rounded-xl p-3 border border-border-subtle/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-text-muted font-medium">
                Monthly Spend
              </span>
              <span className="text-sm font-bold text-text-primary">
                {"\u20A8"} 4,250
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-bg-subtle overflow-hidden">
              <div className="h-full w-[45%] rounded-full bg-emerald-500" />
            </div>
          </div>

          <div className="grid gap-2">
            {subscriptions.map((sub, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-bg-subtle transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-bg-subtle group-hover:bg-bg-card transition-colors shrink-0">
                    <span className="text-xs font-bold text-text-muted uppercase">
                      {sub.name.slice(0, 1)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-text-primary truncate">
                      {sub.name}
                    </p>
                    <p className="text-[10px] text-text-muted truncate">
                      {sub.date}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-text-primary">
                  {sub.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </WidgetBody>
    </WidgetWrapper>
  );
}
