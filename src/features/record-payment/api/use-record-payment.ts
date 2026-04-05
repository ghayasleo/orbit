import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLoanPayment } from '@/shared/api';
import { QUERY_KEYS } from '@/shared/config';
import type { CreatePaymentInput } from '@/entities/loan';

export function useRecordPayment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreatePaymentInput) => createLoanPayment(input),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.loans });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.loanPayments(variables.loan_id) });
    },
  });
}
