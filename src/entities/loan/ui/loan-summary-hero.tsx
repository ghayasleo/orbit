import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, Users, CheckCircle2 } from 'lucide-react';
import { cn } from '@/shared/lib';
import type { Loan, LoanSummary } from '../model/types';

function computeSummary(loans: Loan[]): LoanSummary {
  const active = loans.filter((l) => l.status === 'active');
  const totalLent = active
    .filter((l) => l.direction === 'lent')
    .reduce((sum, l) => sum + Number(l.amount_remaining), 0);
  const totalBorrowed = active
    .filter((l) => l.direction === 'borrowed')
    .reduce((sum, l) => sum + Number(l.amount_remaining), 0);

  return {
    netBalance: totalLent - totalBorrowed,
    totalLent,
    totalBorrowed,
    activeLentCount: active.filter((l) => l.direction === 'lent').length,
    activeBorrowedCount: active.filter((l) => l.direction === 'borrowed').length,
  };
}

interface LoanSummaryHeroProps {
  loans: Loan[];
  layout?: 'horizontal' | 'vertical';
}

export function LoanSummaryHero({ loans, layout = 'horizontal' }: LoanSummaryHeroProps) {
  const summary = useMemo(() => computeSummary(loans), [loans]);
  const isPositive = summary.netBalance >= 0;
  const totalActive = summary.activeLentCount + summary.activeBorrowedCount;
  const settledCount = loans.filter((l) => l.status === 'settled').length;

  const isVertical = layout === 'vertical';

  return (
    <div className={cn(
      "grid gap-4",
      isVertical ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3"
    )}>
      {/* Net Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "relative overflow-hidden rounded-3xl p-5 border shadow-sm transition-all",
          isPositive 
            ? "bg-emerald-50/40 dark:bg-emerald-500/5 border-emerald-100/50 dark:border-emerald-500/10" 
            : "bg-rose-50/40 dark:bg-rose-500/5 border-rose-100/50 dark:border-rose-500/10",
        )}
      >
        <div className="flex flex-col">
          <span className={cn(
            "text-[11px] font-bold uppercase tracking-wider mb-1",
            isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
          )}>
            {isPositive ? 'Net Receivable' : 'Net Payable'}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-text-primary tracking-tight">
              Rs {Math.abs(summary.netBalance).toLocaleString('en-PK')}
            </span>
          </div>
        </div>
        {/* Subtle decorative icon */}
        {isPositive ? (
          <TrendingUp className="absolute -right-2 -bottom-2 h-16 w-16 text-emerald-500/10 -rotate-12" />
        ) : (
          <TrendingDown className="absolute -right-2 -bottom-2 h-16 w-16 text-rose-500/10 rotate-12" />
        )}
      </motion.div>

      {/* Breakout Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-3xl border border-border-subtle bg-bg-card p-5 shadow-sm space-y-4 hidden sm:block"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/10">
              <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-[11px] text-text-muted font-medium uppercase tracking-tight">Lent</p>
              <p className="text-sm font-bold text-text-primary">Rs {summary.totalLent.toLocaleString('en-PK')}</p>
            </div>
          </div>
          <span className="text-[10px] font-medium bg-emerald-100/50 dark:bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full">
            {summary.activeLentCount} active
          </span>
        </div>
        <div className="h-px bg-border-subtle/50" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-500/10">
              <ArrowDownLeft className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <p className="text-[11px] text-text-muted font-medium uppercase tracking-tight">Borrowed</p>
              <p className="text-sm font-bold text-text-primary">Rs {summary.totalBorrowed.toLocaleString('en-PK')}</p>
            </div>
          </div>
          <span className="text-[10px] font-medium bg-rose-100/50 dark:bg-rose-500/10 text-rose-600 px-2 py-0.5 rounded-full">
            {summary.activeBorrowedCount} active
          </span>
        </div>
      </motion.div>

      {/* Activity Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-3xl border border-border-subtle bg-bg-card p-5 shadow-sm hidden sm:flex flex-col justify-between"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] text-text-muted font-bold uppercase tracking-wider">Lending Activity</p>
            <p className="text-xs text-text-secondary mt-1">
              You have <span className="font-semibold text-text-primary">{totalActive}</span> active connections
            </p>
          </div>
          <Users className="h-4 w-4 text-text-muted" />
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex -space-x-2">
            {[...Array(Math.min(3, totalActive))].map((_, i) => (
              <div key={i} className="h-6 w-6 rounded-full border-2 border-bg-card bg-bg-subtle flex items-center justify-center text-[10px] font-bold">
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            {totalActive > 3 && (
              <div className="h-6 w-6 rounded-full border-2 border-bg-card bg-bg-subtle flex items-center justify-center text-[8px] font-bold">
                +{totalActive - 3}
              </div>
            )}
          </div>
          <div className="flex-1 h-1.5 bg-bg-subtle rounded-full overflow-hidden">
             <div 
               className="h-full bg-[#5B6AF0] rounded-full" 
               style={{ width: `${Math.min(100, (settledCount / (totalActive + settledCount || 1)) * 100)}%` }} 
             />
          </div>
          <div className="flex items-center gap-1 text-[#5B6AF0]">
            <CheckCircle2 className="h-3 w-3" />
            <span className="text-[10px] font-bold">{settledCount} settled</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
