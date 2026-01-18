/*
  # Create payments table
  1. New Table: payments (id uuid, booking_id uuid, amount numeric, payment_method text, status text, transaction_id text, created_at timestamp)
  2. Security: Enable RLS, add read policy for authenticated users
  3. Enums: payment_status (pending, completed, failed, refunded)
*/
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  amount numeric(10,2) NOT NULL,
  payment_method text NOT NULL,
  status payment_status DEFAULT 'pending',
  transaction_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Payments read own data" ON payments FOR SELECT TO authenticated USING (booking_id IN (SELECT id FROM bookings WHERE auth.uid() = user_id));
