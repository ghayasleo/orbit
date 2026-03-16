import { Bell } from "lucide-react";
import { PlaceholderPage } from "@/shared/ui/placeholder-page";

export function RemindersPage() {
  return (
    <PlaceholderPage
      title="Reminders"
      description="Time-based alerts that fire exactly when you need them. Snooze, link to tasks, or repeat."
      icon={Bell}
      accent="text-blue-500"
      accentBg="bg-blue-500/10"
    />
  );
}
