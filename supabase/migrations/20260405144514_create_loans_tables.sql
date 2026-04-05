-- Loans table
CREATE TABLE public.loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  contact_name TEXT NOT NULL,
  contact_avatar TEXT,
  direction TEXT NOT NULL CHECK (direction IN ('lent', 'borrowed')),
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  amount_remaining NUMERIC(12,2) NOT NULL CHECK (amount_remaining >= 0),
  currency TEXT NOT NULL DEFAULT 'PKR',
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'settled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  settled_at TIMESTAMPTZ,
  due_date DATE
);

ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own loans" ON public.loans
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Loan payments table
CREATE TABLE public.loan_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id UUID NOT NULL REFERENCES public.loans(id) ON DELETE CASCADE,
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.loan_payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage payments of own loans" ON public.loan_payments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.loans WHERE loans.id = loan_payments.loan_id AND loans.user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.loans WHERE loans.id = loan_payments.loan_id AND loans.user_id = auth.uid())
  );
