import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLoan } from '@/shared/api';
import { QUERY_KEYS } from '@/shared/config';
import type { CreateLoanInput } from '@/entities/loan';

export function useCreateLoan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateLoanInput) => createLoan(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.loans });
    },
  });
}
