/*
  # Update bookings table with payment fields
  1. Add columns: deposit_due_gbp numeric, deposit_deadline_at timestamptz, payment_status text
  2. Security: Enable RLS, add read policy for authenticated users
*/
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS deposit_due_gbp numeric(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS deposit_deadline_at timestamptz,
ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'awaiting_payment';

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bookings read own data" ON bookings FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Bookings insert own data" ON bookings FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Bookings update own data" ON bookings FOR UPDATE TO authenticated USING (auth.uid() = user_id);
