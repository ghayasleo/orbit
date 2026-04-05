import { useQuery } from '@tanstack/react-query';
import { getLoans } from '@/shared/api';
import { QUERY_KEYS } from '@/shared/config';

export function useLoansQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.loans,
    queryFn: getLoans,
  });
}
