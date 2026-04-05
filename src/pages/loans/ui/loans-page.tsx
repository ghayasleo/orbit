import { useState, useCallback, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader, Button } from '@/shared/ui';
import { useLoansQuery, useLoanStore } from '@/entities/loan';
import type { Loan } from '@/entities/loan';
import { AddLoanSheet } from '@/features/add-loan';
import { RecordPaymentSheet } from '@/features/record-payment';
import { SettleLoanDialog } from '@/features/settle-loan';
import { DeleteLoanDialog } from '@/features/delete-loan';
import { LoansOverview } from '@/widgets/loans-overview';
import { LoanDetailSheet } from '@/widgets/loan-detail';

export function LoansPage() {
  const { data: loans } = useLoansQuery();
  const { isAddSheetOpen, setAddSheetOpen, selectedLoanId, setSelectedLoanId } =
    useLoanStore();

  const [dialogState, setDialogState] = useState<{
    type: 'payment' | 'settle' | 'delete' | null;
    loanId: string | null;
  }>({ type: null, loanId: null });

  const selectedLoan = useMemo(
    () => (loans ?? []).find((l: Loan) => l.id === selectedLoanId) ?? null,
    [loans, selectedLoanId],
  );

  const dialogLoan = useMemo(
    () => (loans ?? []).find((l: Loan) => l.id === dialogState.loanId) ?? null,
    [loans, dialogState.loanId],
  );

  const handleSelectLoan = useCallback(
    (id: string) => setSelectedLoanId(id),
    [setSelectedLoanId],
  );

  const handleAddLoan = useCallback(
    () => setAddSheetOpen(true),
    [setAddSheetOpen],
  );

  function openDialog(type: 'payment' | 'settle' | 'delete') {
    setDialogState({ type, loanId: selectedLoanId });
  }

  function closeDialog() {
    setDialogState({ type: null, loanId: null });
  }

  return (
    <div className="space-y-6">
      {/* Header with Add button */}
      <div className="flex items-start justify-between">
        <PageHeader
          title="Loans"
          description="Track money lent and borrowed between people."
        />
        <Button
          onClick={handleAddLoan}
          className="bg-rose-500 hover:bg-rose-600 text-white gap-2 shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Loan</span>
        </Button>
      </div>

      {/* Main widget */}
      <LoansOverview onSelectLoan={handleSelectLoan} onAddLoan={handleAddLoan} />

      {/* Sheets & Dialogs */}
      <AddLoanSheet open={isAddSheetOpen} onOpenChange={setAddSheetOpen} />

      <LoanDetailSheet
        loan={selectedLoan}
        open={!!selectedLoanId}
        onOpenChange={(o) => {
          if (!o) setSelectedLoanId(null);
        }}
        onRecordPayment={() => openDialog('payment')}
        onSettle={() => openDialog('settle')}
        onDelete={() => openDialog('delete')}
      />

      <RecordPaymentSheet
        loan={dialogLoan}
        open={dialogState.type === 'payment'}
        onOpenChange={(o) => {
          if (!o) closeDialog();
        }}
      />

      <SettleLoanDialog
        loan={dialogLoan}
        open={dialogState.type === 'settle'}
        onOpenChange={(o) => {
          if (!o) closeDialog();
        }}
      />

      <DeleteLoanDialog
        loan={dialogLoan}
        open={dialogState.type === 'delete'}
        onOpenChange={(o) => {
          if (!o) {
            closeDialog();
            setSelectedLoanId(null);
          }
        }}
      />
    </div>
  );
}
