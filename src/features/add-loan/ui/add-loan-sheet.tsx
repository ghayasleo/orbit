import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDownLeft,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Check,
  Loader2,
} from 'lucide-react';
import { format } from 'date-fns';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui';
import { Calendar } from '@/shared/ui/calendar';
import type { LoanDirection, CreateLoanInput } from '@/entities/loan';
import { useCreateLoan } from '../api/use-create-loan';

interface AddLoanSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const STEPS = ['contact', 'direction', 'amount', 'confirm'] as const;
type Step = (typeof STEPS)[number];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
  }),
};

function AddLoanFormContent({
  onClose,
}: {
  onClose: () => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [formData, setFormData] = useState<{
    contact_name: string;
    direction: LoanDirection | null;
    amount: string;
    description: string;
    due_date: string;
  }>({
    contact_name: '',
    direction: null,
    amount: '',
    description: '',
    due_date: '',
  });

  const { mutate: createLoan, isPending } = useCreateLoan();
  const step = STEPS[stepIndex];

  function reset() {
    setStepIndex(0);
    setSlideDirection(1);
    setFormData({ contact_name: '', direction: null, amount: '', description: '', due_date: '' });
  }

  function next() {
    setSlideDirection(1);
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }

  function back() {
    setSlideDirection(-1);
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function canProceed(): boolean {
    switch (step) {
      case 'contact':
        return formData.contact_name.trim().length > 0;
      case 'direction':
        return formData.direction !== null;
      case 'amount':
        return Number(formData.amount) > 0;
      case 'confirm':
        return true;
      default:
        return false;
    }
  }

  function handleSubmit() {
    if (!formData.direction) return;

    const input: CreateLoanInput = {
      contact_name: formData.contact_name.trim(),
      direction: formData.direction,
      amount: Number(formData.amount),
      description: formData.description.trim() || undefined,
      due_date: formData.due_date || undefined,
    };

    createLoan(input, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-text-primary">
          {step === 'contact' && 'Who is this with?'}
          {step === 'direction' && 'What happened?'}
          {step === 'amount' && 'How much?'}
          {step === 'confirm' && 'Looks good?'}
        </h3>
        <p className="text-sm text-muted-foreground">
          Step {stepIndex + 1} of {STEPS.length}
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex gap-1.5 mb-5">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors duration-300',
              i <= stepIndex ? 'bg-rose-500' : 'bg-white/6',
            )}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="relative min-h-[200px] overflow-hidden -mx-2 px-2">
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={step}
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full"
          >
            {/* Step 1: Contact */}
            {step === 'contact' && (
              <div className="space-y-4">
                <Input
                  autoFocus
                  placeholder="Enter a name..."
                  value={formData.contact_name}
                  onChange={(e) =>
                    setFormData((d) => ({ ...d, contact_name: e.target.value }))
                  }
                  className="h-12 text-lg bg-white/3 border-white/8 focus-visible:ring-0 focus-visible:border-white/20"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && canProceed()) next();
                  }}
                />
              </div>
            )}

            {/* Step 2: Direction */}
            {step === 'direction' && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setFormData((d) => ({ ...d, direction: 'lent' }));
                    setTimeout(next, 200);
                  }}
                  className={cn(
                    'flex flex-col items-center gap-3 rounded-xl border-2 p-5 transition-all duration-200',
                    formData.direction === 'lent'
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-black/8 dark:border-white/8 bg-black/2 dark:bg-white/2 hover:border-white/15',
                  )}
                >
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full',
                      formData.direction === 'lent'
                        ? 'bg-emerald-500/20'
                        : 'bg-emerald-500/10',
                    )}
                  >
                    <ArrowUpRight className="h-6 w-6 text-emerald-400" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">I gave money</p>
                    <p className="text-xs text-muted-foreground mt-0.5">You lent to someone</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setFormData((d) => ({ ...d, direction: 'borrowed' }));
                    setTimeout(next, 200);
                  }}
                  className={cn(
                    'flex flex-col items-center gap-3 rounded-xl border-2 p-5 transition-all duration-200',
                    formData.direction === 'borrowed'
                      ? 'border-rose-500 bg-rose-500/10'
                      : 'border-black/8 dark:border-white/8 bg-black/2 dark:bg-white/2 hover:border-white/15',
                  )}
                >
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full',
                      formData.direction === 'borrowed'
                        ? 'bg-rose-500/20'
                        : 'bg-rose-500/10',
                    )}
                  >
                    <ArrowDownLeft className="h-6 w-6 text-rose-400" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">I received money</p>
                    <p className="text-xs text-muted-foreground mt-0.5">You borrowed from someone</p>
                  </div>
                </button>
              </div>
            )}

            {/* Step 3: Amount */}
            {step === 'amount' && (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-semibold text-muted-foreground">Rs</span>
                  <input
                    autoFocus
                    type="number"
                    inputMode="numeric"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, amount: e.target.value }))
                    }
                    placeholder="0"
                    className={cn(
                      'w-full bg-transparent border-none outline-none text-center',
                      'text-4xl font-bold tracking-tight',
                      formData.direction === 'lent' ? 'text-emerald-400' : 'text-rose-400',
                      'dark:placeholder:text-white/10 placeholder:text-black/10',
                      '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
                    )}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && canProceed()) next();
                    }}
                  />
                </div>

                <Input
                  placeholder="What's this for? (optional)"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((d) => ({ ...d, description: e.target.value }))
                  }
                  className="h-10 bg-white/3 border-white/8 focus-visible:ring-0 focus-visible:border-white/20"
                />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal h-10',
                        'bg-white/3 border-white/8 text-text-primary hover:bg-white/5 hover:text-text-primary',
                        !formData.due_date && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.due_date ? (
                        format(new Date(formData.due_date), 'PPP')
                      ) : (
                        <span>Pick a due date (optional)</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.due_date ? new Date(formData.due_date) : undefined}
                      onSelect={(date) =>
                        setFormData((d) => ({
                          ...d,
                          due_date: date ? format(date, 'yyyy-MM-dd') : '',
                        }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* Step 4: Confirm */}
            {step === 'confirm' && (
              <div
                className={cn(
                  'rounded-xl border p-5 space-y-3',
                  formData.direction === 'lent'
                    ? 'border-emerald-500/20 bg-emerald-500/4'
                    : 'border-rose-500/20 bg-rose-500/4',
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold',
                      formData.direction === 'lent'
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-rose-500/15 text-rose-400',
                    )}
                  >
                    {formData.contact_name
                      .split(' ')
                      .map((w) => w[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {formData.contact_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formData.direction === 'lent' ? 'You lent' : 'You borrowed'}
                    </p>
                  </div>
                </div>

                <p
                  className={cn(
                    'text-3xl font-bold',
                    formData.direction === 'lent' ? 'text-emerald-400' : 'text-rose-400',
                  )}
                >
                  Rs {Number(formData.amount || 0).toLocaleString('en-PK')}
                </p>

                {formData.description && (
                  <p className="text-sm text-muted-foreground">
                    {formData.description}
                  </p>
                )}

                {formData.due_date && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Due{' '}
                    {new Date(formData.due_date).toLocaleDateString('en-PK', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/6">
        <Button
          variant="ghost"
          size="sm"
          onClick={back}
          disabled={stepIndex === 0}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>

        {step === 'confirm' ? (
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-rose-500 hover:bg-rose-600 text-white gap-2"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            Create Loan
          </Button>
        ) : (
          <Button
            onClick={next}
            disabled={!canProceed()}
            className="bg-rose-500 hover:bg-rose-600 text-white gap-1"
          >
            Continue
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

export function AddLoanSheet({ open, onOpenChange }: AddLoanSheetProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="border-white/6 bg-background sm:max-w-lg p-6">
          <DialogHeader className="sr-only">
            <DialogTitle>Add Loan</DialogTitle>
            <DialogDescription>Create a new loan record</DialogDescription>
          </DialogHeader>
          <AddLoanFormContent onClose={() => onOpenChange(false)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="rounded-t-2xl max-h-[85vh] border-white/6 bg-background px-6 pb-8 pt-6"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Add Loan</SheetTitle>
          <SheetDescription>Create a new loan record</SheetDescription>
        </SheetHeader>
        <AddLoanFormContent onClose={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  );
}
