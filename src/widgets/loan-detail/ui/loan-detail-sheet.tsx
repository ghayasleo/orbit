import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Banknote,
  CheckCircle2,
  Trash2,
  X,
} from 'lucide-react';
import { cn } from '@/shared/lib';
import {
  Sheet,
  SheetContent,
  Button,
} from '@/shared/ui';
import {
  useLoanPaymentsQuery,
  LoanActivityItem,
} from '@/entities/loan';
import type { Loan, ActivityEntry } from '@/entities/loan';

interface LoanDetailSheetProps {
  loan: Loan | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRecordPayment: () => void;
  onSettle: () => void;
  onDelete: () => void;
}

export function LoanDetailSheet({
  loan,
  open,
  onOpenChange,
  onRecordPayment,
  onSettle,
  onDelete,
}: LoanDetailSheetProps) {
  const { data: payments } = useLoanPaymentsQuery(loan?.id ?? null);

  const isLent = loan?.direction === 'lent';
  const progressPercent = loan
    ? ((Number(loan.amount) - Number(loan.amount_remaining)) / Number(loan.amount)) * 100
    : 0;

  const initials = loan
    ? loan.contact_name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '';

  const activityEntries: ActivityEntry[] = useMemo(() => {
    if (!loan) return [];
    const entries: ActivityEntry[] = [];

    entries.push({
      type: 'loan_created',
      loan,
      date: loan.created_at,
    });

    if (payments) {
      for (const p of payments) {
        entries.push({
          type: 'payment',
          payment: p,
          loan,
          date: p.created_at,
        });
      }
    }

    if (loan.status === 'settled' && loan.settled_at) {
      entries.push({
        type: 'settled',
        loan,
        date: loan.settled_at,
      });
    }

    return entries.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [loan, payments]);

  if (!loan) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md border-white/[0.06] bg-background p-0 overflow-y-auto"
      >
        {/* Header */}
        <div
          className={cn(
            'relative p-6 pb-8',
            isLent
              ? 'bg-gradient-to-b from-emerald-500/[0.08] to-transparent'
              : 'bg-gradient-to-b from-rose-500/[0.08] to-transparent',
          )}
        >
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div
              className={cn(
                'flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold',
                isLent
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'bg-rose-500/15 text-rose-400',
              )}
            >
              {initials}
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-primary">{loan.contact_name}</h3>
              <div
                className={cn(
                  'flex items-center gap-1 text-sm font-medium',
                  isLent ? 'text-emerald-400' : 'text-rose-400',
                )}
              >
                {isLent ? (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDownLeft className="h-3.5 w-3.5" />
                )}
                {isLent ? 'You lent' : 'You borrowed'}
              </div>
            </div>
          </div>

          {/* Amount */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'text-3xl font-bold',
              isLent ? 'text-emerald-400' : 'text-rose-400',
            )}
          >
            Rs {Number(loan.amount_remaining).toLocaleString('en-PK')}
            <span className="text-base font-normal text-muted-foreground ml-2">
              remaining
            </span>
          </motion.p>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>
                Rs {(Number(loan.amount) - Number(loan.amount_remaining)).toLocaleString('en-PK')} paid
              </span>
              <span>Rs {Number(loan.amount).toLocaleString('en-PK')} total</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                className={cn(
                  'h-full rounded-full',
                  isLent
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                    : 'bg-gradient-to-r from-rose-500 to-rose-400',
                )}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>

          {loan.due_date && (
            <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              Due{' '}
              {new Date(loan.due_date).toLocaleDateString('en-PK', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        {loan.status === 'active' && (
          <div className="flex gap-2 px-6 py-4 border-b border-white/[0.06]">
            <Button
              size="sm"
              onClick={onRecordPayment}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white gap-1.5"
            >
              <Banknote className="h-3.5 w-3.5" />
              Record Payment
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onSettle}
              className="border-white/[0.08] gap-1.5"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Settle
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={onDelete}
              className="text-muted-foreground hover:text-rose-400"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Activity / Payment History */}
        <div className="px-6 py-4">
          <h4 className="text-sm font-semibold text-text-primary mb-3">Activity</h4>
          {activityEntries.length > 0 ? (
            <div className="divide-y divide-white/[0.04]">
              {activityEntries.map((entry, i) => (
                <LoanActivityItem key={i} entry={entry} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No activity yet
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
