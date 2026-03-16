import { Flame } from "lucide-react";
import { PlaceholderPage } from "@/shared/ui/placeholder-page";

export function HabitsPage() {
  return (
    <PlaceholderPage
      title="Habits"
      description="Build streaks, break bad patterns, and visualise consistency with heatmaps and progress rings."
      icon={Flame}
      accent="text-orange-500"
      accentBg="bg-orange-500/10"
    />
  );
}
