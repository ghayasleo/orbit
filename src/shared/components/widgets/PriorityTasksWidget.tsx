import { CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { WidgetWrapper } from "./WidgetWrapper";
import { WidgetHeader } from "./WidgetHeader";
import { WidgetBody } from "./WidgetBody";

const tasks = [
  {
    text: "Review project specifications",
    done: false,
    priority: "high" as const,
  },
  { text: "Update budget tracker", done: false, priority: "medium" as const },
  { text: "Send invoice to client", done: true, priority: "high" as const },
  { text: "Grocery shopping", done: false, priority: "low" as const },
  { text: "Call dentist", done: true, priority: "medium" as const },
  { text: "Plan weekend trip", done: false, priority: "low" as const },
  { text: "Read 2 chapters", done: false, priority: "medium" as const },
];

export function PriorityTasksWidget() {
  return (
    <WidgetWrapper id="priority-tasks">
      <WidgetHeader
        id="priority-tasks"
        title="Priority Tasks"
        icon={CheckSquare}
        iconColorClass="text-indigo-500"
        iconBgClass="bg-indigo-500/10"
      />

      <WidgetBody id="priority-tasks">
        <ul className="space-y-1 flex-1 overflow-y-auto custom-scrollbar pr-1 pb-2 min-h-0">
          {tasks.map((task, i) => (
            <li
              key={i}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-bg-subtle transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={cn(
                    "h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all",
                    task.done
                      ? "bg-[#5B6AF0] border-[#5B6AF0] text-white"
                      : "border-border-subtle bg-bg-base group-hover:border-border-medium",
                  )}
                >
                  {task.done && (
                    <CheckSquare className="h-3.5 w-3.5" strokeWidth={3} />
                  )}
                </div>
                <span
                  className={cn(
                    "text-[13px] font-medium transition-colors truncate",
                    task.done
                      ? "text-text-muted line-through"
                      : "text-text-primary",
                  )}
                >
                  {task.text}
                </span>
              </div>
              {!task.done && (
                <span
                  className={cn(
                    "h-2 w-2 rounded-full shrink-0",
                    task.priority === "high" && "bg-red-400",
                    task.priority === "medium" && "bg-amber-400",
                    task.priority === "low" && "bg-emerald-400",
                  )}
                />
              )}
            </li>
          ))}
        </ul>
      </WidgetBody>
    </WidgetWrapper>
  );
}
