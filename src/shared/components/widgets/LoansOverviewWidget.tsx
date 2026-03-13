import { HandCoins } from "lucide-react";
import { WidgetWrapper } from "./WidgetWrapper";
import { WidgetHeader } from "./WidgetHeader";
import { WidgetBody } from "./WidgetBody";

export function LoansOverviewWidget() {
  const oweTotal = 45000;
  const oweCount = 3;
  const owedTotal = 12000;
  const owedCount = 2;

  const loanStats = [
    { label: "You Owe", value: `\u20A8 ${oweTotal.toLocaleString()}` },
    { label: "Owed to You", value: `\u20A8 ${owedTotal.toLocaleString()}` },
    { label: "Active Loans", value: oweCount + owedCount },
    { label: "Paid Off", value: `\u20A8 0` },
  ];

  return (
    <WidgetWrapper id="loans">
      <WidgetHeader
        id="loans"
        title="Loans Overview"
        icon={HandCoins}
        iconColorClass="text-rose-500"
        iconBgClass="bg-rose-500/10"
      />

      <WidgetBody id="loans">
        <div className="flex-1 flex flex-col justify-center gap-4">
          <div className="grid grid-cols-2 gap-3">
            {loanStats.map((stat, i) => (
              <div
                key={i}
                className="rounded-xl bg-bg-subtle/50 p-3 border border-border-subtle/30"
              >
                <p className="text-xs text-text-muted mb-1">{stat.label}</p>
                <p className="text-sm font-bold text-text-primary">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-muted font-medium">Auto Loan</span>
              <span className="text-rose-500 font-bold">65% Paid</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-bg-subtle overflow-hidden">
              <div className="h-full w-[65%] rounded-full bg-rose-500 transition-all duration-500" />
            </div>
          </div>
        </div>
      </WidgetBody>
    </WidgetWrapper>
  );
}
