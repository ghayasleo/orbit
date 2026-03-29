import { EditModeBar } from "@/features/manage-dashboard";
import { DashboardGrid } from "@/features/manage-dashboard";

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <EditModeBar />
      <DashboardGrid />
    </div>
  );
}
