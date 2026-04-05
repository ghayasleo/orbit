import { useMutation, useQueryClient } from '@tanstack/react-query';
import { settleLoan } from '@/shared/api';
import { QUERY_KEYS } from '@/shared/config';

export function useSettleLoan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (loanId: string) => settleLoan(loanId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.loans });
    },
  });
}
