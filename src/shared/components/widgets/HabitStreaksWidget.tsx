import {
  Droplets,
  Dumbbell,
  BookOpen,
  Moon,
  Apple,
  Flame,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WidgetWrapper } from "./WidgetWrapper";
import { useEffect, useRef, useState } from "react";

const habits = [
  { icon: Droplets, label: "Water", done: true },
  { icon: Dumbbell, label: "Workout", done: true },
  { icon: BookOpen, label: "Read", done: false },
  { icon: Moon, label: "Sleep", done: false },
  { icon: Apple, label: "Eat clean", done: true },
];

export function HabitStreaksWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Assume < ~400px is compact mode (fits 4 cols)
        setIsCompact(entry.contentRect.width < 400);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const displayHabits = isCompact ? habits.slice(0, 3) : habits;

  return (
    <WidgetWrapper id="habits">
      <div
        ref={containerRef}
        className="h-full rounded-2xl flex flex-col bg-bg-card dark:bg-zinc-900 border border-border-subtle p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
      >
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10">
              <Flame className="h-4 w-4 text-orange-500" strokeWidth={2} />
            </div>
            <h3 className="text-[15px] font-semibold text-text-primary font-jakarta">
              Habits
            </h3>
          </div>
          <button className="flex items-center gap-0.5 text-xs font-medium text-[#5B6AF0] hover:text-[#4a58e8] transition-colors cursor-pointer shrink-0">
            View All
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-around px-2 min-w-0">
          {displayHabits.map((h, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1 sm:gap-2 cursor-pointer group"
            >
              <div
                className={cn(
                  "flex items-center justify-center rounded-full border-[2.5px] transition-all duration-200",
                  isCompact ? "h-10 w-10" : "h-12 w-12",
                  "@[height<180px]:h-9 @[height<180px]:w-9 @[height<180px]:border-2",
                  h.done
                    ? "border-[#5B6AF0] bg-[#5B6AF0]/10 text-[#5B6AF0]"
                    : "border-border-subtle bg-bg-subtle text-text-muted group-hover:border-border-medium",
                )}
              >
                <h.icon
                  className={cn(
                    isCompact ? "h-4 w-4" : "h-5 w-5",
                    "@[height<180px]:h-4 @[height<180px]:w-4",
                  )}
                  strokeWidth={1.8}
                />
              </div>
              <span
                className={cn(
                  "font-medium",
                  isCompact ? "text-[10px]" : "text-[11px] sm:block",
                  h.done ? "text-text-primary" : "text-text-muted",
                  (isCompact || "@[height<180px]:hidden") && "hidden",
                )}
              >
                {h.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </WidgetWrapper>
  );
}
