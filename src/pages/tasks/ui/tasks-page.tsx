import { CheckSquare } from "lucide-react";
import { PlaceholderPage } from "@/shared/ui/placeholder-page";

export function TasksPage() {
  return (
    <PlaceholderPage
      title="Tasks"
      description="Capture, prioritise, and complete everything. Projects, subtasks, priorities, and recurring items."
      icon={CheckSquare}
      accent="text-violet-500"
      accentBg="bg-violet-500/10"
    />
  );
}
