import { RefreshCw } from "lucide-react";
import { PlaceholderPage } from "@/shared/ui/placeholder-page";

export function SubscriptionsPage() {
  return (
    <PlaceholderPage
      title="Subscriptions"
      description="Know exactly what you pay each month. Renewal alerts and cost-saving insights included."
      icon={RefreshCw}
      accent="text-cyan-500"
      accentBg="bg-cyan-500/10"
    />
  );
}
