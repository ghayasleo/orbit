import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn, useMediaQuery } from '@/shared/lib';
import {
  useLoansQuery,
  useLoanStore,
  LoanSummaryHero,
  LoanCard,
  LoanEmptyState,
} from '@/entities/loan';
import type { Loan } from '@/entities/loan';
import { Skeleton } from '@/shared/ui';

interface LoansOverviewProps {
  onSelectLoan: (id: string) => void;
  onAddLoan: () => void;
}

const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'lent', label: 'Lent' },
  { id: 'borrowed', label: 'Borrowed' },
] as const;

export function LoansOverview({ onSelectLoan, onAddLoan }: LoansOverviewProps) {
  const { data: loans, isLoading } = useLoansQuery();
  const { activeFilter, setActiveFilter } = useLoanStore();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 639px)');

  const activeLoans = useMemo(
    () => (loans ?? []).filter((l) => l.status === 'active'),
    [loans],
  );

  const filteredLoans = useMemo(() => {
    if (activeFilter === 'all') return activeLoans;
    return activeLoans.filter((l: Loan) => l.direction === activeFilter);
  }, [activeLoans, activeFilter]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <Skeleton className="h-9 w-52 rounded-xl" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-2xl" />
              ))}
            </div>
          </div>
          <div className="hidden lg:block w-80 space-y-4">
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!activeLoans.length) {
    return <LoanEmptyState onAdd={onAddLoan} />;
  }

  return (
    <div className="flex flex-col lg:flex-row items-start gap-0 lg:gap-8 -mx-4 sm:-mx-6 lg:mx-0">
      {/* Left side: Scrollable List/Grid */}
      <div className={cn(
        "flex-1 w-full min-w-0 px-4 sm:px-6 lg:px-0 order-2 lg:order-1",
        isDesktop && "h-[calc(100vh-16rem)] overflow-y-auto custom-scrollbar pb-8 pt-1"
      )}>
        <div className="space-y-6">
          {/* Filter Tabs */}
          <div className="sticky top-0 z-10 py-2 bg-zinc-100/80 dark:bg-zinc-950/80 backdrop-blur-sm lg:relative lg:bg-transparent lg:backdrop-blur-none lg:p-0">
            <div className="flex gap-1 p-1 rounded-xl w-fit">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={cn(
                    'relative px-5 py-1.5 text-sm font-medium rounded-lg transition-colors',
                    activeFilter === tab.id
                      ? 'text-text-primary'
                      : 'text-text-secondary hover:text-text-primary',
                  )}
                >
                  {activeFilter === tab.id && (
                    <motion.div
                      layoutId="loan-filter-tab"
                      className="absolute inset-0 bg-white dark:bg-bg-subtle rounded-lg shadow-sm"
                      transition={{ type: 'spring', duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Loan Content */}
          {filteredLoans.length > 0 ? (
            isMobile ? (
              /* Mobile: Splitwise-style list */
              <div className="bg-bg-card border border-border-subtle rounded-2xl shadow-sm overflow-hidden divide-y divide-border-subtle">
                {filteredLoans.map((loan: Loan, i: number) => (
                  <div key={loan.id} className="px-1 hover:bg-bg-subtle transition-colors">
                    <LoanCard
                      loan={loan}
                      onSelect={onSelectLoan}
                      index={i}
                      variant="list"
                    />
                  </div>
                ))}
              </div>
            ) : (
              /* Desktop/Tablet: Clean card grid */
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredLoans.map((loan: Loan, i: number) => (
                  <LoanCard
                    key={loan.id}
                    loan={loan}
                    onSelect={onSelectLoan}
                    index={i}
                    variant="card"
                  />
                ))}
              </div>
            )
          ) : (
            <div className="py-20 text-center">
              <p className="text-sm text-text-muted">No {activeFilter} loans found</p>
            </div>
          )}
        </div>
      </div>

      {/* Right side: Fixed summary section */}
      <aside className={cn(
        "w-full lg:w-80 shrink-0 order-1 lg:order-2 px-4 sm:px-6 lg:px-0 mb-6 lg:mb-0",
        isDesktop && "sticky top-0"
      )}>
        <div className={cn(
          "space-y-4",
          isDesktop && "bg-white dark:bg-bg-subtle/30 p-6 rounded-3xl border border-border-subtle shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
        )}>
          {isDesktop && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-text-primary px-1">Overview</h3>
              <p className="text-[11px] text-text-muted px-1 mt-0.5">Your current lending status</p>
            </div>
          )}
          <LoanSummaryHero 
            loans={loans ?? []} 
            layout={isDesktop ? 'vertical' : 'horizontal'} 
          />
          
          {isDesktop && (
            <div className="mt-6 pt-6 border-t border-border-subtle">
              <div className="p-4 rounded-2xl bg-[#5B6AF0]/5 border border-[#5B6AF0]/10">
                <p className="text-[11px] font-medium text-[#5B6AF0] uppercase tracking-wider mb-1">Orbit Tip</p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Regularly record payments to keep your balances accurate. Settled loans move to the archive.
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
