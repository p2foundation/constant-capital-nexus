-- Fix critical security vulnerability in payments table
-- The payments table currently has no RLS policies, exposing all financial data

-- Enable Row Level Security on payments table
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own payment records
CREATE POLICY "Users can view their own payments"
  ON public.payments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can create their own payment records (for system integration)
CREATE POLICY "Users can create their own payments"
  ON public.payments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Admins and developers can view all payment records
CREATE POLICY "Admins can view all payments"
  ON public.payments
  FOR SELECT
  TO authenticated
  USING (get_user_role() = ANY (ARRAY['Admin'::text, 'Developer'::text]));

-- Policy: Admins and developers can manage all payment records
CREATE POLICY "Admins can manage all payments"
  ON public.payments
  FOR ALL
  TO authenticated
  USING (get_user_role() = ANY (ARRAY['Admin'::text, 'Developer'::text]))
  WITH CHECK (get_user_role() = ANY (ARRAY['Admin'::text, 'Developer'::text]));

-- Policy: Allow system/service role to insert payment records (for payment processing)
CREATE POLICY "System can insert payments"
  ON public.payments
  FOR INSERT
  TO service_role
  WITH CHECK (true);