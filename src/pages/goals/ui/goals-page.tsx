import { Target } from "lucide-react";
import { PlaceholderPage } from "@/shared/ui/placeholder-page";

export function GoalsPage() {
  return (
    <PlaceholderPage
      title="Goals"
      description="Set long-term objectives with milestones, linked habits, and progress tracking over time."
      icon={Target}
      accent="text-indigo-500"
      accentBg="bg-indigo-500/10"
    />
  );
}
