// [ENTITIES/LOAN] - Domain types

export type LoanDirection = 'lent' | 'borrowed';
export type LoanStatus = 'active' | 'settled';

export interface Loan {
  id: string;
  user_id: string;
  contact_name: string;
  contact_avatar: string | null;
  direction: LoanDirection;
  amount: number;
  amount_remaining: number;
  currency: string;
  description: string | null;
  status: LoanStatus;
  created_at: string;
  settled_at: string | null;
  due_date: string | null;
}

export interface LoanPayment {
  id: string;
  loan_id: string;
  amount: number;
  note: string | null;
  created_at: string;
}

export interface LoanSummary {
  netBalance: number;
  totalLent: number;
  totalBorrowed: number;
  activeLentCount: number;
  activeBorrowedCount: number;
}

export interface CreateLoanInput {
  contact_name: string;
  direction: LoanDirection;
  amount: number;
  description?: string;
  due_date?: string;
}

export interface CreatePaymentInput {
  loan_id: string;
  amount: number;
  note?: string;
}
