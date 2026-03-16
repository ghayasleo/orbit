import { PieChart } from "lucide-react";
import { PlaceholderPage } from "@/shared/ui/placeholder-page";

export function BudgetPage() {
  return (
    <PlaceholderPage
      title="Budget Planner"
      description="Set monthly category budgets and watch real-time spending fill the bars."
      icon={PieChart}
      accent="text-emerald-500"
      accentBg="bg-emerald-500/10"
    />
  );
}
