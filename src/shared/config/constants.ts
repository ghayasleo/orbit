// [SHARED/CONFIG] - Centralized query keys and app constants

export const QUERY_KEYS = {
  dashboardLayout: (userId?: string) => ['dashboard-layout', userId] as const,
  profile: (userId?: string) => ['profile', userId] as const,
  loans: ['loans'] as const,
  loanPayments: (loanId: string) => ['loan-payments', loanId] as const,
} as const;
