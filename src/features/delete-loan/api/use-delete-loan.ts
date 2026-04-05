import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLoan } from '@/shared/api';
import { QUERY_KEYS } from '@/shared/config';

export function useDeleteLoan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (loanId: string) => deleteLoan(loanId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.loans });
    },
  });
}
