import { useQuery } from '@tanstack/react-query';
import { getLoanPayments } from '@/shared/api';
import { QUERY_KEYS } from '@/shared/config';

export function useLoanPaymentsQuery(loanId: string | null) {
  return useQuery({
    queryKey: QUERY_KEYS.loanPayments(loanId ?? ''),
    queryFn: () => getLoanPayments(loanId!),
    enabled: !!loanId,
  });
}
