import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, PartyPopper } from 'lucide-react';
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
import { useSettleLoan } from '../api/use-settle-loan';

interface SettleLoanDialogProps {
  loan: Loan | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettleLoanDialog({ loan, open, onOpenChange }: SettleLoanDialogProps) {
  const [settled, setSettled] = useState(false);
  const { mutate: settle, isPending } = useSettleLoan();

  if (!loan) return null;

  function handleSettle() {
    if (!loan) return;
    settle(loan.id, {
      onSuccess: () => {
        setSettled(true);
        setTimeout(() => {
          setSettled(false);
          onOpenChange(false);
        }, 2000);
      },
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) setSettled(false);
        onOpenChange(o);
      }}
    >
      <DialogContent className="border-white/[0.06] bg-background sm:max-w-md">
        <AnimatePresence mode="wait">
          {settled ? (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-8 text-center"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <PartyPopper className="h-16 w-16 text-amber-400 mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold text-text-primary mb-2">All settled!</h3>
              <p className="text-sm text-muted-foreground">
                Loan with {loan.contact_name} is now settled.
              </p>

              {/* Confetti particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      left: `${50 + (Math.random() - 0.5) * 60}%`,
                      top: '50%',
                      backgroundColor: ['#f59e0b', '#10b981', '#f43f5e', '#3b82f6', '#a855f7'][i % 5],
                    }}
                    initial={{ y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      y: -100 - Math.random() * 100,
                      x: (Math.random() - 0.5) * 200,
                      opacity: 0,
                      scale: 0,
                      rotate: Math.random() * 720,
                    }}
                    transition={{ duration: 1.2, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="confirm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader>
                <DialogTitle className="text-text-primary">Settle this loan?</DialogTitle>
                <DialogDescription>
                  This will mark the loan with{' '}
                  <span className="font-medium text-text-primary">{loan.contact_name}</span>{' '}
                  as fully settled, regardless of remaining balance.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-6 gap-2">
                <Button
                  variant="ghost"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSettle}
                  disabled={isPending}
                  className="bg-amber-500 hover:bg-amber-600 text-black gap-2"
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                  Settle Loan
                </Button>
              </DialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
