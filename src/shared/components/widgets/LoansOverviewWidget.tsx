import { Landmark, ChevronRight } from "lucide-react";
import { WidgetWrapper } from "./WidgetWrapper";
import { Link } from "react-router-dom";

export function LoansOverviewWidget() {
  const oweTotal = 45000;
  const oweCount = 3;
  const owedTotal = 12000;
  const owedCount = 2;

  return (
    <WidgetWrapper id="loans">
      <div className="h-full rounded-2xl flex flex-col bg-bg-card border border-border-subtle p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10">
              <Landmark className="h-4 w-4 text-rose-500" strokeWidth={2} />
            </div>
            <h3 className="text-[15px] font-semibold text-text-primary font-jakarta">
              Loans Overview
            </h3>
          </div>
          <Link
            to="/app/loans"
            className="flex items-center gap-0.5 text-xs font-medium text-[#5B6AF0] hover:text-[#4a58e8] transition-colors cursor-pointer shrink-0"
          >
            View All
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex-1 flex @[height<180px]:flex-row flex-col justify-center gap-3 sm:gap-5 @[height<180px]:items-center">
          <div className="flex flex-col gap-0.5 sm:gap-1 flex-1">
            <span className="text-[10px] sm:text-xs font-medium text-text-muted uppercase tracking-wider">
              You Owe
            </span>
            <span className="text-xl sm:text-2xl font-bold text-rose-500">
              {"\u20A8"} {oweTotal.toLocaleString()}
            </span>
            <span className="text-[10px] sm:text-[11px] text-text-muted @[height<180px]:hidden">
              {oweCount} active loan{Number(oweCount) !== 1 && "s"}
            </span>
          </div>

          <div className="h-px @[height<180px]:h-8 w-full @[height<180px]:w-px bg-border-subtle" />

          <div className="flex flex-col gap-0.5 sm:gap-1 flex-1">
            <span className="text-[10px] sm:text-xs font-medium text-text-muted uppercase tracking-wider">
              Owed to You
            </span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-500">
              {"\u20A8"} {owedTotal.toLocaleString()}
            </span>
            <span className="text-[10px] sm:text-[11px] text-text-muted @[height<180px]:hidden">
              {owedCount} active loan{Number(owedCount) !== 1 && "s"}
            </span>
          </div>
        </div>
      </div>
    </WidgetWrapper>
  );
}
