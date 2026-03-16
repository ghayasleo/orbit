import { Handshake } from "lucide-react";
import { PlaceholderPage } from "@/shared/ui/placeholder-page";

export function LoansPage() {
  return (
    <PlaceholderPage
      title="Loans"
      description="Track money lent and borrowed. Repayment schedules, interest, and automatic payment reminders."
      icon={Handshake}
      accent="text-amber-500"
      accentBg="bg-amber-500/10"
    />
  );
}
