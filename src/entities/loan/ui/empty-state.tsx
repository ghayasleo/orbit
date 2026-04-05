import { motion } from 'framer-motion';
import { Handshake, Plus } from 'lucide-react';
import { Button } from '@/shared/ui';

interface LoanEmptyStateProps {
  onAdd: () => void;
}

export function LoanEmptyState({ onAdd }: LoanEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-rose-500/10 mb-6">
        <Handshake className="h-10 w-10 text-rose-400" />
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-2">
        No loans yet
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs mb-8">
        Track money you lend and borrow. Know exactly who owes what — always.
      </p>
      <Button
        onClick={onAdd}
        className="bg-rose-500 hover:bg-rose-600 text-white gap-2"
      >
        <Plus className="h-4 w-4" />
        Add your first loan
      </Button>
    </motion.div>
  );
}
