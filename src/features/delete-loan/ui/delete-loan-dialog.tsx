import { Loader2, Trash2, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from '@/shared/ui';
import type { Loan } from '@/entities/loan';
import { useDeleteLoan } from '../api/use-delete-loan';

interface DeleteLoanDialogProps {
  loan: Loan | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteLoanDialog({ loan, open, onOpenChange }: DeleteLoanDialogProps) {
  const { mutate: remove, isPending } = useDeleteLoan();

  if (!loan) return null;

  function handleDelete() {
    if (!loan) return;
    remove(loan.id, {
      onSuccess: () => onOpenChange(false),
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/[0.06] bg-background sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/10">
              <AlertTriangle className="h-5 w-5 text-rose-400" />
            </div>
            <DialogTitle className="text-text-primary">Delete this loan?</DialogTitle>
          </div>
          <DialogDescription>
            This will permanently remove the loan with{' '}
            <span className="font-medium text-text-primary">{loan.contact_name}</span>{' '}
            and all its payment history. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="gap-2"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            Delete Loan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
