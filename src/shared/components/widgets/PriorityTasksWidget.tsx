import { CheckSquare, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { WidgetWrapper } from "./WidgetWrapper";

const tasks = [
  {
    text: "Review project specifications",
    done: false,
    priority: "high" as const,
  },
  { text: "Update budget tracker", done: false, priority: "medium" as const },
  { text: "Send invoice to client", done: true, priority: "high" as const },
  { text: "Grocery shopping", done: false, priority: "low" as const },
  {
    text: "Call dentist for appointment",
    done: true,
    priority: "medium" as const,
  },
  { text: "Plan weekend trip", done: false, priority: "low" as const },
  { text: "Read 2 chapters", done: false, priority: "medium" as const },
];

export function PriorityTasksWidget() {
  return (
    <WidgetWrapper id="priority-tasks">
      <div className="h-full rounded-2xl flex flex-col bg-bg-card border border-border-subtle p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5B6AF0]/10">
              <CheckSquare className="h-4 w-4 text-[#5B6AF0]" strokeWidth={2} />
            </div>
            <h3 className="text-[15px] font-semibold text-text-primary font-jakarta">
              Priority Tasks
            </h3>
          </div>
          <button className="flex items-center gap-0.5 text-xs font-medium text-[#5B6AF0] hover:text-[#4a58e8] transition-colors cursor-pointer shrink-0">
            View All
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <ul className="space-y-1 flex-1 overflow-y-auto custom-scrollbar pr-1 pb-2 min-h-0">
          {tasks.map((task, i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-bg-card-hover transition-colors cursor-pointer"
            >
              <div
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  task.done
                    ? "bg-[#5B6AF0] border-[#5B6AF0]"
                    : "border-border-medium",
                )}
              >
                {task.done && (
                  <svg
                    className="h-3 w-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span
                className={cn(
                  "text-sm flex-1 truncate",
                  task.done
                    ? "text-text-muted line-through"
                    : "text-text-primary",
                )}
              >
                {task.text}
              </span>
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
      </div>
    </WidgetWrapper>
  );
}
