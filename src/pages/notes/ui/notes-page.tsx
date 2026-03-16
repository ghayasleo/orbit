import { StickyNote } from "lucide-react";
import { PlaceholderPage } from "@/shared/ui/placeholder-page";

export function NotesPage() {
  return (
    <PlaceholderPage
      title="Notes"
      description="Rich text, checklists, voice memos, and images — everything captured and instantly searchable."
      icon={StickyNote}
      accent="text-yellow-500"
      accentBg="bg-yellow-500/10"
    />
  );
}
