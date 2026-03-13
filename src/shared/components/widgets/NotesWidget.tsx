import { FileText, Plus } from "lucide-react";
import { WidgetWrapper } from "./WidgetWrapper";
import { WidgetHeader } from "./WidgetHeader";
import { WidgetBody } from "./WidgetBody";

export function NotesWidget() {
  return (
    <WidgetWrapper id="notes">
      <WidgetHeader
        id="notes"
        title="Quick Notes"
        icon={FileText}
        iconColorClass="text-amber-500"
        iconBgClass="bg-amber-500/10"
      />

      <WidgetBody id="notes">
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          <div className="flex-1 rounded-xl bg-bg-subtle/50 border border-border-subtle/30 p-3 sm:p-4 overflow-y-auto custom-scrollbar">
            <p className="text-sm text-text-primary leading-relaxed">
              Remember to check the new UI designs for the dashboard and provide
              feedback by Friday. Also, need to prepare for the team meeting
              next week.
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border-2 border-dashed border-border-subtle text-text-muted hover:text-[#5B6AF0] hover:border-[#5B6AF0] hover:bg-[#5B6AF0]/5 transition-all group shrink-0 cursor-pointer">
            <Plus className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Add New Note</span>
          </button>
        </div>
      </WidgetBody>
    </WidgetWrapper>
  );
}
