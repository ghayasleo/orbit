import { Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { WidgetWrapper } from "./WidgetWrapper";
import { WidgetHeader } from "./WidgetHeader";
import { WidgetBody } from "./WidgetBody";

const activeGoals = [
  {
    title: "Emergency Fund",
    current: 15000,
    target: 50000,
    progress: Math.round((15000 / 50000) * 100),
    isMonetary: true,
  },
  {
    title: "New Laptop",
    current: 30000,
    target: 80000,
    progress: Math.round((30000 / 80000) * 100),
    isMonetary: true,
  },
  {
    title: "Read 12 Books",
    current: 9,
    target: 12,
    progress: Math.round((9 / 12) * 100),
    isMonetary: false,
  },
];

export function ActiveGoalsWidget() {
  return (
    <WidgetWrapper id="active-goals">
      <WidgetHeader
        title="Active Goals"
        icon={Target}
        iconColorClass="text-[#5B6AF0]"
        iconBgClass="bg-[#5B6AF0]/10"
      />

      <WidgetBody id="active-goals">
        <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-1 pb-2 min-h-0">
          {activeGoals.map((goal, i) => (
            <div key={i} className="flex flex-col gap-2 group cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-text-primary group-hover:text-[#5B6AF0] transition-colors truncate">
                  {goal.title}
                </span>
                <span className="text-xs font-bold text-[#5B6AF0]">
                  {goal.progress}%
                </span>
              </div>
              <div className="relative h-2 w-full rounded-full bg-bg-subtle overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-[#5B6AF0] rounded-full transition-all duration-700"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-text-muted font-medium">
                {goal.isMonetary ? (
                  <>
                    <span>
                      {"\u20A8"} {goal.current?.toLocaleString()}
                    </span>
                    <span>
                      Target: {"\u20A8"} {goal.target.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <>
                    <span>{goal.current} books read</span>
                    <span>Target: {goal.target}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </WidgetBody>
    </WidgetWrapper>
  );
}
