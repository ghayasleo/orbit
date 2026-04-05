// [SHARED/API] - Loan service — raw async Supabase functions
import { supabase } from './client';
import type { Loan, LoanPayment, CreateLoanInput, CreatePaymentInput } from '@/entities/loan';

export async function getLoans(): Promise<Loan[]> {
  const { data, error } = await supabase
    .from('loans')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createLoan(input: CreateLoanInput): Promise<Loan> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('loans')
    .insert({
      user_id: user.id,
      contact_name: input.contact_name,
      direction: input.direction,
      amount: input.amount,
      amount_remaining: input.amount,
      description: input.description ?? null,
      due_date: input.due_date ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getLoanPayments(loanId: string): Promise<LoanPayment[]> {
  const { data, error } = await supabase
    .from('loan_payments')
    .select('*')
    .eq('loan_id', loanId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createLoanPayment(input: CreatePaymentInput): Promise<LoanPayment> {
  const { data: payment, error: paymentError } = await supabase
    .from('loan_payments')
    .insert({
      loan_id: input.loan_id,
      amount: input.amount,
      note: input.note ?? null,
    })
    .select()
    .single();

  if (paymentError) throw paymentError;

  // Update remaining amount on the loan
  const { data: loan, error: loanFetchError } = await supabase
    .from('loans')
    .select('amount_remaining')
    .eq('id', input.loan_id)
    .single();

  if (loanFetchError) throw loanFetchError;

  const newRemaining = Math.max(0, Number(loan.amount_remaining) - input.amount);
  const updateData: Record<string, unknown> = { amount_remaining: newRemaining };

  if (newRemaining === 0) {
    updateData.status = 'settled';
    updateData.settled_at = new Date().toISOString();
  }

  const { error: updateError } = await supabase
    .from('loans')
    .update(updateData)
    .eq('id', input.loan_id);

  if (updateError) throw updateError;

  return payment;
}

export async function settleLoan(loanId: string): Promise<void> {
  const { error } = await supabase
    .from('loans')
    .update({
      status: 'settled',
      amount_remaining: 0,
      settled_at: new Date().toISOString(),
    })
    .eq('id', loanId);

  if (error) throw error;
}

export async function deleteLoan(loanId: string): Promise<void> {
  const { error } = await supabase
    .from('loans')
    .delete()
    .eq('id', loanId);

  if (error) throw error;
}
