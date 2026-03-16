import { Wallet } from "lucide-react";
import { PlaceholderPage } from "@/shared/ui/placeholder-page";

export function ExpensesPage() {
  return (
    <PlaceholderPage
      title="Expenses"
      description="Log every purchase in seconds. Charts, categories, and receipt photos keep your spending clear."
      icon={Wallet}
      accent="text-rose-500"
      accentBg="bg-rose-500/10"
    />
  );
}
