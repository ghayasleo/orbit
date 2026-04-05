import { ArrowUpRight, ArrowDownLeft, CheckCircle2, Banknote } from 'lucide-react';
import { cn } from '@/shared/lib';
import type { Loan, LoanPayment } from '../model/types';

type ActivityEntry =
  | { type: 'loan_created'; loan: Loan; date: string }
  | { type: 'payment'; payment: LoanPayment; loan: Loan; date: string }
  | { type: 'settled'; loan: Loan; date: string };

interface LoanActivityItemProps {
  entry: ActivityEntry;
}

export function LoanActivityItem({ entry }: LoanActivityItemProps) {
  return (
    <div className="flex items-start gap-3 py-3">
      {/* Timeline dot */}
      <div className="flex flex-col items-center pt-0.5">
        <div
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full',
            entry.type === 'loan_created' &&
              (entry.loan.direction === 'lent'
                ? 'bg-emerald-500/15 text-emerald-400'
                : 'bg-rose-500/15 text-rose-400'),
            entry.type === 'payment' && 'bg-blue-500/15 text-blue-400',
            entry.type === 'settled' && 'bg-amber-500/15 text-amber-400',
          )}
        >
          {entry.type === 'loan_created' &&
            (entry.loan.direction === 'lent' ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownLeft className="h-3.5 w-3.5" />
            ))}
          {entry.type === 'payment' && <Banknote className="h-3.5 w-3.5" />}
          {entry.type === 'settled' && <CheckCircle2 className="h-3.5 w-3.5" />}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-text-primary">
          {entry.type === 'loan_created' && (
            <>
              {entry.loan.direction === 'lent' ? 'Lent' : 'Borrowed'}{' '}
              <span className="font-semibold">
                Rs {Number(entry.loan.amount).toLocaleString('en-PK')}
              </span>{' '}
              {entry.loan.direction === 'lent' ? 'to' : 'from'}{' '}
              <span className="font-medium">{entry.loan.contact_name}</span>
            </>
          )}
          {entry.type === 'payment' && (
            <>
              Payment of{' '}
              <span className="font-semibold">
                Rs {Number(entry.payment.amount).toLocaleString('en-PK')}
              </span>
              {entry.payment.note && (
                <span className="text-muted-foreground"> — {entry.payment.note}</span>
              )}
            </>
          )}
          {entry.type === 'settled' && (
            <>
              Settled loan with{' '}
              <span className="font-medium">{entry.loan.contact_name}</span>
            </>
          )}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {new Date(entry.date).toLocaleDateString('en-PK', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}

export type { ActivityEntry };
