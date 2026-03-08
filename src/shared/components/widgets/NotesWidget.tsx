import { NotebookPen, ChevronRight } from "lucide-react";
import { WidgetWrapper } from "./WidgetWrapper";

const notes = [
  {
    title: "Project Orbit Ideas",
    snippet: "Drag and drop widgets for the dashboard...",
    time: "2 hours ago",
  },
  {
    title: "Meeting Notes",
    snippet: "Discussed Q2 goals with the team. Need to follow up on...",
    time: "Yesterday",
  },
  {
    title: "Grocery List",
    snippet: "Milk, eggs, bread, coffee beans...",
    time: "2 days ago",
  },
];

export function NotesWidget() {
  return (
    <WidgetWrapper id="notes">
      <div className="h-full rounded-2xl flex flex-col bg-bg-card dark:bg-zinc-900 border border-border-subtle p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10">
              <NotebookPen
                className="h-4 w-4 text-orange-500"
                strokeWidth={2}
              />
            </div>
            <h3 className="text-[15px] font-semibold text-text-primary font-jakarta">
              Notes
            </h3>
          </div>
          <button className="flex items-center gap-0.5 text-xs font-medium text-[#5B6AF0] hover:text-[#4a58e8] transition-colors cursor-pointer shrink-0">
            View All
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <ul className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1 pb-2 min-h-0">
          {notes.map((note, i) => (
            <li
              key={i}
              className="flex flex-col gap-1 rounded-xl px-3 py-2 hover:bg-bg-subtle transition-colors cursor-pointer border border-transparent hover:border-border-subtle group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-text-primary group-hover:text-[#5B6AF0] transition-colors truncate">
                  {note.title}
                </span>
                <span className="text-[10px] font-medium text-text-muted shrink-0 ml-2">
                  {note.time}
                </span>
              </div>
              <p className="text-xs text-text-muted line-clamp-1">
                {note.snippet}
              </p>
            </li>
          ))}
        </ul>

        <button className="w-full mt-3 py-2 text-sm font-semibold text-[#5B6AF0] bg-[#5B6AF0]/10 hover:bg-[#5B6AF0]/20 rounded-xl transition-colors cursor-pointer">
          + New Note
        </button>
      </div>
    </WidgetWrapper>
  );
}
