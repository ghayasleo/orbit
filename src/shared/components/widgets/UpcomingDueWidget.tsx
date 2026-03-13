import { Calendar } from "lucide-react";
import { WidgetWrapper } from "./WidgetWrapper";
import { WidgetHeader } from "./WidgetHeader";
import { WidgetBody } from "./WidgetBody";

const upcomingBills = [
  { month: "Mar", day: "12", label: "Netflix", amount: 1500 },
  { month: "Mar", day: "15", label: "Car loan EMI", amount: 22000 },
];

export function UpcomingDueWidget() {
  return (
    <WidgetWrapper id="upcoming-due">
      <WidgetHeader
        title="Upcoming Due"
        icon={Calendar}
        iconColorClass="text-amber-500"
        iconBgClass="bg-amber-500/10"
      />

      <WidgetBody id="upcoming-due">
        <ul className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-1 pb-2 min-h-0">
          {upcomingBills.map((bill, i) => (
            <li key={i} className="flex gap-4 group cursor-pointer">
              <div className="flex flex-col items-center justify-center h-12 w-12 rounded-xl bg-bg-subtle border border-border-subtle/30 shrink-0 group-hover:bg-[#5B6AF0]/5 group-hover:border-[#5B6AF0]/20 transition-colors">
                <span className="text-[10px] font-bold text-[#5B6AF0] uppercase">
                  {bill.month}
                </span>
                <span className="text-lg font-bold text-text-primary">
                  {bill.day}
                </span>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <h4 className="text-sm font-bold text-text-primary group-hover:text-[#5B6AF0] transition-colors truncate">
                  {bill.label}
                </h4>
                <p className="text-xs text-text-muted mt-0.5">
                  {"\u20A8"} {bill.amount.toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </WidgetBody>
    </WidgetWrapper>
  );
}
