import { motion } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import { cn } from '@/shared/lib';
import type { Loan } from '../model/types';

interface LoanCardProps {
  loan: Loan;
  onSelect: (id: string) => void;
  index?: number;
  variant?: 'card' | 'list';
}

export function LoanCard({ loan, onSelect, index = 0, variant = 'card' }: LoanCardProps) {
  const isLent = loan.direction === 'lent';
  const progressPercent =
    ((Number(loan.amount) - Number(loan.amount_remaining)) / Number(loan.amount)) * 100;

  const initials = loan.contact_name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (variant === 'list') {
    return (
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: index * 0.03 }}
        onClick={() => onSelect(loan.id)}
        className="w-full text-left flex items-center gap-4 py-4 pr-1 group transition-colors"
      >
        {/* Avatar */}
        <div
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xs font-bold shadow-sm border border-black/5 dark:border-white/5',
            isLent
              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
              : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
          )}
        >
          {initials}
        </div>

        {/* Name + direction */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text-primary group-hover:text-[#5B6AF0] transition-colors truncate">
            {loan.contact_name}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
             <span className={cn(
               "text-[10px] font-bold uppercase tracking-wider",
               isLent ? "text-emerald-600" : "text-rose-600"
             )}>
                {isLent ? 'Lent' : 'Borrowed'}
             </span>
             {loan.description && (
               <span className="text-[11px] text-text-muted truncate italic">
                 · {loan.description}
               </span>
             )}
          </div>
        </div>

        {/* Amount */}
        <div className="text-right shrink-0 flex items-center gap-3">
          <div>
            <p
              className={cn(
                'text-sm font-bold tracking-tight',
                isLent
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-rose-600 dark:text-rose-400',
              )}
            >
              Rs {Number(loan.amount_remaining).toLocaleString('en-PK')}
            </p>
            {progressPercent > 0 && (
              <p className="text-[10px] font-medium text-text-muted mt-0.5">
                {Math.round(progressPercent)}% paid
              </p>
            )}
          </div>
          <ChevronRight className="h-4 w-4 text-text-muted group-hover:text-text-primary group-hover:translate-x-0.5 transition-all" />
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={() => onSelect(loan.id)}
      className={cn(
        'w-full text-left rounded-3xl border border-border-subtle bg-bg-card p-5 shadow-sm cursor-pointer',
        'transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group',
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold shadow-sm border border-black/5 dark:border-white/5',
              isLent
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
            )}
          >
            {initials}
          </div>
          <div className="text-right">
             <span className={cn(
               "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border",
               isLent 
                ? "bg-emerald-50/50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/5 dark:text-emerald-400 dark:border-emerald-500/10" 
                : "bg-rose-50/50 text-rose-700 border-rose-100 dark:bg-rose-500/5 dark:text-rose-400 dark:border-rose-500/10"
             )}>
                {isLent ? 'Lent' : 'Borrowed'}
             </span>
          </div>
        </div>

        <div className="space-y-0.5">
          <h4 className="text-sm font-bold text-text-primary group-hover:text-[#5B6AF0] transition-colors truncate leading-tight">
            {loan.contact_name}
          </h4>
          <p className="text-[11px] text-text-secondary line-clamp-1 h-4">
            {loan.description || 'No description provided'}
          </p>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-text-muted uppercase tracking-tight">Remaining</span>
              <p className={cn(
                "text-base font-black tracking-tight",
                isLent ? "text-emerald-600" : "text-rose-600"
              )}>
                Rs {Number(loan.amount_remaining).toLocaleString('en-PK')}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold text-text-muted uppercase tracking-tight">Total</span>
              <p className="text-[11px] font-semibold text-text-secondary">
                Rs {Number(loan.amount).toLocaleString('en-PK')}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <div className="h-1.5 rounded-full bg-bg-subtle overflow-hidden">
              <motion.div
                className={cn(
                  'h-full rounded-full',
                  isLent ? 'bg-emerald-500' : 'bg-rose-500',
                )}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
              />
            </div>
            <div className="flex justify-between items-center px-0.5">
              <div className="flex items-center gap-1 text-[9px] font-medium text-text-muted">
                <Calendar className="h-2.5 w-2.5" />
                {loan.due_date ? new Date(loan.due_date).toLocaleDateString() : 'No due date'}
              </div>
              <span className="text-[9px] font-bold text-text-muted">
                {Math.round(progressPercent)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
