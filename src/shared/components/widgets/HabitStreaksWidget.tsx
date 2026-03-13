import { Droplets, Dumbbell, BookOpen, Moon, Apple, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { WidgetWrapper } from "./WidgetWrapper";
import { WidgetHeader } from "./WidgetHeader";
import { WidgetBody } from "./WidgetBody";
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
      <WidgetHeader
        id="habits"
        title="Habits"
        icon={Flame}
        iconColorClass="text-orange-500"
        iconBgClass="bg-orange-500/10"
      />

      <WidgetBody id="habits" ref={containerRef}>
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
      </WidgetBody>
    </WidgetWrapper>
  );
}
