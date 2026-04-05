import { useState } from 'react';
import { Loader2, Banknote } from 'lucide-react';
import { cn, useMediaQuery } from '@/shared/lib';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Button,
  Input,
} from '@/shared/ui';
import type { Loan } from '@/entities/loan';
import { useRecordPayment } from '../api/use-record-payment';

interface RecordPaymentSheetProps {
  loan: Loan | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function RecordPaymentContent({
  loan,
  onClose,
}: {
  loan: Loan;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({ amount: '', note: '' });
  const { mutate: recordPayment, isPending } = useRecordPayment();

  const remaining = Number(loan.amount_remaining);
  const isLent = loan.direction === 'lent';

  function handleSubmit() {
    if (Number(formData.amount) <= 0) return;

    recordPayment(
      {
        loan_id: loan.id,
        amount: Number(formData.amount),
        note: formData.note.trim() || undefined,
      },
      {
        onSuccess: () => {
          setFormData({ amount: '', note: '' });
          onClose();
        },
      },
    );
  }

  function fillFullAmount() {
    setFormData((d) => ({ ...d, amount: String(remaining) }));
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-text-primary">Record Payment</h3>
        <p className="text-sm text-muted-foreground">
          {isLent
            ? `${loan.contact_name} is paying you back`
            : `You are paying ${loan.contact_name} back`}
        </p>
      </div>

      {/* Context card */}
      <div
        className={cn(
          'rounded-xl border p-4 mb-5',
          isLent ? 'border-emerald-500/20 bg-emerald-500/4' : 'border-rose-500/20 bg-rose-500/4',
        )}
      >
        <p className="text-xs text-muted-foreground">Remaining balance</p>
        <p className={cn('text-2xl font-bold mt-1', isLent ? 'text-emerald-400' : 'text-rose-400')}>
          Rs {remaining.toLocaleString('en-PK')}
        </p>
      </div>

      {/* Amount input */}
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl font-semibold text-muted-foreground">Rs</span>
          <input
            autoFocus
            type="number"
            inputMode="numeric"
            value={formData.amount}
            onChange={(e) => setFormData((d) => ({ ...d, amount: e.target.value }))}
            placeholder="0"
            className={cn(
              'w-full bg-transparent border-none outline-none text-center',
              'text-4xl font-bold tracking-tight text-text-primary',
              'placeholder:text-white/10',
              '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            )}
          />
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={fillFullAmount}
          className="w-full border-white/8 text-muted-foreground hover:text-text-primary"
        >
          Full amount — Rs {remaining.toLocaleString('en-PK')}
        </Button>

        <Input
          placeholder="Add a note (optional)"
          value={formData.note}
          onChange={(e) => setFormData((d) => ({ ...d, note: e.target.value }))}
          className="h-10 bg-white/3 border-white/8 focus:outline-none focus:ring-0 focus:border-white/8"
        />
      </div>

      <div className="mt-5 pt-4 border-t border-white/6">
        <Button
          onClick={handleSubmit}
          disabled={isPending || Number(formData.amount) <= 0 || Number(formData.amount) > remaining}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white gap-2"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Banknote className="h-4 w-4" />
          )}
          Record Payment
        </Button>
        {Number(formData.amount) > remaining && (
          <p className="text-xs text-rose-400 text-center mt-2">
            Amount cannot exceed remaining balance
          </p>
        )}
      </div>
    </div>
  );
}

export function RecordPaymentSheet({ loan, open, onOpenChange }: RecordPaymentSheetProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (!loan) return null;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="border-white/6 bg-background sm:max-w-md p-6">
          <DialogHeader className="sr-only">
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>Record a payment for this loan</DialogDescription>
          </DialogHeader>
          <RecordPaymentContent loan={loan} onClose={() => onOpenChange(false)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="rounded-t-2xl border-white/6 bg-background px-6 pb-8 pt-6"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Record Payment</SheetTitle>
          <SheetDescription>Record a payment for this loan</SheetDescription>
        </SheetHeader>
        <RecordPaymentContent loan={loan} onClose={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  );
}
